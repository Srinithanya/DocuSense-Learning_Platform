/** DocuSense - Revision Games (non-MCQ formats, built instantly from your material) */
const GamesView = {
  mode: null, g: null,
  GAMES: [
    ['flash', '🃏', 'Flashcards', 'Flip cards and mark what you know'],
    ['tf', '✅', 'True or False', 'Judge if the statement is correct'],
    ['type', '⌨️', 'Type the Answer', 'Recall the answer from memory'],
    ['fill', '🧩', 'Fill the Blank', 'Complete sentences from your notes'],
    ['match', '🔗', 'Match the Topics', 'Pair each topic with its description']
  ],
  doc() { return appState.getActiveDocument(); },
  render() {
    const el = document.getElementById('view-games'); if (!el) return;
    const doc = this.doc();
    if (!doc || !doc.questionsBank || !doc.questionsBank.length) {
      el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🎮</div><h2 class="empty-state-title">Upload material to play</h2>
      <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">+ Upload Study Material</button></div>`; return;
    }
    if (!this.mode) {
      el.innerHTML = `<div class="upload-container" style="max-width:900px"><div class="upload-header-box"><h1 class="upload-title">🎮 Revision Games</h1>
      <p class="upload-subtitle">Revise <strong>${Ollama.esc(doc.subject)}</strong> in different ways</p></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem">
      ${this.GAMES.map(x => `<div onclick="GamesView.start('${x[0]}')" style="cursor:pointer;padding:1.25rem;background:#fff;border:1.5px solid var(--border);border-radius:var(--radius-lg)">
        <div style="font-size:2rem">${x[1]}</div><strong>${x[2]}</strong><div style="font-size:.85rem;color:var(--text-muted)">${x[3]}</div></div>`).join('')}</div></div>`;
      return;
    }
    el.innerHTML = `<div class="upload-container" style="max-width:720px"><button class="btn btn-ghost btn-sm" onclick="GamesView.mode=null;GamesView.render()">← All games</button>
      <div id="game-body" style="margin-top:1rem;background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);padding:1.5rem"></div></div>`;
    this.draw();
  },
  sentences(doc) {
    const src = [doc.summary, ...(doc.keyTakeaways || []), ...doc.questionsBank.map(q => q.explanation)].join(' ');
    return [...new Set((src.match(/[^.!?]+[.!?]/g) || []).map(s => s.trim()).filter(s => s.length > 40 && s.length < 200))];
  },
  plain(html) { const d = document.createElement('div'); d.innerHTML = html || ''; return (d.textContent || '').replace(/\s+/g, ' ').trim(); },
  clip(t, n) { t = (t || '').trim(); return t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : t; },
  // Build matching pairs that work for ANY document (AI or offline analysed)
  matchPairs(doc) {
    const pairs = [], seen = new Set(), secs = (doc.studyContent && doc.studyContent.sections) || [];
    const add = (left, right) => {
      left = this.clip(left, 70); right = this.clip(right, 150);
      if (!left || right.length < 12 || seen.has(left.toLowerCase()) || seen.has(right.toLowerCase())) return;
      seen.add(left.toLowerCase()); seen.add(right.toLowerCase()); pairs.push({ left, right });
    };
    doc.topics.forEach((t, i) => {
      const sec = secs.find(x => x.title && x.title.toLowerCase().includes(t.name.toLowerCase())) || secs[i];
      const q = doc.questionsBank.find(x => x.topic === t.name);
      let clue = t.description || (sec && sec.conceptBox && this.plain(sec.conceptBox.text)) || (sec && this.plain(sec.content).split(/(?<=[.!?])\s/)[0]) || (q && q.explanation) || '';
      clue = clue.replace(new RegExp(t.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '____');
      add(t.name, clue);
    });
    if (pairs.length < 4) Ollama.shuffle(doc.questionsBank).forEach(q => { if (pairs.length < 5) add(q.question, q.correctText + (q.explanation ? ' - ' + q.explanation : '')); });
    return pairs.slice(0, 5);
  },

  start(mode) {
    const doc = this.doc(), sh = Ollama.shuffle, qs = sh(doc.questionsBank).slice(0, 10);
    let items = [];
    if (mode === 'flash' || mode === 'type') items = qs;
    if (mode === 'tf') items = qs.map(q => {
      const t = Math.random() < .5, wrong = q.options.filter(o => o.text !== q.correctText);
      return { q, shown: t || !wrong.length ? q.correctText : sh(wrong)[0].text, truth: t || !wrong.length };
    });
    if (mode === 'fill') {
      const pairs = sh(this.sentences(doc)).slice(0, 8).map(s => {
        const w = (s.match(/[A-Za-z]{6,}/g) || []).sort((a, b) => b.length - a.length)[0]; return w ? { s, w } : null;
      }).filter(Boolean);
      items = pairs.map(p => ({ text: p.s.replace(p.w, '_____'), ans: p.w, opts: sh([p.w, ...sh(pairs.filter(x => x.w !== p.w).map(x => x.w)).slice(0, 3)]) }));
      if (items.length < 3) { UI.showToast('Not enough text for this game', 'warning'); return; }
    }
    if (mode === 'match') {
      const pairs = this.matchPairs(doc);
      if (pairs.length < 3) { UI.showToast('Not enough material for matching yet. Upload a longer document.', 'warning'); return; }
      this.g = { mode, pairs, right: sh(pairs.map((p, i) => ({ text: p.right, idx: i }))), sel: null, done: [], tries: 0 };
      this.mode = mode; this.render(); return;
    }
    this.g = { mode, items, i: 0, score: 0, flipped: false, answered: false };
    this.mode = mode; this.render();
  },
  nextItem(ok) { const g = this.g; if (ok) g.score++; g.i++; g.flipped = false; g.answered = false; this.draw(); },
  end(total) {
    const g = this.g;
    document.getElementById('game-body').innerHTML = `<div style="text-align:center"><div style="font-size:3rem">🎉</div><h2>Score: ${g.score} / ${total}</h2>
      <p style="color:var(--text-muted)">${g.score / total >= .7 ? 'Great revision!' : 'Keep practising - try again!'}</p>
      <button class="btn btn-primary" onclick="GamesView.start('${g.mode}')">Play again</button>
      <button class="btn btn-outline" onclick="GamesView.mode=null;GamesView.render()">All games</button></div>`;
    UI.playSound('xp');
  },
  head(g) { return `<div style="font-size:.8rem;color:var(--text-muted);margin-bottom:.75rem">Item ${g.i + 1} of ${g.items.length} • Score ${g.score}</div>`; },
  draw() {
    const g = this.g, body = document.getElementById('game-body'); if (!g || !body) return;
    const E = Ollama.esc;
    if (g.mode === 'match') return this.drawMatch(body);
    if (g.i >= g.items.length) return this.end(g.items.length);
    const it = g.items[g.i];
    if (g.mode === 'flash') {
      body.innerHTML = this.head(g) + `<div onclick="GamesView.g.flipped=!GamesView.g.flipped;GamesView.draw()" style="cursor:pointer;min-height:180px;padding:1.5rem;border-radius:var(--radius-lg);background:${g.flipped ? '#ecfdf5' : '#eff6ff'};display:flex;align-items:center;justify-content:center;text-align:center;font-size:1.1rem">
        ${g.flipped ? `<div><strong>${E(it.correctText)}</strong><div style="font-size:.85rem;margin-top:.5rem;color:#475569">${E(it.explanation)}</div></div>` : E(it.question)}</div>
        <p style="text-align:center;font-size:.8rem;color:var(--text-muted)">Tap card to flip</p>
        ${g.flipped ? `<div style="display:flex;gap:.5rem;justify-content:center"><button class="btn btn-outline" onclick="GamesView.nextItem(false)">🔁 Again</button><button class="btn btn-primary" onclick="GamesView.nextItem(true)">✅ Got it</button></div>` : ''}`;
    } else if (g.mode === 'tf') {
      body.innerHTML = this.head(g) + `<p style="font-size:1.05rem"><strong>${E(it.q.question)}</strong></p><p style="padding:1rem;background:#f1f5f9;border-radius:12px">Answer: ${E(it.shown)}</p>
        ${g.answered ? `<p>${g.last ? '✅ Correct!' : '❌ Wrong.'} The statement is <strong>${it.truth ? 'True' : 'False'}</strong>. Correct answer: ${E(it.q.correctText)}</p><p style="font-size:.85rem;color:#475569">${E(it.q.explanation)}</p><button class="btn btn-primary" onclick="GamesView.nextItem(false)">Next →</button>`
        : `<div style="display:flex;gap:.5rem"><button class="btn btn-primary" onclick="GamesView.tf(true)">True</button><button class="btn btn-secondary" onclick="GamesView.tf(false)">False</button></div>`}`;
    } else if (g.mode === 'type') {
      body.innerHTML = this.head(g) + `<p style="font-size:1.05rem"><strong>${E(it.question)}</strong></p>
        ${g.answered ? `<p>${g.last ? '✅ Good recall!' : '❌ Not quite.'} Answer: <strong>${E(it.correctText)}</strong></p><p style="font-size:.85rem;color:#475569">${E(it.explanation)}</p><button class="btn btn-primary" onclick="GamesView.nextItem(false)">Next →</button>`
        : `<input id="type-in" onkeydown="if(event.key==='Enter')GamesView.typeCheck()" placeholder="Your answer..." style="width:100%;padding:.75rem;border:1.5px solid var(--border);border-radius:var(--radius-md);margin:.5rem 0"><button class="btn btn-primary" onclick="GamesView.typeCheck()">Check</button> <button class="btn btn-ghost" onclick="GamesView.reveal()">Show answer</button>`}`;
    } else if (g.mode === 'fill') {
      body.innerHTML = this.head(g) + `<p style="font-size:1.05rem;line-height:1.7">${E(it.text)}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem">${it.opts.map(o => `<button class="btn ${g.answered ? (o === it.ans ? 'btn-primary' : 'btn-outline') : 'btn-outline'}" ${g.answered ? 'disabled' : ''} onclick="GamesView.fill('${E(o)}')">${E(o)}</button>`).join('')}</div>
        ${g.answered ? `<p>${g.last ? '✅ Correct!' : '❌ The answer was <strong>' + E(it.ans) + '</strong>'}</p><button class="btn btn-primary" onclick="GamesView.nextItem(false)">Next →</button>` : ''}`;
    }
  },
  tf(v) { const g = this.g, it = g.items[g.i]; g.last = v === it.truth; if (g.last) g.score++; g.answered = true; this.draw(); },
  fill(o) { const g = this.g, it = g.items[g.i]; g.last = o === it.ans; if (g.last) g.score++; g.answered = true; this.draw(); },
  reveal() { this.g.last = false; this.g.answered = true; this.draw(); },
  typeCheck() {
    const g = this.g, it = g.items[g.i], v = (document.getElementById('type-in').value || '').toLowerCase();
    const w = (it.correctText.toLowerCase().match(/[a-z0-9]{4,}/g) || []), hit = w.filter(x => v.includes(x)).length;
    g.last = w.length ? hit / w.length >= .5 : v.trim() === it.correctText.toLowerCase(); if (g.last) g.score++; g.answered = true; this.draw();
  },
  drawMatch(body) {
    const g = this.g, E = Ollama.esc;
    if (g.done.length === g.pairs.length) { g.score = Math.max(0, g.pairs.length - g.tries); g.items = g.pairs; return this.end(g.pairs.length); }
    body.innerHTML = `<p style="color:var(--text-muted);font-size:.85rem">Tap an item on the left, then tap its match on the right. Mistakes: ${g.tries}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
      <div>${g.pairs.map((p, i) => `<button class="btn ${g.done.includes(i) ? 'btn-primary' : g.sel === i ? 'btn-secondary' : 'btn-outline'}" style="width:100%;margin-bottom:.5rem;text-align:left;white-space:normal" data-l="${i}" ${g.done.includes(i) ? 'disabled' : ''} onclick="GamesView.pickL(${i})">${E(p.left)}</button>`).join('')}</div>
      <div>${g.right.map(r => { const used = g.done.includes(r.idx); return `<button class="btn ${used ? 'btn-primary' : 'btn-outline'}" style="width:100%;margin-bottom:.5rem;text-align:left;white-space:normal" data-r="${r.idx}" ${used ? 'disabled' : ''} onclick="GamesView.pickR(${r.idx})">${E(r.text)}</button>`; }).join('')}</div></div>`;
  },
  pickL(i) { this.g.sel = i; this.draw(); },
  pickR(idx) {
    const g = this.g; if (g.sel === null) { UI.showToast('Pick an item on the left first', 'info'); return; }
    if (g.sel === idx) { g.done.push(idx); UI.playSound('xp'); } else { g.tries++; UI.showToast('Not a match, try again', 'warning'); }
    g.sel = null; this.draw();
  }
};
