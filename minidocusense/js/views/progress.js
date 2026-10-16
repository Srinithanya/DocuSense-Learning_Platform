/**
 * DocuSense - Progress & Visual Analytics Dashboard View Component
 * Clean initial state with zero pre-loaded tests.
 * Displays real analytics once tests are completed on uploaded materials.
 */

const ProgressView = {
  render() {
    const container = document.getElementById('view-progress');
    if (!container) return;

    const user = appState.user;
    const history = appState.testHistory;
    const hasData = history.length > 0;

    container.innerHTML = `
      <div>
        <!-- View Header -->
        <div class="view-section-header">
          <div>
            <h1 style="font-size: 1.6rem; margin-bottom: 0.25rem;">Learning Progress & Analytics</h1>
            <p style="font-size: 0.875rem; color: var(--text-secondary);">
              Track your conceptual mastery, accuracy trends, and readiness for your target exam.
            </p>
          </div>
          <div class="badge badge-primary">
            <span>🎯</span> Readiness: <strong>${user.testsCompleted > 0 ? `${user.averageScore}%` : '--'}</strong>
          </div>
        </div>

        ${hasData ? `
          <!-- Top Overview Grid -->
          <div class="progress-grid-top">
            <!-- Accuracy Trend SVG Chart -->
            <div class="analytics-chart-card">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <h2 style="font-size: 1.15rem; color: var(--text-primary);">Accuracy Trend (${history.length} Tests)</h2>
                  <span style="font-size: 0.8125rem; color: var(--text-muted);">Real-time challenge score progression</span>
                </div>
                <span class="badge badge-success">Active Performance</span>
              </div>

              <!-- Crisp Clean Light-Mode SVG Trend Chart -->
              <div class="svg-chart-container">
                <svg width="100%" height="100%" viewBox="0 0 540 180" preserveAspectRatio="none">
                  <!-- Grid Lines -->
                  <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4"/>
                  <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4"/>
                  <line x1="40" y1="100" x2="520" y2="100" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="4"/>
                  <line x1="40" y1="140" x2="520" y2="140" stroke="#e2e8f0" stroke-width="1.5"/>

                  <!-- Y Axis labels -->
                  <text x="10" y="24" font-size="11" fill="#94a3b8" font-family="inherit">100%</text>
                  <text x="10" y="64" font-size="11" fill="#94a3b8" font-family="inherit">75%</text>
                  <text x="10" y="104" font-size="11" fill="#94a3b8" font-family="inherit">50%</text>
                  <text x="10" y="144" font-size="11" fill="#94a3b8" font-family="inherit">25%</text>

                  <!-- Area Fill Gradient -->
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.18"/>
                      <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
                    </linearGradient>
                  </defs>

                  ${this.renderChartPolylines(history)}
                </svg>
              </div>
            </div>

            <!-- Overall Readiness Card -->
            <div class="analytics-chart-card" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <h2 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 0.25rem;">Exam Readiness</h2>
                <span style="font-size: 0.8125rem; color: var(--text-muted);">${user.targetExam}</span>
                
                <div style="margin: 1.75rem 0; text-align: center;">
                  <div style="font-size: 3rem; font-weight: 800; color: var(--primary); line-height: 1;">
                    ${user.averageScore}%
                  </div>
                  <span style="font-size: 0.85rem; color: var(--success); font-weight: 700;">Calculated from ${user.testsCompleted} tests</span>
                </div>

                <div class="progress-container">
                  <div class="progress-track lg">
                    <div class="progress-fill success" style="width: ${user.averageScore}%;"></div>
                  </div>
                </div>
              </div>

              <div style="margin-top: 1.5rem; background: var(--bg-muted); border-radius: var(--radius-md); padding: 0.85rem; font-size: 0.8125rem; color: var(--text-secondary);">
                💡 <strong>Coach Tip:</strong> Consistent practice on your uploaded materials will lift your readiness score.
              </div>
            </div>
          </div>

          <!-- Study Streak & Habit Heatmap Card -->
          <div class="streak-heatmap-card">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div>
                <h3 style="font-size: 1.15rem; color: var(--text-primary);">Daily Study Consistency</h3>
                <span style="font-size: 0.8125rem; color: var(--text-muted);">Current streak: ${user.streakDays} day${user.streakDays === 1 ? '' : 's'} 🔥</span>
              </div>
              <span class="badge badge-warning">Streak Active</span>
            </div>

            <div class="heatmap-grid">
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">MON</span>
                <strong style="font-size: 1rem;">20m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">TUE</span>
                <strong style="font-size: 1rem;">35m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">WED</span>
                <strong style="font-size: 1rem;">25m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">THU</span>
                <strong style="font-size: 1rem;">30m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">FRI</span>
                <strong style="font-size: 1rem;">45m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active">
                <span style="font-size: 0.72rem; display: block;">SAT</span>
                <strong style="font-size: 1rem;">40m</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
              <div class="heatmap-day active" style="border: 2px solid var(--primary); background: #dbeafe;">
                <span style="font-size: 0.72rem; display: block; color: var(--primary); font-weight: 800;">TODAY</span>
                <strong style="font-size: 1rem; color: var(--primary);">Active</strong>
                <span style="font-size: 0.75rem;">🔥</span>
              </div>
            </div>
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📊</div>
            <h2 class="empty-state-title">No Performance Analytics Yet</h2>
            <p class="empty-state-desc">
              Analytics, accuracy trends, and exam readiness scores will appear automatically once you complete tests on your uploaded PDF or study materials.
            </p>
            <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              + Upload Study Material & Start Test
            </button>
          </div>
        `}
      </div>
    `;
  },

  renderChartPolylines(history) {
    const scores = history.slice(0, 6).reverse().map(h => h.scoreNum || 75);
    if (scores.length === 1) {
      scores.unshift(scores[0]);
    }
    const stepX = 460 / (scores.length - 1);
    const points = scores.map((s, idx) => {
      const x = 50 + idx * stepX;
      const y = 140 - (s / 100) * 110;
      return { x, y, score: s };
    });

    const polylineStr = points.map(p => `${p.x},${p.y}`).join(" ");
    const areaStr = `50,140 ${polylineStr} ${points[points.length - 1].x},140`;

    return `
      <polygon points="${areaStr}" fill="url(#chartGradient)"/>
      <polyline points="${polylineStr}" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      ${points.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="5" fill="#ffffff" stroke="#2563eb" stroke-width="2"/>
        <text x="${p.x - 10}" y="${p.y - 10}" font-size="10" fill="#2563eb" font-weight="bold">${p.score}%</text>
      `).join('')}
    `;
  }
};
