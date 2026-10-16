/**
 * DocuSense - My Documents Library View Component
 */

const DocumentsView = {
  currentFilter: 'all',
  searchQuery: '',

  render() {
    const container = document.getElementById('view-documents');
    if (!container) return;

    let filteredDocs = appState.documents.filter(doc => {
      // Search matching
      const matchesSearch = doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            doc.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            doc.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Filter tab matching
      if (this.currentFilter === 'in-progress') return doc.progress > 0 && doc.progress < 100;
      if (this.currentFilter === 'completed') return doc.progress >= 70;
      if (this.currentFilter === 'recent') return doc.uploadDate.includes('Oct');
      return true;
    });

    container.innerHTML = `
      <div>
        <!-- View Header -->
        <div class="view-section-header">
          <div>
            <h1 style="font-size: 1.6rem; margin-bottom: 0.25rem;">My Study Documents</h1>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">
              Your repository of uploaded notes, study guides, and textbooks transformed into AI learning units.
            </p>
          </div>
          <button class="btn btn-primary btn-md" onclick="appState.setView('upload')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            + Upload Study Material
          </button>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="docs-toolbar">
          <div class="docs-search-filter">
            <div class="header-search" style="max-width: 320px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search by document or subject..." 
                     value="${this.searchQuery}" 
                     oninput="DocumentsView.handleSearch(event)">
            </div>

            <div class="filter-pills">
              <button class="pill-btn ${this.currentFilter === 'all' ? 'active' : ''}" onclick="DocumentsView.setFilter('all')">
                All (${appState.documents.length})
              </button>
              <button class="pill-btn ${this.currentFilter === 'recent' ? 'active' : ''}" onclick="DocumentsView.setFilter('recent')">
                Recently Added
              </button>
              <button class="pill-btn ${this.currentFilter === 'in-progress' ? 'active' : ''}" onclick="DocumentsView.setFilter('in-progress')">
                In Progress
              </button>
              <button class="pill-btn ${this.currentFilter === 'completed' ? 'active' : ''}" onclick="DocumentsView.setFilter('completed')">
                Completed
              </button>
            </div>
          </div>

          <!-- Clear Uploaded Data Control -->
          ${appState.documents.length > 0 ? `
            <button class="btn btn-ghost btn-sm" onclick="DocumentsView.clearSampleData()" style="color: #ef4444; font-size: 0.8rem;">
              🗑️ Clear All Documents
            </button>
          ` : ''}
        </div>

        <!-- Documents Grid -->
        ${filteredDocs.length > 0 ? `
          <div class="docs-grid-library">
            ${filteredDocs.map(doc => `
              <div class="library-doc-card">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 0.75rem;">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <div style="font-size: 1.6rem;">📄</div>
                    <div>
                      <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">${doc.title}</h3>
                      <span style="font-size: 0.78rem; color: var(--text-muted);">${doc.subject} &bull; ${doc.category}</span>
                    </div>
                  </div>
                  <span class="badge ${doc.progress >= 70 ? 'badge-success' : 'badge-primary'}">
                    ${doc.progress}% Done
                  </span>
                </div>

                <div style="display: flex; gap: 1rem; font-size: 0.8125rem; color: var(--text-secondary); margin: 0.75rem 0;">
                  <span>📑 <strong>${doc.pages}</strong> pages</span>
                  <span>⭐ <strong>${doc.topicsIdentified}</strong> topics</span>
                  <span>🕒 ${doc.uploadDate}</span>
                </div>

                <div class="progress-container" style="margin-top: auto; margin-bottom: 0.5rem;">
                  <div class="progress-track">
                    <div class="progress-fill ${doc.progress >= 70 ? 'success' : ''}" style="width: ${doc.progress}%;"></div>
                  </div>
                </div>

                <!-- Specified Card Actions: Open, Study, Practice, Delete -->
                <div class="library-card-actions">
                  <button class="btn btn-outline btn-sm" style="flex: 1;" onclick="appState.setView('analysis', { docId: '${doc.id}' })">
                    Open
                  </button>
                  <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="appState.setView('study', { docId: '${doc.id}', topicId: '${doc.topics[0]?.id || ''}' })">
                    Study
                  </button>
                  <button class="btn btn-secondary btn-sm" style="flex: 1;" onclick="appState.activeDocId = '${doc.id}'; appState.startTest('${doc.topics[0]?.id || ''}')">
                    Practice
                  </button>
                  <button class="btn btn-ghost btn-sm btn-icon-only" title="Delete Document" onclick="DocumentsView.deleteDoc('${doc.id}')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <!-- Section 24 Empty State Requirement -->
          <div class="empty-state">
            <div class="empty-state-icon">📄</div>
            <h2 class="empty-state-title">No study materials yet</h2>
            <p class="empty-state-desc">
              Upload your first PDF and turn it into an interactive learning experience with summaries and gamified tests.
            </p>
            <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
              + Upload Study Material
            </button>
          </div>
        `}
      </div>
    `;
  },

  handleSearch(e) {
    this.searchQuery = e.target.value;
    this.render();
  },

  setFilter(filterName) {
    this.currentFilter = filterName;
    this.render();
  },

  toggleEmptyDemo() {
    if (this.currentFilter === 'nonexistent') {
      this.currentFilter = 'all';
    } else {
      this.currentFilter = 'nonexistent';
    }
    this.render();
  },

  deleteDoc(docId) {
    if (confirm("Are you sure you want to delete this study document?")) {
      appState.documents = appState.documents.filter(d => d.id !== docId);
      appState.user.documentsCount = appState.documents.length;
      UI.showToast("Document removed from library", "warning");
      this.render();
    }
  },

  clearSampleData() {
    if (confirm("Clear all default sample documents so your library only contains your uploaded study material?")) {
      appState.clearSampleData();
      UI.showToast("Sample data cleared. Ready for your PDF!", "info");
      this.render();
    }
  }
};
