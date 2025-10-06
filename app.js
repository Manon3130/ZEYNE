const STORAGE_KEY = 'ZEYNE_STATE_V1';

const ENCOURAGEMENT_MESSAGES = [
  'Bravo — 3/3 accomplies. Tu as tenu ton focus aujourd\'hui.',
  'Yes ! Journée validée ✨ Reviens demain avec le même élan.',
  'Objectif du jour atteint ✅ Tu avances, continue.',
  'Bien joué — tes 3 micro-tâches sont faites.',
  'Constance +1. Demain, on recommence.'
];

const BADGE_DEFINITIONS = [
  { id: 'bronze', label: 'Bronze', threshold: 3, icon: '🥉' },
  { id: 'silver', label: 'Argent', threshold: 7, icon: '🥈' },
  { id: 'gold', label: 'Or', threshold: 14, icon: '🥇' },
  { id: 'platinum', label: 'Platine', threshold: 30, icon: '🏆' }
];

const REPORT_REASON_DETAILS = {
  'trop-gros': {
    label: 'Trop gros',
    recommendation: 'Découpe en micro-blocs de 10 min + première micro-action obligatoire.'
  },
  'pas-clair': {
    label: 'Pas clair',
    recommendation: 'Reformule avec un verbe d’action + critère “fini quand…”.'
  },
  'pas-temps': {
    label: 'Pas le temps',
    recommendation: 'Protège un créneau du matin (20 min) sur 48 h.'
  },
  distraction: {
    label: 'Distraction',
    recommendation: 'Mode avion + casque 15 min avant d’ouvrir la tâche.'
  },
  peur: {
    label: 'Peur / perfectionnisme',
    recommendation: 'Autorise un brouillon “moche” de 10 min, puis itère.'
  }
};

const DAY_LABELS_SHORT = ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'];

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

function createDefaultStreakState() {
  return {
    current: 0,
    best: 0,
    lastCountedDay: null,
    daysDone: []
  };
}

function createDefaultBadgesState() {
  return {
    unlocked: []
  };
}

function isValidISODate(value) {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const iso = date.toISOString().split('T')[0];
  return iso === value;
}

function sanitizeDaysDoneList(days) {
  if (!Array.isArray(days)) return [];
  const filtered = days.filter(isValidISODate);
  const unique = Array.from(new Set(filtered));
  unique.sort();
  return unique;
}

function differenceInDays(startISO, endISO) {
  if (!isValidISODate(startISO) || !isValidISODate(endISO)) return null;
  const start = new Date(startISO);
  const end = new Date(endISO);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function computeBestStreak(days) {
  const unique = sanitizeDaysDoneList(days);
  if (!unique.length) return 0;

  let best = 0;
  let current = 0;
  let previous = null;

  unique.forEach(dayStr => {
    if (previous === null) {
      current = 1;
    } else {
      const diff = differenceInDays(previous, dayStr);
      if (diff === 1) {
        current += 1;
      } else if (diff !== null && diff > 1) {
        current = 1;
      }
    }
    previous = dayStr;
    if (current > best) {
      best = current;
    }
  });

  return best;
}

function computeCurrentStreakInfo(days, referenceDayStr) {
  const unique = sanitizeDaysDoneList(days);
  if (!unique.length) {
    return { streak: 0, lastDay: null };
  }

  const doneSet = new Set(unique);
  const reference = isValidISODate(referenceDayStr) ? new Date(referenceDayStr) : getTodayDateObj();
  if (Number.isNaN(reference.getTime())) {
    return { streak: 0, lastDay: null };
  }
  reference.setHours(0, 0, 0, 0);
  const referenceISO = reference.toISOString().split('T')[0];

  const earliest = new Date(unique[0]);
  earliest.setHours(0, 0, 0, 0);

  const cursor = new Date(reference);

  while (cursor.getTime() >= earliest.getTime()) {
    const cursorISO = cursor.toISOString().split('T')[0];
    if (doneSet.has(cursorISO)) {
      const lastDay = cursorISO;
      let streak = 0;
      const runCursor = new Date(cursor);
      while (true) {
        const runISO = runCursor.toISOString().split('T')[0];
        if (!doneSet.has(runISO)) break;
        streak += 1;
        runCursor.setDate(runCursor.getDate() - 1);
      }

      const gap = differenceInDays(lastDay, referenceISO);
      if (gap !== null && gap > 1) {
        return { streak: 0, lastDay: null };
      }

      return { streak, lastDay };
    }
    cursor.setDate(cursor.getDate() - 1);
  }

  return { streak: 0, lastDay: null };
}

function formatDayCount(value) {
  const normalized = Number(value) || 0;
  return `${normalized} jour${normalized > 1 ? 's' : ''}`;
}

function ensureStreakStructure() {
  if (!state.streak || typeof state.streak !== 'object') {
    state.streak = createDefaultStreakState();
  }

  const fallback = createDefaultStreakState();
  state.streak.current = Number.isFinite(Number(state.streak.current)) ? Number(state.streak.current) : fallback.current;
  state.streak.best = Number.isFinite(Number(state.streak.best)) ? Number(state.streak.best) : fallback.best;
  state.streak.lastCountedDay = isValidISODate(state.streak.lastCountedDay) ? state.streak.lastCountedDay : fallback.lastCountedDay;
  state.streak.daysDone = sanitizeDaysDoneList(state.streak.daysDone);
}

function ensureBadgesStructure() {
  if (!state.badges || typeof state.badges !== 'object') {
    state.badges = createDefaultBadgesState();
  }

  const unlocked = Array.isArray(state.badges.unlocked) ? state.badges.unlocked : [];
  const normalized = unlocked
    .map(entry => {
      if (typeof entry === 'string') {
        return { id: entry, unlockedAt: null };
      }
      if (!entry || typeof entry !== 'object') {
        return null;
      }
      const id = entry.id;
      const unlockedAt = typeof entry.unlockedAt === 'string' && !Number.isNaN(new Date(entry.unlockedAt).getTime())
        ? entry.unlockedAt
        : null;
      return { id, unlockedAt };
    })
    .filter(Boolean)
    .filter(entry => BADGE_DEFINITIONS.some(def => def.id === entry.id));

  const dedupMap = new Map();
  normalized.forEach(entry => {
    const existing = dedupMap.get(entry.id);
    if (!existing) {
      dedupMap.set(entry.id, entry);
    } else {
      const existingTime = existing.unlockedAt ? new Date(existing.unlockedAt).getTime() : -Infinity;
      const entryTime = entry.unlockedAt ? new Date(entry.unlockedAt).getTime() : -Infinity;
      if (entryTime > existingTime) {
        dedupMap.set(entry.id, entry);
      }
    }
  });

  const deduped = Array.from(dedupMap.values());
  deduped.sort((a, b) => {
    const aDate = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
    const bDate = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
    return aDate - bDate;
  });

  state.badges.unlocked = deduped;
}

function sanitizeStreakData(referenceDayStr = getToday()) {
  ensureStreakStructure();
  ensureBadgesStructure();

  const previousBest = Number(state.streak.best) || 0;
  const { streak, lastDay } = computeCurrentStreakInfo(state.streak.daysDone, referenceDayStr);
  state.streak.current = streak;
  state.streak.lastCountedDay = lastDay;

  const computedBest = computeBestStreak(state.streak.daysDone);
  if (computedBest > previousBest) {
    state.streak.best = computedBest;
  } else {
    state.streak.best = previousBest;
  }
}

function updateDayCompletionRecord(dayStr, isComplete, referenceDayStr = getToday()) {
  ensureStreakStructure();

  if (!isValidISODate(dayStr)) {
    sanitizeStreakData(referenceDayStr);
    return {
      current: state.streak.current,
      best: state.streak.best,
      bestChanged: false
    };
  }

  const days = sanitizeDaysDoneList(state.streak.daysDone);
  const index = days.indexOf(dayStr);
  if (isComplete && index === -1) {
    days.push(dayStr);
  } else if (!isComplete && index !== -1) {
    days.splice(index, 1);
  }

  state.streak.daysDone = sanitizeDaysDoneList(days);

  const previousCurrent = Number(state.streak.current) || 0;
  const previousBest = Number(state.streak.best) || 0;
  const { streak, lastDay } = computeCurrentStreakInfo(state.streak.daysDone, referenceDayStr);
  state.streak.current = streak;
  state.streak.lastCountedDay = lastDay;

  const computedBest = computeBestStreak(state.streak.daysDone);
  const newBest = Math.max(previousBest, computedBest);
  state.streak.best = newBest;

  return {
    current: state.streak.current,
    best: state.streak.best,
    bestChanged: newBest > previousBest,
    currentChanged: state.streak.current !== previousCurrent
  };
}

function getBadgeDefinitionById(id) {
  return BADGE_DEFINITIONS.find(def => def.id === id) || null;
}

function getBadgeForStreak(streakValue) {
  const normalized = Number(streakValue) || 0;
  let badge = null;
  BADGE_DEFINITIONS.forEach(def => {
    if (normalized >= def.threshold) {
      badge = def;
    }
  });
  return badge;
}

function getLastUnlockedBadge() {
  ensureBadgesStructure();
  if (!state.badges.unlocked.length) return null;
  const last = state.badges.unlocked[state.badges.unlocked.length - 1];
  const definition = getBadgeDefinitionById(last.id);
  if (!definition) return null;
  return { ...definition, unlockedAt: last.unlockedAt };
}

function unlockBadgesForCurrentStreak(currentStreak) {
  ensureBadgesStructure();
  const unlockedIds = new Set(state.badges.unlocked.map(entry => entry.id));
  const eligible = BADGE_DEFINITIONS.filter(def => currentStreak >= def.threshold && !unlockedIds.has(def.id));
  if (!eligible.length) {
    return null;
  }

  const timestamp = new Date().toISOString();
  eligible.forEach(def => {
    state.badges.unlocked.push({ id: def.id, unlockedAt: timestamp });
  });
  state.badges.unlocked.sort((a, b) => {
    const aTime = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
    const bTime = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
    return aTime - bTime;
  });

  return eligible[eligible.length - 1];
}

const TEMPLATE_LIBRARY = [
  {
    id: 'revision-examen',
    name: 'Révision examen',
    description: 'Routine de révision quotidienne pour consolider le cours.',
    duration: '2h/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Relire chapitre X', moment: 'Matin', audio: 'respiration' },
      { title: 'Fiches / questions clés', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Quiz 20’', moment: 'Soir', audio: 'respiration' }
    ]
  },
  {
    id: 'creation-contenu',
    name: 'Création contenu IG',
    description: 'Préparez, tournez et publiez en 3 micro-tâches.',
    duration: '60–90 min/j',
    ritual: 'Étirements',
    tasks: [
      { title: 'Idées + accroches', moment: 'Après-midi', audio: 'étirements' },
      { title: 'Tourner 1 séquence', moment: 'Fin de journée', audio: 'étirements' },
      { title: 'Montage / légende 20’', moment: 'Soir', audio: 'étirements' }
    ]
  },
  {
    id: 'sport-doux',
    name: 'Sport doux',
    description: 'Un rituel mouvement léger et progressif.',
    duration: '30–40 min/j',
    ritual: 'Étirements',
    tasks: [
      { title: 'Échauffement 10’', moment: 'Matin', audio: 'étirements' },
      { title: 'Session 15–20’', moment: 'Matin', audio: 'étirements' },
      { title: 'Retour au calme 5–10’', moment: 'Soir', audio: 'étirements' }
    ]
  },
  {
    id: 'desencombrement',
    name: 'Désencombrement',
    description: 'Libérez de l’espace avec trois micro-actions ciblées.',
    duration: '30 min/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Zone 10’', moment: 'Matin', audio: 'respiration' },
      { title: 'Trier / décider 10’', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Sortie (jeter/donner) 10’', moment: 'Soir', audio: 'respiration' }
    ]
  },
  {
    id: 'projet-pitch',
    name: 'Projet pro — Pitch',
    description: 'Structurez et peaufinez votre pitch en 7 jours.',
    duration: '45–60 min/j',
    ritual: 'Respiration',
    tasks: [
      { title: 'Brainstorm 10’', moment: 'Matin', audio: 'respiration' },
      { title: 'Plan / squelette 15’', moment: 'Après-midi', audio: 'respiration' },
      { title: 'Rédaction 15–30’', moment: 'Soir', audio: 'respiration' }
    ]
  }
];

let state = {
  settings: { email: '', goalTitle: '', deadlineISO: '', startISO: '' },
  tasks: {},
  vignettes: ['', '', ''],
  kpiImage: '',
  mood: { motivation: 50, emoji: null },
  reports: {},
  microReviews: {},
  streak: createDefaultStreakState(),
  badges: createDefaultBadgesState()
};

let lastTemplateApplication = null;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      if (!state.vignettes) state.vignettes = ['', '', ''];
      if (!state.mood) state.mood = { motivation: 50, emoji: null };
      if (!state.tasks) state.tasks = {};
      if (!state.settings.startISO) state.settings.startISO = '';
      if (!state.reports) state.reports = {};
      if (!state.microReviews) state.microReviews = {};
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }

  sanitizeStreakData();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTodayDateObj() {
  const now = new Date();
  if (now.getHours() < 2) {
    now.setDate(now.getDate() - 1);
  }
  now.setHours(0, 0, 0, 0);
  return now;
}

function getToday() {
  return getTodayDateObj().toISOString().split('T')[0];
}

function getDateString(offset = 0) {
  const date = getTodayDateObj();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
}

function getNextMondayDate() {
  const date = getTodayDateObj();
  const day = date.getDay();
  const daysUntilNextMonday = ((8 - day) % 7) || 7;
  date.setDate(date.getDate() + daysUntilNextMonday);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getStartDateForPeriod(period) {
  const today = getTodayDateObj();
  if (period === 'next-week') {
    return getNextMondayDate();
  }
  return today;
}

function createEmptyTask() {
  return { title: '', moment: '', audio: 'Aucun', status: 'planned' };
}

function normalizeAudioValue(audioValue) {
  if (!audioValue) return 'Aucun';
  const lower = audioValue.toString().toLowerCase();
  if (lower === 'respiration') return 'respiration';
  if (lower === 'étirements' || lower === 'etirements') return 'étirements';
  if (lower === 'aucun') return 'Aucun';
  return audioValue;
}

function ensureTasksForDate(dateStr) {
  if (!state.tasks[dateStr]) {
    state.tasks[dateStr] = [createEmptyTask(), createEmptyTask(), createEmptyTask()];
    return;
  }

  for (let i = 0; i < 3; i++) {
    if (!state.tasks[dateStr][i]) {
      state.tasks[dateStr][i] = createEmptyTask();
    } else {
      const task = state.tasks[dateStr][i];
      if (task.title === undefined) task.title = '';
      if (task.moment === undefined) task.moment = '';
      task.audio = normalizeAudioValue(task.audio);
      if (!task.status) task.status = 'planned';
    }
  }
}

function cloneTask(task) {
  return task ? { ...task } : createEmptyTask();
}

function isTaskEmpty(task) {
  if (!task) return true;
  const title = (task.title || '').trim();
  const moment = (task.moment || '').trim();
  const audio = normalizeAudioValue(task.audio);
  return !title && !moment && (audio === 'Aucun' || !audio);
}

function formatAudioLabel(audioValue) {
  if (!audioValue || audioValue === 'Aucun') return '';
  const lower = audioValue.toString().toLowerCase();
  if (lower === 'respiration') return 'Respiration';
  if (lower === 'étirements' || lower === 'etirements') return 'Étirements';
  return audioValue;
}

function formatCount(value, singular, plural) {
  const normalized = Number(value) || 0;
  return `${normalized} ${normalized > 1 ? plural : singular}`;
}

function getEarliestTaskDate() {
  if (!state.tasks) return null;
  const taskDates = Object.keys(state.tasks).filter(Boolean);
  if (!taskDates.length) return null;
  taskDates.sort();
  return taskDates[0];
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
}

function formatTaskMeta(task) {
  const parts = [];
  if (task.moment) {
    parts.push(task.moment);
  }
  const audioLabel = formatAudioLabel(task.audio);
  if (audioLabel) {
    parts.push(audioLabel);
  }
  return parts.join(' • ') || '';
}

function getLastSevenDates() {
  const dates = [];
  const today = getTodayDateObj();
  for (let offset = 6; offset >= 0; offset--) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

function ensureReportEntry(dateStr) {
  if (!state.reports[dateStr]) {
    state.reports[dateStr] = {
      total: 0,
      reasons: {
        'trop-gros': 0,
        'pas-clair': 0,
        'pas-temps': 0,
        distraction: 0,
        peur: 0
      }
    };
  } else if (!state.reports[dateStr].reasons) {
    state.reports[dateStr].reasons = {
      'trop-gros': 0,
      'pas-clair': 0,
      'pas-temps': 0,
      distraction: 0,
      peur: 0
    };
  }
  if (typeof state.reports[dateStr].total !== 'number') {
    state.reports[dateStr].total = state.reports[dateStr].total ? Number(state.reports[dateStr].total) : 0;
  }
}

function recordReportForDate(dateStr, reasonKey) {
  if (!reasonKey) return;
  ensureReportEntry(dateStr);
  state.reports[dateStr].total = (state.reports[dateStr].total || 0) + 1;
  if (state.reports[dateStr].reasons[reasonKey] === undefined) {
    state.reports[dateStr].reasons[reasonKey] = 0;
  }
  state.reports[dateStr].reasons[reasonKey] += 1;
}

function getTasksDoneCount(dateStr) {
  const tasks = Array.isArray(state.tasks[dateStr]) ? state.tasks[dateStr] : [];
  return tasks.filter(task => task && task.status === 'done').length;
}

function refreshWeeklyReviewIfVisible() {
  const weeklyView = document.getElementById('view-hebdo');
  if (weeklyView && weeklyView.classList.contains('active')) {
    renderWeeklyReview();
  }
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewName = link.getAttribute('data-view');
      showView(viewName);
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

function showView(viewName) {
  const views = document.querySelectorAll('.view');
  views.forEach(view => view.classList.remove('active'));
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) {
    targetView.classList.add('active');
    if (viewName === 'aujourdhui') {
      renderDashboard();
    } else if (viewName === 'planifier') {
      renderPlanifier();
    } else if (viewName === 'programme') {
      renderProgramme();
    } else if (viewName === 'vignettes') {
      renderVignettes();
    } else if (viewName === 'hebdo') {
      renderWeeklyReview();
    }
  }
}

function renderVignettes() {
  for (let i = 0; i < 3; i++) {
    const vignette = document.getElementById(`vignette-${i + 1}`);
    if (state.vignettes[i]) {
      vignette.style.backgroundImage = `url(${state.vignettes[i]})`;
    }
  }

  ['1', '2', '3'].forEach((num, idx) => {
    const input = document.getElementById(`upload-vignette-${num}`);
    if (input) {
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            state.vignettes[idx] = event.target.result;
            saveState();
            const vignette = document.getElementById(`vignette-${num}`);
            vignette.style.backgroundImage = `url(${event.target.result})`;
          };
          reader.readAsDataURL(file);
        }
      };
    }
  });

  const kpiInput = document.getElementById('upload-kpi');
  if (kpiInput) {
    kpiInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          state.kpiImage = event.target.result;
          saveState();
          renderKPIImage();
        };
        reader.readAsDataURL(file);
      }
    };
  }
}

function renderKPIImage() {
  const kpiDisplay = document.getElementById('kpi-image-display');
  if (kpiDisplay && state.kpiImage) {
    kpiDisplay.src = state.kpiImage;
    kpiDisplay.style.display = 'block';
  }
}

function renderProgramme() {
  document.getElementById('email-input').value = state.settings.email || '';
  document.getElementById('goal-input').value = state.settings.goalTitle || '';
  document.getElementById('deadline-input').value = state.settings.deadlineISO || '';

  const saveBtn = document.getElementById('save-programme-btn');
  saveBtn.onclick = () => {
    const emailValue = document.getElementById('email-input').value;
    const goalValue = document.getElementById('goal-input').value;
    const deadlineValue = document.getElementById('deadline-input').value;
    const previousGoal = state.settings.goalTitle;
    const previousDeadline = state.settings.deadlineISO;

    state.settings.email = emailValue;
    state.settings.goalTitle = goalValue;
    state.settings.deadlineISO = deadlineValue;

    if (!state.settings.startISO || previousGoal !== goalValue || previousDeadline !== deadlineValue) {
      state.settings.startISO = getToday();
    }

    saveState();
    alert('Programme enregistré !');
    showView('aujourdhui');
  };
}

function renderPlanifier() {
  const container = document.getElementById('planifier-days');
  if (!container) return;

  setPlanifierTabsMode('editor');

  const templateTabBtn = document.getElementById('planifier-template-tab');
  if (templateTabBtn) {
    templateTabBtn.onclick = () => {
      openTemplateLibrary();
    };
  }

  container.innerHTML = '';

  DAYS.forEach((day, idx) => {
    const accordion = document.createElement('div');
    accordion.className = 'day-accordion';

    const dateStr = getDateString(idx);
    ensureTasksForDate(dateStr);
    const formattedDate = formatDate(dateStr);

    const header = document.createElement('div');
    header.className = 'day-accordion-header';
    header.innerHTML = `<span>${day} · ${formattedDate}</span><span>▼</span>`;

    const content = document.createElement('div');
    content.className = 'day-accordion-content';

    const tasksForDay = state.tasks[dateStr] || [];

    for (let i = 1; i <= 3; i++) {
      const taskData = tasksForDay[i - 1] ? { ...tasksForDay[i - 1] } : createEmptyTask();
      const taskForm = document.createElement('div');
      taskForm.className = 'task-form';
      taskForm.innerHTML = `
        <strong>Tâche ${i}</strong>
        <div class="task-form-row">
          <input type="text" placeholder="Titre de la tâche" data-day="${idx}" data-task="${i - 1}" data-field="title">
          <input type="text" placeholder="Moment (Matin, 14:00…)" data-day="${idx}" data-task="${i - 1}" data-field="moment">
          <select data-day="${idx}" data-task="${i - 1}" data-field="audio">
            <option value="Aucun">Aucun</option>
            <option value="respiration">Respiration</option>
            <option value="étirements">Étirements</option>
          </select>
        </div>
      `;

      const titleInput = taskForm.querySelector('input[data-field="title"]');
      const momentInput = taskForm.querySelector('input[data-field="moment"]');
      const audioSelect = taskForm.querySelector('select[data-field="audio"]');

      titleInput.value = taskData.title || '';
      momentInput.value = taskData.moment || '';
      audioSelect.value = normalizeAudioValue(taskData.audio || 'Aucun');

      content.appendChild(taskForm);
    }

    header.onclick = () => {
      content.classList.toggle('open');
    };

    accordion.appendChild(header);
    accordion.appendChild(content);
    container.appendChild(accordion);
  });

  const saveBtn = document.getElementById('save-planifier-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const inputs = document.querySelectorAll('#planifier-days input[data-day], #planifier-days select[data-day]');

      for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
        const dateStr = getDateString(dayOffset);
        ensureTasksForDate(dateStr);
      }

      inputs.forEach(input => {
        const dayIdx = parseInt(input.getAttribute('data-day'), 10);
        const taskIdx = parseInt(input.getAttribute('data-task'), 10);
        const field = input.getAttribute('data-field');

        if (Number.isNaN(dayIdx) || Number.isNaN(taskIdx) || !field) return;

        const dateStr = getDateString(dayIdx);
        if (!state.tasks[dateStr] || !state.tasks[dateStr][taskIdx]) return;

        if (field === 'audio') {
          state.tasks[dateStr][taskIdx][field] = normalizeAudioValue(input.value);
        } else {
          state.tasks[dateStr][taskIdx][field] = input.value.trim();
        }
      });

      saveState();
      alert('Planification enregistrée !');
      showView('aujourdhui');
    };
  }
}

function setPlanifierTabsMode(mode) {
  const editorTab = document.getElementById('planifier-editor-tab');
  const templateTab = document.getElementById('planifier-template-tab');
  if (!editorTab || !templateTab) return;

  if (mode === 'templates') {
    editorTab.classList.remove('planifier-tab-active');
    editorTab.setAttribute('aria-selected', 'false');
    templateTab.classList.add('planifier-tab-active');
    templateTab.setAttribute('aria-selected', 'true');
  } else {
    editorTab.classList.add('planifier-tab-active');
    editorTab.setAttribute('aria-selected', 'true');
    templateTab.classList.remove('planifier-tab-active');
    templateTab.setAttribute('aria-selected', 'false');
  }
}

function getTemplateById(templateId) {
  return TEMPLATE_LIBRARY.find(t => t.id === templateId);
}

function resolveTemplateApplication(template, period, conflict) {
  const startDate = getStartDateForPeriod(period);
  const dates = [];
  const assignments = [];
  let daysUpdated = 0;
  let replaced = 0;
  let preserved = 0;

  for (let offset = 0; offset < 7; offset++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + offset);
    const dateStr = currentDate.toISOString().split('T')[0];
    dates.push(dateStr);

    const existingTasks = state.tasks[dateStr]
      ? state.tasks[dateStr].map(cloneTask)
      : [createEmptyTask(), createEmptyTask(), createEmptyTask()];

    const slots = [];
    let dayWillChange = false;

    template.tasks.slice(0, 3).forEach((templateTask, taskIdx) => {
      const existing = existingTasks[taskIdx] || createEmptyTask();
      let applyTask = false;

      if (existing.status === 'done') {
        preserved += 1;
      } else if (conflict === 'fill-empty') {
        if (isTaskEmpty(existing)) {
          applyTask = true;
        } else {
          preserved += 1;
        }
      } else {
        applyTask = true;
        if (!isTaskEmpty(existing)) {
          replaced += 1;
        }
      }

      if (applyTask) {
        dayWillChange = true;
      }

      slots.push({
        apply: applyTask,
        templateTask,
        taskIdx
      });
    });

    if (dayWillChange) {
      daysUpdated += 1;
    }

    assignments.push({ date: dateStr, slots });
  }

  return {
    dates,
    assignments,
    stats: {
      daysUpdated,
      replaced,
      preserved
    }
  };
}

function openTemplateLibrary() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');

  content.innerHTML = `
    <div class="template-library">
      <div class="template-library-header">
        <h3>Templates</h3>
        <p>Accélérez votre démarrage avec des routines prêtes en 3 micro-tâches par jour.</p>
      </div>
      <div class="template-library-grid">
        ${TEMPLATE_LIBRARY.map(template => `
          <div class="template-card" data-template-id="${template.id}">
            <h4>${template.name}</h4>
            <p>${template.description}</p>
            <div class="template-meta">
              <span class="template-badge">🕒 ${template.duration}</span>
              <span class="template-badge">✨ ${template.ritual}</span>
            </div>
            <div class="template-actions">
              <button class="btn btn-secondary" data-action="preview" data-template="${template.id}">Prévisualiser</button>
              <button class="btn btn-primary" data-action="apply" data-template="${template.id}">Appliquer</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  modal.classList.add('show');

  content.querySelectorAll('[data-action="preview"]').forEach(btn => {
    btn.onclick = () => {
      const template = getTemplateById(btn.getAttribute('data-template'));
      if (template) {
        showTemplatePreview(template);
      }
    };
  });

  content.querySelectorAll('[data-action="apply"]').forEach(btn => {
    btn.onclick = () => {
      const template = getTemplateById(btn.getAttribute('data-template'));
      if (template) {
        showTemplateApply(template);
      }
    };
  });
}

function showTemplatePreview(template) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.add('template-wide');

  const baseDate = new Date();
  baseDate.setHours(0, 0, 0, 0);
  const previewDays = Array.from({ length: 7 }).map((_, idx) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + idx);
    const dateStr = date.toISOString().split('T')[0];
    return {
      label: idx === 0 ? 'J' : `J+${idx}`,
      formatted: formatDate(dateStr)
    };
  });

  content.innerHTML = `
    <div class="template-preview">
      <div class="template-preview-header">
        <h3>${template.name}</h3>
        <p>${template.description}</p>
        <div class="template-meta">
          <span class="template-badge">🕒 ${template.duration}</span>
          <span class="template-badge">✨ Rituel : ${template.ritual}</span>
        </div>
      </div>
      <div class="template-preview-grid">
        ${previewDays.map(day => `
          <div class="preview-day">
            <div class="preview-day-header">
              <strong>${day.label} · ${day.formatted}</strong>
              <span class="preview-day-ritual">Rituel : ${template.ritual}</span>
            </div>
            ${template.tasks.slice(0, 3).map(task => `
              <div class="preview-task">
                <strong>${task.moment}</strong>
                <span>${task.title}</span>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
      <div class="template-preview-footer">
        <button class="btn btn-secondary" id="template-preview-back">Retour</button>
        <button class="btn btn-primary" id="template-preview-apply">Appliquer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const backBtn = content.querySelector('#template-preview-back');
  const applyBtn = content.querySelector('#template-preview-apply');

  if (backBtn) {
    backBtn.onclick = () => openTemplateLibrary();
  }

  if (applyBtn) {
    applyBtn.onclick = () => showTemplateApply(template);
  }
}

function showTemplateApply(template) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');

  content.innerHTML = `
    <div class="template-apply">
      <h3>Appliquer « ${template.name} »</h3>
      <div class="template-apply-options">
        <div>
          <h4>Période</h4>
          <div class="template-radio-group">
            <label class="template-radio-option">
              <input type="radio" name="template-period" value="this-week" checked>
              <span>Cette semaine (dès aujourd'hui)</span>
            </label>
            <label class="template-radio-option">
              <input type="radio" name="template-period" value="next-week">
              <span>Semaine prochaine (à partir de lundi)</span>
            </label>
          </div>
        </div>
        <div>
          <h4>Conflits</h4>
          <div class="template-radio-group">
            <label class="template-radio-option">
              <input type="radio" name="template-conflict" value="replace" checked>
              <span>Remplacer les micro-tâches planifiées (hors tâches validées)</span>
            </label>
            <label class="template-radio-option">
              <input type="radio" name="template-conflict" value="fill-empty">
              <span>Compléter uniquement les cases vides</span>
            </label>
          </div>
        </div>
      </div>
      <div class="template-summary" id="template-summary"></div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" id="template-back-btn">Retour</button>
        <button class="btn btn-primary" id="template-confirm-btn">Confirmer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const summaryEl = content.querySelector('#template-summary');
  const confirmBtn = content.querySelector('#template-confirm-btn');
  const backBtn = content.querySelector('#template-back-btn');

  let currentPlan = resolveTemplateApplication(template, 'this-week', 'replace');

  function updateSummary() {
    const periodInput = content.querySelector('input[name="template-period"]:checked');
    const conflictInput = content.querySelector('input[name="template-conflict"]:checked');
    const period = periodInput ? periodInput.value : 'this-week';
    const conflict = conflictInput ? conflictInput.value : 'replace';

    currentPlan = resolveTemplateApplication(template, period, conflict);
    const { daysUpdated, replaced, preserved } = currentPlan.stats;

    summaryEl.innerHTML = `
      <strong>Récapitulatif</strong>
      <span>${formatCount(daysUpdated, 'jour mis à jour', 'jours mis à jour')}</span>
      <span>${formatCount(replaced, 'tâche remplacée', 'tâches remplacées')}</span>
      <span>${formatCount(preserved, 'tâche conservée', 'tâches conservées')}</span>
    `;

    if (confirmBtn) {
      confirmBtn.disabled = daysUpdated === 0;
    }
  }

  content.querySelectorAll('input[name="template-period"]').forEach(input => {
    input.onchange = updateSummary;
  });

  content.querySelectorAll('input[name="template-conflict"]').forEach(input => {
    input.onchange = updateSummary;
  });

  if (backBtn) {
    backBtn.onclick = () => openTemplateLibrary();
  }

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (!currentPlan || currentPlan.stats.daysUpdated === 0) return;
      applyTemplatePlan(template, currentPlan);
    };
  }

  updateSummary();
}

function applyTemplatePlan(template, plan) {
  const previousState = {};

  plan.dates.forEach(dateStr => {
    previousState[dateStr] = state.tasks[dateStr]
      ? state.tasks[dateStr].map(cloneTask)
      : null;
  });

  plan.assignments.forEach(({ date, slots }) => {
    ensureTasksForDate(date);

    slots.forEach(({ apply, templateTask, taskIdx }) => {
      if (apply) {
        state.tasks[date][taskIdx] = {
          title: templateTask.title,
          moment: templateTask.moment,
          audio: normalizeAudioValue(templateTask.audio || 'Aucun'),
          status: 'planned'
        };
      }
    });
  });

  lastTemplateApplication = {
    dates: plan.dates,
    previousState
  };

  saveState();
  renderPlanifier();
  renderDashboard();
  refreshWeeklyReviewIfVisible();
  showTemplateAppliedMessage(template, plan.stats);
}

function showTemplateAppliedMessage(template, stats) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');

  content.innerHTML = `
    <div class="template-applied">
      <h3>${template.name} appliqué</h3>
      <p>Vos micro-tâches sont planifiées pour la période choisie.</p>
      <div class="stats">
        <span>${formatCount(stats.daysUpdated, 'jour mis à jour', 'jours mis à jour')}</span>
        <span>${formatCount(stats.replaced, 'tâche remplacée', 'tâches remplacées')}</span>
        <span>${formatCount(stats.preserved, 'tâche conservée', 'tâches conservées')}</span>
      </div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" id="template-close-btn">Fermer</button>
        <button class="btn btn-primary" id="template-undo-btn">Annuler l’application</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = content.querySelector('#template-close-btn');
  const undoBtn = content.querySelector('#template-undo-btn');

  if (closeBtn) {
    closeBtn.onclick = () => closeModal();
  }

  if (undoBtn) {
    undoBtn.onclick = () => undoLastTemplateApplication();
  }
}

function undoLastTemplateApplication() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!lastTemplateApplication || !modal || !content) {
    closeModal();
    return;
  }

  lastTemplateApplication.dates.forEach(dateStr => {
    const previous = lastTemplateApplication.previousState[dateStr];
    if (previous === null) {
      delete state.tasks[dateStr];
    } else {
      state.tasks[dateStr] = previous.map(cloneTask);
    }
  });

  lastTemplateApplication = null;

  saveState();
  renderPlanifier();
  renderDashboard();
  refreshWeeklyReviewIfVisible();

  setPlanifierTabsMode('templates');
  content.classList.remove('template-wide');
  content.innerHTML = `
    <div class="template-applied">
      <h3>Application annulée</h3>
      <p>La période a été restaurée comme avant le template.</p>
      <div class="modal-buttons">
        <button class="btn btn-primary" id="template-undo-close-btn">Fermer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = content.querySelector('#template-undo-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal();
  }
}

function renderDashboard() {
  renderDaysRemaining();
  renderDailyTasks();
  renderOtherDays();
  renderMood();
  renderKPIImage();
  updateMomentum();
  renderStreakSummary();
}

function renderWeeklyReview() {
  sanitizeStreakData();

  const weeklyFullDaysEl = document.getElementById('weekly-full-days');
  const weeklySuccessRateEl = document.getElementById('weekly-success-rate');
  const weeklyReportsEl = document.getElementById('weekly-reports');
  const weeklyRegularityCurrentEl = document.getElementById('weekly-regularity-current');
  const weeklyRegularityBestEl = document.getElementById('weekly-regularity-best');
  const weeklyRegularityBadgeTextEl = document.getElementById('weekly-regularity-badge-text');
  const weeklyRegularityBadgeIconEl = document.getElementById('weekly-regularity-badge-icon');
  const weeklyGraphEl = document.getElementById('weekly-graph');
  const weeklyRecommendationEl = document.getElementById('weekly-recommendation');

  if (!weeklyFullDaysEl || !weeklySuccessRateEl || !weeklyReportsEl || !weeklyRegularityCurrentEl || !weeklyRegularityBestEl || !weeklyRegularityBadgeTextEl || !weeklyRegularityBadgeIconEl || !weeklyGraphEl || !weeklyRecommendationEl) {
    return;
  }

  const lastSevenDates = getLastSevenDates();
  const weeklyData = lastSevenDates.map(dateStr => ({
    dateStr,
    doneCount: getTasksDoneCount(dateStr)
  }));

  const fullDays = weeklyData.filter(day => day.doneCount >= 3).length;
  const successRate = Math.round((fullDays / 7) * 100) || 0;

  weeklyFullDaysEl.textContent = `${fullDays} / 7`;
  weeklySuccessRateEl.textContent = `${successRate}%`;

  let totalReports = 0;
  const reasonTotals = {};
  const reasonOrder = {};
  let orderIndex = 0;

  lastSevenDates.forEach(dateStr => {
    const reportInfo = state.reports?.[dateStr];
    if (!reportInfo) return;

    totalReports += reportInfo.total || 0;

    if (!reportInfo.reasons) return;

    Object.entries(reportInfo.reasons).forEach(([reasonKey, count]) => {
      if (!count) return;
      if (reasonTotals[reasonKey] === undefined) {
        reasonTotals[reasonKey] = 0;
        reasonOrder[reasonKey] = orderIndex++;
      }
      reasonTotals[reasonKey] += count;
    });
  });

  let dominantReason = null;
  let dominantCount = 0;

  Object.entries(reasonTotals).forEach(([reasonKey, count]) => {
    if (count > dominantCount) {
      dominantCount = count;
      dominantReason = reasonKey;
    } else if (count === dominantCount && dominantReason !== null) {
      if (reasonOrder[reasonKey] < reasonOrder[dominantReason]) {
        dominantReason = reasonKey;
      }
    } else if (dominantReason === null) {
      dominantReason = reasonKey;
      dominantCount = count;
    }
  });

  if (totalReports > 0) {
    if (dominantReason) {
      const reasonLabel = REPORT_REASON_DETAILS[dominantReason]?.label || dominantReason;
      weeklyReportsEl.textContent = `${totalReports} report${totalReports > 1 ? 's' : ''} · Motif dominant : ${reasonLabel}`;
    } else {
      weeklyReportsEl.textContent = `${totalReports} report${totalReports > 1 ? 's' : ''} · Motif dominant : —`;
    }
  } else {
    weeklyReportsEl.textContent = '0 report · Motif dominant : —';
  }

  const currentStreak = state.streak?.current || 0;
  const bestStreak = state.streak?.best || 0;
  weeklyRegularityCurrentEl.textContent = `Streak actuel : ${formatDayCount(currentStreak)}`;
  weeklyRegularityBestEl.textContent = `Meilleur streak : ${formatDayCount(bestStreak)}`;

  const lastBadge = getLastUnlockedBadge();
  if (lastBadge) {
    weeklyRegularityBadgeTextEl.textContent = `Dernier badge : ${lastBadge.label}`;
    weeklyRegularityBadgeIconEl.textContent = lastBadge.icon;
  } else {
    weeklyRegularityBadgeTextEl.textContent = 'Dernier badge : —';
    weeklyRegularityBadgeIconEl.textContent = '🏅';
  }

  weeklyGraphEl.innerHTML = '';
  weeklyData.forEach(({ dateStr, doneCount }) => {
    const column = document.createElement('div');
    column.className = 'weekly-graph-column';

    const countLabel = document.createElement('span');
    countLabel.className = 'weekly-graph-count';
    countLabel.textContent = doneCount;

    const bar = document.createElement('div');
    bar.className = 'weekly-graph-bar';
    const percent = Math.min(100, Math.max(0, Math.round((doneCount / 3) * 100)));
    bar.style.height = `${percent}%`;
    bar.title = `${doneCount}/3 tâches accomplies`; // tooltip

    const dayLabel = document.createElement('span');
    dayLabel.className = 'weekly-graph-day';
    const date = new Date(dateStr);
    dayLabel.textContent = DAY_LABELS_SHORT[date.getDay()] || '';

    column.appendChild(countLabel);
    column.appendChild(bar);
    column.appendChild(dayLabel);
    weeklyGraphEl.appendChild(column);
  });

  let recommendationText = 'Rien à signaler — continue comme ça.';
  if (totalReports > 0 && dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
    recommendationText = REPORT_REASON_DETAILS[dominantReason].recommendation;
  }

  weeklyRecommendationEl.textContent = recommendationText;
}

function renderDaysRemaining() {
  const daysCount = document.getElementById('days-count');
  if (state.settings.deadlineISO) {
    const today = new Date();
    const deadline = new Date(state.settings.deadlineISO);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    daysCount.textContent = diffDays >= 0 ? diffDays : 0;
  } else {
    daysCount.textContent = '—';
  }
}

function renderDailyTasks() {
  const today = getToday();
  ensureTasksForDate(today);

  const tasksList = document.getElementById('daily-tasks-list');
  tasksList.innerHTML = '';

  state.tasks[today].forEach((task, idx) => {
    const isDone = task.status === 'done';
    const taskItem = document.createElement('div');
    taskItem.className = `task-item${isDone ? ' done' : ''}`;

    taskItem.innerHTML = `
      <div class="task-header">
        <div class="task-number">${idx + 1}</div>
        <div class="task-info">
          <div class="task-title">${task.title || `Tâche ${idx + 1}`}</div>
          <div class="task-meta">${formatTaskMeta(task)}</div>
        </div>
      </div>
      <div class="task-actions">
        ${!isDone ? `<button class="btn btn-primary" onclick="startTask(${idx})">Commencer</button>` : ''}
        <button
          class="btn btn-validate${isDone ? ' checked' : ''}"
          type="button"
          aria-pressed="${isDone}"
          onclick="toggleTaskCompletion(${idx})"
        >Valider</button>
        ${!isDone ? `<button class="btn btn-ghost" onclick="reportTask('${today}', ${idx})">Reporter</button>` : ''}
      </div>
    `;

    tasksList.appendChild(taskItem);
  });

  checkAllTasksDone();
}

function renderOtherDays() {
  const container = document.getElementById('other-days-list');
  container.innerHTML = '';

  for (let i = 1; i <= 4; i++) {
    const dateStr = getDateString(i);
    ensureTasksForDate(dateStr);

    const dayToggle = document.createElement('div');
    dayToggle.className = 'day-toggle';

    const dayHeader = document.createElement('div');
    dayHeader.className = 'day-header';
    dayHeader.innerHTML = `<span>J+${i} - ${formatDate(dateStr)}</span><span>▼</span>`;

    const dayContent = document.createElement('div');
    dayContent.className = 'day-content';

    state.tasks[dateStr].forEach((task, idx) => {
      const taskDiv = document.createElement('div');
      taskDiv.className = 'task-item';
      taskDiv.innerHTML = `
        <div class="task-header">
          <div class="task-number">${idx + 1}</div>
          <div class="task-info">
            <div class="task-title">${task.title || `Tâche ${idx + 1}`}</div>
            <div class="task-meta">${formatTaskMeta(task)}</div>
          </div>
        </div>
        <div class="task-actions">
          <button class="btn btn-ghost" onclick="reportTask('${dateStr}', ${idx})">Reporter</button>
        </div>
      `;
      dayContent.appendChild(taskDiv);
    });

    dayHeader.onclick = () => {
      dayContent.classList.toggle('open');
    };

    dayToggle.appendChild(dayHeader);
    dayToggle.appendChild(dayContent);
    container.appendChild(dayToggle);
  }
}

function renderMood() {
  const slider = document.getElementById('motivation-slider');
  slider.value = state.mood.motivation || 50;

  slider.oninput = () => {
    state.mood.motivation = parseInt(slider.value);
    saveState();
  };

  const emojiBtns = document.querySelectorAll('.emoji-btn');
  emojiBtns.forEach(btn => {
    const emoji = btn.getAttribute('data-emoji');
    if (state.mood.emoji === emoji) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.onclick = () => {
      state.mood.emoji = emoji;
      saveState();
      emojiBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
}

function renderStreakSummary() {
  sanitizeStreakData();

  const summary = document.getElementById('streak-summary');
  const textEl = document.getElementById('streak-text');
  const badgeEl = document.getElementById('streak-badge');
  const tooltipEl = document.getElementById('streak-tooltip');

  if (!summary || !textEl || !badgeEl || !tooltipEl) {
    return;
  }

  const current = state.streak?.current || 0;
  const best = state.streak?.best || 0;
  textEl.textContent = `Streak : ${formatDayCount(current)}`;
  tooltipEl.textContent = `Meilleur streak : ${formatDayCount(best)}`;
  summary.setAttribute('title', `Meilleur streak : ${formatDayCount(best)}`);
  summary.setAttribute('aria-label', `Streak actuel : ${formatDayCount(current)}. Meilleur streak : ${formatDayCount(best)}`);

  const badge = getBadgeForStreak(current);
  if (badge) {
    badgeEl.textContent = badge.icon;
    badgeEl.setAttribute('aria-label', `Badge ${badge.label}`);
    summary.classList.add('has-badge');
  } else {
    badgeEl.textContent = '—';
    badgeEl.removeAttribute('aria-label');
    summary.classList.remove('has-badge');
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2600);
}

function handleDailyCompletionFeedback(currentStreak, badge) {
  const normalized = Number(currentStreak) || 0;
  showToast(`Journée validée ✅ — Streak : ${formatDayCount(normalized)}`);

  if (badge) {
    showBadgeModal(badge);
  }
}

function updateMomentum() {
  updateDailyMomentumRing();
  updateGlobalProgressBar();
}

function updateDailyMomentumRing() {
  const today = getToday();
  if (!state.tasks[today]) return;

  const doneTasks = state.tasks[today].filter(t => t.status === 'done').length;
  const dailyProgress = doneTasks >= 3 ? 100 : doneTasks * 30;

  const ring = document.getElementById('momentum-ring');
  const percentage = document.getElementById('momentum-percentage');

  if (ring) {
    const angle = (dailyProgress / 100) * 360;
    ring.style.setProperty('--progress-angle', `${angle}deg`);
  }

  if (percentage) {
    percentage.textContent = `${dailyProgress}%`;
  }
}

function updateGlobalProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  const progressContainer = document.getElementById('global-progress');
  if (!progressBar || !progressContainer) return;

  const globalProgress = calculateGlobalProgressPercentage();
  const widthValue = Math.max(0, Math.min(100, globalProgress));
  progressBar.style.width = `${widthValue.toFixed(2)}%`;

  const progressValue = Math.round(widthValue);
  progressContainer.setAttribute('aria-valuenow', progressValue);
  progressContainer.setAttribute('aria-valuetext', `${progressValue}% des mini-tâches complétées`);
}

function calculateGlobalProgressPercentage() {
  const deadlineISO = state.settings.deadlineISO;
  const storedStartISO = state.settings.startISO;
  const fallbackStartISO = getEarliestTaskDate() || getToday();
  const startISO = storedStartISO || fallbackStartISO;

  if (!state.settings.startISO && startISO) {
    state.settings.startISO = startISO;
    saveState();
  }

  const startDate = new Date(startISO);
  let deadlineDate = deadlineISO ? new Date(deadlineISO) : null;

  if (deadlineDate && deadlineDate < startDate) {
    deadlineDate = null;
  }

  let expectedTasks = 0;
  if (deadlineDate) {
    const diffTime = deadlineDate - startDate;
    if (diffTime >= 0) {
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
      expectedTasks = Math.max(diffDays, 1) * 3;
    }
  }

  let completedTasks = 0;

  Object.entries(state.tasks).forEach(([dateStr, tasks]) => {
    if (!tasks) return;
    const taskDate = new Date(dateStr);
    if (isNaN(taskDate)) return;

    if (deadlineDate) {
      if (taskDate < startDate || taskDate > deadlineDate) return;
    }

    completedTasks += tasks.filter(task => task.status === 'done').length;

    if (!deadlineDate) {
      expectedTasks += tasks.length;
    }
  });

  if (expectedTasks === 0) {
    return completedTasks > 0 ? 100 : 0;
  }

  const progress = (completedTasks / expectedTasks) * 100;
  return Math.max(0, Math.min(100, progress));
}

function checkAllTasksDone() {
  const today = getToday();
  if (!state.tasks[today]) return;

  const allDone = state.tasks[today].every(t => t.status === 'done');
  const messageEl = document.getElementById('encouragement-message');

  if (allDone) {
    const date = new Date();
    const messageIdx = date.getDate() % ENCOURAGEMENT_MESSAGES.length;
    messageEl.textContent = ENCOURAGEMENT_MESSAGES[messageIdx];
    messageEl.classList.add('show');
    launchConfetti();
  } else {
    messageEl.classList.remove('show');
  }
}

window.startTask = function(taskIdx) {
  const today = getToday();
  const task = state.tasks[today][taskIdx];

  if (task.audio !== 'Aucun') {
    showRitualModal(task.audio, () => {
      showTimerModal(taskIdx);
    });
  } else {
    showTimerModal(taskIdx);
  }
};

window.toggleTaskCompletion = function(taskIdx) {
  const today = getToday();
  ensureTasksForDate(today);
  const tasksForToday = state.tasks[today];
  const task = tasksForToday[taskIdx];
  if (!task) return;

  const wasComplete = tasksForToday.every(t => t.status === 'done');

  task.status = task.status === 'done' ? 'planned' : 'done';

  const isNowComplete = tasksForToday.every(t => t.status === 'done');
  const streakResult = updateDayCompletionRecord(today, isNowComplete);
  let newlyUnlockedBadge = null;
  if (isNowComplete) {
    newlyUnlockedBadge = unlockBadgesForCurrentStreak(state.streak.current);
  }

  saveState();
  renderDailyTasks();
  updateMomentum();
  renderStreakSummary();
  refreshWeeklyReviewIfVisible();

  if (!wasComplete && isNowComplete) {
    handleDailyCompletionFeedback(streakResult?.current || state.streak.current || 0, newlyUnlockedBadge);
  }
};

window.reportTask = function(dateStr, taskIdx) {
  showReportModal(dateStr, taskIdx);
};

function showRitualModal(audioType, onComplete) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  let ritualText = '';
  if (audioType === 'respiration') {
    ritualText = `
      <h3>Respiration 4-7-8</h3>
      <p>Installez-vous confortablement.</p>
      <p>Inspirez par le nez pendant 4 secondes.</p>
      <p>Retenez votre souffle pendant 7 secondes.</p>
      <p>Expirez par la bouche pendant 8 secondes.</p>
      <p>Répétez 3 fois (environ 90 secondes).</p>
    `;
  } else if (audioType === 'étirements') {
    ritualText = `
      <h3>Étirements rapides</h3>
      <p>Levez-vous et étirez vos bras vers le ciel.</p>
      <p>Tournez doucement votre tête de gauche à droite.</p>
      <p>Roulez vos épaules en arrière 5 fois.</p>
      <p>Penchez-vous doucement en avant pour étirer votre dos.</p>
      <p>Durée : environ 60-90 secondes.</p>
    `;
  }

  content.innerHTML = `
    <div class="ritual-content">
      ${ritualText}
      <button class="btn btn-primary" onclick="closeModal(); ${onComplete ? 'arguments[0]()' : ''}">Finir</button>
    </div>
  `;

  modal.classList.add('show');

  const finishBtn = content.querySelector('button');
  finishBtn.onclick = () => {
    closeModal();
    if (onComplete) onComplete();
  };
}

function showTimerModal(taskIdx) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  let timerSeconds = 0;
  let timerInterval = null;
  let timerRunning = false;
  let totalDuration = 25 * 60;

  content.innerHTML = `
    <h3>Minuteur</h3>
    <div class="cloud-timer" id="cloud-timer">
      <div class="timer-progress" id="timer-progress"></div>
      <div class="timer-content">
        <div class="timer-controls">
          <button class="btn btn-secondary" onclick="adjustTimer(-5)">− 5 min</button>
          <button class="btn btn-secondary" onclick="adjustTimer(5)">+ 5 min</button>
        </div>
        <div class="timer-display" id="timer-display">25:00</div>
        <div class="timer-buttons">
          <button class="btn btn-primary" id="timer-start-btn">Démarrer</button>
          <button class="btn btn-secondary" id="timer-finish-btn">Finir</button>
        </div>
        <div class="micro-review">
          <textarea placeholder="Micro-review (optionnel)" id="micro-review-input"></textarea>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const startBtn = document.getElementById('timer-start-btn');
  const finishBtn = document.getElementById('timer-finish-btn');
  const display = document.getElementById('timer-display');
  const cloud = document.getElementById('cloud-timer');
  const progress = document.getElementById('timer-progress');

  window.adjustTimer = (minutes) => {
    if (!timerRunning) {
      totalDuration += minutes * 60;
      if (totalDuration < 60) totalDuration = 60;
      updateTimerDisplay();
    }
  };

  function updateTimerDisplay() {
    const mins = Math.floor(totalDuration / 60);
    const secs = totalDuration % 60;
    display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  startBtn.onclick = () => {
    if (!timerRunning) {
      timerRunning = true;
      startBtn.textContent = 'Pause';
      cloud.classList.add('pulsing');
      timerSeconds = 0;

      timerInterval = setInterval(() => {
        timerSeconds++;
        const remaining = totalDuration - timerSeconds;
        if (remaining <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          startBtn.textContent = 'Démarrer';
          cloud.classList.remove('pulsing');
          alert('Temps écoulé !');
        }

        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        display.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        const progressPercent = (timerSeconds / totalDuration) * 100;
        progress.style.borderColor = `rgba(255, 255, 255, ${progressPercent / 100})`;
      }, 1000);
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      startBtn.textContent = 'Démarrer';
      cloud.classList.remove('pulsing');
    }
  };

  finishBtn.onclick = () => {
    if (timerInterval) clearInterval(timerInterval);
    const reviewValue = document.getElementById('micro-review-input')?.value?.trim();
    if (reviewValue) {
      const today = getToday();
      if (!Array.isArray(state.microReviews[today])) {
        state.microReviews[today] = [];
      }
      state.microReviews[today].push({
        text: reviewValue,
        recordedAt: new Date().toISOString()
      });
      saveState();
      refreshWeeklyReviewIfVisible();
    }
    closeModal();
  };
}

function showReportModal(dateStr, taskIdx) {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const task = state.tasks[dateStr][taskIdx];
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const nextDayStr = nextDay.toISOString().split('T')[0];

  const reasons = [
    { value: 'trop-gros', label: 'Trop gros', micropas: 'Découper en 10 min' },
    { value: 'pas-clair', label: 'Pas clair', micropas: 'Écrire le titre précis' },
    { value: 'pas-temps', label: 'Pas le temps', micropas: 'Bloquer 5 min demain matin' },
    { value: 'distraction', label: 'Distraction', micropas: 'Ouvrir uniquement le document' },
    { value: 'peur', label: 'Peur/Perfectionnisme', micropas: 'Faire une version brouillon' }
  ];

  content.innerHTML = `
    <div class="reporter-form">
      <h3>Reporter la tâche</h3>
      <div class="form-group">
        <label>Pourquoi reporter ?</label>
        <div class="radio-group" id="reason-group">
          ${reasons.map(r => `
            <div class="radio-option">
              <input type="radio" name="reason" value="${r.value}" id="reason-${r.value}" data-micropas="${r.micropas}">
              <label for="reason-${r.value}">${r.label}</label>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label>Micropas suggéré</label>
        <input type="text" id="micropas-input" value="${reasons[0].micropas}">
      </div>
      <div class="form-group">
        <label>Reporter à</label>
        <input type="date" id="report-date-input" value="${nextDayStr}">
      </div>
      <div class="modal-buttons">
        <button class="btn btn-secondary" onclick="closeModal()">Annuler</button>
        <button class="btn btn-primary" id="save-report-btn">Enregistrer</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  const reasonInputs = document.querySelectorAll('input[name="reason"]');
  const micropasInput = document.getElementById('micropas-input');

  const defaultReasonInput = document.getElementById(`reason-${reasons[0].value}`);
  if (defaultReasonInput) {
    defaultReasonInput.checked = true;
  }

  reasonInputs.forEach(input => {
    input.onchange = () => {
      micropasInput.value = input.getAttribute('data-micropas');
    };
  });

  document.getElementById('save-report-btn').onclick = () => {
    const newDate = document.getElementById('report-date-input').value;
    const selectedReason = document.querySelector('input[name="reason"]:checked');
    const reasonValue = selectedReason ? selectedReason.value : reasons[0].value;

    ensureTasksForDate(newDate);

    const emptySlot = state.tasks[newDate].findIndex(t => isTaskEmpty(t));
    if (emptySlot !== -1) {
      state.tasks[newDate][emptySlot] = {
        ...task,
        status: 'planned'
      };
    }

    if (dateStr === getToday()) {
      state.tasks[dateStr][taskIdx] = createEmptyTask();
    }

    recordReportForDate(newDate, reasonValue);
    saveState();
    closeModal();
    renderDashboard();
    refreshWeeklyReviewIfVisible();
    alert('Tâche reportée !');
  };
}

function closeModal() {
  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (modal) {
    modal.classList.remove('show');
  }
  if (content) {
    content.classList.remove('template-wide');
    content.classList.remove('badge-modal-container');
  }
  setPlanifierTabsMode('editor');
}

function showBadgeModal(badge) {
  if (!badge) return;

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return;

  content.classList.remove('template-wide');
  content.classList.add('badge-modal-container');
  content.innerHTML = `
    <div class="badge-modal">
      <div class="badge-modal-icon" aria-hidden="true">${badge.icon}</div>
      <h3>Nouveau badge : ${badge.label}</h3>
      <p>${badge.threshold} jours consécutifs — continue !</p>
      <button class="btn btn-primary" id="badge-modal-close-btn">OK</button>
    </div>
  `;

  modal.classList.add('show');

  const closeBtn = document.getElementById('badge-modal-close-btn');
  if (closeBtn) {
    closeBtn.focus();
    closeBtn.onclick = () => closeModal();
  }
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#EAC4AF', '#EFC3C2', '#A68076', '#F7E6D6'];

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.y += p.speedY;
      p.x += p.speedX;

      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);

      if (p.y > canvas.height) {
        particles.splice(idx, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

document.getElementById('enable-notifications-btn')?.addEventListener('click', () => {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      const status = document.getElementById('notification-status');
      if (permission === 'granted') {
        status.textContent = '✓ Notifications activées';
        status.style.color = 'green';
      } else {
        status.textContent = '✗ Notifications refusées';
        status.style.color = 'red';
      }
    });
  } else {
    alert('Notifications non supportées par ce navigateur.');
  }
});

loadState();
initNavigation();
showView('aujourdhui');
