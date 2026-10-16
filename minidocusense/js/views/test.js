/**
 * DocuSense - Gamified Challenge Test Interface
 * NOTE: Answers and explanations are NOT shown during the test.
 * They are revealed only after the full test is completed and the results page loads.
 */

const TestView = {
  render() {
    const container = document.getElementById('view-test');
    if (!container) return;

    const session = appState.testSession;
    if (!session || !session.questions || session.questions.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📝</div>
          <h2 class="empty-state-title">No Test Ready Yet</h2>
          <p class="empty-state-desc">Upload your study material or PDF first. DocuSense will extract questions and conduct your challenge test.</p>
          <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            + Upload Study Material
          </button>
        </div>
      `;
      return;
    }

    const currentQ = session.questions[session.currentIndex];
    const qNumber = session.currentIndex + 1;
    const totalQ = session.questions.length;
    const progressPct = Math.round(((session.currentIndex) / totalQ) * 100);
    const isAnswered = session.isCurrentAnswered;
    const userAnswer = session.userAnswers[session.currentIndex];

    container.innerHTML = `
      <div class="test-view-container">
        <!-- Question Card -->
        <div class="question-card">
          <span class="question-topic-tag">${currentQ.topic || session.topicName} &bull; Single Choice</span>
          <h2 class="question-text">${currentQ.question}</h2>

          <!-- Selectable Answer Options Grid -->
          <div class="options-grid" id="test-options-grid">
            ${currentQ.options.map(opt => {
              let stateClass = '';
              // After answering: highlight selected option only (no correct/wrong reveal)
              if (isAnswered && userAnswer) {
                if (userAnswer.selectedOption === opt.label) {
                  stateClass = 'selected-pending locked';
                } else {
                  stateClass = 'locked';
                }
              }

              return `
                <div class="option-card ${stateClass}"
                     data-option="${opt.label}"
                     onclick="TestView.handleOptionClick('${opt.label}')">
                  <div class="option-letter">${opt.label}</div>
                  <div class="option-text">${opt.text}</div>
                  ${isAnswered && userAnswer && userAnswer.selectedOption === opt.label
                    ? '<span class="option-selected-mark">✔ Selected</span>'
                    : ''}
                </div>
              `;
            }).join('')}
          </div>

          <!-- After answering: show brief acknowledgement + Next button (NO explanation) -->
          ${isAnswered ? `
            <div class="test-answered-bar">
              <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem; color: var(--text-secondary);">
                <span style="font-size: 1.2rem;">📝</span>
                <span>Answer recorded. <strong>Explanations will be revealed after you complete the full test.</strong></span>
              </div>
              <button class="btn btn-primary btn-md" id="next-q-btn" onclick="TestView.handleNextQuestion()">
                ${session.currentIndex < session.questions.length - 1 ? 'Next Question →' : 'Finish Test & See Results 🎉'}
              </button>
            </div>
          ` : `
            <div style="margin-top: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.8125rem; padding: 0.75rem; background: var(--bg-muted); border-radius: var(--radius-md);">
              💡 Select your answer above to proceed. All explanations will be shown after the test ends.
            </div>
          `}
        </div>

        <!-- Questions answered mini-map -->
        <div class="question-minimap">
          ${session.questions.map((q, idx) => {
            const ans = session.userAnswers[idx];
            let dotClass = 'dot-unanswered';
            if (idx === session.currentIndex) dotClass = 'dot-current';
            else if (ans) dotClass = 'dot-answered';
            return `<div class="q-dot ${dotClass}" title="Q${idx + 1}">${idx + 1}</div>`;
          }).join('')}
        </div>
      </div>
    `;
  },

  handleOptionClick(optionLabel) {
    const session = appState.testSession;
    if (session.isCurrentAnswered) return;

    const result = appState.recordAnswer(optionLabel);
    if (!result) return;

    // Play a neutral "recorded" sound — no correct/wrong feedback during test
    UI.playSound('click');
    this.render();
  },

  handleNextQuestion() {
    appState.nextQuestion();
    if (appState.currentView === 'test') {
      this.render();
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  }
};
