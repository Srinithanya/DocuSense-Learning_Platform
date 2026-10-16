/**
 * DocuSense - Ollama client + real AI pipeline.
 * Talks to a local Ollama server (default http://localhost:11434).
 */
const Ollama = {
  cfg: { url: 'http://localhost:11434', model: '', ctx: 3072 },
  online: false,
  models: [],

  load() {
    try { Object.assign(this.cfg, JSON.parse(localStorage.getItem('docusense_ollama') || '{}')); } catch (e) {}
  },
  save() { localStorage.setItem('docusense_ollama', JSON.stringify(this.cfg)); },

  async check() {
    try {
      const r = await fetch(this.cfg.url + '/api/tags');
      const d = await r.json();
      this.models = (d.models || []).map(m => m.name);
      this.online = this.models.length > 0;
      if (this.online && !this.models.includes(this.cfg.model)) this.cfg.model = this.models[0];
      this.save();
    } catch (e) { this.online = false; this.models = []; }
    return this.online;
  },

  // Ask the model for JSON. Retries once on bad JSON.
  async json(system, prompt, maxTokens = 1500) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const r = await fetch(this.cfg.url + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: this.cfg.model, stream: false, format: 'json', keep_alive: '30m',
          options: { temperature: 0.4 + attempt * 0.2, num_ctx: this.cfg.ctx, num_predict: maxTokens },
          messages: [{ role: 'system', content: system }, { role: 'user', content: prompt }]
        })
      });
      if (!r.ok) throw new Error('Ollama error ' + r.status + ' (is the model "' + this.cfg.model + '" installed?)');
      const d = await r.json();
      try { return JSON.parse(d.message.content); } catch (e) {
        const m = (d.message.content || '').match(/\{[\s\S]*\}/);
        if (m) { try { return JSON.parse(m[0]); } catch (e2) {} }
      }
    }
    throw new Error('Model returned invalid JSON');
  },

  esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); },
  shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },

  // Split text into chunks (~3000 chars)
  chunk(text, size = 3000) {
    const paras = text.split(/\n+/); const out = []; let cur = '';
    for (const p of paras) {
      if ((cur + p).length > size && cur) { out.push(cur); cur = ''; }
      cur += p + '\n';
      while (cur.length > size * 1.5) { out.push(cur.slice(0, size)); cur = cur.slice(size); }
    }
    if (cur.trim()) out.push(cur);
    return out;
  },

  // Evenly sample the document so summary covers start, middle and end
  sample(text, max = 7000) {
    if (text.length <= max) return text;
    const ch = this.chunk(text), n = Math.max(2, Math.floor(max / 1500)), out = [];
    for (let i = 0; i < n; i++) out.push(ch[Math.floor(i * (ch.length - 1) / (n - 1))].slice(0, 1500));
    return out.join('\n...\n');
  },

  // Pick chunks most relevant to a topic
  relevant(text, topic, max = 4500) {
    const words = (topic.name + ' ' + (topic.description || '')).toLowerCase().match(/[a-z0-9]{4,}/g) || [];
    const scored = this.chunk(text, 1500).map(c => {
      const l = c.toLowerCase(); return { c, s: words.reduce((a, w) => a + (l.includes(w) ? 1 : 0), 0) };
    }).sort((a, b) => b.s - a.s);
    let out = ''; for (const x of scored) { if ((out + x.c).length > max) break; out += x.c + '\n'; }
    return out || text.slice(0, max);
  },

  SYS: 'You are an expert teacher. Use ONLY the provided study material. Never invent facts that are not in it. Reply with valid JSON only.',

  async analyze(text, onProgress) {
    onProgress(10, 'Reading document and finding topics...');
    const a = await this.json(this.SYS,
      `STUDY MATERIAL:\n${this.sample(text, 3500)}\n\nReturn JSON: {"summary":"4-6 sentence executive summary written in your own words","keyTakeaways":["5 short key points"],"topics":[{"name":"short topic name","importance":1-5,"description":"one sentence"}]}\nGive 4 or 5 topics that really appear in the material, most important first.`, 800);
    const topics = (a.topics || []).filter(t => t && t.name).slice(0, 6);
    if (!topics.length) throw new Error('No topics found');
    return { summary: a.summary || '', takeaways: (a.keyTakeaways || []).slice(0, 6), topics };
  },

  async notesFor(text, topic) {
    const n = await this.json(this.SYS,
      `TOPIC: ${topic.name}\nMATERIAL:\n${this.relevant(text, topic)}\n\nWrite study notes for this topic. Return JSON: {"paragraph":"clear explanation, 4-6 sentences","bullets":["4-6 important points"],"keyConcept":"one key concept sentence","examFact":"one high-yield fact","example":"one practical example"}`, 1200);
    return n;
  },

  // Generate MCQs for a topic. Options are shuffled in code (small models always put the answer first).
  async questionsFor(text, topic, docTitle, count = 5, avoid = []) {
    const r = await this.json(this.SYS,
      `TOPIC: ${topic.name}\nMATERIAL:\n${this.relevant(text, topic)}\n\nWrite ${count} DIFFERENT multiple-choice questions based only on this material. ${avoid.length ? 'Do not repeat these: ' + avoid.slice(-8).join(' | ') + '.' : ''}\nReturn JSON: {"questions":[{"question":"...","options":["4 distinct options"],"answer":"the exact text of the correct option","explanation":"why it is correct, citing the material","whyMatters":"why this matters for exams"}]}`, 1800);
    return this.cleanQs(r.questions, topic, docTitle);
  },

  cleanQs(list, topic, docTitle) {
    const out = [];
    for (const q of (list || [])) {
      if (!q || !q.question || !Array.isArray(q.options)) continue;
      let opts = [...new Set(q.options.map(o => String(o).trim()).filter(Boolean))];
      let ans = String(q.answer || '').trim();
      if (/^[A-D]$/i.test(ans)) ans = q.options[ans.toUpperCase().charCodeAt(0) - 65] || '';
      if (opts.length < 3 || !opts.includes(ans)) continue;
      opts = this.shuffle(opts).slice(0, 4);
      if (!opts.includes(ans)) opts[0] = ans;
      opts = this.shuffle(opts);
      const labels = ['A', 'B', 'C', 'D'];
      out.push({
        id: 'q-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
        topic: topic.name, topicCategory: docTitle, question: q.question,
        options: opts.map((t, i) => ({ label: labels[i], text: t })),
        correctAnswer: labels[opts.indexOf(ans)], correctText: ans,
        explanation: q.explanation || 'See the study material.',
        whyMatters: q.whyMatters || 'Core concept from your material.'
      });
    }
    return out;
  },

  // One call per topic: notes + questions together (half the calls = much faster)
  async topicPack(text, topic, docTitle, count = 3) {
    const r = await this.json(this.SYS,
      `TOPIC: ${topic.name}\nMATERIAL:\n${this.relevant(text, topic, 3000)}\n\nReturn JSON: {"paragraph":"clear explanation, 3-5 sentences","bullets":["4 important points"],"keyConcept":"one sentence","examFact":"one high-yield fact","example":"one practical example","questions":[{"question":"...","options":["4 distinct options"],"answer":"exact text of correct option","explanation":"why correct","whyMatters":"why it matters for exams"}]}\nWrite ${count} multiple-choice questions based only on the material.`, 1100);
    return { notes: r, questions: this.cleanQs(r.questions, topic, docTitle) };
  },

  sectionFrom(n, t, i) {
    return {
      title: `${i + 1}. ${t.name}`,
      content: `<p>${this.esc(n.paragraph)}</p><ul>${(n.bullets || []).map(b => `<li>${this.esc(b)}</li>`).join('')}</ul>`,
      conceptBox: n.keyConcept ? { title: 'Key Concept', text: this.esc(n.keyConcept) } : null,
      factsBanner: n.examFact ? { title: 'High-Yield Exam Fact', text: this.esc(n.examFact) } : null,
      exampleBox: n.example ? { title: 'Example', text: this.esc(n.example) } : null
    };
  },

  // Builds the doc after the FIRST topic so the user can start; rest continues in background
  async buildDocument(fileName, fileSize, text, onProgress) {
    const title = fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ');
    const words = text.split(/\s+/).length;
    const a = await this.analyze(text, onProgress);
    const topics = a.topics.slice(0, 5).map((t, i) => {
      const imp = Math.min(5, Math.max(1, parseInt(t.importance) || 3));
      return { id: `topic-${i + 1}-` + t.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 20), name: t.name, description: t.description || '',
        importance: imp, importanceLabel: imp >= 5 ? 'High Importance' : imp >= 4 ? 'Medium Importance' : 'Normal Importance',
        mastery: 0, status: 'needs-practice', questionsCount: 0, articles: t.description || '' };
    });
    const doc = {
      id: 'doc-' + Date.now(), title: fileName, subject: title, category: 'Uploaded Material', uploadDate: 'Just now',
      pages: Math.max(1, Math.ceil(words / 320)), fileSize, topicsIdentified: topics.length,
      importantTopicsCount: topics.filter(t => t.importance >= 4).length, progress: 0, completedTopics: 0, totalTopics: topics.length,
      summary: a.summary, keyTakeaways: a.takeaways, topics, rawText: text.slice(0, 60000), aiGenerated: true, generating: true,
      studyContent: { topicId: topics[0].id, documentTitle: title, topicName: topics[0].name, subheading: 'AI Study Notes', readTime: Math.max(2, Math.round(words / 250)) + ' min read', progress: 0, conceptsCount: topics.length * 2, sections: [] },
      questionsBank: []
    };
    onProgress(40, `Writing notes & questions: ${topics[0].name}`);
    await this.addTopic(doc, 0);
    if (!doc.questionsBank.length) throw new Error('The model could not produce valid questions. Try a bigger model (e.g. llama3.1:8b).');
    this.continueBuild(doc);
    return doc;
  },

  async addTopic(doc, i) {
    const t = doc.topics[i];
    try {
      const r = await this.topicPack(doc.rawText, t, doc.subject);
      doc.studyContent.sections.push(this.sectionFrom(r.notes, t, i));
      doc.questionsBank.push(...r.questions); t.questionsCount = r.questions.length;
    } catch (e) { console.warn('topic failed', t.name, e); }
  },

  async continueBuild(doc) {
    for (let i = 1; i < doc.topics.length; i++) {
      await this.addTopic(doc, i);
      try { appState.saveToStorage(); } catch (e) {}
      if (['study', 'analysis'].includes(appState.currentView)) App.renderCurrentView();
    }
    doc.generating = false;
    try { appState.saveToStorage(); } catch (e) {}
    if (['study', 'analysis'].includes(appState.currentView)) App.renderCurrentView();
    UI.showToast('All topics are ready!', 'success');
  },

  // Streaming chat for the AI agent
  async chat(messages, onToken) {
    const r = await fetch(this.cfg.url + '/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: this.cfg.model, stream: true, keep_alive: '30m', options: { temperature: 0.5, num_ctx: this.cfg.ctx }, messages })
    });
    if (!r.ok) throw new Error('Ollama error ' + r.status);
    const rd = r.body.getReader(), dec = new TextDecoder(); let buf = '', full = '';
    while (true) {
      const { done, value } = await rd.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split('\n'); buf = lines.pop();
      for (const l of lines) { if (!l.trim()) continue; try { const t = JSON.parse(l).message?.content || ''; full += t; onToken(full); } catch (e) {} }
    }
    return full;
  },

  // Add fresh questions to an existing document's bank (used by "Generate new questions")
  async moreQuestions(doc, topicName) {
    const topics = topicName ? doc.topics.filter(t => t.name === topicName) : doc.topics;
    const added = [];
    for (const t of topics) {
      const avoid = doc.questionsBank.filter(q => q.topic === t.name).map(q => q.question);
      const qs = await this.questionsFor(doc.rawText || doc.summary, t, doc.subject, 5, avoid);
      added.push(...qs);
    }
    doc.questionsBank.push(...added);
    return added.length;
  }
};
Ollama.load();
