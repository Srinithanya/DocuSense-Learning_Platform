/**
 * DocuSense - Distraction-Free Study Mode View
 */

const StudyView = {
  render() {
    const container = document.getElementById('view-study');
    if (!container) return;

    const doc = appState.getActiveDocument();
    const study = (doc && doc.studyContent) ? doc.studyContent : null;

    if (!doc || !study) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📚</div>
          <h2 class="empty-state-title">No Study Notes Generated Yet</h2>
          <p class="empty-state-desc">
            Upload your PDF or notes first. DocuSense will automatically synthesize distraction-free study notes, key concept callouts, and exam facts from your material.
          </p>
          <button class="btn btn-primary btn-lg" onclick="appState.setView('upload')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            + Upload Study Material
          </button>
        </div>
      `;
      return;
    }

    const topics = doc && doc.topics ? doc.topics : [];

    container.innerHTML = `
      <div class="study-mode-container">
        <!-- Main Left Reading Interface -->
        <main class="study-reading-area">
          <header class="study-reading-header">
            <div class="study-topic-breadcrumb">
              <span>📚 ${doc ? doc.subject : 'Study Notes'}</span>
              <span>›</span>
              <span>${study.documentTitle}</span>
              <span>›</span>
              <span style="color: var(--primary); font-weight: 700;">${study.topicName}</span>
            </div>
            
            <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
              <div>
                <h1 class="study-topic-title">${study.topicName}</h1>
                <div style="display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); font-size: 0.85rem;">
                  <span>🏛️ ${study.subheading}</span>
                  <span>&bull;</span>
                  <span>⏱️ ${study.readTime}</span>
                </div>
              </div>

              <!-- Reading Tools Bar -->
              <div style="display: flex; gap: 0.5rem;">
                
                <button class="btn btn-outline btn-sm" onclick="StudyView.bookmarkTopic()" title="Bookmark">
                  <span>🔖</span> Save
                </button>
                <button class="btn btn-outline btn-sm" onclick="StudyView.simulateReadAloud()" title="Listen to AI Audio">
                  <span>🔊</span> Listen
                </button>
              </div>
            </div>
          </header>

          <!-- AI-Generated Simplified Notes Content -->
          <article class="study-content-body" id="study-reading-body">
            ${doc.generating ? '<div class="badge badge-primary" style="margin-bottom:1rem">⏳ AI is still writing the remaining topics - they will appear automatically</div>' : ''}
            ${study.sections.map((sec, si) => `
              <section id="study-sec-${si}" style="margin-bottom: 2rem;">
                <h2>${sec.title}</h2>
                <button class="btn btn-outline btn-sm" style="margin-bottom:.5rem" onclick="StudyView.practiceSection(${si})">📝 Practice this topic</button> <button class="btn btn-outline btn-sm" style="margin-bottom:.5rem" onclick="StudyView.bookmarkSection(${si})">🔖 Save</button>
                <div>${sec.content}</div>

                ${sec.conceptBox ? `
                  <div class="concept-box">
                    <div class="concept-box-title">
                      <span>💡</span> ${sec.conceptBox.title}
                    </div>
                    <p style="margin: 0; color: #334155; font-size: 0.92rem;">${sec.conceptBox.text}</p>
                  </div>
                ` : ''}

                ${sec.factsBanner ? `
                  <div class="facts-banner">
                    <div class="facts-banner-title">
                      <span>📌</span> ${sec.factsBanner.title}
                    </div>
                    <p style="margin: 0; color: #14532d; font-size: 0.92rem;">${sec.factsBanner.text}</p>
                  </div>
                ` : ''}

                ${sec.exampleBox ? `
                  <div class="example-box">
                    <div style="font-weight: 700; color: #b45309; margin-bottom: 0.35rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
                      <span>📝</span> ${sec.exampleBox.title}
                    </div>
                    <p style="margin: 0; color: #78350f; font-size: 0.92rem;">${sec.exampleBox.text}</p>
                  </div>
                ` : ''}
              </section>
            `).join('')}

            <!-- Bottom Action Banner -->
            <div style="margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #f0f7ff, #ffffff); border: 1.5px solid #bfdbfe; border-radius: var(--radius-xl); text-align: center;">
              <h3 style="font-size: 1.25rem; margin-bottom: 0.5rem;">Ready to test what you've learned?</h3>
              <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem; font-size: 0.9rem;">
                Cement these concepts with a quick gamified test. You will get immediate feedback and explanations after EVERY question.
              </p>
              <button class="btn btn-primary btn-lg" onclick="appState.startTest('${topics[0]?.id || ''}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Take Practice Test Now
              </button>
            </div>
          </article>
        </main>

        <!-- Right Side Sticky Study Progress Panel -->
        <aside class="study-sidebar-panel">
          <!-- Progress Card -->
          <div class="study-progress-card">
            <h3 style="font-size: 1rem; margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
              <span>Study Progress</span>
              <span class="badge badge-primary">${study.progress}%</span>
            </h3>

            <div class="progress-container" style="margin-bottom: 1.25rem;">
              <div class="progress-track">
                <div class="progress-fill" style="width: ${study.progress}%;"></div>
              </div>
            </div>

            <div class="study-stats-row">
              <div class="study-stat-cell">
                <strong>${topics.length}</strong>
                <span>Topics Identified</span>
              </div>
              <div class="study-stat-cell">
                <strong>${study.conceptsCount}</strong>
                <span>Key Concepts</span>
              </div>
            </div>

            <button class="btn btn-secondary btn-md" style="width: 100%;" onclick="appState.startTest('${topics[0]?.id || ''}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Take Practice Test
            </button>
            <button class="btn btn-outline btn-md" id="gen-more-btn" style="width:100%;margin-top:.5rem" onclick="StudyView.generateMore()">✨ Generate New Questions (AI)</button>
          </div>

          <!-- Quick Topic Navigator -->
          <div class="study-topics-nav-card">
            <div style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">
              Document Topics (${topics.length})
            </div>
            
            <div class="study-topics-nav-list">
              ${topics.map((t, idx) => `
                <div class="study-nav-item ${idx === 0 ? 'active' : ''}" onclick="StudyView.goToSection(${idx})">
                  <span>${idx + 1}. ${t.name}</span>
                  <span class="badge ${t.importance >= 5 ? 'badge-danger' : 'badge-primary'}">${t.importanceLabel.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </aside>
      </div>
    `;
  },

  goToSection(idx) {
    const el = document.getElementById('study-sec-' + idx);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.study-nav-item').forEach((n, i) => n.classList.toggle('active', i === idx));
  },

  practiceSection(idx) {
    const doc = appState.getActiveDocument();
    const t = doc && doc.topics[idx];
    if (t) appState.startTest(t.id);
  },

  bookmarkTopic() {
    const doc = appState.getActiveDocument(); if (!doc || !doc.studyContent) return;
    const html = doc.studyContent.sections.map(x => `<h3>${x.title}</h3>${x.content}`).join('');
    Bookmarks.add(doc, 'Full notes: ' + doc.subject, html);
  },

  bookmarkSection(i) {
    const doc = appState.getActiveDocument(); const sec = doc && doc.studyContent.sections[i]; if (!sec) return;
    const extra = [sec.conceptBox, sec.factsBanner, sec.exampleBox].filter(Boolean).map(b => `<p><strong>${b.title}:</strong> ${b.text}</p>`).join('');
    Bookmarks.add(doc, sec.title, sec.content + extra);
  },

  simulateReadAloud() {
    if (!('speechSynthesis' in window)) { UI.showToast('Speech is not supported in this browser', 'warning'); return; }
    if (speechSynthesis.speaking) { speechSynthesis.cancel(); UI.showToast('Stopped reading', 'info'); return; }
    const body = document.getElementById('study-reading-body');
    const u = new SpeechSynthesisUtterance(body ? body.innerText.slice(0, 4000) : '');
    speechSynthesis.speak(u);
    UI.showToast('Reading aloud... click Listen again to stop', 'info', '🔊');
  },

  async generateMore() {
    const doc = appState.getActiveDocument(); if (!doc) return;
    if (!(await Ollama.check())) { UI.showToast('Ollama is not running. Start it and try again.', 'warning'); return; }
    const btn = document.getElementById('gen-more-btn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Generating...'; }
    try {
      const n = await Ollama.moreQuestions(doc);
      appState.saveToStorage();
      UI.showToast(`Added ${n} new questions (bank: ${doc.questionsBank.length})`, 'success');
    } catch (e) { UI.showToast(e.message, 'warning'); }
    if (btn) { btn.disabled = false; btn.textContent = '✨ Generate New Questions (AI)'; }
  }
};
