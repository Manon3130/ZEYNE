const STORAGE_KEY = 'ZEYNE_STATE_V1';

const ENCOURAGEMENT_MESSAGES = [
  'Bravo — 3/3 accomplies. Tu as tenu ton focus aujourd\'hui.',
  'Yes ! Journée validée ✨ Reviens demain avec le même élan.',
  'Objectif du jour atteint ✅ Tu avances, continue.',
  'Bien joué — tes 3 micro-tâches sont faites.',
  'Constance +1. Demain, on recommence.'
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

let state = {
  settings: { email: '', goalTitle: '', deadlineISO: '', startISO: '' },
  tasks: {},
  vignettes: ['', '', ''],
  kpiImage: '',
  mood: { motivation: 50, emoji: null },
  reports: {},
  microReviews: {}
};

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
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getDateString(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
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
  if (task.audio) {
    parts.push(task.audio);
  }
  return parts.join(' • ') || '';
}

function getLastSevenDates() {
  const dates = [];
  const today = new Date();
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

function computeCurrentStreak() {
  let streak = 0;
  const cursor = new Date();

  while (true) {
    const cursorStr = cursor.toISOString().split('T')[0];
    const doneCount = getTasksDoneCount(cursorStr);
    if (doneCount < 3) {
      break;
    }
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
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
  container.innerHTML = '';

  DAYS.forEach((day, idx) => {
    const accordion = document.createElement('div');
    accordion.className = 'day-accordion';

    const header = document.createElement('div');
    header.className = 'day-accordion-header';
    header.innerHTML = `<span>${day}</span><span>▼</span>`;

    const content = document.createElement('div');
    content.className = 'day-accordion-content';

    const dateStr = getDateString(idx);
    const tasksForDay = state.tasks[dateStr] || [];

    for (let i = 1; i <= 3; i++) {
      const taskData = tasksForDay[i - 1] || { title: '', moment: '', audio: 'Aucun', status: 'planned' };
      const taskForm = document.createElement('div');
      taskForm.className = 'task-form';
      taskForm.innerHTML = `
        <strong>Tâche ${i}</strong>
        <div class="task-form-row">
          <input type="text" placeholder="Titre de la tâche" data-day="${idx}" data-task="${i - 1}" data-field="title">
          <input type="time" data-day="${idx}" data-task="${i - 1}" data-field="moment">
          <select data-day="${idx}" data-task="${i - 1}" data-field="audio">
            <option value="Aucun">Aucun</option>
            <option value="respiration">Respiration</option>
            <option value="étirements">Étirements</option>
          </select>
        </div>
      `;

      const titleInput = taskForm.querySelector('input[data-field="title"]');
      const timeInput = taskForm.querySelector('input[data-field="moment"]');
      const audioSelect = taskForm.querySelector('select[data-field="audio"]');

      titleInput.value = taskData.title || '';
      if (typeof taskData.moment === 'string' && /^\d{2}:\d{2}$/.test(taskData.moment)) {
        timeInput.value = taskData.moment;
      }
      audioSelect.value = taskData.audio || 'Aucun';

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
  saveBtn.onclick = () => {
    const inputs = document.querySelectorAll('#planifier-days input, #planifier-days select');

    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const dateStr = getDateString(dayOffset);
      if (!state.tasks[dateStr]) {
        state.tasks[dateStr] = [
          { title: '', moment: '', audio: 'Aucun', status: 'planned' },
          { title: '', moment: '', audio: 'Aucun', status: 'planned' },
          { title: '', moment: '', audio: 'Aucun', status: 'planned' }
        ];
      }
    }

    inputs.forEach(input => {
      const dayIdx = parseInt(input.getAttribute('data-day'));
      const taskIdx = parseInt(input.getAttribute('data-task'));
      const field = input.getAttribute('data-field');

      if (dayIdx !== null && taskIdx !== null && field) {
        const dateStr = getDateString(dayIdx);
        if (state.tasks[dateStr] && state.tasks[dateStr][taskIdx]) {
          state.tasks[dateStr][taskIdx][field] = input.value;
        }
      }
    });

    saveState();
    alert('Planification enregistrée !');
    showView('aujourdhui');
  };
}

function renderDashboard() {
  renderDaysRemaining();
  renderDailyTasks();
  renderOtherDays();
  renderMood();
  renderKPIImage();
  updateMomentum();
}

function renderWeeklyReview() {
  const weeklyFullDaysEl = document.getElementById('weekly-full-days');
  const weeklySuccessRateEl = document.getElementById('weekly-success-rate');
  const weeklyReportsEl = document.getElementById('weekly-reports');
  const weeklyStreakEl = document.getElementById('weekly-streak');
  const weeklyGraphEl = document.getElementById('weekly-graph');
  const weeklyRecommendationEl = document.getElementById('weekly-recommendation');

  if (!weeklyFullDaysEl || !weeklySuccessRateEl || !weeklyReportsEl || !weeklyStreakEl || !weeklyGraphEl || !weeklyRecommendationEl) {
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

  const streak = computeCurrentStreak();
  weeklyStreakEl.textContent = `${streak} jour${streak > 1 ? 's' : ''}`;

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
  if (!state.tasks[today]) {
    state.tasks[today] = [
      { title: '', moment: '', audio: 'Aucun', status: 'planned' },
      { title: '', moment: '', audio: 'Aucun', status: 'planned' },
      { title: '', moment: '', audio: 'Aucun', status: 'planned' }
    ];
  }

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

    if (!state.tasks[dateStr]) {
      state.tasks[dateStr] = [
        { title: '', moment: '', audio: 'Aucun', status: 'planned' },
        { title: '', moment: '', audio: 'Aucun', status: 'planned' },
        { title: '', moment: '', audio: 'Aucun', status: 'planned' }
      ];
    }

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
  const task = state.tasks[today][taskIdx];
  if (!task) return;

  task.status = task.status === 'done' ? 'planned' : 'done';
  saveState();
  renderDailyTasks();
  updateMomentum();
  refreshWeeklyReviewIfVisible();
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

    if (!state.tasks[newDate]) {
      state.tasks[newDate] = [
        { title: '', moment: '', audio: 'Aucun', status: 'planned' },
        { title: '', moment: '', audio: 'Aucun', status: 'planned' },
        { title: '', moment: '', audio: 'Aucun', status: 'planned' }
      ];
    }

    const emptySlot = state.tasks[newDate].findIndex(t => !t.title || t.title.startsWith('Tâche'));
    if (emptySlot !== -1) {
      state.tasks[newDate][emptySlot] = {
        ...task,
        status: 'planned'
      };
    }

    if (dateStr === getToday()) {
      state.tasks[dateStr][taskIdx] = {
        title: '',
        moment: '',
        audio: 'Aucun',
        status: 'planned'
      };
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
  document.getElementById('modal-overlay').classList.remove('show');
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
