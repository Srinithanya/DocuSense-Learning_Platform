/**
 * DocuSense - Document Analysis & Topic Breakdown View
 */

const AnalysisView = {
  render() {
    const container = document.getElementById('view-analysis');
    if (!container) return;

    const doc = appState.getActiveDocument();
    if (!doc) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📄</div>
          <h2 class="empty-state-title">No Document Analyzed Yet</h2>
          <p class="empty-state-desc">
            Upload your PDF or notes to generate an executive AI study summary, identify important topics, and prepare practice tests.
          </p>
          <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            + Upload Study Material
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <!-- Document Header Card -->
      <div class="analysis-header-card">
        <div class="analysis-doc-info">
          <div class="analysis-doc-icon">
            ${doc.subject.includes('Polity') ? '⚖️' : '📄'}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.25rem;">
              <span class="badge badge-primary">Study Material</span>
              <span class="badge badge-accent">AI Analyzed</span>
            </div>
            <h1 style="font-size: 1.6rem; margin-bottom: 0.25rem;">${doc.title}</h1>
            <div class="analysis-meta-tags">
              <span class="analysis-meta-tag">📄 <strong>${doc.pages}</strong> Pages</span>
              <span class="analysis-meta-tag">📑 <strong>${doc.topicsIdentified}</strong> Topics Identified</span>
              <span class="analysis-meta-tag">⭐ <strong>${doc.importantTopicsCount}</strong> High-Yield Topics</span>
              <span class="analysis-meta-tag">🕒 Uploaded ${doc.uploadDate}</span>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-primary btn-lg" onclick="appState.setView('study', { docId: '${doc.id}', topicId: '${doc.topics[0]?.id || 'fundamental-rights'}' })">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            Start Learning
          </button>
          <button class="btn btn-secondary btn-lg" onclick="appState.startTest('${doc.topics[0]?.id || 'fundamental-rights'}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Take Practice Test
          </button>
        </div>
      </div>

      <!-- Analysis Grid: AI Study Summary + Important Topics Breakdown -->
      <div class="analysis-grid">
        <!-- Left: AI Study Summary -->
        <div class="ai-summary-card">
          <div class="ai-summary-badge">
            <span>✨</span> AI Executive Study Summary
          </div>
          <h2 style="font-size: 1.3rem; margin-bottom: 0.85rem;">Document Overview & High-Yield Analysis</h2>
          <p class="summary-text-block">${doc.summary}</p>

          <h3 style="font-size: 1.05rem; margin-bottom: 0.75rem;">Core Concepts & Exam Takeaways</h3>
          <div class="summary-highlights">
            ${doc.keyTakeaways.map(takeaway => `
              <div class="summary-highlight-item">
                <span class="highlight-bullet">✦</span>
                <span>${takeaway}</span>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 1.75rem; padding: 1.25rem; background: var(--bg-muted); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <strong style="color: var(--text-primary); font-size: 0.95rem; display: block;">Ready to study in detail?</strong>
              <span style="color: var(--text-muted); font-size: 0.8125rem;">Simplified notes, bullet points, and key terms are formatted for deep retention.</span>
            </div>
            <button class="btn btn-primary btn-sm" onclick="appState.setView('study', { docId: '${doc.id}', topicId: '${doc.topics[0]?.id || ''}' })">
              Open Notes →
            </button>
          </div>
        </div>

        <!-- Right: Identified Important Topics with Badges -->
        <div class="topics-identified-card">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.15rem;">Important Topics</h3>
            <span class="badge badge-accent">${doc.topics.length} Key Areas</span>
          </div>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">
            Ranked by syllabus weighting and past examination recurrence.
          </p>

          <div class="topics-list">
            ${doc.topics.map(topic => `
              <div class="topic-list-row" onclick="appState.setView('study', { docId: '${doc.id}', topicId: '${topic.id}' })">
                <div class="topic-row-left">
                  <span class="topic-importance-dot ${topic.importance >= 5 ? 'high' : topic.importance >= 4 ? 'medium' : 'normal'}"></span>
                  <div>
                    <strong style="font-size: 0.92rem; color: var(--text-primary); display: block;">${topic.name}</strong>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${topic.questionsCount} practice questions available</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 0.6rem;">
                  <span class="badge ${topic.importance >= 5 ? 'badge-danger' : topic.importance >= 4 ? 'badge-warning' : 'badge-primary'}">
                    ${topic.importanceLabel}
                  </span>
                  <span style="font-size: 0.85rem; font-weight: 700; color: var(--primary);">→</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Quick Test Callout -->
          <div style="margin-top: 1.5rem; text-align: center; padding: 1.25rem; border: 1.5px dashed var(--border); border-radius: var(--radius-lg); background: var(--bg-card-subtle);">
            <div style="font-size: 1.5rem; margin-bottom: 0.35rem;">🏆</div>
            <strong style="display: block; font-size: 0.95rem; margin-bottom: 0.25rem;">Challenge Yourself</strong>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">10 gamified questions with explanations after EVERY question.</p>
            <button class="btn btn-secondary btn-md" style="width: 100%;" onclick="appState.startTest('${doc.topics[0]?.id || ''}')">
              Start 10-Question Test
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
