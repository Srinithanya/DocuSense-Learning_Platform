/** DocuSense - AI Doubt Agent (chat with your material via Ollama) */
const AgentView = {
  history: [], busy: false,
  render() {
    const el = document.getElementById('view-agent'); if (!el) return;
    const doc = appState.getActiveDocument();
    el.innerHTML = `<div class="upload-container" style="max-width:820px">
      <div class="upload-header-box"><h1 class="upload-title">🤖 AI Doubt Agent</h1>
      <p class="upload-subtitle">${doc ? 'Ask anything about <strong>' + Ollama.esc(doc.subject) + '</strong>' : 'Upload material first for answers based on your notes - or ask general questions.'}</p></div>
      <div id="agent-box" style="background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg);padding:1rem;height:55vh;overflow-y:auto">
        ${this.history.length ? this.history.map(m => this.bubble(m.role, m.content)).join('') : '<div style="color:var(--text-muted);text-align:center;margin-top:2rem">Try: "Explain this topic simply" or "Give me an example of ..."</div>'}
      </div>
      <div style="display:flex;gap:.5rem;margin-top:.75rem">
        <input id="agent-input" placeholder="Type your doubt and press Enter..." onkeydown="if(event.key==='Enter')AgentView.send()"
          style="flex:1;padding:.75rem 1rem;border:1.5px solid var(--border);border-radius:var(--radius-md);font-size:.95rem">
        <button class="btn btn-primary" onclick="AgentView.send()">Send</button>
        <button class="btn btn-outline" onclick="AgentView.history=[];AgentView.render()">Clear</button>
      </div></div>`;
    const b = document.getElementById('agent-box'); if (b) b.scrollTop = b.scrollHeight;
  },
  fmt(t) { return Ollama.esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>'); },
  bubble(role, text) {
    const me = role === 'user';
    return `<div style="display:flex;justify-content:${me ? 'flex-end' : 'flex-start'};margin-bottom:.6rem"><div style="max-width:80%;padding:.6rem .9rem;border-radius:14px;line-height:1.6;background:${me ? 'var(--primary)' : '#f1f5f9'};color:${me ? '#fff' : '#0f172a'}">${this.fmt(text)}</div></div>`;
  },
  async send() {
    if (this.busy) return;
    const inp = document.getElementById('agent-input'); const q = inp.value.trim(); if (!q) return;
    if (!(await Ollama.check())) { UI.showToast('Ollama is not running. Start it and try again.', 'warning'); return; }
    this.busy = true; inp.value = '';
    this.history.push({ role: 'user', content: q }); this.history.push({ role: 'assistant', content: '...' });
    this.render();
    const doc = appState.getActiveDocument();
    let ctx = '';
    if (doc) ctx = `STUDENT'S MATERIAL (summary): ${doc.summary}\n\nRELEVANT EXCERPTS:\n${Ollama.relevant(doc.rawText || '', { name: q }, 3000)}`;
    const sys = 'You are a patient, friendly tutor helping a student clear doubts. Use the student\'s material when it is relevant and say when the answer is not in it. Explain simply with short examples. Keep answers concise.\n\n' + ctx;
    const msgs = [{ role: 'system', content: sys }, ...this.history.slice(0, -1).slice(-8)];
    try {
      await Ollama.chat(msgs, full => {
        this.history[this.history.length - 1].content = full;
        const b = document.getElementById('agent-box'); if (!b) return;
        b.lastElementChild.outerHTML = this.bubble('assistant', full); b.scrollTop = b.scrollHeight;
      });
    } catch (e) { this.history[this.history.length - 1].content = 'Error: ' + e.message; this.render(); }
    this.busy = false;
  }
};
