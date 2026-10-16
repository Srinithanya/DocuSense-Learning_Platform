/**
 * DocuSense - Test History View Component
 * Dynamically displays recorded tests from the user's uploaded materials.
 */

const HistoryView = {
  render() {
    const container = document.getElementById('view-history');
    if (!container) return;

    const history = appState.testHistory;

    container.innerHTML = `
      <div>
        <div class="view-section-header">
          <div>
            <h1 style="font-size: 1.6rem; margin-bottom: 0.25rem;">Test History</h1>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">
              Review your previous tests, track your accuracy over time, and revisit detailed explanations.
            </p>
          </div>
          ${history.length > 0 ? `
            <button class="btn btn-primary btn-md" onclick="appState.startTest()">
              + Take New Test
            </button>
          ` : `
            <button class="btn btn-primary btn-md" onclick="appState.setView('upload')">
              + Upload Study Material
            </button>
          `}
        </div>

        ${history.length > 0 ? `
          <!-- Filter tabs -->
          <div class="tabs-container">
            <button class="tab-btn active">All Tests (${history.length})</button>
            <button class="tab-btn" onclick="UI.showToast('Filtering by Passed tests', 'info')">Passed</button>
            <button class="tab-btn" onclick="UI.showToast('Filtering by Needs Review', 'info')">Needs Review</button>
          </div>

          <!-- History Table -->
          <div class="history-table-container">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Topic & Challenge</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Time</th>
                  <th>XP</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${history.map(item => `
                  <tr>
                    <td>
                      <strong>${item.subject}</strong>
                    </td>
                    <td>
                      <span>${item.topic}</span>
                    </td>
                    <td>
                      <strong style="color: var(--primary);">${item.score}</strong>
                    </td>
                    <td>
                      <strong>${item.accuracy}</strong>
                    </td>
                    <td>
                      <span>${item.timeTaken}</span>
                    </td>
                    <td>
                      <span class="badge badge-success">${item.xpEarned}</span>
                    </td>
                    <td>
                      <span>${item.date}</span>
                    </td>
                    <td>
                      <span class="badge ${item.statusType === 'success' ? 'badge-success' : 'badge-warning'}">
                        ${item.status}
                      </span>
                    </td>
                    <td>
                      <button class="btn btn-outline btn-sm" onclick="appState.setView('results')">
                        View Report
                      </button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <h2 class="empty-state-title">No Test Records Found</h2>
            <p class="empty-state-desc">
              You haven't completed any tests yet. Upload your PDF or study notes to generate practice questions and take your first challenge.
            </p>
            <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              + Upload Study Material
            </button>
          </div>
        `}
      </div>
    `;
  }
};
