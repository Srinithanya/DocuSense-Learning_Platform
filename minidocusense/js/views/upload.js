/**
 * DocuSense - Upload & AI Document Processing View
 * Handles real PDF file parsing, text extraction, note pasting,
 * and live 5-step AI synthesis pipeline. Zero pre-loaded sample documents.
 */

const UploadView = {
  processingInterval: null,
  activeTab: 'file', // 'file' or 'paste'

  render() {
    const container = document.getElementById('view-upload');
    if (!container) return;

    setTimeout(() => this.refreshOllama(), 0);
    container.innerHTML = `
      <div class="upload-container">
        <!-- Header -->
        <div class="upload-header-box">
          <h1 class="upload-title">Upload Your Study Material</h1>
          <p class="upload-subtitle">Upload your own PDF, notes, or textbook chapters to generate summaries, key topics, and gamified practice tests.</p>
        </div>

        <div style="max-width:720px;margin:0 auto 1.25rem;padding:.75rem 1rem;background:var(--bg-muted);border:1px solid var(--border);border-radius:var(--radius-md);font-size:.85rem">
          🤖 <strong>Local AI (Ollama):</strong> <span id="ollama-status">Checking...</span>
        </div>

        <!-- Mode Tabs: Upload PDF vs Paste Notes -->
        <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
          <button class="btn ${this.activeTab === 'file' ? 'btn-primary' : 'btn-outline'}" onclick="UploadView.switchTab('file')">
            📄 Upload PDF / Document
          </button>
          <button class="btn ${this.activeTab === 'paste' ? 'btn-primary' : 'btn-outline'}" onclick="UploadView.switchTab('paste')">
            ✍️ Paste Study Notes / Text
          </button>
        </div>

        <!-- Initial Upload Dropzone Card -->
        <div id="upload-initial-card">
          ${this.activeTab === 'file' ? `
            <div class="upload-dropzone" id="main-dropzone" onclick="document.getElementById('hidden-file-input').click()">
              <input type="file" id="hidden-file-input" style="display: none;" accept=".pdf,.docx,.txt,.md" onchange="UploadView.handleFileSelect(event)">
              
              <div class="dropzone-icon">📄</div>
              <div class="dropzone-prompt">Drag & Drop your PDF here</div>
              <div class="dropzone-sub">Upload any textbook chapter, study guide, or exam notes</div>
              
              <button class="btn btn-primary btn-lg" onclick="event.stopPropagation(); document.getElementById('hidden-file-input').click()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Browse PDF from Computer
              </button>

              <div class="supported-formats-pills">
                <span class="format-pill">PDF Documents</span>
                <span class="format-pill">DOCX Notes</span>
                <span class="format-pill">TXT / Markdown</span>
              </div>
            </div>
          ` : `
            <div class="card" style="padding: 2rem; background: white; border: 1.5px solid var(--border);">
              <h3 style="font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--text-primary);">Paste Your Study Notes or Syllabus Excerpt</h3>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                DocuSense will parse your text, extract high-yield topics, generate study notes, and build verified MCQ tests.
              </p>
              
              <input type="text" id="paste-title-input" placeholder="Subject / Topic Title (e.g. Constitutional Law - Fundamental Rights)" 
                     style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); font-size: 0.95rem; margin-bottom: 1rem;">
              
              <textarea id="paste-text-input" rows="10" placeholder="Paste your study notes, textbook paragraphs, lecture transcripts, or articles here..." 
                        style="width: 100%; padding: 1rem; border: 1.5px solid var(--border); border-radius: var(--radius-md); font-size: 0.95rem; line-height: 1.6; resize: vertical; margin-bottom: 1.25rem;"></textarea>
              
              <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
                <button class="btn btn-primary btn-lg" onclick="UploadView.handlePasteSubmit()">
                  ✨ Process Notes & Generate Test
                </button>
              </div>
            </div>
          `}

          <!-- Quick Tip Banner -->
          <div style="margin-top: 1.5rem; padding: 1rem 1.25rem; background: var(--bg-muted); border-radius: var(--radius-md); border: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; font-size: 0.8125rem; color: var(--text-secondary);">
            <span>💡 <strong>Tip:</strong> Uploading your material automatically extracts key topics, creates structured notes, and generates a custom test with instant answer explanations.</span>
            ${appState.documents.length > 0 ? `
              <button class="btn btn-ghost btn-sm" onclick="UploadView.handleClearAllData()" style="color: #ef4444; font-size: 0.75rem; white-space: nowrap;">
                🗑️ Clear All Uploaded Data
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Processing State Card (Live 5-step animation during analysis) -->
        <div id="upload-processing-card" class="processing-card">
          <div class="processing-doc-banner">
            <div style="font-size: 1.85rem;">📄</div>
            <div style="flex: 1;">
              <h3 id="proc-file-name" style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.15rem;">Analyzing Study Material...</h3>
              <div id="proc-file-meta" style="font-size: 0.8125rem; color: var(--text-muted);">AI Pipeline: Extracting text & generating questions</div>
            </div>
            <div class="badge badge-primary">Processing Document...</div>
          </div>

          <!-- Overall Progress Bar -->
          <div class="progress-container" style="margin-bottom: 2rem;">
            <div class="progress-header">
              <span id="proc-progress-label">Analysis in progress</span>
              <span id="proc-progress-percent" style="color: var(--primary);">20%</span>
            </div>
            <div class="progress-track lg">
              <div id="proc-progress-fill" class="progress-fill gradient" style="width: 20%;"></div>
            </div>
          </div>

          <!-- 5 Clear Processing Steps as Specified -->
          <h4 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 1.25rem;">
            DocuSense AI Processing Pipeline
          </h4>

          <div class="processing-steps-list">
            <!-- Step 1 -->
            <div class="step-item active" id="step-item-1">
              <div class="step-indicator" id="step-indicator-1">1</div>
              <div class="step-content">
                <strong>1. Reading document & extracting text</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Parsing pages, character encodings, and raw document text stream.</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="step-item" id="step-item-2">
              <div class="step-indicator" id="step-indicator-2">2</div>
              <div class="step-content">
                <strong>2. Understanding content & key concepts</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Synthesizing conceptual definitions, rules, and core relationships.</p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="step-item" id="step-item-3">
              <div class="step-indicator" id="step-indicator-3">3</div>
              <div class="step-content">
                <strong>3. Identifying important topics</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Ranking high-yield topics by importance ratings and examination weight.</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="step-item" id="step-item-4">
              <div class="step-indicator" id="step-indicator-4">4</div>
              <div class="step-content">
                <strong>4. Creating study material & notes</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Formatting simplified notes, bullet points, key concepts, and exam facts.</p>
              </div>
            </div>

            <!-- Step 5 -->
            <div class="step-item" id="step-item-5">
              <div class="step-indicator" id="step-indicator-5">5</div>
              <div class="step-content">
                <strong>5. Preparing practice questions & verified explanations</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0;">Synthesizing multiple-choice questions with answer keys and rationale.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (this.activeTab === 'file') {
      this.bindDropzoneEvents();
    }
  },

  switchTab(tab) {
    this.activeTab = tab;
    this.render();
  },

  bindDropzoneEvents() {
    const dropzone = document.getElementById('main-dropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0) {
        this.processRealFile(files[0]);
      }
    });
  },

  handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
      this.processRealFile(file);
    }
  },

  // Shared: run AI (Ollama) on text, fall back to offline analyzer only if Ollama is off
  async buildAndOpen(name, size, rawText) {
    const setStatus = (pct, msg) => {
      const m = document.getElementById('proc-file-meta'); if (m) m.textContent = msg;
      const f = document.getElementById('proc-progress-fill'); if (f) f.style.width = pct + '%';
      const p = document.getElementById('proc-progress-percent'); if (p) p.textContent = Math.round(pct) + '%';
      const l = document.getElementById('proc-progress-label'); if (l) l.textContent = 'AI is analysing your material...';
    };
    let doc;
    if (await Ollama.check()) {
      doc = await Ollama.buildDocument(name, size, rawText, setStatus);
    } else {
      UI.showToast('Ollama not running - using basic offline analysis', 'warning');
      doc = AIAnalyzer.analyzeDocument(name, size, rawText);
    }
    appState.documents.unshift(doc);
    appState.activeDocId = doc.id;
    appState.user.documentsCount = appState.documents.length;
    appState.saveToStorage();
    this.runStepPipeline(doc.id);
  },

  failUI(err) {
    console.error(err);
    UI.showToast(err.message || 'Processing failed', 'warning');
    const c = document.getElementById('upload-processing-card'); if (c) c.classList.remove('active');
    const i = document.getElementById('upload-initial-card'); if (i) i.style.display = '';
  },

  async processRealFile(file) {
    const size = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    this.showProcessingUI(file.name, size);
    try {
      const rawText = await AIAnalyzer.extractTextFromFile(file);
      await this.buildAndOpen(file.name, size, rawText);
    } catch (err) { this.failUI(err); }
  },

  async handlePasteSubmit() {
    const title = (document.getElementById('paste-title-input')?.value.trim()) || 'Pasted Study Notes.txt';
    const text = (document.getElementById('paste-text-input')?.value.trim()) || '';
    if (text.length < 30) { UI.showToast('Please paste at least a paragraph of study notes.', 'warning'); return; }
    const size = `${(text.length / 1024).toFixed(1)} KB`;
    this.showProcessingUI(title, size);
    try { await this.buildAndOpen(title, size, text); } catch (err) { this.failUI(err); }
  },

  // Ollama settings card
  async refreshOllama() {
    const el = document.getElementById('ollama-status'); if (!el) return;
    el.textContent = 'Checking...';
    const ok = await Ollama.check();
    el.innerHTML = ok
      ? `<span style="color:#10b981">● Connected</span> &nbsp; Model: <select id="ollama-model" onchange="Ollama.cfg.model=this.value;Ollama.save()" style="padding:.25rem;border-radius:6px">${Ollama.models.map(m => `<option ${m === Ollama.cfg.model ? 'selected' : ''}>${m}</option>`).join('')}</select>`
      : `<span style="color:#ef4444">● Not connected</span> - start Ollama and run <code>ollama pull llama3.2</code>. If still failing, set OLLAMA_ORIGINS=* and restart Ollama. <button class="btn btn-outline btn-sm" onclick="UploadView.refreshOllama()">Retry</button>`;
  },

  handleClearAllData() {
    if (confirm("Reset all uploaded data and start fresh?")) {
      appState.clearAllData();
      UI.showToast("All data cleared. Ready for your PDF!", "info");
      this.render();
    }
  },

  showProcessingUI(fileName, fileSize) {
    const initialCard = document.getElementById('upload-initial-card');
    const procCard = document.getElementById('upload-processing-card');
    if (initialCard) initialCard.style.display = 'none';
    if (procCard) procCard.classList.add('active');

    const nameEl = document.getElementById('proc-file-name');
    const metaEl = document.getElementById('proc-file-meta');
    if (nameEl) nameEl.textContent = fileName;
    if (metaEl) metaEl.textContent = `Size: ${fileSize} • AI Pipeline Active`;

    UI.showToast(`Processing ${fileName}...`, 'info');
  },

  runStepPipeline(targetDocId) {
    let currentStep = 1;
    const totalSteps = 5;

    if (this.processingInterval) clearInterval(this.processingInterval);

    this.processingInterval = setInterval(() => {
      if (currentStep <= totalSteps) {
        const prevItem = document.getElementById(`step-item-${currentStep}`);
        const prevInd = document.getElementById(`step-indicator-${currentStep}`);
        if (prevItem && prevInd) {
          prevItem.classList.remove('active');
          prevItem.classList.add('completed');
          prevInd.innerHTML = '✓';
        }
      }

      currentStep++;

      if (currentStep <= totalSteps) {
        const nextItem = document.getElementById(`step-item-${currentStep}`);
        const nextInd = document.getElementById(`step-indicator-${currentStep}`);
        if (nextItem && nextInd) {
          nextItem.classList.add('active');
          nextInd.innerHTML = `<span class="spinner-icon">◌</span>`;
        }

        const pct = Math.round((currentStep / totalSteps) * 100);
        const fill = document.getElementById('proc-progress-fill');
        const pctEl = document.getElementById('proc-progress-percent');
        if (fill) fill.style.width = `${pct}%`;
        if (pctEl) pctEl.textContent = `${pct}%`;
      } else {
        clearInterval(this.processingInterval);
        const fill = document.getElementById('proc-progress-fill');
        const pctEl = document.getElementById('proc-progress-percent');
        const lblEl = document.getElementById('proc-progress-label');
        if (fill) fill.style.width = `100%`;
        if (pctEl) pctEl.textContent = `100%`;
        if (lblEl) lblEl.textContent = `Analysis Complete! Opening Document Overview...`;

        UI.playSound('xp');
        UI.showToast('Document analyzed! Notes & test ready (+20 XP)', 'xp');

        setTimeout(() => {
          appState.setView('analysis', { docId: targetDocId });
        }, 600);
      }
    }, 650);
  }
};
