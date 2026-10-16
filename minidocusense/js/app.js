/**
 * DocuSense - Main Application Controller & Router
 */

const App = {
  views: {
    dashboard: DashboardView,
    upload: UploadView,
    analysis: AnalysisView,
    study: StudyView,
    test: TestView,
    results: ResultsView,
    history: HistoryView,
    progress: ProgressView,
    documents: DocumentsView,
    profile: ProfileView,
    agent: AgentView,
    games: GamesView,
    bookmarks: Bookmarks
  },

  init() {
    this.bindGlobalEvents();
    this.bindKeyboardShortcuts();
    this.setupStateSubscriptions();

    // Initial render
    this.renderCurrentView();
  },

  setupStateSubscriptions() {
    appState.subscribe((event, payload) => {
      if (event === 'viewChanged') {
        this.renderCurrentView();
      } else if (event === 'testStarted') {
        TestView.render();
      } else if (event === 'userUpdated' || event === 'dataCleared' || event === 'documentsUpdated') {
        this.updateHeaderUserInfo();
        this.renderCurrentView();
      }
    });
  },

  renderCurrentView() {
    const currentView = appState.currentView;

    // Update sidebar doc count badge
    const docCountEl = document.getElementById('sidebar-doc-count');
    if (docCountEl) {
      docCountEl.textContent = appState.documents.length;
    }

    // Toggle active view container
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.remove('active');
    });

    const activeContainer = document.getElementById(`view-${currentView}`);
    if (activeContainer) {
      activeContainer.classList.add('active');
    }

    // Call view-specific render
    const viewComponent = this.views[currentView];
    if (viewComponent && typeof viewComponent.render === 'function') {
      viewComponent.render();
    }

    // Update navigation states
    UI.updateActiveNavigation(currentView);

    // Close mobile drawer if open
    UI.toggleMobileNav(true);
  },

  updateHeaderUserInfo() {
    const nameEl = document.getElementById('header-user-name');
    const roleEl = document.getElementById('header-user-role');
    const avatarEl = document.getElementById('header-user-avatar');

    if (nameEl) nameEl.textContent = appState.user.name;
    if (roleEl) roleEl.textContent = appState.user.targetExam;
    if (avatarEl) avatarEl.textContent = appState.user.avatar;
  },

  bindGlobalEvents() {
    // Navigation click delegation
    document.addEventListener('click', (e) => {
      const navTarget = e.target.closest('[data-nav-view]');
      if (navTarget) {
        e.preventDefault();
        const view = navTarget.getAttribute('data-nav-view');
        appState.setView(view);
      }

      // Modal close delegation
      const modalClose = e.target.closest('[data-modal-close]');
      if (modalClose) {
        const modalId = modalClose.getAttribute('data-modal-close');
        UI.closeModal(modalId);
      }

      // Modal overlay click outside to close
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Global Search Bar Handler
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.trim();
          if (query) {
            UI.showToast(`Searching for "${query}" across topics...`, 'info');
            appState.setView('documents');
            setTimeout(() => {
              if (DocumentsView) {
                DocumentsView.searchQuery = query;
                DocumentsView.render();
              }
            }, 100);
          }
        }
      });
    }
  },

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K for search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        return;
      }

      // Escape to close modals
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
        UI.toggleMobileNav(true);
      }

      // Test Mode Shortcuts: 1-4 or A-D to select answer, Enter/Space for Next
      if (appState.currentView === 'test' && appState.testSession.isActive) {
        const key = e.key.toUpperCase();
        if (['1', 'A'].includes(key)) {
          TestView.handleOptionClick('A');
        } else if (['2', 'B'].includes(key)) {
          TestView.handleOptionClick('B');
        } else if (['3', 'C'].includes(key)) {
          TestView.handleOptionClick('C');
        } else if (['4', 'D'].includes(key)) {
          TestView.handleOptionClick('D');
        } else if (['ENTER', ' '].includes(key) && appState.testSession.isCurrentAnswered) {
          e.preventDefault();
          TestView.handleNextQuestion();
        }
      }
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Auth.boot(() => App.init());
});
