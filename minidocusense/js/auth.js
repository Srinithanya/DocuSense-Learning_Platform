/** DocuSense - API client, login/signup screen, and sync with the backend database */
const Api = {
  get token() { return localStorage.getItem('ds_token'); },
  async req(method, path, body) {
    const r = await fetch('/api' + path, {
      method,
      headers: { 'Content-Type': 'application/json', ...(this.token ? { Authorization: 'Bearer ' + this.token } : {}) },
      body: body ? JSON.stringify(body) : undefined
    });
    let data = {}; try { data = await r.json(); } catch (e) {}
    if (r.status === 401 && this.token) { Auth.logout(); throw new Error('Session expired'); }
    if (!r.ok) throw new Error(data.detail || 'Request failed (' + r.status + ')');
    return data;
  },
  timer: null,
  queueSync() {
    if (!this.token) return;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.syncNow(), 800);
  },
  syncNow() {
    return this.req('PUT', '/state', { documents: appState.documents, history: appState.testHistory, user: appState.user })
      .catch(e => console.warn('Sync failed:', e.message));
  }
};

const Auth = {
  mode: 'login',

  async boot(startApp) {
    this.startApp = startApp;
    if (!Api.token) return this.showScreen();
    try { await this.pullAndStart(); }
    catch (e) {
      if (Api.token) { UI && console.warn(e); this.showScreen('Cannot reach the server. Is backend/main.py running?'); }
    }
  },

  // Load this user's data from the database into the app, then start it
  async pullAndStart() {
    const [me, state, bm] = await Promise.all([Api.req('GET', '/me'), Api.req('GET', '/state'), Api.req('GET', '/bookmarks')]);
    const hasServerData = (state.documents && state.documents.length) || state.history || state.user;
    if (hasServerData) {
      localStorage.setItem('docusense_documents', JSON.stringify(state.documents || []));
      if (state.history) localStorage.setItem('docusense_history', JSON.stringify(state.history));
      if (state.user) localStorage.setItem('docusense_user', JSON.stringify(state.user));
      appState.loadFromStorage();
    }
    if (bm.items && bm.items.length) localStorage.setItem(Bookmarks.KEY, JSON.stringify(bm.items));
    // after each save in the app, also save to the database
    if (!appState._synced) {
      const orig = appState.saveToStorage.bind(appState);
      appState.saveToStorage = () => { orig(); Api.queueSync(); };
      appState._synced = true;
    }
    if (appState.user) appState.user.name = me.name;
    this.hideScreen();
    this.startApp();
    const hn = document.getElementById('header-user-name'); if (hn) hn.textContent = me.name;
    this.addLogoutButton(me);
    if (!hasServerData) Api.syncNow();   // first login: store any existing local data in the database
  },

  addLogoutButton(me) {
    const f = document.querySelector('.sidebar-footer'); if (!f || document.getElementById('logout-btn')) return;
    const d = document.createElement('div');
    d.style.cssText = 'padding:.5rem 1rem;font-size:.8rem';
    d.innerHTML = `<div style="color:var(--text-muted);margin-bottom:.35rem">${Ollama.esc(me.email)}</div>
      <button id="logout-btn" class="btn btn-outline btn-sm" style="width:100%" onclick="Auth.logout()">Log out</button>`;
    f.prepend(d);
  },

  async logout() {
    try { await Api.syncNow(); } catch (e) {}
    ['ds_token', 'docusense_documents', 'docusense_history', 'docusense_user', Bookmarks.KEY].forEach(k => localStorage.removeItem(k));
    location.reload();
  },

  showScreen(msg) {
    let o = document.getElementById('auth-overlay');
    if (!o) { o = document.createElement('div'); o.id = 'auth-overlay'; document.body.appendChild(o); }
    o.style.cssText = 'position:fixed;inset:0;z-index:9999;background:linear-gradient(135deg,#eef2ff,#f8fafc);display:flex;align-items:center;justify-content:center;padding:1rem';
    const su = this.mode === 'signup';
    const inp = 'width:100%;padding:.75rem 1rem;border:1.5px solid #e2e8f0;border-radius:10px;font-size:.95rem;margin-bottom:.75rem;box-sizing:border-box';
    o.innerHTML = `<div style="background:#fff;border-radius:16px;padding:2rem;width:100%;max-width:400px;box-shadow:0 10px 40px rgba(0,0,0,.1)">
      <h1 style="margin:0 0 .25rem">📘 DocuSense</h1>
      <p style="color:#64748b;margin:0 0 1.25rem">${su ? 'Create your account' : 'Log in to your study space'}</p>
      ${su ? `<input id="au-name" placeholder="Your name" style="${inp}">` : ''}
      <input id="au-email" type="email" placeholder="Email" style="${inp}">
      <input id="au-pass" type="password" placeholder="Password (min 6 characters)" style="${inp}" onkeydown="if(event.key==='Enter')Auth.submit()">
      <div id="au-err" style="color:#ef4444;font-size:.85rem;min-height:1.2rem;margin-bottom:.5rem">${msg || ''}</div>
      <button id="au-btn" class="btn btn-primary btn-lg" style="width:100%" onclick="Auth.submit()">${su ? 'Sign up' : 'Log in'}</button>
      <p style="text-align:center;margin:1rem 0 0;font-size:.9rem">${su ? 'Already have an account?' : 'New here?'}
        <a href="#" onclick="Auth.mode='${su ? 'login' : 'signup'}';Auth.showScreen();return false" style="color:var(--primary);font-weight:600">${su ? 'Log in' : 'Create account'}</a></p></div>`;
  },
  hideScreen() { const o = document.getElementById('auth-overlay'); if (o) o.remove(); },

  async submit() {
    const g = id => (document.getElementById(id) || {}).value || '';
    const err = document.getElementById('au-err'), btn = document.getElementById('au-btn');
    err.textContent = ''; btn.disabled = true;
    try {
      const body = { email: g('au-email'), password: g('au-pass') };
      if (this.mode === 'signup') body.name = g('au-name');
      const r = await Api.req('POST', this.mode === 'signup' ? '/signup' : '/login', body);
      localStorage.setItem('ds_token', r.token);
      await this.pullAndStart();
    } catch (e) { err.textContent = e.message === 'Failed to fetch' ? 'Cannot reach the server. Is backend/main.py running?' : e.message; btn.disabled = false; }
  }
};
