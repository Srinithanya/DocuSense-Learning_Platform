/**
 * DocuSense - UI Manager, Audio Synthesizer, Modals, and Toasts
 */

const UI = {
  // Audio Synthesizer via Web Audio API (Zero external assets needed!)
  audioCtx: null,

  initAudio() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
  },

  playSound(type) {
    if (!appState.soundEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const ctx = this.audioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'correct') {
        // High, cheerful ascending chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'incorrect') {
        // Soft low double-blip
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(210, now + 0.18);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'xp') {
        // Sparkle / coin chime
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'click') {
        // Neutral soft click — used when an answer is recorded during test (no reveal)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      // Audio playback non-blocking fallback
    }
  },

  // Toast System
  showToast(message, type = 'info', iconHtml = '') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let defaultIcon = '💡';
    if (type === 'success') defaultIcon = '✅';
    if (type === 'xp') defaultIcon = '⚡';
    if (type === 'warning') defaultIcon = '⚠️';

    toast.innerHTML = `
      <div class="toast-icon">${iconHtml || defaultIcon}</div>
      <div class="toast-text">${message}</div>
    `;

    container.appendChild(toast);

    if (type === 'xp') {
      this.playSound('xp');
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  },

  // Modal Controls
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // Mobile navigation drawer controls
  toggleMobileNav(forceClose = false) {
    const sidebar = document.getElementById('app-sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (!sidebar || !backdrop) return;

    if (forceClose || sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
    } else {
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('active');
    }
  },

  // Highlight active nav item across desktop & mobile
  updateActiveNavigation(viewName) {
    document.querySelectorAll('[data-nav-view]').forEach(el => {
      const targetView = el.getAttribute('data-nav-view');
      if (targetView === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }
};
