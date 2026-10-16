/** DocuSense - Bookmarks (saved study notes) */
const Bookmarks = {
  KEY: 'docusense_bookmarks',
  all() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch (e) { return []; } },
  put(list) { localStorage.setItem(this.KEY, JSON.stringify(list)); if (Api.token) Api.req('PUT', '/bookmarks', { items: list }).catch(e => console.warn('Bookmark sync failed', e.message)); },
  add(doc, title, html) {
    const list = this.all();
    if (list.some(b => b.docId === doc.id && b.title === title)) { UI.showToast('Already in Bookmarks', 'info'); return; }
    list.unshift({ id: 'bm-' + Date.now(), docId: doc.id, docTitle: doc.subject, title, html, savedAt: new Date().toLocaleDateString() });
    this.put(list); UI.playSound('xp');
    UI.showToast('Saved to Bookmarks', 'success', '🔖');
    const c = document.getElementById('sidebar-bm-count'); if (c) c.textContent = list.length;
  },
  remove(id) { this.put(this.all().filter(b => b.id !== id)); this.render(); },
  render() {
    const el = document.getElementById('view-bookmarks'); if (!el) return;
    const list = this.all();
    const c = document.getElementById('sidebar-bm-count'); if (c) c.textContent = list.length;
    el.innerHTML = `<div class="upload-container">
      <div class="upload-header-box"><h1 class="upload-title">🔖 Bookmarks</h1>
      <p class="upload-subtitle">Notes you saved from Study Mode.</p></div>
      ${list.length === 0 ? `<div class="empty-state"><div class="empty-state-icon">🔖</div><h2 class="empty-state-title">No bookmarks yet</h2>
        <p class="empty-state-desc">Open Study Mode and press Save on a topic to keep it here.</p>
        <button class="btn btn-primary" onclick="appState.setView('study')">Go to Study Mode</button></div>` :
      list.map(b => `<div class="card" style="padding:1.25rem;margin-bottom:1rem;background:#fff;border:1px solid var(--border);border-radius:var(--radius-lg)">
        <div style="display:flex;justify-content:space-between;gap:1rem;align-items:flex-start">
          <div><strong>${b.title}</strong><div style="font-size:.78rem;color:var(--text-muted)">${b.docTitle} • saved ${b.savedAt}</div></div>
          <button class="btn btn-ghost btn-sm" style="color:#ef4444" onclick="Bookmarks.remove('${b.id}')">🗑️ Remove</button>
        </div>
        <details style="margin-top:.75rem"><summary style="cursor:pointer;color:var(--primary);font-weight:600">Read notes</summary>
        <div style="margin-top:.75rem;line-height:1.7">${b.html}</div></details></div>`).join('')}
    </div>`;
  }
};
