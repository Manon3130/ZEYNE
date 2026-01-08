const STORAGE_KEY = 'ZEYNE_STATE_V1';
const DAILY_STORAGE_KEY = 'ZEYNE_DAILY3_STATE_V1';
const DAILY_SUGGESTIONS = [
  'Écrire 3 lignes de journal',
  'Boire un verre d’eau',
  '10 minutes d’étirements',
  'Ranger un petit espace',
  'Respirer 2 minutes en conscience'
];
const DAILY_FEEDBACK = {
  0: 'Commence petit.',
  1: 'Bien joué, continue.',
  2: 'Encore une, tu boucles la journée.',
  3: 'Daily 3 validé ✔︎'
};
const BADGE_DEFINITIONS = [
  { id: 'starter', threshold: 1, icon: '🔥' },
  { id: 'bronze', threshold: 3, icon: '🔥' },
  { id: 'silver', threshold: 7, icon: '🏆' },
  { id: 'gold', threshold: 14, icon: '🏆' },
  { id: 'platinum', threshold: 30, icon: '👑' }
];

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
  const fallback = { streak: 0, icon: '🔥' };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return fallback;
    }
    const state = JSON.parse(stored);
    const streakValue = Number(state?.streak?.current ?? state?.streak?.best) || 0;
    const streakBadge = getBadgeForStreak(streakValue) || fallback;
    return {
      streak: streakValue,
      icon: streakBadge.icon
    };
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
  const streakLabel = badge.streak === 1 ? 'jour' : 'jours';
  badgeElement.innerHTML = `
    <span class="today-badge-icon" aria-hidden="true">${badge.icon}</span>
    <span class="today-badge-label">Streak ${badge.streak} ${streakLabel}</span>
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
  initDailyPage();
  initSwipePager();
});

const initDailyPage = () => {
  const dailyView = document.querySelector('#view-daily');
  if (!dailyView) {
    return;
  }

  const dailySlots = Array.from(dailyView.querySelectorAll('.daily-slot'));
  const counter = dailyView.querySelector('#daily-counter');
  const feedback = dailyView.querySelector('#daily-feedback');
  const motivationSlider = dailyView.querySelector('#motivation-slider');
  const motivationValue = dailyView.querySelector('#motivation-value');
  const moodButtons = Array.from(dailyView.querySelectorAll('.daily-mood'));

  const todayKey = new Date().toISOString().slice(0, 10);
  const fallbackState = {
    date: todayKey,
    tasks: [
      { text: '', done: false },
      { text: '', done: false },
      { text: '', done: false }
    ],
    motivation: 50,
    mood: null
  };

  const loadState = () => {
    try {
      const raw = localStorage.getItem(DAILY_STORAGE_KEY);
      if (!raw) {
        return { ...fallbackState };
      }
      const parsed = JSON.parse(raw);
      if (parsed?.date !== todayKey) {
        return { ...fallbackState };
      }
      const tasks = Array.isArray(parsed.tasks) ? parsed.tasks.slice(0, 3) : fallbackState.tasks;
      while (tasks.length < 3) {
        tasks.push({ text: '', done: false });
      }
      return {
        ...fallbackState,
        tasks: tasks.map(task => ({
          text: typeof task.text === 'string' ? task.text : '',
          done: Boolean(task.done)
        })),
        motivation: Number.isFinite(parsed.motivation) ? parsed.motivation : fallbackState.motivation,
        mood: typeof parsed.mood === 'string' ? parsed.mood : null
      };
    } catch (error) {
      console.warn('Impossible de charger Daily 3', error);
      return { ...fallbackState };
    }
  };

  const saveState = () => {
    try {
      localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Impossible de sauvegarder Daily 3', error);
    }
  };

  const updateFeedback = () => {
    const completed = state.tasks.filter(task => task.done).length;
    if (counter) {
      counter.textContent = `${completed}/3 complété`;
    }
    if (feedback) {
      feedback.textContent = DAILY_FEEDBACK[completed] || DAILY_FEEDBACK[0];
    }
  };

  const updateSuggestButtons = () => {
    dailySlots.forEach((slot, index) => {
      const input = slot.querySelector('.daily-input');
      const suggest = slot.querySelector('.daily-suggest');
      if (!input || !suggest) {
        return;
      }
      const hasText = input.value.trim().length > 0;
      suggest.classList.toggle('hidden', hasText);
      if (hasText) {
        suggest.setAttribute('aria-hidden', 'true');
      } else {
        suggest.removeAttribute('aria-hidden');
      }
      input.setAttribute('aria-label', `Micro-tâche ${index + 1}`);
    });
  };

  const updateMotivation = () => {
    if (motivationValue) {
      motivationValue.textContent = `Motivation: ${state.motivation}`;
    }
  };

  const updateMoodSelection = () => {
    moodButtons.forEach(button => {
      const isActive = button.dataset.mood === state.mood;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const applyStateToUI = () => {
    dailySlots.forEach((slot, index) => {
      const task = state.tasks[index];
      const checkbox = slot.querySelector('input[type="checkbox"]');
      const input = slot.querySelector('.daily-input');
      if (checkbox) {
        checkbox.checked = Boolean(task?.done);
      }
      if (input) {
        input.value = task?.text ?? '';
      }
    });
    if (motivationSlider) {
      motivationSlider.value = state.motivation;
    }
    updateFeedback();
    updateSuggestButtons();
    updateMotivation();
    updateMoodSelection();
  };

  const fillSuggestion = (index) => {
    const input = dailySlots[index]?.querySelector('.daily-input');
    if (!input) {
      return;
    }
    const available = DAILY_SUGGESTIONS.filter(suggestion => !state.tasks.some(task => task.text === suggestion));
    const suggestion = available[Math.floor(Math.random() * available.length)] || DAILY_SUGGESTIONS[0];
    state.tasks[index].text = suggestion;
    input.value = suggestion;
    updateSuggestButtons();
    saveState();
  };

  let state = loadState();
  applyStateToUI();

  dailySlots.forEach((slot, index) => {
    const checkbox = slot.querySelector('input[type="checkbox"]');
    const input = slot.querySelector('.daily-input');
    const suggest = slot.querySelector('.daily-suggest');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        state.tasks[index].done = checkbox.checked;
        updateFeedback();
        saveState();
      });
    }
    if (input) {
      input.addEventListener('input', () => {
        state.tasks[index].text = input.value;
        updateSuggestButtons();
        saveState();
      });
    }
    if (suggest) {
      suggest.addEventListener('click', () => {
        fillSuggestion(index);
      });
    }
  });

  if (motivationSlider) {
    motivationSlider.addEventListener('input', () => {
      state.motivation = Number(motivationSlider.value);
      updateMotivation();
      saveState();
    });
  }

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      state.mood = button.dataset.mood || null;
      updateMoodSelection();
      saveState();
    });
  });
};

const initSwipePager = () => {
  const pager = document.querySelector('.today-pages');
  if (!pager) {
    return;
  }
  const dots = Array.from(document.querySelectorAll('.page-dots .dot'));
  const pages = Array.from(pager.querySelectorAll('.today-page'));
  const clampIndex = (value) => Math.max(0, Math.min(value, pages.length - 1));

  const updateDots = (index) => {
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  };

  const setPage = (index) => {
    const safeIndex = clampIndex(index);
    const target = pages[safeIndex];
    if (!target) {
      return;
    }
    pager.scrollTo({
      left: target.offsetLeft,
      behavior: 'auto'
    });
    updateDots(safeIndex);
  };

  let isTicking = false;
  pager.addEventListener('scroll', () => {
    if (isTicking) {
      return;
    }
    isTicking = true;
    requestAnimationFrame(() => {
      const index = clampIndex(Math.round(pager.scrollLeft / pager.clientWidth));
      updateDots(index);
      isTicking = false;
    });
  });

  setPage(1);
};
