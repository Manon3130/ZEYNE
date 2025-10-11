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

const MOOD_DETAILS = {
  sad: { emoji: '😞', label: 'Bas' },
  tired: { emoji: '😴', label: 'Fatigué' },
  sick: { emoji: '🤒', label: 'Fragile' },
  happy: { emoji: '🙂', label: 'Positif' }
};

const AUDIO_DB_NAME = 'ZEYNE_AUDIO_DB';
const AUDIO_DB_VERSION = 1;
const AUDIO_STORE_NAME = 'audios';

const AUDIO_CATEGORIES = [
  { id: 'respiration', label: 'Respiration' },
  { id: 'etirements', label: 'Étirements' },
  { id: 'focus', label: 'Focus' },
  { id: 'autre', label: 'Autre' }
];

const DEFAULT_AUDIO_SLOTS = [
  { key: 'morning', label: 'Matin' },
  { key: 'afternoon', label: 'Après-midi' },
  { key: 'evening', label: 'Soir' }
];

const BUILTIN_AUDIOS = [
  {
    id: 'builtin-respiration',
    title: 'Respiration guidée 4-7-8',
    category: 'respiration',
    duration: 90,
    sourceType: 'builtin',
    source: 'assets/audio/respiration.wav',
    isBuiltin: true
  },
  {
    id: 'builtin-etirements',
    title: 'Étirements express',
    category: 'etirements',
    duration: 95,
    sourceType: 'builtin',
    source: 'assets/audio/etirements.wav',
    isBuiltin: true
  }
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

const NOTIFICATION_SLOT_DETAILS = {
  morning: { label: 'Matin', defaultTime: '09:00' },
  afternoon: { label: 'Après-midi', defaultTime: '14:00' },
  evening: { label: 'Soir', defaultTime: '19:00' }
};

const NOTIFICATION_SNOOZE_MINUTES = 10;
const MAX_TIMEOUT_DELAY = 2147483647;

function getLocalTimezone() {
  try {
    const options = Intl.DateTimeFormat().resolvedOptions();
    if (options && typeof options.timeZone === 'string' && options.timeZone) {
      return options.timeZone;
    }
  } catch (error) {
    console.warn('Impossible de déterminer le fuseau horaire', error);
  }
  return 'UTC';
}

function createDefaultNotificationsState() {
  return {
    enabled: true,
    timezone: getLocalTimezone(),
    slots: {
      morning: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.morning.defaultTime },
      afternoon: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.afternoon.defaultTime },
      evening: { enabled: true, time: NOTIFICATION_SLOT_DETAILS.evening.defaultTime }
    },
    dnd: { enabled: false, start: '22:00', end: '07:00' },
    sound: { beep: true }
  };
}

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
  moodHistory: {},
  reports: {},
  microReviews: {},
  audioLibrary: [],
  defaultAudioAssignments: { morning: null, afternoon: null, evening: null },
  streak: createDefaultStreakState(),
  badges: createDefaultBadgesState(),
  notifications: createDefaultNotificationsState()
};

let audioDBPromise = null;
let pendingAudioDraft = null;
let previewAudioState = { audio: null, entryId: null, revoke: null, button: null };
let modalAudioState = { audio: null, revoke: null };
const notificationRuntime = {
  timers: new Map(),
  nextOccurrences: new Map(),
  snoozes: new Map()
};
let upcomingReminderIntervalId = null;
let notificationsInitialized = false;
let notificationBeepContext = null;

const pwaInstallRuntime = {
  deferredPrompt: null,
  initialized: false,
  displayModeQuery: null
};

let lastTemplateApplication = null;

function getAudioDB() {
  if (audioDBPromise) {
    return audioDBPromise;
  }

  if (!('indexedDB' in window)) {
    return Promise.reject(new Error('IndexedDB non supporté'));
  }

  audioDBPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(AUDIO_DB_NAME, AUDIO_DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(AUDIO_STORE_NAME)) {
        db.createObjectStore(AUDIO_STORE_NAME);
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        audioDBPromise = null;
      };
      resolve(db);
    };

    request.onerror = () => {
      audioDBPromise = null;
      reject(request.error || new Error('Ouverture IndexedDB échouée'));
    };
  });

  return audioDBPromise;
}

function storeAudioBlob(id, blob) {
  return getAudioDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, 'readwrite');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    store.put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('Échec enregistrement audio'));
  }));
}

function getAudioBlob(id) {
  return getAudioDB().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(AUDIO_STORE_NAME, 'readonly');
    const store = tx.objectStore(AUDIO_STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error || new Error('Lecture audio impossible'));
  }));
}

function ensureAudioLibraryState() {
  if (!Array.isArray(state.audioLibrary)) {
    state.audioLibrary = [];
  }

  const nowISO = new Date().toISOString();
  const dedupMap = new Map();

  state.audioLibrary.forEach(entry => {
    if (!entry || !entry.id) return;
    if (!dedupMap.has(entry.id)) {
      dedupMap.set(entry.id, { ...entry });
    }
  });

  BUILTIN_AUDIOS.forEach(builtin => {
    const existing = dedupMap.get(builtin.id);
    if (existing) {
      dedupMap.set(builtin.id, {
        ...existing,
        title: existing.title || builtin.title,
        category: builtin.category,
        duration: builtin.duration,
        source: builtin.source,
        sourceType: 'builtin',
        isBuiltin: true
      });
    } else {
      dedupMap.set(builtin.id, {
        ...builtin,
        favorite: true,
        createdAt: nowISO
      });
    }
  });

  state.audioLibrary = Array.from(dedupMap.values()).map(entry => {
    const duration = Number(entry.duration);
    return {
      id: entry.id,
      title: entry.title || 'Audio',
      category: entry.category && AUDIO_CATEGORIES.some(cat => cat.id === entry.category)
        ? entry.category
        : 'autre',
      duration: Number.isFinite(duration) && duration > 0 ? duration : null,
      favorite: Boolean(entry.favorite),
      createdAt: entry.createdAt || nowISO,
      sourceType: entry.sourceType || (entry.isBuiltin ? 'builtin' : 'indexeddb'),
      source: entry.source || null,
      isBuiltin: Boolean(entry.isBuiltin)
    };
  });

  if (!state.defaultAudioAssignments || typeof state.defaultAudioAssignments !== 'object') {
    state.defaultAudioAssignments = { morning: null, afternoon: null, evening: null };
  }

  const validIds = new Set(state.audioLibrary.map(entry => entry.id));
  DEFAULT_AUDIO_SLOTS.forEach(slot => {
    const value = state.defaultAudioAssignments[slot.key];
    if (!validIds.has(value)) {
      state.defaultAudioAssignments[slot.key] = null;
    }
  });

  Object.keys(state.tasks || {}).forEach(dateStr => {
    const tasks = Array.isArray(state.tasks[dateStr]) ? state.tasks[dateStr] : [];
    tasks.forEach(task => {
      if (!task) return;
      task.audio = normalizeAudioValue(task.audio);
    });
  });
}

function normalizeTimeString(value, fallback) {
  const defaultValue = typeof fallback === 'string' ? fallback : '09:00';
  if (typeof value !== 'string') {
    return normalizeTimeString(defaultValue, '09:00');
  }
  const match = value.trim().match(/^([0-9]{1,2}):([0-9]{1,2})$/);
  if (!match) {
    return normalizeTimeString(defaultValue, '09:00');
  }
  let hours = Number.parseInt(match[1], 10);
  let minutes = Number.parseInt(match[2], 10);
  if (!Number.isFinite(hours) || hours < 0 || hours > 23) {
    hours = Number.parseInt(defaultValue.slice(0, 2), 10) || 0;
  }
  if (!Number.isFinite(minutes) || minutes < 0 || minutes > 59) {
    minutes = Number.parseInt(defaultValue.slice(3, 5), 10) || 0;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function minutesFromTimeString(value, fallbackMinutes = 0) {
  const normalized = normalizeTimeString(value, '00:00');
  if (!normalized) return fallbackMinutes;
  const [hoursStr, minutesStr] = normalized.split(':');
  const hours = Number.parseInt(hoursStr, 10);
  const minutes = Number.parseInt(minutesStr, 10);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return fallbackMinutes;
  return hours * 60 + minutes;
}

function isMinutesWithinRange(minutes, start, end) {
  if (start === end) return true;
  if (start < end) {
    return minutes >= start && minutes < end;
  }
  return minutes >= start || minutes < end;
}

function isDateInDnd(date) {
  if (!state.notifications?.dnd?.enabled) {
    return false;
  }
  const startMinutes = minutesFromTimeString(state.notifications.dnd.start, 22 * 60);
  const endMinutes = minutesFromTimeString(state.notifications.dnd.end, 7 * 60);
  const currentMinutes = date.getHours() * 60 + date.getMinutes();
  return isMinutesWithinRange(currentMinutes, startMinutes, endMinutes);
}

function adjustDateForDnd(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return null;
  }
  if (!state.notifications?.dnd?.enabled) {
    return new Date(date.getTime());
  }

  const startMinutes = minutesFromTimeString(state.notifications.dnd.start, 22 * 60);
  const endMinutes = minutesFromTimeString(state.notifications.dnd.end, 7 * 60);

  if (startMinutes === endMinutes) {
    return null;
  }

  let candidate = new Date(date.getTime());
  let safety = 0;

  while (safety < 4 && isDateInDnd(candidate)) {
    if (startMinutes < endMinutes) {
      candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      if (candidate.getTime() <= date.getTime()) {
        candidate.setDate(candidate.getDate() + 1);
      }
    } else {
      const currentMinutes = candidate.getHours() * 60 + candidate.getMinutes();
      if (currentMinutes >= startMinutes) {
        candidate.setDate(candidate.getDate() + 1);
        candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      } else {
        candidate.setHours(Math.floor(endMinutes / 60), endMinutes % 60, 0, 0);
      }
    }
    safety += 1;
  }

  if (safety >= 4 && isDateInDnd(candidate)) {
    return null;
  }

  return candidate;
}

function ensureNotificationState() {
  let changed = false;

  if (!state.notifications || typeof state.notifications !== 'object') {
    state.notifications = createDefaultNotificationsState();
    return true;
  }

  const notifications = state.notifications;
  const enabled = notifications.enabled !== false;
  if (notifications.enabled !== enabled) {
    notifications.enabled = enabled;
    changed = true;
  }

  if (!notifications.slots || typeof notifications.slots !== 'object') {
    notifications.slots = {};
    changed = true;
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    if (!notifications.slots[slotKey] || typeof notifications.slots[slotKey] !== 'object') {
      notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
      changed = true;
    }
    const slot = notifications.slots[slotKey];
    const normalizedEnabled = slot.enabled !== false;
    const normalizedTime = normalizeTimeString(slot.time, NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime);
    if (slot.enabled !== normalizedEnabled) {
      slot.enabled = normalizedEnabled;
      changed = true;
    }
    if (slot.time !== normalizedTime) {
      slot.time = normalizedTime;
      changed = true;
    }
  });

  if (!notifications.dnd || typeof notifications.dnd !== 'object') {
    notifications.dnd = { enabled: false, start: '22:00', end: '07:00' };
    changed = true;
  } else {
    const dndEnabled = notifications.dnd.enabled === true;
    const dndStart = normalizeTimeString(notifications.dnd.start, '22:00');
    const dndEnd = normalizeTimeString(notifications.dnd.end, '07:00');
    if (notifications.dnd.enabled !== dndEnabled) {
      notifications.dnd.enabled = dndEnabled;
      changed = true;
    }
    if (notifications.dnd.start !== dndStart) {
      notifications.dnd.start = dndStart;
      changed = true;
    }
    if (notifications.dnd.end !== dndEnd) {
      notifications.dnd.end = dndEnd;
      changed = true;
    }
  }

  if (!notifications.sound || typeof notifications.sound !== 'object') {
    notifications.sound = { beep: true };
    changed = true;
  } else {
    const beepEnabled = notifications.sound.beep !== false;
    if (notifications.sound.beep !== beepEnabled) {
      notifications.sound.beep = beepEnabled;
      changed = true;
    }
  }

  const timezone = getLocalTimezone();
  if (!notifications.timezone || typeof notifications.timezone !== 'string' || notifications.timezone !== timezone) {
    notifications.timezone = timezone;
    changed = true;
  }

  return changed;
}

function getAudioEntryById(id) {
  if (!id || id === 'Aucun') return null;
  return (state.audioLibrary || []).find(entry => entry.id === id) || null;
}

function getAudioCategoryLabel(categoryId) {
  const category = AUDIO_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.label : 'Autre';
}

function formatAudioDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '—';
  }
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  if (minutes === 0) {
    return `${secs} s`;
  }
  if (secs === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${secs.toString().padStart(2, '0')} s`;
}

function getAudioOptionsList(includeNone = true) {
  const options = [];
  if (includeNone) {
    options.push({ value: 'Aucun', label: 'Aucun' });
  }
  (state.audioLibrary || []).forEach(entry => {
    options.push({ value: entry.id, label: entry.title || 'Audio' });
  });
  return options;
}

function populateAudioSelectOptions(selectEl, selectedValue, includeNone = true) {
  if (!selectEl) return;
  const options = getAudioOptionsList(includeNone);
  selectEl.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
  const hasSelected = options.some(opt => opt.value === selectedValue);
  selectEl.value = hasSelected ? selectedValue : (includeNone ? 'Aucun' : options[0]?.value || '');
}

function populateAudioCategorySelect(selectEl, value) {
  if (!selectEl) return;
  selectEl.innerHTML = AUDIO_CATEGORIES.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join('');
  const hasValue = AUDIO_CATEGORIES.some(cat => cat.id === value);
  selectEl.value = hasValue ? value : 'autre';
}

function getDefaultAssignmentsForEntry(entryId) {
  if (!entryId || !state.defaultAudioAssignments) return [];
  return DEFAULT_AUDIO_SLOTS.filter(slot => state.defaultAudioAssignments[slot.key] === entryId).map(slot => slot.label);
}

function updateDefaultAssignment(slotKey, audioId) {
  if (!state.defaultAudioAssignments) {
    state.defaultAudioAssignments = { morning: null, afternoon: null, evening: null };
  }
  state.defaultAudioAssignments[slotKey] = audioId || null;
  saveState();
}

function stopPreviewAudio() {
  if (previewAudioState.audio) {
    try {
      previewAudioState.audio.pause();
    } catch (e) {
      console.warn(e);
    }
  }
  if (previewAudioState.revoke) {
    previewAudioState.revoke();
  }
  if (previewAudioState.button) {
    previewAudioState.button.dataset.state = '';
    previewAudioState.button.textContent = 'Lecture';
  }
  previewAudioState = { audio: null, entryId: null, revoke: null, button: null };
}

function stopModalAudio() {
  if (modalAudioState.audio) {
    try {
      modalAudioState.audio.pause();
    } catch (e) {
      console.warn(e);
    }
  }
  if (modalAudioState.revoke) {
    modalAudioState.revoke();
  }
  modalAudioState = { audio: null, revoke: null };
}

function resolveAudioSource(entry) {
  if (!entry) {
    return Promise.reject(new Error('Audio introuvable'));
  }

  if (entry.sourceType === 'builtin' && entry.source) {
    return Promise.resolve({ url: entry.source, revoke: null });
  }

  return getAudioBlob(entry.id).then(blob => {
    if (!blob) {
      throw new Error('Audio introuvable');
    }
    const objectUrl = URL.createObjectURL(blob);
    return {
      url: objectUrl,
      revoke: () => URL.revokeObjectURL(objectUrl)
    };
  });
}

function getResolvedAudioForTask(task) {
  if (!task) return null;
  const directId = normalizeAudioValue(task.audio);
  if (directId && directId !== 'Aucun') {
    const entry = getAudioEntryById(directId);
    if (entry) {
      return { id: directId, entry, isDefault: false };
    }
  }

  const slot = categorizeMomentSlot(task.moment);
  if (!slot) return null;
  const slotKey = slot === 'Matin' ? 'morning' : slot === 'Après-midi' ? 'afternoon' : slot === 'Soir' ? 'evening' : null;
  if (!slotKey) return null;
  const fallbackId = state.defaultAudioAssignments?.[slotKey];
  if (!fallbackId) return null;
  const entry = getAudioEntryById(fallbackId);
  if (!entry) return null;
  return { id: fallbackId, entry, isDefault: true, slot };
}

function resolveAudioIdForTask(task) {
  const resolved = getResolvedAudioForTask(task);
  return resolved ? resolved.id : null;
}

function prepareAudioDraftFromFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Fichier manquant'));
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const audio = document.createElement('audio');
    audio.preload = 'metadata';

    audio.onloadedmetadata = () => {
      const duration = audio.duration;
      URL.revokeObjectURL(objectUrl);
      if (!Number.isFinite(duration) || duration <= 0 || duration === Infinity) {
        reject(new Error('Durée invalide'));
        return;
      }
      const baseName = (file.name || 'Audio importé').replace(/\.[^/.]+$/, '');
      resolve({
        id: `audio-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        title: baseName.slice(0, 80) || 'Audio importé',
        category: 'autre',
        duration,
        file,
        isNew: true
      });
    };

    audio.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Lecture impossible'));
    };

    audio.src = objectUrl;
  });
}

function startAudioEdit(entryId) {
  const entry = getAudioEntryById(entryId);
  if (!entry) return;
  pendingAudioDraft = {
    id: entry.id,
    title: entry.title || '',
    category: entry.category || 'autre',
    duration: entry.duration || null,
    isNew: false
  };
  renderAudioLibrary();
}

function handleAudioEditorCancel() {
  pendingAudioDraft = null;
  renderAudioLibrary();
}

function handleAudioEditorSave() {
  if (!pendingAudioDraft) return;

  const titleInput = document.getElementById('audio-title-input');
  const categorySelect = document.getElementById('audio-category-input');
  if (!titleInput || !categorySelect) return;

  const title = titleInput.value.trim();
  const category = categorySelect.value || 'autre';

  if (!title) {
    showToast('Merci d’indiquer un titre.');
    titleInput.focus();
    return;
  }

  if (pendingAudioDraft.isNew) {
    const draft = pendingAudioDraft;
    if (!draft.file) {
      showToast('Fichier audio manquant.');
      return;
    }

    storeAudioBlob(draft.id, draft.file)
      .then(() => {
        state.audioLibrary.push({
          id: draft.id,
          title,
          category,
          duration: draft.duration || null,
          favorite: false,
          createdAt: new Date().toISOString(),
          sourceType: 'indexeddb',
          source: null,
          isBuiltin: false
        });
        pendingAudioDraft = null;
        ensureAudioLibraryState();
        saveState();
        renderAudioLibrary();
        showToast('Audio importé avec succès ✨');
      })
      .catch(() => {
        showToast('Impossible d’enregistrer cet audio.');
      });
  } else {
    const entry = getAudioEntryById(pendingAudioDraft.id);
    if (!entry) {
      pendingAudioDraft = null;
      renderAudioLibrary();
      return;
    }

    entry.title = title;
    entry.category = category;
    if (Number.isFinite(pendingAudioDraft.duration)) {
      entry.duration = pendingAudioDraft.duration;
    }

    pendingAudioDraft = null;
    saveState();
    renderAudioLibrary();
    showToast('Audio mis à jour.');
  }
}

async function toggleAudioPreview(entryId, button) {
  if (!entryId || !button) return;

  if (previewAudioState.entryId === entryId) {
    stopPreviewAudio();
    return;
  }

  stopPreviewAudio();

  const entry = getAudioEntryById(entryId);
  if (!entry) {
    showToast('Audio introuvable.');
    return;
  }

  try {
    const { url, revoke } = await resolveAudioSource(entry);
    const audio = new Audio(url);
    audio.onended = () => {
      stopPreviewAudio();
    };
    audio.onpause = () => {
      if (previewAudioState.audio === audio && !audio.ended) {
        stopPreviewAudio();
      }
    };

    await audio.play();

    button.dataset.state = 'active';
    button.textContent = 'Pause';
    previewAudioState = { audio, entryId, revoke, button };
  } catch (error) {
    showToast('Lecture impossible : format non supporté.');
    if (button) {
      button.dataset.state = '';
      button.textContent = 'Lecture';
    }
  }
}

function renderAudioLibrary() {
  ensureAudioLibraryState();

  const listEl = document.getElementById('audio-list');
  const emptyEl = document.getElementById('audio-empty');
  const editorEl = document.getElementById('library-editor');
  const editorTitle = document.getElementById('library-editor-title');
  const titleInput = document.getElementById('audio-title-input');
  const categorySelect = document.getElementById('audio-category-input');
  const durationDisplay = document.getElementById('audio-duration-display');
  const saveBtn = document.getElementById('audio-save-btn');
  const cancelBtn = document.getElementById('audio-cancel-btn');
  const importBtn = document.getElementById('import-audio-btn');
  const fileInput = document.getElementById('audio-file-input');

  if (!listEl || !emptyEl) return;

  if (importBtn && fileInput) {
    importBtn.onclick = () => {
      if (!('indexedDB' in window)) {
        showToast('Import audio indisponible sur cet appareil.');
        return;
      }
      fileInput.value = '';
      fileInput.click();
    };

    fileInput.onchange = async (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      stopPreviewAudio();
      try {
        pendingAudioDraft = await prepareAudioDraftFromFile(file);
        renderAudioLibrary();
      } catch (err) {
        pendingAudioDraft = null;
        showToast('Format audio non supporté ou fichier corrompu.');
      }
      fileInput.value = '';
    };
  }

  if (saveBtn) {
    saveBtn.onclick = handleAudioEditorSave;
  }

  if (cancelBtn) {
    cancelBtn.onclick = handleAudioEditorCancel;
  }

  if (pendingAudioDraft) {
    if (editorEl) editorEl.hidden = false;
    if (editorTitle) editorTitle.textContent = pendingAudioDraft.isNew ? 'Nouvel audio' : 'Modifier l\'audio';
    if (titleInput) titleInput.value = pendingAudioDraft.title || '';
    if (categorySelect) populateAudioCategorySelect(categorySelect, pendingAudioDraft.category || 'autre');
    if (durationDisplay) durationDisplay.textContent = formatAudioDuration(pendingAudioDraft.duration);
  } else {
    if (editorEl) editorEl.hidden = true;
    if (titleInput) titleInput.value = '';
    if (categorySelect) populateAudioCategorySelect(categorySelect, 'autre');
    if (durationDisplay) durationDisplay.textContent = '—';
  }

  document.querySelectorAll('.default-audio-select').forEach(select => {
    const slotKey = select.getAttribute('data-slot');
    const selectedValue = state.defaultAudioAssignments?.[slotKey] || 'Aucun';
    populateAudioSelectOptions(select, selectedValue);
    select.value = selectedValue;
    select.onchange = () => {
      const value = select.value;
      updateDefaultAssignment(slotKey, value === 'Aucun' ? null : value);
      renderAudioLibrary();
    };
  });

  const audios = [...(state.audioLibrary || [])];
  audios.sort((a, b) => {
    if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
    if (a.isBuiltin !== b.isBuiltin) return a.isBuiltin ? -1 : 1;
    return (a.title || '').localeCompare(b.title || '', 'fr', { sensitivity: 'base' });
  });

  listEl.innerHTML = '';

  if (!audios.length) {
    emptyEl.hidden = false;
    return;
  }

  emptyEl.hidden = true;

  audios.forEach(entry => {
    const item = document.createElement('div');
    item.className = 'audio-item';

    const main = document.createElement('div');
    main.className = 'audio-main';

    const titleEl = document.createElement('div');
    titleEl.className = 'audio-title';
    titleEl.textContent = entry.title || 'Audio';
    main.appendChild(titleEl);

    const metaEl = document.createElement('div');
    metaEl.className = 'audio-meta';
    const metaParts = [getAudioCategoryLabel(entry.category)];
    if (entry.duration) {
      metaParts.push(formatAudioDuration(entry.duration));
    }
    metaEl.textContent = metaParts.filter(Boolean).join(' • ');
    main.appendChild(metaEl);

    const tags = getDefaultAssignmentsForEntry(entry.id);
    if (entry.isBuiltin || tags.length) {
      const tagsWrap = document.createElement('div');
      tagsWrap.className = 'audio-tags';
      if (entry.isBuiltin) {
        const badge = document.createElement('span');
        badge.className = 'audio-badge';
        badge.textContent = 'Intégré';
        tagsWrap.appendChild(badge);
      }
      tags.forEach(label => {
        const tag = document.createElement('span');
        tag.className = 'audio-tag';
        tag.textContent = `Défaut ${label.toLowerCase()}`;
        tagsWrap.appendChild(tag);
      });
      if (tagsWrap.childElementCount > 0) {
        main.appendChild(tagsWrap);
      }
    }

    item.appendChild(main);

    const actions = document.createElement('div');
    actions.className = 'audio-actions';

    const previewBtn = document.createElement('button');
    previewBtn.type = 'button';
    previewBtn.className = 'audio-action-btn';
    previewBtn.dataset.action = 'preview';
    previewBtn.dataset.id = entry.id;
    if (previewAudioState.entryId === entry.id) {
      previewBtn.dataset.state = 'active';
      previewBtn.textContent = 'Pause';
    } else {
      previewBtn.textContent = 'Lecture';
    }
    actions.appendChild(previewBtn);

    const editBtn = document.createElement('button');
    editBtn.type = 'button';
    editBtn.className = 'audio-action-btn';
    editBtn.dataset.action = 'edit';
    editBtn.dataset.id = entry.id;
    editBtn.textContent = 'Éditer';
    actions.appendChild(editBtn);

    const favBtn = document.createElement('button');
    favBtn.type = 'button';
    favBtn.className = 'audio-favorite-btn';
    favBtn.dataset.action = 'favorite';
    favBtn.dataset.id = entry.id;
    favBtn.dataset.active = entry.favorite ? 'true' : 'false';
    favBtn.textContent = entry.favorite ? '★' : '☆';
    actions.appendChild(favBtn);

    item.appendChild(actions);
    listEl.appendChild(item);
  });

  listEl.querySelectorAll('button[data-action="preview"]').forEach(button => {
    button.onclick = () => toggleAudioPreview(button.dataset.id, button);
  });

  listEl.querySelectorAll('button[data-action="edit"]').forEach(button => {
    button.onclick = () => startAudioEdit(button.dataset.id);
  });

  listEl.querySelectorAll('button[data-action="favorite"]').forEach(button => {
    button.onclick = () => {
      const entry = getAudioEntryById(button.dataset.id);
      if (!entry) return;
      entry.favorite = !entry.favorite;
      saveState();
      renderAudioLibrary();
    };
  });
}
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = JSON.parse(saved);
      if (!state.vignettes) state.vignettes = ['', '', ''];
      if (!state.mood) state.mood = { motivation: 50, emoji: null };
      if (!state.moodHistory) state.moodHistory = {};
      if (!state.tasks) state.tasks = {};
      if (!state.settings.startISO) state.settings.startISO = '';
      if (!state.reports) state.reports = {};
      if (!state.microReviews) state.microReviews = {};
    } catch (e) {
      console.error('Error loading state:', e);
    }
  }

  ensureAudioLibraryState();
  const notificationsNormalized = ensureNotificationState();
  sanitizeStreakData();

  if (notificationsNormalized) {
    saveState();
  }
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
  if (audioValue === 'Aucun') return 'Aucun';
  const value = audioValue.toString();
  const lower = value.toLowerCase();
  if (lower === 'aucun') return 'Aucun';
  if (value === 'builtin-respiration' || value === 'builtin-etirements') {
    return value;
  }
  if (lower === 'respiration') return 'builtin-respiration';
  if (lower === 'étirements' || lower === 'etirements') return 'builtin-etirements';
  if ((state.audioLibrary || []).some(entry => entry.id === value)) {
    return value;
  }
  return 'Aucun';
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
  const entry = getAudioEntryById(audioValue);
  return entry ? entry.title : '';
}

function formatTaskAudioLabel(task) {
  if (!task) return '';
  const directLabel = formatAudioLabel(task.audio);
  if (directLabel) {
    return directLabel;
  }
  const resolved = getResolvedAudioForTask(task);
  if (resolved && resolved.entry) {
    return `${resolved.entry.title} (auto)`;
  }
  return '';
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
  const audioLabel = formatTaskAudioLabel(task);
  if (audioLabel) {
    parts.push(audioLabel);
  }
  return parts.join(' • ') || '';
}

function categorizeMomentSlot(momentValue) {
  if (!momentValue) return null;
  const raw = momentValue.toString().trim();
  if (!raw) return null;
  const value = raw.toLowerCase();

  if (value.includes('matin') || value.includes('a.m') || value.includes('am')) {
    return 'Matin';
  }

  if (
    value.includes('après') ||
    value.includes('apres') ||
    value.includes('apr') ||
    value.includes('apm') ||
    value.includes('pm') ||
    value.includes('midi')
  ) {
    return 'Après-midi';
  }

  if (
    value.includes('soir') ||
    value.includes('soirée') ||
    value.includes('nuit') ||
    value.includes('evening') ||
    value.includes('fin de journée')
  ) {
    return 'Soir';
  }

  const match = value.match(/(\d{1,2})(?::\d{2})?/);
  if (match) {
    const hour = parseInt(match[1], 10);
    if (!Number.isNaN(hour)) {
      if (hour < 12) return 'Matin';
      if (hour < 18) return 'Après-midi';
      if (hour <= 23) return 'Soir';
    }
  }

  return null;
}

function buildSparklinePath(values, width, height) {
  if (!Array.isArray(values) || values.length === 0) return '';

  const step = values.length > 1 ? width / (values.length - 1) : width;
  let path = '';
  let drawing = false;

  values.forEach((value, index) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      const clamped = Math.max(0, Math.min(100, value));
      const x = index * step;
      const y = height - (clamped / 100) * height;
      const command = drawing ? 'L' : 'M';
      path += `${command}${x.toFixed(2)},${y.toFixed(2)} `;
      drawing = true;
    } else {
      drawing = false;
    }
  });

  return path.trim();
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
    } else if (viewName === 'bibliotheque') {
      renderAudioLibrary();
    } else if (viewName === 'vignettes') {
      renderVignettes();
    } else if (viewName === 'hebdo') {
      renderWeeklyReview();
    } else if (viewName === 'notifications') {
      updateNotificationsForm();
      refreshNotificationPermissionState();
    }

    if (viewName !== 'bibliotheque') {
      stopPreviewAudio();
    }
  }
}

function initWeeklyTabs() {
  const tabButtons = document.querySelectorAll('.weekly-tab');
  const panels = document.querySelectorAll('.weekly-panel');

  const activateTab = (target) => {
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab') === target;
      btn.classList.toggle('weekly-tab-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(panel => {
      const isActive = panel.getAttribute('data-panel') === target;
      panel.classList.toggle('active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-tab');
      activateTab(target);
      renderWeeklyReview();
    });
  });

  const initialButton = Array.from(tabButtons).find(btn => btn.classList.contains('weekly-tab-active')) || tabButtons[0];
  if (initialButton) {
    activateTab(initialButton.getAttribute('data-tab'));
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
          <select data-day="${idx}" data-task="${i - 1}" data-field="audio"></select>
        </div>
      `;

      const titleInput = taskForm.querySelector('input[data-field="title"]');
      const momentInput = taskForm.querySelector('input[data-field="moment"]');
      const audioSelect = taskForm.querySelector('select[data-field="audio"]');

      titleInput.value = taskData.title || '';
      momentInput.value = taskData.moment || '';
      populateAudioSelectOptions(audioSelect, normalizeAudioValue(taskData.audio || 'Aucun'));

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
  updateUpcomingReminderBanner();
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
  const insightBestSlotEl = document.getElementById('insight-best-slot');
  const insightTopReportEl = document.getElementById('insight-top-report');
  const insightAvgMotivationEl = document.getElementById('insight-avg-motivation');
  const insightDominantMoodEl = document.getElementById('insight-dominant-mood');
  const insightCompletionBarsEl = document.getElementById('insight-completion-bars');
  const insightSparklineEl = document.getElementById('insight-motivation-sparkline');
  const insightTextEl = document.getElementById('insight-textual');
  const insightsContentEl = document.getElementById('weekly-insights-content');
  const insightsEmptyEl = document.getElementById('weekly-insights-empty');

  if (!weeklyFullDaysEl || !weeklySuccessRateEl || !weeklyReportsEl || !weeklyRegularityCurrentEl || !weeklyRegularityBestEl || !weeklyRegularityBadgeTextEl || !weeklyRegularityBadgeIconEl || !weeklyGraphEl || !weeklyRecommendationEl) {
    return;
  }

  const lastSevenDates = getLastSevenDates();
  const weeklyData = lastSevenDates.map(dateStr => ({
    dateStr,
    doneCount: getTasksDoneCount(dateStr),
    tasks: Array.isArray(state.tasks?.[dateStr]) ? state.tasks[dateStr] : []
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
    if (count > dominantCount || dominantReason === null) {
      dominantCount = count;
      dominantReason = reasonKey;
    } else if (count === dominantCount && dominantReason !== null) {
      if (reasonOrder[reasonKey] < reasonOrder[dominantReason]) {
        dominantReason = reasonKey;
      }
    }
  });

  const dominantReasonLabel = dominantReason ? (REPORT_REASON_DETAILS[dominantReason]?.label || dominantReason) : null;

  if (totalReports > 0) {
    if (dominantReasonLabel) {
      weeklyReportsEl.textContent = `${totalReports} report${totalReports > 1 ? 's' : ''} · Motif dominant : ${dominantReasonLabel}`;
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
    bar.title = `${doneCount}/3 tâches accomplies`;

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

  const momentStats = {
    'Matin': { total: 0, done: 0 },
    'Après-midi': { total: 0, done: 0 },
    'Soir': { total: 0, done: 0 }
  };

  weeklyData.forEach(({ tasks }) => {
    tasks.forEach(task => {
      if (!task) return;
      const slot = categorizeMomentSlot(task.moment);
      if (!slot) return;
      if (isTaskEmpty(task)) return;
      momentStats[slot].total += 1;
      if (task.status === 'done') {
        momentStats[slot].done += 1;
      }
    });
  });

  let bestSlotLabel = null;
  let bestSlotRate = 0;
  let bestSlotDone = 0;

  Object.entries(momentStats).forEach(([slot, stats]) => {
    if (!stats.total) return;
    const rate = stats.done / stats.total;
    if (bestSlotLabel === null || rate > bestSlotRate || (rate === bestSlotRate && stats.done > bestSlotDone)) {
      bestSlotLabel = slot;
      bestSlotRate = rate;
      bestSlotDone = stats.done;
    }
  });

  const moodHistory = state.moodHistory || {};
  const sanitizedMotivationValues = lastSevenDates.map(dateStr => {
    const entry = moodHistory[dateStr];
    if (entry && typeof entry.motivation === 'number' && !Number.isNaN(entry.motivation)) {
      return Math.max(0, Math.min(100, entry.motivation));
    }
    return null;
  });

  const recordedMotivations = sanitizedMotivationValues.filter(value => typeof value === 'number');
  const avgMotivation = recordedMotivations.length
    ? Math.round(recordedMotivations.reduce((acc, value) => acc + value, 0) / recordedMotivations.length)
    : null;

  const moodCounts = {};
  const moodOrder = {};
  let moodOrderIndex = 0;

  lastSevenDates.forEach(dateStr => {
    const entry = moodHistory[dateStr];
    if (!entry || !entry.emoji) return;
    const key = entry.emoji;
    if (moodCounts[key] === undefined) {
      moodCounts[key] = 0;
      moodOrder[key] = moodOrderIndex++;
    }
    moodCounts[key] += 1;
  });

  let dominantMoodKey = null;
  let dominantMoodCount = 0;

  Object.entries(moodCounts).forEach(([key, count]) => {
    if (dominantMoodKey === null || count > dominantMoodCount || (count === dominantMoodCount && moodOrder[key] < moodOrder[dominantMoodKey])) {
      dominantMoodKey = key;
      dominantMoodCount = count;
    }
  });

  const hasCompletionData = weeklyData.some(({ tasks }) => tasks.some(task => task && !isTaskEmpty(task)));
  const hasMotivationData = recordedMotivations.length > 0;
  const hasReportData = totalReports > 0;
  const hasBestSlot = Boolean(bestSlotLabel);
  const hasMoodData = Boolean(dominantMoodKey);
  const shouldShowInsights = hasCompletionData || hasMotivationData || hasReportData || hasBestSlot || hasMoodData;

  if (insightsContentEl && insightsEmptyEl) {
    if (shouldShowInsights) {
      insightsContentEl.removeAttribute('hidden');
      insightsEmptyEl.setAttribute('hidden', '');
    } else {
      insightsContentEl.setAttribute('hidden', '');
      insightsEmptyEl.removeAttribute('hidden');
    }
  }

  if (insightBestSlotEl) {
    if (bestSlotLabel) {
      const percent = Math.round(bestSlotRate * 100);
      const suffix = Number.isFinite(percent) ? ` · ${percent}%` : '';
      insightBestSlotEl.textContent = `${bestSlotLabel}${suffix}`;
    } else {
      insightBestSlotEl.textContent = '—';
    }
  }

  if (insightTopReportEl) {
    if (totalReports > 0 && dominantReasonLabel) {
      insightTopReportEl.textContent = dominantReasonLabel;
    } else {
      insightTopReportEl.textContent = '—';
    }
  }

  if (insightAvgMotivationEl) {
    insightAvgMotivationEl.textContent = avgMotivation !== null ? `${avgMotivation}%` : '—';
  }

  if (insightDominantMoodEl) {
    if (dominantMoodKey && MOOD_DETAILS[dominantMoodKey]) {
      const detail = MOOD_DETAILS[dominantMoodKey];
      insightDominantMoodEl.textContent = `${detail.emoji} ${detail.label}`;
    } else {
      insightDominantMoodEl.textContent = '—';
    }
  }

  if (insightCompletionBarsEl) {
    insightCompletionBarsEl.innerHTML = '';
    weeklyData.forEach(({ dateStr, doneCount }) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'insight-bar';

      const fill = document.createElement('div');
      fill.className = 'insight-bar-fill';
      const percent = Math.min(100, Math.max(0, Math.round((doneCount / 3) * 100)));
      fill.style.height = `${percent}%`;
      fill.title = `${doneCount}/3 tâches complétées`;

      const dayLabel = document.createElement('span');
      dayLabel.className = 'insight-bar-day';
      const date = new Date(dateStr);
      dayLabel.textContent = DAY_LABELS_SHORT[date.getDay()] || '';

      wrapper.appendChild(fill);
      wrapper.appendChild(dayLabel);
      insightCompletionBarsEl.appendChild(wrapper);
    });
  }

  if (insightSparklineEl) {
    insightSparklineEl.innerHTML = '';
    const pathData = buildSparklinePath(sanitizedMotivationValues, 120, 48);
    if (pathData) {
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 120 48');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.classList.add('insight-sparkline');

      const background = document.createElementNS(svgNS, 'rect');
      background.setAttribute('x', '0');
      background.setAttribute('y', '0');
      background.setAttribute('width', '120');
      background.setAttribute('height', '48');
      background.setAttribute('fill', 'rgba(166, 128, 118, 0.12)');

      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', pathData);

      svg.appendChild(background);
      svg.appendChild(path);
      insightSparklineEl.appendChild(svg);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'insight-placeholder';
      placeholder.textContent = '—';
      insightSparklineEl.appendChild(placeholder);
    }
  }

  if (insightTextEl) {
    let insightSentence = 'Pas encore assez de recul pour un insight personnalisé.';

    if (bestSlotLabel && dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
      insightSentence = `Ton meilleur taux est ${bestSlotLabel.toLowerCase()}. ${REPORT_REASON_DETAILS[dominantReason].recommendation}`;
    } else if (bestSlotLabel) {
      insightSentence = `Ton meilleur taux est ${bestSlotLabel.toLowerCase()}. Continue sur cette lancée !`;
    } else if (dominantReason && REPORT_REASON_DETAILS[dominantReason]) {
      const detail = REPORT_REASON_DETAILS[dominantReason];
      insightSentence = `${detail.label} ressort. ${detail.recommendation}`;
    } else if (avgMotivation !== null) {
      insightSentence = `Motivation moyenne ${avgMotivation}%. Ajuste ton énergie en conséquence.`;
    } else if (dominantMoodKey && MOOD_DETAILS[dominantMoodKey]) {
      const detail = MOOD_DETAILS[dominantMoodKey];
      insightSentence = `Humeur dominante : ${detail.emoji}. Calibre tes micro-pas en fonction.`;
    }

    insightTextEl.textContent = insightSentence;
  }
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

function updateDailyMoodHistory(partial = {}) {
  if (!state.moodHistory) state.moodHistory = {};
  const today = getToday();
  const existing = state.moodHistory[today] ? { ...state.moodHistory[today] } : {};
  const entry = { ...existing };

  if (partial.motivation !== undefined) {
    entry.motivation = partial.motivation;
  } else if (entry.motivation === undefined && typeof state.mood?.motivation === 'number') {
    entry.motivation = state.mood.motivation;
  }

  if (partial.emoji !== undefined) {
    entry.emoji = partial.emoji;
  } else if (entry.emoji === undefined && state.mood?.emoji) {
    entry.emoji = state.mood.emoji;
  }

  if (entry.motivation === undefined && entry.emoji === undefined) {
    return;
  }

  entry.updatedAt = new Date().toISOString();
  state.moodHistory[today] = entry;
}

function renderMood() {
  const slider = document.getElementById('motivation-slider');
  slider.value = state.mood.motivation || 50;

  slider.oninput = () => {
    const value = parseInt(slider.value);
    state.mood.motivation = value;
    updateDailyMoodHistory({ motivation: value });
    saveState();
    refreshWeeklyReviewIfVisible();
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
      updateDailyMoodHistory({ emoji });
      refreshWeeklyReviewIfVisible();
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

function getNotificationSlotLabel(slotKey) {
  return NOTIFICATION_SLOT_DETAILS[slotKey]?.label || slotKey;
}

function computeNextReminderDate(slotKey, referenceDate = new Date()) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    return null;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    return null;
  }

  const normalizedTime = normalizeTimeString(
    slotSettings.time,
    NOTIFICATION_SLOT_DETAILS[slotKey]?.defaultTime || '09:00'
  );

  const [hoursStr, minutesStr] = normalizedTime.split(':');
  const hours = Number.parseInt(hoursStr, 10) || 0;
  const minutes = Number.parseInt(minutesStr, 10) || 0;

  const reference = referenceDate instanceof Date && !Number.isNaN(referenceDate.getTime())
    ? new Date(referenceDate.getTime())
    : new Date();

  reference.setSeconds(0, 0);

  const candidate = new Date(reference.getTime());
  candidate.setHours(hours, minutes, 0, 0);

  if (candidate.getTime() <= reference.getTime()) {
    candidate.setDate(candidate.getDate() + 1);
  }

  const adjusted = adjustDateForDnd(candidate);
  return adjusted instanceof Date ? adjusted : null;
}

function cancelScheduledReminder(slotKey) {
  const timerId = notificationRuntime.timers.get(slotKey);
  if (timerId !== undefined) {
    clearTimeout(timerId);
    notificationRuntime.timers.delete(slotKey);
  }
  notificationRuntime.nextOccurrences.delete(slotKey);
}

function scheduleNotificationForSlot(slotKey, options = {}) {
  cancelScheduledReminder(slotKey);

  ensureNotificationState();

  if (!state.notifications.enabled) {
    notificationRuntime.snoozes.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    notificationRuntime.snoozes.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  const now = new Date();
  let targetDate = null;
  let wasSnoozed = false;

  if (options.forcedDate) {
    const forced = options.forcedDate instanceof Date
      ? options.forcedDate
      : new Date(options.forcedDate);
    if (forced instanceof Date && !Number.isNaN(forced.getTime()) && forced.getTime() > now.getTime()) {
      targetDate = forced;
    }
  }

  if (!targetDate && options.ignoreSnooze !== true) {
    const storedSnooze = notificationRuntime.snoozes.get(slotKey);
    if (storedSnooze instanceof Date && storedSnooze.getTime() > now.getTime()) {
      const adjustedSnooze = adjustDateForDnd(storedSnooze);
      if (adjustedSnooze) {
        targetDate = adjustedSnooze;
        notificationRuntime.snoozes.set(slotKey, adjustedSnooze);
        wasSnoozed = true;
      } else {
        notificationRuntime.snoozes.delete(slotKey);
      }
    } else if (storedSnooze) {
      notificationRuntime.snoozes.delete(slotKey);
    }
  }

  if (!targetDate) {
    const reference = options.fromDate instanceof Date && !Number.isNaN(options.fromDate.getTime())
      ? options.fromDate
      : now;
    targetDate = computeNextReminderDate(slotKey, reference);
  }

  if (!(targetDate instanceof Date) || Number.isNaN(targetDate.getTime())) {
    notificationRuntime.nextOccurrences.delete(slotKey);
    refreshNotificationIndicators();
    return;
  }

  if (targetDate.getTime() <= Date.now()) {
    window.setTimeout(() => {
      notificationRuntime.nextOccurrences.delete(slotKey);
      handleReminderTrigger(slotKey, targetDate, wasSnoozed);
    }, 0);
    return;
  }

  const delay = targetDate.getTime() - Date.now();

  if (delay > MAX_TIMEOUT_DELAY) {
    const timerId = window.setTimeout(() => {
      notificationRuntime.timers.delete(slotKey);
      scheduleNotificationForSlot(slotKey, { ...options, forcedDate: targetDate });
    }, MAX_TIMEOUT_DELAY);
    notificationRuntime.timers.set(slotKey, timerId);
    notificationRuntime.nextOccurrences.set(slotKey, targetDate);
    refreshNotificationIndicators();
    return;
  }

  const timerId = window.setTimeout(() => {
    notificationRuntime.timers.delete(slotKey);
    notificationRuntime.nextOccurrences.delete(slotKey);
    handleReminderTrigger(slotKey, targetDate, wasSnoozed);
  }, delay);

  notificationRuntime.timers.set(slotKey, timerId);
  notificationRuntime.nextOccurrences.set(slotKey, targetDate);
  refreshNotificationIndicators();
}

function scheduleAllNotifications(options = {}) {
  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    scheduleNotificationForSlot(slotKey, options);
  });
}

function getNextScheduledReminder() {
  let next = null;
  notificationRuntime.nextOccurrences.forEach((date, slotKey) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return;
    }
    if (date.getTime() < Date.now()) {
      return;
    }
    if (!next || date.getTime() < next.date.getTime()) {
      next = { slot: slotKey, date };
    }
  });
  return next;
}

function formatTimeForDisplay(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return '';
  }
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  } catch (error) {
    console.warn('Formatage heure impossible', error);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}

function refreshNotificationIndicators() {
  updateNotificationsStatus();
  updateUpcomingReminderBanner();
}

function updateUpcomingReminderBanner() {
  const banner = document.getElementById('next-reminder-banner');
  const textEl = document.getElementById('next-reminder-text');

  if (!banner || !textEl) {
    return;
  }

  if (!state.notifications?.enabled) {
    banner.hidden = true;
    return;
  }

  const upcoming = getNextScheduledReminder();
  if (!upcoming) {
    banner.hidden = true;
    return;
  }

  const diffMs = upcoming.date.getTime() - Date.now();
  if (diffMs < 0 || diffMs > 15 * 60 * 1000) {
    banner.hidden = true;
    return;
  }

  const minutes = Math.max(0, Math.round(diffMs / 60000));
  const slotLabel = getNotificationSlotLabel(upcoming.slot);
  let message;
  if (minutes <= 0) {
    message = `Rappel ${slotLabel} imminent`;
  } else if (minutes === 1) {
    message = `Rappel ${slotLabel} dans 1 minute`;
  } else {
    message = `Rappel ${slotLabel} dans ${minutes} minutes`;
  }

  textEl.textContent = message;
  banner.hidden = false;
}

function isSameDay(dateA, dateB = new Date()) {
  if (!(dateA instanceof Date) || Number.isNaN(dateA.getTime())) return false;
  if (!(dateB instanceof Date) || Number.isNaN(dateB.getTime())) return false;
  return dateA.getFullYear() === dateB.getFullYear()
    && dateA.getMonth() === dateB.getMonth()
    && dateA.getDate() === dateB.getDate();
}

function getNotificationPermissionLabel() {
  if (!('Notification' in window)) {
    return 'Notifications système : Non supportées';
  }
  if (!isPWAInstalled()) {
    return 'Notifications système : PWA non installée';
  }
  const permission = Notification.permission;
  if (permission === 'granted') {
    return 'Notifications système : Autorisées';
  }
  if (permission === 'denied') {
    return 'Notifications système : Refusées';
  }
  return 'Notifications système : Autorisation nécessaire';
}

function updateNotificationsStatus() {
  const statusEl = document.getElementById('notification-status-text');
  if (statusEl) {
    statusEl.classList.remove('notification-status-text-positive', 'notification-status-text-negative');

    if (!state.notifications?.enabled) {
      statusEl.textContent = 'Rappels désactivés.';
      statusEl.classList.add('notification-status-text-negative');
    } else {
      const activeSlots = Object.keys(NOTIFICATION_SLOT_DETAILS).filter(slotKey => state.notifications.slots?.[slotKey]?.enabled);
      if (!activeSlots.length) {
        statusEl.textContent = 'Aucun créneau actif.';
        statusEl.classList.add('notification-status-text-negative');
      } else {
        const upcoming = getNextScheduledReminder();
        if (upcoming) {
          const slotLabel = getNotificationSlotLabel(upcoming.slot);
          const formattedTime = formatTimeForDisplay(upcoming.date);
          const dayLabel = isSameDay(upcoming.date) ? 'aujourd’hui' : 'demain';
          statusEl.textContent = `Prochain rappel ${slotLabel} : ${formattedTime} (${dayLabel})`;
        } else {
          statusEl.textContent = 'Rappels activés. Programmation en cours…';
        }
        statusEl.classList.add('notification-status-text-positive');
      }
    }
  }

  const permissionEl = document.getElementById('notification-permission-state');
  if (permissionEl) {
    permissionEl.textContent = getNotificationPermissionLabel();
  }
}

function playNotificationBeep() {
  if (!state.notifications?.sound?.beep) {
    return;
  }

  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }
    if (!notificationBeepContext) {
      notificationBeepContext = new AudioContextClass();
    }
    const ctx = notificationBeepContext;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    const now = ctx.currentTime;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.5);
  } catch (error) {
    console.warn('Lecture du beep impossible', error);
  }
}

function showSystemNotification(slotKey, { body, isTest = false, scheduledFor = null } = {}) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  if (!isPWAInstalled()) return;
  if (!navigator.serviceWorker || !navigator.serviceWorker.ready) return;

  const slotLabel = getNotificationSlotLabel(slotKey);
  const notificationBody = body || (isTest
    ? `Notification de test — ${slotLabel}`
    : `C'est l'heure de ton rituel ${slotLabel}.`);

  navigator.serviceWorker.ready
    .then(registration => {
      registration.showNotification(`ZEYNE — ${slotLabel}`, {
        body: notificationBody,
        tag: `zeyne-reminder-${slotKey}`,
        renotify: true,
        data: {
          slot: slotKey,
          scheduledFor: scheduledFor instanceof Date && !Number.isNaN(scheduledFor.getTime())
            ? scheduledFor.toISOString()
            : null
        },
        actions: [
          { action: 'snooze-10', title: 'Snooze 10 min' }
        ]
      });
    })
    .catch(error => {
      console.warn('Notification système impossible', error);
    });
}

function deliverReminderFeedback(slotKey, { isTest = false, scheduledFor = null, wasSnoozed = false } = {}) {
  const slotLabel = getNotificationSlotLabel(slotKey);
  let toastMessage = isTest
    ? `Test rappel ${slotLabel} déclenché.`
    : `Rappel ${slotLabel} — c'est le moment de ton rituel !`;

  if (wasSnoozed && !isTest) {
    toastMessage = `Rappel ${slotLabel} (snooze) — c'est le moment de ton rituel !`;
  }

  showToast(toastMessage);
  playNotificationBeep();
  showSystemNotification(slotKey, { isTest, scheduledFor });
}

function handleReminderTrigger(slotKey, scheduledFor, wasSnoozed = false) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    refreshNotificationIndicators();
    return;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    refreshNotificationIndicators();
    return;
  }

  const now = new Date();
  if (isDateInDnd(now)) {
    const nextAllowed = adjustDateForDnd(new Date(now.getTime() + 1000));
    if (nextAllowed) {
      scheduleNotificationForSlot(slotKey, { forcedDate: nextAllowed, ignoreSnooze: true });
    }
    refreshNotificationIndicators();
    return;
  }

  notificationRuntime.snoozes.delete(slotKey);

  const scheduledDate = scheduledFor instanceof Date && !Number.isNaN(scheduledFor.getTime())
    ? scheduledFor
    : now;

  deliverReminderFeedback(slotKey, { scheduledFor: scheduledDate, wasSnoozed });

  const nextReference = new Date(scheduledDate.getTime() + 1000);
  scheduleNotificationForSlot(slotKey, { fromDate: nextReference, ignoreSnooze: true });
}

function applyNotificationSnooze(slotKey, baseDate) {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    showToast('Activez les rappels pour utiliser le snooze.');
    return false;
  }

  const slotSettings = state.notifications.slots?.[slotKey];
  if (!slotSettings || !slotSettings.enabled) {
    showToast(`Le créneau ${getNotificationSlotLabel(slotKey)} est désactivé.`);
    return false;
  }

  const reference = baseDate instanceof Date && !Number.isNaN(baseDate.getTime())
    ? baseDate
    : notificationRuntime.nextOccurrences.get(slotKey) || new Date();

  const baseTime = Math.max(Date.now(), reference.getTime());
  const snoozeDate = new Date(baseTime + NOTIFICATION_SNOOZE_MINUTES * 60000);
  const adjusted = adjustDateForDnd(snoozeDate);

  if (!adjusted) {
    showToast('Mode ne pas déranger actif : snooze indisponible.');
    return false;
  }

  notificationRuntime.snoozes.set(slotKey, adjusted);
  scheduleNotificationForSlot(slotKey, { forcedDate: adjusted });

  const formatted = formatTimeForDisplay(adjusted);
  showToast(`Rappel ${getNotificationSlotLabel(slotKey)} reporté à ${formatted}.`);
  return true;
}

function snoozeNextReminder() {
  const upcoming = getNextScheduledReminder();
  if (!upcoming) {
    return false;
  }
  return applyNotificationSnooze(upcoming.slot, upcoming.date);
}

function formatICSDateTimeUTC(date) {
  const utc = new Date(date.getTime());
  return `${utc.getUTCFullYear()}${String(utc.getUTCMonth() + 1).padStart(2, '0')}${String(utc.getUTCDate()).padStart(2, '0')}T${String(utc.getUTCHours()).padStart(2, '0')}${String(utc.getUTCMinutes()).padStart(2, '0')}${String(utc.getUTCSeconds()).padStart(2, '0')}Z`;
}

function formatICSDateTimeLocal(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}00`;
}

function generateNotificationsICS() {
  ensureNotificationState();

  if (!state.notifications.enabled) {
    return null;
  }

  const activeSlots = Object.keys(NOTIFICATION_SLOT_DETAILS).filter(slotKey => state.notifications.slots?.[slotKey]?.enabled);
  if (!activeSlots.length) {
    return null;
  }

  const timezone = state.notifications.timezone || getLocalTimezone();
  const now = new Date();
  const dtstamp = formatICSDateTimeUTC(now);

  const events = activeSlots.map(slotKey => {
    const timeStr = normalizeTimeString(state.notifications.slots[slotKey].time, NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime);
    const [hoursStr, minutesStr] = timeStr.split(':');
    const start = new Date(now.getTime());
    start.setSeconds(0, 0);
    start.setHours(Number.parseInt(hoursStr, 10) || 0, Number.parseInt(minutesStr, 10) || 0, 0, 0);
    if (start.getTime() <= now.getTime()) {
      start.setDate(start.getDate() + 1);
    }
    const end = new Date(start.getTime() + 10 * 60000);
    const uid = `zeyne-${slotKey}-${start.getTime()}@zeyne`;
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `SUMMARY:ZEYNE - Rappel ${getNotificationSlotLabel(slotKey)}`,
      `DTSTART;TZID=${timezone}:${formatICSDateTimeLocal(start)}`,
      `DTEND;TZID=${timezone}:${formatICSDateTimeLocal(end)}`,
      'RRULE:FREQ=DAILY',
      'END:VEVENT'
    ].join('\n');
  });

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ZEYNE//Notifications//FR
${events.join('\n')}
END:VCALENDAR`;
}

function downloadNotificationsICS() {
  const icsContent = generateNotificationsICS();
  if (!icsContent) {
    showToast('Aucun créneau actif à exporter.');
    return;
  }

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'zeyne-rappels.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Fichier calendrier généré ✅');
}

function isPWAInstalled() {
  const standaloneQuery = window.matchMedia ? window.matchMedia('(display-mode: standalone)') : null;
  const isStandaloneMatch = !!(standaloneQuery && standaloneQuery.matches);
  return isStandaloneMatch || window.navigator.standalone === true;
}

function isIOSDevice() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function updatePWAInstallUI() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  const iosHelpLink = document.getElementById('pwa-ios-help-link');
  const iosHelp = document.getElementById('pwa-ios-help');
  const isInstalled = isPWAInstalled();
  const isIOS = isIOSDevice();
  const canPromptInstall = !!pwaInstallRuntime.deferredPrompt;

  const setButtonState = (label, disabled) => {
    installBtn.textContent = label;
    installBtn.disabled = disabled;
    installBtn.setAttribute('aria-disabled', String(disabled));
  };

  if (iosHelpLink) {
    if (!isIOS || isInstalled) {
      iosHelpLink.hidden = true;
      iosHelpLink.setAttribute('aria-expanded', 'false');
      if (iosHelp) {
        iosHelp.hidden = true;
      }
    } else {
      iosHelpLink.hidden = false;
      iosHelpLink.setAttribute('aria-expanded', String(!iosHelp?.hidden));
    }
  }

  if (isInstalled) {
    setButtonState('Déjà installée', true);
    return;
  }

  if (isIOS) {
    setButtonState('Non pris en charge', true);
    return;
  }

  if (canPromptInstall) {
    setButtonState('Installer ZEYNE', false);
    return;
  }

  setButtonState('Installer ZEYNE', true);
}

function initPWAInstallPrompt() {
  const installBtn = document.getElementById('pwa-install-btn');
  if (!installBtn) return;

  const iosHelpLink = document.getElementById('pwa-ios-help-link');
  const iosHelp = document.getElementById('pwa-ios-help');
  const iosHelpClose = document.getElementById('pwa-ios-help-close');

  const toggleIOSHelp = (show) => {
    if (!iosHelp || !iosHelpLink) return;
    iosHelp.hidden = !show;
    iosHelpLink.setAttribute('aria-expanded', String(show));
    if (show) {
      iosHelp.setAttribute('role', 'region');
      iosHelp.setAttribute('aria-label', "Aide d'installation iOS");
      iosHelp.focus?.();
    }
  };

  if (!pwaInstallRuntime.initialized) {
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      pwaInstallRuntime.deferredPrompt = event;
      updatePWAInstallUI();
    });

    window.addEventListener('appinstalled', () => {
      pwaInstallRuntime.deferredPrompt = null;
      updatePWAInstallUI();
    });

    if (window.matchMedia) {
      pwaInstallRuntime.displayModeQuery = window.matchMedia('(display-mode: standalone)');
      const listener = () => updatePWAInstallUI();
      if (pwaInstallRuntime.displayModeQuery.addEventListener) {
        pwaInstallRuntime.displayModeQuery.addEventListener('change', listener);
      } else if (pwaInstallRuntime.displayModeQuery.addListener) {
        pwaInstallRuntime.displayModeQuery.addListener(listener);
      }
    }

    window.addEventListener('focus', () => updatePWAInstallUI());
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        updatePWAInstallUI();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && iosHelp && !iosHelp.hidden) {
        toggleIOSHelp(false);
      }
    });

    pwaInstallRuntime.initialized = true;
  }

  if (!installBtn.dataset.installBound) {
    installBtn.addEventListener('click', async () => {
      if (installBtn.disabled || !pwaInstallRuntime.deferredPrompt) {
        return;
      }
      const promptEvent = pwaInstallRuntime.deferredPrompt;
      promptEvent.prompt();
      const choice = await promptEvent.userChoice.catch(() => null);
      if (choice && choice.outcome === 'accepted') {
        pwaInstallRuntime.deferredPrompt = null;
      }
      updatePWAInstallUI();
    });
    installBtn.dataset.installBound = 'true';
  }

  if (iosHelpLink && !iosHelpLink.dataset.installBound) {
    iosHelpLink.addEventListener('click', () => {
      toggleIOSHelp(!(iosHelp && !iosHelp.hidden));
    });
    iosHelpLink.dataset.installBound = 'true';
  }

  if (iosHelpClose && !iosHelpClose.dataset.installBound) {
    iosHelpClose.addEventListener('click', () => {
      toggleIOSHelp(false);
      iosHelpLink?.focus();
    });
    iosHelpClose.dataset.installBound = 'true';
  }

  updatePWAInstallUI();
}

function startUpcomingReminderTicker() {
  if (upcomingReminderIntervalId) {
    clearInterval(upcomingReminderIntervalId);
  }
  upcomingReminderIntervalId = window.setInterval(() => {
    updateUpcomingReminderBanner();
  }, 30000);
}

function updateNotificationsForm() {
  ensureNotificationState();

  const timezoneEl = document.getElementById('notifications-timezone');
  if (timezoneEl) {
    timezoneEl.textContent = state.notifications.timezone || getLocalTimezone();
  }

  const masterToggle = document.getElementById('notifications-enabled-toggle');
  if (masterToggle) {
    masterToggle.checked = !!state.notifications.enabled;
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    const slotSettings = state.notifications.slots?.[slotKey] || { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
    const toggle = document.getElementById(`notifications-slot-${slotKey}-enabled`);
    const timeInput = document.getElementById(`notifications-slot-${slotKey}-time`);
    if (toggle) {
      toggle.checked = !!(slotSettings.enabled && state.notifications.enabled);
      toggle.disabled = !state.notifications.enabled;
    }
    if (timeInput) {
      timeInput.value = slotSettings.time || NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime;
      timeInput.disabled = !state.notifications.enabled || !slotSettings.enabled;
    }
  });

  const dndToggle = document.getElementById('notifications-dnd-enabled');
  if (dndToggle) {
    dndToggle.checked = !!state.notifications.dnd?.enabled;
    dndToggle.disabled = !state.notifications.enabled;
  }

  const dndStartInput = document.getElementById('notifications-dnd-start');
  const dndEndInput = document.getElementById('notifications-dnd-end');
  if (dndStartInput) {
    dndStartInput.value = state.notifications.dnd?.start || '22:00';
    dndStartInput.disabled = !state.notifications.enabled || !state.notifications.dnd?.enabled;
  }
  if (dndEndInput) {
    dndEndInput.value = state.notifications.dnd?.end || '07:00';
    dndEndInput.disabled = !state.notifications.enabled || !state.notifications.dnd?.enabled;
  }

  const soundToggle = document.getElementById('notifications-sound-beep');
  if (soundToggle) {
    soundToggle.checked = state.notifications.sound?.beep !== false;
    soundToggle.disabled = !state.notifications.enabled;
  }

  const snoozeBtn = document.getElementById('notifications-snooze-btn');
  if (snoozeBtn) {
    snoozeBtn.disabled = !state.notifications.enabled;
  }

  const testBtn = document.getElementById('notifications-test-btn');
  if (testBtn) {
    testBtn.disabled = !state.notifications.enabled;
  }

  const bannerSnoozeBtn = document.getElementById('next-reminder-snooze-btn');
  if (bannerSnoozeBtn) {
    bannerSnoozeBtn.disabled = !state.notifications.enabled;
  }

  refreshNotificationIndicators();
}

function refreshNotificationPermissionState() {
  updateNotificationsStatus();
}

function handleNotificationPermissionRequest() {
  if (!('Notification' in window)) {
    showToast('Notifications non supportées sur ce navigateur.');
    return;
  }
  Notification.requestPermission()
    .finally(() => {
      refreshNotificationPermissionState();
    });
}

function handleNotificationTest() {
  ensureNotificationState();
  if (!state.notifications.enabled) {
    showToast('Activez les rappels pour tester les notifications.');
    return;
  }
  const upcoming = getNextScheduledReminder();
  const slotKey = upcoming?.slot || 'morning';
  deliverReminderFeedback(slotKey, { isTest: true });
}

function initNotificationsModule() {
  ensureNotificationState();

  initPWAInstallPrompt();

  if (notificationsInitialized) {
    updateNotificationsForm();
    scheduleAllNotifications();
    refreshNotificationPermissionState();
    return;
  }

  notificationsInitialized = true;

  const masterToggle = document.getElementById('notifications-enabled-toggle');
  if (masterToggle) {
    masterToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.enabled = masterToggle.checked;
      saveState();
      updateNotificationsForm();
      scheduleAllNotifications({ ignoreSnooze: true });
    });
  }

  Object.keys(NOTIFICATION_SLOT_DETAILS).forEach(slotKey => {
    const toggle = document.getElementById(`notifications-slot-${slotKey}-enabled`);
    const timeInput = document.getElementById(`notifications-slot-${slotKey}-time`);

    if (toggle) {
      toggle.addEventListener('change', () => {
        ensureNotificationState();
        if (!state.notifications.slots[slotKey]) {
          state.notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
        }
        state.notifications.slots[slotKey].enabled = toggle.checked;
        if (!toggle.checked) {
          notificationRuntime.snoozes.delete(slotKey);
        }
        saveState();
        updateNotificationsForm();
        scheduleNotificationForSlot(slotKey, { ignoreSnooze: !toggle.checked });
      });
    }

    if (timeInput) {
      timeInput.addEventListener('change', () => {
        ensureNotificationState();
        if (!state.notifications.slots[slotKey]) {
          state.notifications.slots[slotKey] = { enabled: true, time: NOTIFICATION_SLOT_DETAILS[slotKey].defaultTime };
        }
        const normalized = normalizeTimeString(timeInput.value, state.notifications.slots[slotKey].time);
        state.notifications.slots[slotKey].time = normalized;
        timeInput.value = normalized;
        notificationRuntime.snoozes.delete(slotKey);
        saveState();
        scheduleNotificationForSlot(slotKey, { ignoreSnooze: true, fromDate: new Date() });
        updateNotificationsForm();
      });
    }
  });

  const dndToggle = document.getElementById('notifications-dnd-enabled');
  if (dndToggle) {
    dndToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.enabled = dndToggle.checked;
      saveState();
      updateNotificationsForm();
      scheduleAllNotifications({ ignoreSnooze: true });
    });
  }

  const dndStartInput = document.getElementById('notifications-dnd-start');
  if (dndStartInput) {
    dndStartInput.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.start = normalizeTimeString(dndStartInput.value, state.notifications.dnd.start);
      dndStartInput.value = state.notifications.dnd.start;
      saveState();
      scheduleAllNotifications({ ignoreSnooze: true });
      updateNotificationsForm();
    });
  }

  const dndEndInput = document.getElementById('notifications-dnd-end');
  if (dndEndInput) {
    dndEndInput.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.dnd.end = normalizeTimeString(dndEndInput.value, state.notifications.dnd.end);
      dndEndInput.value = state.notifications.dnd.end;
      saveState();
      scheduleAllNotifications({ ignoreSnooze: true });
      updateNotificationsForm();
    });
  }

  const soundToggle = document.getElementById('notifications-sound-beep');
  if (soundToggle) {
    soundToggle.addEventListener('change', () => {
      ensureNotificationState();
      state.notifications.sound.beep = soundToggle.checked;
      saveState();
      updateNotificationsForm();
    });
  }

  const snoozeBtn = document.getElementById('notifications-snooze-btn');
  if (snoozeBtn) {
    snoozeBtn.addEventListener('click', () => {
      if (!snoozeNextReminder()) {
        showToast('Aucun rappel à décaler pour le moment.');
      }
    });
  }

  const testBtn = document.getElementById('notifications-test-btn');
  if (testBtn) {
    testBtn.addEventListener('click', () => handleNotificationTest());
  }

  const permissionBtn = document.getElementById('enable-notifications-btn');
  if (permissionBtn) {
    permissionBtn.addEventListener('click', () => handleNotificationPermissionRequest());
  }

  const icsBtn = document.getElementById('notifications-ics-btn');
  if (icsBtn) {
    icsBtn.addEventListener('click', () => downloadNotificationsICS());
  }

  const bannerSnoozeBtn = document.getElementById('next-reminder-snooze-btn');
  if (bannerSnoozeBtn) {
    bannerSnoozeBtn.addEventListener('click', () => {
      if (!snoozeNextReminder()) {
        showToast('Aucun rappel imminent à snoozer.');
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      const { data } = event;
      if (data && data.type === 'NOTIFICATION_SNOOZE') {
        const slotKey = data.slot || getNextScheduledReminder()?.slot;
        if (slotKey) {
          const targetDate = notificationRuntime.nextOccurrences.get(slotKey) || new Date();
          applyNotificationSnooze(slotKey, targetDate);
        }
      }
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      scheduleAllNotifications();
      refreshNotificationPermissionState();
    }
    refreshNotificationIndicators();
  });

  window.addEventListener('focus', () => {
    refreshNotificationPermissionState();
    refreshNotificationIndicators();
  });

  updateNotificationsForm();
  scheduleAllNotifications();
  startUpcomingReminderTicker();
  refreshNotificationPermissionState();
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

window.startTask = async function(taskIdx) {
  const today = getToday();
  ensureTasksForDate(today);
  const task = state.tasks[today][taskIdx];
  if (!task) return;

  const audioId = resolveAudioIdForTask(task);
  if (audioId) {
    await openAudioRitualModal(audioId, task).catch(() => true);
  }
  showTimerModal(taskIdx);
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

function openAudioRitualModal(audioId, task) {
  stopPreviewAudio();
  stopModalAudio();

  const modal = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');
  if (!modal || !content) return Promise.resolve(true);

  const entry = getAudioEntryById(audioId);
  const resolvedInfo = task ? getResolvedAudioForTask(task) : null;

  return new Promise(resolve => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      stopModalAudio();
      closeModal();
      resolve(true);
    };

    const skipWithMessage = () => {
      if (finished) return;
      showToast('Aucun audio');
      finish();
    };

    if (!entry) {
      skipWithMessage();
      return;
    }

    resolveAudioSource(entry)
      .then(source => {
        if (finished) {
          if (source.revoke) source.revoke();
          return;
        }

        const metaParts = [getAudioCategoryLabel(entry.category)];
        if (entry.duration) {
          metaParts.push(formatAudioDuration(entry.duration));
        }
        const assignmentLine = resolvedInfo?.isDefault
          ? `<p class="audio-meta">Assignation ${resolvedInfo.slot.toLowerCase()}</p>`
          : '';

        content.innerHTML = `
          <div class="ritual-content audio-ritual-modal">
            <h3>${entry.title}</h3>
            <p class="audio-meta">${metaParts.filter(Boolean).join(' • ')}</p>
            ${assignmentLine}
            <div class="audio-ritual-controls">
              <button class="btn btn-secondary" id="modal-audio-toggle">Lecture</button>
              <button class="btn btn-primary" id="modal-audio-continue">Commencer</button>
            </div>
          </div>
        `;

        modal.classList.add('show');

        const toggleBtn = document.getElementById('modal-audio-toggle');
        const continueBtn = document.getElementById('modal-audio-continue');

        const audio = new Audio(source.url);
        modalAudioState = { audio, revoke: source.revoke };

        audio.onerror = () => {
          skipWithMessage();
        };

        if (toggleBtn) {
          toggleBtn.onclick = async () => {
            try {
              if (audio.paused) {
                await audio.play();
                toggleBtn.textContent = 'Pause';
              } else {
                audio.pause();
                audio.currentTime = 0;
                toggleBtn.textContent = 'Lecture';
              }
            } catch (err) {
              showToast('Lecture impossible : interaction requise ou format non supporté.');
            }
          };
        }

        audio.onended = () => {
          if (toggleBtn) toggleBtn.textContent = 'Lecture';
          audio.currentTime = 0;
        };

        audio.onpause = () => {
          if (toggleBtn) toggleBtn.textContent = 'Lecture';
        };

        if (continueBtn) {
          continueBtn.onclick = finish;
        }
      })
      .catch(() => {
        skipWithMessage();
      });
  });
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
  stopModalAudio();
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

loadState();
loadState();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(error => {
    console.warn('Enregistrement du service worker impossible', error);
  });
}

initNotificationsModule();
initNavigation();
initWeeklyTabs();
showView('aujourdhui');
