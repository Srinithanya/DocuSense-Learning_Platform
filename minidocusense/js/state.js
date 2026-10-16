/**
 * DocuSense - Central Application State Management
 * Clean initial state with ZERO sample files. All documents, study content,
 * topics, questions, and test reports are generated exclusively when the user uploads their PDF.
 */

class AppState {
  constructor() {
    this.currentView = 'dashboard';
    this.previousView = null;
    this.activeDocId = null;
    this.activeTopicId = null;
    
    // User progress state
    this.user = { ...DOCUSENSE_DATA.user };
    this.documents = [];
    this.testHistory = [];
    this.achievements = [...DOCUSENSE_DATA.achievements];
    this.targetExams = [...DOCUSENSE_DATA.targetExams];

    // Current Test / Challenge Session State
    this.testSession = {
      isActive: false,
      isAdaptive: false,
      topicName: "",
      documentName: "",
      questions: [],
      currentIndex: 0,
      userAnswers: {},
      isCurrentAnswered: false,
      score: 0,
      correctCount: 0,
      incorrectCount: 0,
      startTime: null,
      endTime: null,
      timeTakenFormatted: "00:00",
      xpEarned: 0
    };

    // Upload simulation state
    this.uploadState = {
      isProcessing: false,
      currentStep: 0,
      fileName: "",
      fileSize: ""
    };

    // Preferences
    this.soundEnabled = true;
    this.searchQuery = "";
    this.documentsFilter = "all";

    this.subscribers = [];

    // Load persisted documents & history from localStorage
    this.loadFromStorage();
  }

  // Persist user uploaded documents and test results in browser
  saveToStorage() {
    try {
      localStorage.setItem('docusense_documents', JSON.stringify(this.documents));
      localStorage.setItem('docusense_history', JSON.stringify(this.testHistory));
      localStorage.setItem('docusense_user', JSON.stringify(this.user));
    } catch (e) {
      // Storage unavailable or quota exceeded non-blocking fallback
    }
  }

  loadFromStorage() {
    try {
      const storedDocs = localStorage.getItem('docusense_documents');
      const storedHist = localStorage.getItem('docusense_history');
      const storedUser = localStorage.getItem('docusense_user');

      if (storedDocs) {
        const parsed = JSON.parse(storedDocs);
        // Exclude any legacy sample documents to guarantee zero pre-loaded files
        this.documents = parsed.filter(d => 
          !['doc-polity', 'doc-dsa', 'doc-os', 'doc-cn', 'doc-aptitude'].includes(d.id)
        );
        if (this.documents.length > 0) {
          this.activeDocId = this.documents[0].id;
        } else {
          this.activeDocId = null;
        }
      }
      if (storedHist) {
        const parsedHist = JSON.parse(storedHist);
        this.testHistory = parsedHist.filter(h => 
          !['th-1', 'th-2', 'th-3', 'th-4', 'th-5'].includes(h.id)
        );
      }
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
      this.user.documentsCount = this.documents.length;
    } catch (e) {
      console.warn("Storage load fallback:", e);
    }
  }

  // Clear all data to return to a completely clean slate
  clearAllData() {
    this.documents = [];
    this.testHistory = [];
    this.activeDocId = null;
    this.activeTopicId = null;
    this.user.documentsCount = 0;
    this.user.testsCompleted = 0;
    this.user.averageScore = 0;
    this.user.streakDays = 0;
    this.user.xp = 0;
    this.user.level = 1;
    this.saveToStorage();
    this.notify('dataCleared', null);
    this.setView('upload');
  }

  // Subscribe to state changes
  subscribe(fn) {
    this.subscribers.push(fn);
  }

  notify(event, payload) {
    this.subscribers.forEach(fn => fn(event, payload));
  }

  // Switch Main View
  setView(viewName, params = {}) {
    if (this.currentView === viewName && !params.force) return;
    this.previousView = this.currentView;
    this.currentView = viewName;

    if (params.docId) {
      this.activeDocId = params.docId;
    }
    if (params.topicId) {
      this.activeTopicId = params.topicId;
    }

    this.notify('viewChanged', { view: viewName, params });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Get active document (returns null if no documents uploaded yet)
  getActiveDocument() {
    if (this.documents.length === 0) return null;
    if (this.activeDocId) {
      const found = this.documents.find(d => d.id === this.activeDocId);
      if (found) return found;
    }
    return this.documents[0];
  }

  // Start test on uploaded material
  startTest(topicId = null, isAdaptive = false, customTopicName = null) {
    const doc = this.getActiveDocument();

    // Guard: require uploaded document
    if (!doc || !doc.questionsBank || doc.questionsBank.length === 0) {
      UI.showToast("Please upload a PDF first to generate questions and take a test.", "warning");
      this.setView('upload');
      return;
    }

    let questions = [];
    if (isAdaptive && customTopicName) {
      const matched = doc.questionsBank.filter(q => 
        q.topic && (q.topic.toLowerCase().includes(customTopicName.toLowerCase()) || customTopicName.toLowerCase().includes(q.topic.toLowerCase()))
      );
      questions = matched.length >= 3 ? Ollama.shuffle(matched).slice(0, 5) : Ollama.shuffle(doc.questionsBank).slice(0, 5);
    } else if (isAdaptive && topicId) {
      const matched = doc.questionsBank.filter(q => 
        q.topic && (q.topic.toLowerCase().includes(topicId.toLowerCase()) || topicId.toLowerCase().includes(q.topic.toLowerCase()))
      );
      questions = matched.length >= 3 ? Ollama.shuffle(matched).slice(0, 5) : Ollama.shuffle(doc.questionsBank).slice(0, 5);
    } else {
      questions = Ollama.shuffle(doc.questionsBank).slice(0, 10);
    }

    if (!isAdaptive && topicId && doc.topics) {
      const tp = doc.topics.find(t => t.id === topicId);
      if (tp) { const m = doc.questionsBank.filter(q => q.topic === tp.name); if (m.length >= 3) questions = Ollama.shuffle(m).slice(0, 10); }
    }
    let topicName = customTopicName;
    if (!topicName) {
      if (topicId && doc.topics) {
        const matched = doc.topics.find(t => t.id === topicId || t.name.toLowerCase().includes(topicId.toLowerCase()));
        if (matched) topicName = matched.name;
      }
      if (!topicName) {
        topicName = isAdaptive ? "Targeted Adaptive Review" : (doc.topics[0]?.name || doc.subject);
      }
    }

    this.testSession = {
      isActive: true,
      isAdaptive: isAdaptive,
      topicName: topicName,
      documentName: doc.title,
      questions: questions,
      currentIndex: 0,
      userAnswers: {},
      isCurrentAnswered: false,
      score: 0,
      correctCount: 0,
      incorrectCount: 0,
      startTime: Date.now(),
      endTime: null,
      timeTakenFormatted: "00:00",
      xpEarned: 0
    };

    this.setView('test');
    this.notify('testStarted', this.testSession);
  }

  // Record answer for current question
  recordAnswer(selectedOptionLabel) {
    const session = this.testSession;
    if (session.isCurrentAnswered) return null;

    const currentQ = session.questions[session.currentIndex];
    const isCorrect = (selectedOptionLabel === currentQ.correctAnswer);

    session.isCurrentAnswered = true;
    session.userAnswers[session.currentIndex] = {
      questionId: currentQ.id,
      selectedOption: selectedOptionLabel,
      isCorrect: isCorrect,
      correctAnswer: currentQ.correctAnswer,
      correctText: currentQ.correctText,
      explanation: currentQ.explanation,
      whyMatters: currentQ.whyMatters
    };

    if (isCorrect) {
      session.correctCount++;
      session.score += Math.round(100 / session.questions.length);
      session.xpEarned += 10;
      this.user.xp += 10;
    } else {
      session.incorrectCount++;
    }

    this.notify('answerRecorded', {
      questionIndex: session.currentIndex,
      isCorrect: isCorrect,
      selectedOption: selectedOptionLabel,
      currentQ: currentQ
    });

    return session.userAnswers[session.currentIndex];
  }

  // Proceed to next question or complete test
  nextQuestion() {
    const session = this.testSession;
    if (session.currentIndex < session.questions.length - 1) {
      session.currentIndex++;
      session.isCurrentAnswered = false;
      this.notify('questionChanged', { index: session.currentIndex });
    } else {
      this.completeTest();
    }
  }

  // Finalize test and generate results
  completeTest() {
    const session = this.testSession;
    session.isActive = false;
    session.endTime = Date.now();

    const elapsedSeconds = Math.max(1, Math.round((session.endTime - session.startTime) / 1000));
    const mins = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (elapsedSeconds % 60).toString().padStart(2, '0');
    session.timeTakenFormatted = `${mins}:${secs}`;

    // XP streak calculation
    const streakBonus = 15;
    session.xpEarned += streakBonus;
    this.user.xp += streakBonus;
    this.user.testsCompleted++;
    if (this.user.streakDays === 0) {
      this.user.streakDays = 1;
    }

    // Calculate accuracy
    const accuracy = Math.round((session.correctCount / session.questions.length) * 100);
    this.user.averageScore = this.user.testsCompleted > 1 
      ? Math.round((this.user.averageScore * (this.user.testsCompleted - 1) + accuracy) / this.user.testsCompleted)
      : accuracy;

    // Check level progression
    if (this.user.xp >= this.user.xpNextLevel) {
      this.user.level++;
      this.user.xpNextLevel += 500;
      this.user.levelTitle = "Active Scholar";
    }

    // Save to test history
    const historyItem = {
      id: `th-${Date.now()}`,
      subject: session.documentName.replace(/\.[^/.]+$/, ""),
      topic: session.topicName,
      score: `${session.score} / 100`,
      scoreNum: session.score,
      accuracy: `${accuracy}%`,
      date: "Just now",
      status: accuracy >= 70 ? "Passed" : "Needs Review",
      statusType: accuracy >= 70 ? "success" : "warning",
      timeTaken: session.timeTakenFormatted,
      xpEarned: `+${session.xpEarned} XP`
    };
    this.testHistory.unshift(historyItem);

    // Update active document progress
    const activeDoc = this.getActiveDocument();
    if (activeDoc) {
      activeDoc.progress = Math.min(100, Math.max(activeDoc.progress || 0, accuracy));
    }

    this.saveToStorage();
    this.setView('results');
    this.notify('testCompleted', session);
  }

  // Target exam update
  setTargetExam(examName) {
    this.user.targetExam = examName;
    this.saveToStorage();
    this.notify('userUpdated', this.user);
  }
}

// Global App State Instance
const appState = new AppState();
