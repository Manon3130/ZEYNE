const STORAGE_KEY = 'ZEYNE_STATE_V1';
const BADGE_DEFINITIONS = [
  { id: 'bronze', label: 'Bronze', threshold: 3, icon: '🥉' },
  { id: 'silver', label: 'Argent', threshold: 7, icon: '🥈' },
  { id: 'gold', label: 'Or', threshold: 14, icon: '🥇' },
  { id: 'platinum', label: 'Platine', threshold: 30, icon: '🏆' }
];

const getBadgeDefinitionById = (id) => BADGE_DEFINITIONS.find(def => def.id === id) || null;

const getBadgeForStreak = (streakValue) => {
  const normalized = Number(streakValue) || 0;
  let badge = null;
  BADGE_DEFINITIONS.forEach(def => {
    if (normalized >= def.threshold) {
      badge = def;
    }
  });
  return badge;
};

const resolveBadgeData = () => {
  const fallback = { label: 'Bonne lancée', icon: '✨' };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return fallback;
    }
    const state = JSON.parse(stored);
    const unlocked = Array.isArray(state?.badges?.unlocked) ? state.badges.unlocked : [];
    if (unlocked.length) {
      const last = unlocked[unlocked.length - 1];
      const definition = getBadgeDefinitionById(last?.id);
      if (definition) {
        return definition;
      }
    }
    const streakValue = state?.streak?.current ?? state?.streak?.best;
    const streakBadge = getBadgeForStreak(streakValue);
    return streakBadge || fallback;
  } catch (error) {
    console.warn('Impossible de lire les badges', error);
    return fallback;
  }
};

const renderBadge = () => {
  const badgeElement = document.getElementById('today-badge');
  if (!badgeElement) {
    return;
  }
  const badge = resolveBadgeData();
  badgeElement.innerHTML = `
    <span class="today-badge-icon" aria-hidden="true">${badge.icon}</span>
    <span class="today-badge-label">${badge.label}</span>
  `;
};

const initFloatingMenu = () => {
  const bubble = document.querySelector('.floating-menu');
  const panel = document.querySelector('.today-menu-panel');
  const backdrop = document.querySelector('.today-menu-backdrop');
  if (!bubble || !panel || !backdrop) {
    return;
  }

  let isOpen = false;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let moved = false;
  let skipNextClick = false;
  const floatingMargin = 12;

  const clampValue = (value, max) => Math.min(Math.max(value, floatingMargin), max);

  const closeMenu = () => {
    if (!isOpen) {
      return;
    }
    isOpen = false;
    panel.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    window.setTimeout(() => {
      if (!isOpen) {
        panel.setAttribute('hidden', '');
        backdrop.setAttribute('hidden', '');
      }
    }, 200);
    bubble.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    if (isOpen) {
      return;
    }
    isOpen = true;
    panel.removeAttribute('hidden');
    backdrop.removeAttribute('hidden');
    requestAnimationFrame(() => {
      panel.classList.add('is-open');
      backdrop.classList.add('is-open');
    });
    bubble.setAttribute('aria-expanded', 'true');
  };

  bubble.addEventListener('pointerdown', (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }
    isDragging = true;
    moved = false;
    const rect = bubble.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
    try {
      bubble.setPointerCapture(event.pointerId);
    } catch (_) {
      // ignore pointer capture errors
    }
  });

  bubble.addEventListener('pointermove', (event) => {
    if (!isDragging) {
      return;
    }
    const maxLeft = window.innerWidth - bubble.offsetWidth - floatingMargin;
    const maxTop = window.innerHeight - bubble.offsetHeight - floatingMargin;
    const nextLeft = clampValue(event.clientX - dragOffsetX, maxLeft);
    const nextTop = clampValue(event.clientY - dragOffsetY, maxTop);
    bubble.style.left = `${nextLeft}px`;
    bubble.style.top = `${nextTop}px`;
    moved = true;
  });

  const endDrag = (event) => {
    if (!isDragging) {
      return;
    }
    isDragging = false;
    try {
      bubble.releasePointerCapture(event.pointerId);
    } catch (_) {
      // ignore pointer release errors
    }
    if (moved) {
      skipNextClick = true;
    }
  };

  bubble.addEventListener('pointerup', endDrag);
  bubble.addEventListener('pointercancel', endDrag);

  bubble.addEventListener('click', () => {
    if (skipNextClick) {
      skipNextClick = false;
      return;
    }
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  panel.querySelectorAll('.today-menu-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  renderBadge();
  initFloatingMenu();
});
