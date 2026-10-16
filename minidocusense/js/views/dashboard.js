/**
 * DocuSense - Dashboard View Component
 * Clean starting state with zero pre-loaded files.
 * Dynamically displays the user's uploaded materials and topics once uploaded.
 */

const DashboardView = {
  render() {
    const container = document.getElementById('view-dashboard');
    if (!container) return;

    const user = appState.user;
    const docs = appState.documents;
    const activeDoc = appState.getActiveDocument();
    const topics = activeDoc && activeDoc.topics ? activeDoc.topics : [];

    container.innerHTML = `
      <!-- Welcome Hero Banner -->
      <div class="dashboard-hero">
        <div class="hero-left-content">
          <div class="hero-welcome-badge">
            <span>🎯</span> Target Exam: <strong>${user.targetExam}</strong>
          </div>
          <h1 class="hero-title">Good Morning, Learner 👋</h1>
          <p class="hero-subtitle">
            ${docs.length > 0 
              ? 'Continue learning and prepare for your exams with AI summaries and gamified practice.' 
              : 'Upload your notes or PDF to generate summaries, identify important topics, and take adaptive tests.'}
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload Study Material
            </button>
            ${docs.length > 0 ? `
              <button class="btn btn-outline btn-lg" onclick="appState.setView('study', { docId: '${activeDoc?.id || ''}', topicId: '${topics[0]?.id || ''}' })">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                Continue Studying
              </button>
            ` : `
              <button class="btn btn-outline btn-lg" onclick="appState.setView('profile')">
                <span>🎯</span> Set Learning Goal
              </button>
            `}
            <div class="hero-badge-tag">
              <span>⚡</span> Level ${user.level}: ${user.levelTitle}
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Statistics Grid (Clean 4 Cards) -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Documents</span>
            <div class="stat-icon blue">📄</div>
          </div>
          <div class="stat-value">${docs.length}</div>
          <div class="stat-subtext">
            <span>${docs.length > 0 ? 'Uploaded materials' : 'No materials yet'}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Tests Completed</span>
            <div class="stat-icon indigo">📝</div>
          </div>
          <div class="stat-value">${user.testsCompleted}</div>
          <div class="stat-subtext">
            <span>${user.testsCompleted > 0 ? 'Completed challenges' : 'Ready for first test'}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Average Score</span>
            <div class="stat-icon green">🎯</div>
          </div>
          <div class="stat-value">${user.testsCompleted > 0 ? `${user.averageScore}%` : '--'}</div>
          <div class="stat-subtext">
            <span>${user.testsCompleted > 0 ? 'Benchmark mastery' : 'Awaiting diagnostic test'}</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Study Streak</span>
            <div class="stat-icon amber">🔥</div>
          </div>
          <div class="stat-value">${user.streakDays} <span style="font-size: 1rem; color: #f59e0b;">days</span></div>
          <div class="stat-subtext">
            <span>${user.streakDays > 0 ? 'Consistent learner' : 'Start streak today'}</span>
          </div>
        </div>
      </div>

      <!-- Continue Learning Section -->
      <div class="view-section-header">
        <div class="section-title-wrap">
          <h2 class="section-title">Continue Learning</h2>
          <span class="section-subtitle">Pick up right where you left off from your uploaded materials</span>
        </div>
        ${docs.length > 0 ? `
          <button class="btn btn-ghost btn-sm" onclick="appState.setView('documents')">
            View All Documents →
          </button>
        ` : ''}
      </div>

      ${docs.length > 0 ? `
        <div class="study-materials-grid">
          ${docs.map(doc => `
            <div class="study-doc-card" onclick="appState.setView('analysis', { docId: '${doc.id}' })">
              <div class="doc-card-top">
                <div class="doc-badge-icon">📄</div>
                <span class="badge ${doc.progress >= 70 ? 'badge-success' : 'badge-primary'}">
                  ${doc.category}
                </span>
              </div>
              <h3 class="doc-card-title">${doc.subject}</h3>
              <div class="doc-card-topics">${doc.topicsIdentified} Topics &bull; ${doc.progress || 0}% Completed</div>
              
              <div class="doc-card-progress">
                <div class="progress-container">
                  <div class="progress-header">
                    <span>Progress</span>
                    <span>${doc.progress || 0}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill ${doc.progress >= 70 ? 'success' : ''}" style="width: ${doc.progress || 0}%"></div>
                  </div>
                </div>
              </div>

              <div class="doc-card-footer">
                <span style="font-size: 0.78rem; color: var(--text-muted);">${doc.pages} pages</span>
                <span class="doc-btn-continue">Continue →</span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="empty-state" style="margin-bottom: 2.5rem; padding: 2.75rem 1.5rem;">
          <div class="empty-state-icon">📄</div>
          <h3 class="empty-state-title">No Study Materials Yet</h3>
          <p class="empty-state-desc">
            Upload your first PDF, study notes, or textbook chapter. DocuSense will extract an executive summary, identify important topics, and generate interactive tests.
          </p>
          <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            + Upload Your First PDF
          </button>
        </div>
      `}

      <!-- Recommended Topics Section (Derived from active document) -->
      ${topics.length > 0 ? `
        <div class="view-section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Recommended Topics</h2>
            <span class="section-subtitle">Based on ${activeDoc.title} diagnostic weighting</span>
          </div>
          <span class="badge badge-accent">Adaptive Engine</span>
        </div>

        <div class="recommended-topics-grid">
          ${topics.slice(0, 3).map((topic, idx) => `
            <div class="topic-rec-card ${idx === 1 ? 'weak-topic-card' : ''}">
              <div class="topic-rec-header">
                <div>
                  <h3 class="topic-name">${topic.name}</h3>
                  <div class="topic-doc-ref">${activeDoc.subject} &bull; Unit ${idx + 1}</div>
                </div>
                <span class="badge ${idx === 0 ? 'badge-success' : idx === 1 ? 'badge-warning' : 'badge-primary'}">
                  ${idx === 0 ? 'Core Topic' : idx === 1 ? 'Needs Practice ⚠️' : 'Recommended'}
                </span>
              </div>

              <div class="topic-metrics-row">
                <div class="topic-metric-item">
                  <span class="metric-label">Importance</span>
                  <span class="metric-val star-rating">${'★'.repeat(topic.importance)}${'☆'.repeat(5 - topic.importance)}</span>
                </div>
                <div class="topic-metric-item">
                  <span class="metric-label">Mastery</span>
                  <span class="metric-val" style="color: ${idx === 0 ? 'var(--success)' : idx === 1 ? '#d97706' : 'var(--primary)'};">
                    ${topic.mastery || 60}%
                  </span>
                </div>
                <div class="topic-metric-item">
                  <span class="metric-label">Questions</span>
                  <span class="metric-val">10 Qs</span>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; margin-top: auto;">
                <button class="btn ${idx === 1 ? 'btn-secondary' : 'btn-primary'} btn-sm" style="flex: 1;" 
                        onclick="appState.activeDocId = '${activeDoc.id}'; appState.startTest('${topic.id}', ${idx === 1}, '${topic.name}')">
                  ${idx === 1 ? '⚡ Practice Weak Area' : 'Challenge Test'}
                </button>
                <button class="btn btn-outline btn-sm" onclick="appState.setView('study', { docId: '${activeDoc.id}', topicId: '${topic.id}' })">
                  Notes
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    `;
  }
};
