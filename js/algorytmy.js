// js/algorytmy.js - Logika platformy zadań algorytmicznych dla matury rozszerzonej z informatyki
// Pełne środowisko programistyczne w przeglądarce (Pyodide), testy jednostkowe, postęp w localStorage

(function () {
  'use strict';

  // --- Stale ---
  var STORAGE_PROGRESS_KEY = 'algo_progress_v1';
  var STORAGE_CODE_PREFIX  = 'algo_code_';
  var PYODIDE_CDN          = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
  var PYODIDE_INDEX_URL    = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/';
  var PYODIDE_RUN_TIMEOUT_MS = 5000;
  var PYODIDE_MAX_CODE_LENGTH = 100000;

  var DIFFICULTY_LABELS = {
    easy:   'Łatwe',
    medium: 'Średnie',
    hard:   'Trudne'
  };

  function polishPlural(n, one, few, many) {
    var abs = Math.abs(n);
    if (abs === 1) return one;
    var mod10 = abs % 10;
    var mod100 = abs % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
      return few;
    }
    return many;
  }

  // --- Stan aplikacji ---
  var state = {
    view:           'categories', // 'categories' | 'tasklist' | 'task'
    currentCat:     null,
    currentTaskId:  null,
    currentFilter:  'all',
    pyodideWorker:  null,
    pyodideWorkerUrl: null,
    pyodideState:   'idle', // 'idle' | 'loading' | 'ready' | 'error'
    pyodidePromise: null,
    runRequestId:   0
  };

  var elements = {};

  // --- Inicjalizacja ---
  function init() {
    document.documentElement.setAttribute('data-theme', 'dark');
    cacheElements();
    setCurrentYear();
    initScrollHeader();
    bindHashRoute();
    routeFromHash();
  }

  function cacheElements() {
    elements.main      = document.getElementById('algo-main');
    elements.header    = document.getElementById('site-header');
    elements.yearSpan  = document.getElementById('current-year');
    elements.backToTop = document.getElementById('back-to-top');
  }

  function setCurrentYear() {
    if (elements.yearSpan) {
      elements.yearSpan.textContent = new Date().getFullYear();
    }
  }

  function initScrollHeader() {
    if (!elements.header) return;
    window.addEventListener('scroll', function () {
      elements.header.classList.toggle('header--scrolled', window.scrollY > 10);
    }, { passive: true });

    if (elements.backToTop) {
      window.addEventListener('scroll', function () {
        var show = window.scrollY > 400;
        elements.backToTop.classList.toggle('is-visible', show);
        elements.backToTop.hidden = !show;
      }, { passive: true });

      elements.backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // --- Routing przez hash ---
  function bindHashRoute() {
    window.addEventListener('hashchange', routeFromHash);
  }

  function routeFromHash() {
    var hash = window.location.hash.slice(1);
    if (!hash) {
      renderCategories();
      return;
    }
    if (hash === 'task-losowe') {
      var randomTask = getRandomTask(null);
      if (randomTask) {
        navigate('task-' + randomTask.id);
      } else {
        renderCategories();
      }
      return;
    }
    if (hash.startsWith('category-')) {
      var catId = hash.slice('category-'.length);
      renderTaskList(catId);
    } else if (hash.startsWith('task-')) {
      var taskId = hash.slice('task-'.length);
      renderTaskView(taskId);
    } else {
      renderCategories();
    }
  }

  function navigate(hash) {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // --- Zarzadzanie postepem i kodem (localStorage) ---
  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PROGRESS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveProgress(taskId) {
    var p = loadProgress();
    if (!p.done) p.done = {};
    p.done[taskId] = true;
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(p));
    } catch (e) {}
  }

  function isDone(taskId) {
    var p = loadProgress();
    return !!(p.done && p.done[taskId]);
  }

  function getDoneCountForCat(catId) {
    var p = loadProgress();
    if (!p.done) return 0;
    var tasks = getTasksForCat(catId);
    return tasks.filter(function (t) { return p.done[t.id]; }).length;
  }

  function getTotalDoneCount() {
    var p = loadProgress();
    return p.done ? Object.keys(p.done).length : 0;
  }

  function saveUserCode(taskId, code) {
    try {
      localStorage.setItem(STORAGE_CODE_PREFIX + taskId, code);
    } catch (e) {}
  }

  function loadUserCode(taskId, fallback) {
    try {
      var saved = localStorage.getItem(STORAGE_CODE_PREFIX + taskId);
      return (saved !== null && saved !== undefined) ? saved : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function clearUserCode(taskId) {
    try {
      localStorage.removeItem(STORAGE_CODE_PREFIX + taskId);
    } catch (e) {}
  }

  function clearAllUserCode() {
    try {
      var toRemove = [];
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key && key.indexOf(STORAGE_CODE_PREFIX) === 0) {
          toRemove.push(key);
        }
      }
      for (var j = 0; j < toRemove.length; j++) {
        localStorage.removeItem(toRemove[j]);
      }
    } catch (e) {}
  }

  // --- Pobieranie danych ---
  function getTasksForCat(catId) {
    if (!window.ALGO_TASKS) return [];
    return window.ALGO_TASKS.filter(function (t) { return t.category === catId; });
  }

  function getTaskById(taskId) {
    if (!window.ALGO_TASKS) return null;
    for (var i = 0; i < window.ALGO_TASKS.length; i++) {
      if (window.ALGO_TASKS[i].id === taskId) return window.ALGO_TASKS[i];
    }
    return null;
  }

  function getCategoryMeta(catId) {
    if (!window.ALGO_CATEGORIES) return null;
    for (var i = 0; i < window.ALGO_CATEGORIES.length; i++) {
      if (window.ALGO_CATEGORIES[i].id === catId) return window.ALGO_CATEGORIES[i];
    }
    return null;
  }

  function getRandomTask(catId) {
    var pool = catId ? getTasksForCat(catId) : (window.ALGO_TASKS || []);
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function getAdjacentTask(taskId) {
    var tasks = window.ALGO_TASKS || [];
    var idx   = tasks.findIndex(function (t) { return t.id === taskId; });
    return {
      prev: idx > 0 ? tasks[idx - 1] : null,
      next: idx < tasks.length - 1 ? tasks[idx + 1] : null
    };
  }

  // --- Widok: Kategorie (Strona główna /algorytmy/) ---
  function renderCategories() {
    state.view = 'categories';
    var cats = window.ALGO_CATEGORIES || [];
    var allTasks = window.ALGO_TASKS || [];
    var totalDone = getTotalDoneCount();

    var html = '<section class="hero has-breadcrumbs" aria-labelledby="algo-title">'
      + '<div class="container"><div class="hero-content">'
      + breadcrumbs([{ label: 'Algorytmy', href: null }])
      + '<h1 id="algo-title" class="hero-title"><span class="aurora-word">Algorytmy.<span class="aurora-beam" aria-hidden="true"></span></span></h1>'
      + '<p class="hero-description">'
      + 'Rozwiązuj zadania algorytmiczne z arkuszy CKE '
      + 'bezpośrednio w przeglądarce za pomocą języka Python. Testuj swój kod w czasie rzeczywistym.'
      + '</p>'
      + '<div class="hero-cta-group">'
      + '<a href="#task-losowe" class="btn-cta">Rozwiąż losowe zadanie</a>'
      + '<span class="pill-badge" style="padding:10px 18px;font-size:0.875rem">Ukończono ' + totalDone + ' z ' + allTasks.length + ' ' + (allTasks.length === 1 ? 'zadania' : 'zadań') + '</span>'
      + '</div>'
      + '</div></div></section>'

      + '<section class="algo-main-section" aria-labelledby="algo-cats-heading">'
      + '<div class="container">'
      + '<div class="algo-section-header">'
      + '<div>'
      + '<h2 id="algo-cats-heading" class="algo-section-heading">Kategorie zadań CKE</h2>'
      + '<span class="algo-section-summary">' + cats.length + ' ' + polishPlural(cats.length, 'kategoria', 'kategorie', 'kategorii') + ' · ' + allTasks.length + ' ' + polishPlural(allTasks.length, 'zadanie programistyczne', 'zadania programistyczne', 'zadań programistycznych') + '</span>'
      + '</div>'
      + '<div class="algo-actions-row">'
      + (totalDone > 0 ? '<button type="button" class="algo-btn-secondary" id="algo-reset-all-btn">Wyczyść cały postęp</button>' : '')
      + '<button type="button" class="algo-btn-secondary" id="algo-random-btn">'
      + randomIconSvg()
      + '<span>Losowe zadanie</span>'
      + '</button>'
      + '</div>'
      + '</div>'
      + '<div class="algo-category-grid">';

    cats.forEach(function (cat) {
      var tasks = getTasksForCat(cat.id);
      var done  = getDoneCountForCat(cat.id);
      var pct   = tasks.length ? Math.round((done / tasks.length) * 100) : 0;

      html += '<a class="algo-cat-card" href="#category-' + cat.id + '" aria-label="' + escHtml(cat.label) + ', ' + tasks.length + ' ' + polishPlural(tasks.length, 'zadanie', 'zadania', 'zadań') + '">'
        + '<div class="card-meta">'
          + '<span class="pill-badge">' + tasks.length + ' ' + polishPlural(tasks.length, 'zadanie', 'zadania', 'zadań') + '</span>'
          + (done > 0 ? '<span class="pill-badge pill-badge--done">Ukończono ' + done + '/' + tasks.length + '</span>' : '<span class="pill-badge">0/' + tasks.length + '</span>')
        + '</div>'
        + '<h3 class="card-title">' + escHtml(cat.label) + '</h3>'
        + '<p class="algo-cat-desc">' + escHtml(cat.description) + '</p>'
        + '<div class="algo-progress-wrap">'
          + '<div class="algo-progress-info">'
            + '<span>Postęp</span>'
            + '<span class="algo-progress-percent">' + pct + '%</span>'
          + '</div>'
          + '<div class="algo-progress-track">'
            + '<div class="algo-progress-bar" style="width:' + pct + '%"></div>'
          + '</div>'
        + '</div>'
        + '<div class="card-links">'
          + '<span class="card-link">'
            + '<span>Przejdź do zadań</span>'
            + arrowSvg()
          + '</span>'
        + '</div>'
      + '</a>';
    });

    html += '</div></div></section>';
    setContent(html);

    var randomBtn = document.getElementById('algo-random-btn');
    if (randomBtn) {
      randomBtn.addEventListener('click', function () {
        var t = getRandomTask(null);
        if (t) navigate('task-' + t.id);
      });
    }

    var resetAllBtn = document.getElementById('algo-reset-all-btn');
    if (resetAllBtn) {
      resetAllBtn.addEventListener('click', function () {
        if (window.confirm('Czy na pewno chcesz usunąć cały postęp rozwiązanych zadań? Spowoduje to także przywrócenie kodu początkowego we wszystkich zadaniach.')) {
          try {
            localStorage.removeItem(STORAGE_PROGRESS_KEY);
          } catch (e) {}
          clearAllUserCode();
          renderCategories();
        }
      });
    }
  }

  // --- Widok: Lista zadań w kategorii ---
  function renderTaskList(catId) {
    state.view       = 'tasklist';
    state.currentCat = catId;

    var cat   = getCategoryMeta(catId);
    var tasks = getTasksForCat(catId);

    if (!cat) {
      renderCategories();
      return;
    }

    var doneCount = getDoneCountForCat(catId);

    var html = '<section class="hero has-breadcrumbs" aria-labelledby="algo-cat-title">'
      + '<div class="container"><div class="hero-content">'
      + breadcrumbs([
          { label: 'Algorytmy', href: '#' },
          { label: cat.label, href: null }
        ])
      + '<h1 id="algo-cat-title" class="hero-title">' + escHtml(cat.label) + '.</h1>'
      + '<p class="hero-description">' + escHtml(cat.description) + '</p>'
      + '<div class="hero-cta-group">'
      + '<button type="button" class="btn-cta" id="algo-cat-random-btn">Rozwiąż losowe z tej kategorii</button>'
      + '<a href="#" class="algo-btn-secondary">Wróć do wszystkich kategorii</a>'
      + (doneCount > 0 ? '<button type="button" class="algo-btn-secondary" id="algo-reset-cat-btn">Wyczyść postęp w kategorii</button>' : '')
      + '</div>'
      + '</div></div></section>'

      + '<section class="algo-main-section" aria-labelledby="algo-tasks-heading">'
      + '<div class="container">'
      + '<div class="algo-section-header">'
      + '<div>'
      + '<h2 id="algo-tasks-heading" class="algo-section-heading">Zadania programistyczne</h2>'
      + '<span class="algo-section-summary">Kategoria: ' + escHtml(cat.label) + ' · Ukończono ' + doneCount + ' z ' + tasks.length + '</span>'
      + '</div>'
      + '</div>'

      // Filtry trudności
      + renderFilterPills(tasks)

      + '<div class="algo-task-list" id="algo-task-items-container">'
      + renderTaskRows(tasks, 'all')
      + '</div>'
      + '</div></section>';

    setContent(html);
    bindListEvents(tasks, cat);
  }

  function renderFilterPills(tasks) {
    return '<div class="algo-filter-pills" role="radiogroup" aria-label="Filtruj według trudności">'
      + '<button type="button" class="algo-filter-chip is-active" data-filter="all" role="radio" aria-checked="true">'
      + 'Wszystkie'
      + '<span class="algo-filter-chip-count">' + tasks.length + '</span>'
      + '</button>'
      + '<button type="button" class="algo-filter-chip" data-filter="easy" role="radio" aria-checked="false">'
      + 'Łatwe'
      + '<span class="algo-filter-chip-count">' + countByDiff(tasks, 'easy') + '</span>'
      + '</button>'
      + '<button type="button" class="algo-filter-chip" data-filter="medium" role="radio" aria-checked="false">'
      + 'Średnie'
      + '<span class="algo-filter-chip-count">' + countByDiff(tasks, 'medium') + '</span>'
      + '</button>'
      + '<button type="button" class="algo-filter-chip" data-filter="hard" role="radio" aria-checked="false">'
      + 'Trudne'
      + '<span class="algo-filter-chip-count">' + countByDiff(tasks, 'hard') + '</span>'
      + '</button>'
      + '</div>';
  }

  function bindListEvents(tasks, cat) {
    var catRandomBtn = document.getElementById('algo-cat-random-btn');
    if (catRandomBtn) {
      catRandomBtn.addEventListener('click', function () {
        var t = getRandomTask(cat ? cat.id : null);
        if (t) navigate('task-' + t.id);
      });
    }

    var catResetBtn = document.getElementById('algo-reset-cat-btn');
    if (catResetBtn && cat) {
      catResetBtn.addEventListener('click', function () {
        if (window.confirm('Czy na pewno chcesz usunąć postęp dla zadań z kategorii ' + cat.label + '? Spowoduje to także przywrócenie kodu początkowego dla zadań z tej kategorii.')) {
          var p = loadProgress();
          if (p.done) {
            tasks.forEach(function (t) {
              delete p.done[t.id];
            });
            try {
              localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(p));
            } catch (e) {}
          }
          tasks.forEach(function (t) {
            clearUserCode(t.id);
          });
          renderTaskList(cat.id);
        }
      });
    }

    var filterBtns = document.querySelectorAll('.algo-filter-chip');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-checked', 'true');
        var filter = btn.getAttribute('data-filter');
        var container = document.getElementById('algo-task-items-container');
        if (container) {
          container.innerHTML = renderTaskRows(tasks, filter);
        }
      });
    });
  }

  function countByDiff(tasks, diff) {
    return tasks.filter(function (t) { return t.difficulty === diff; }).length;
  }

  function renderTaskRows(tasks, filter) {
    var filtered = tasks;
    if (filter && filter !== 'all') {
      filtered = tasks.filter(function (t) { return t.difficulty === filter; });
    }

    if (!filtered.length) {
      return '<div class="algo-empty-state">'
        + '<p class="algo-empty-title">Brak zadań</p>'
        + '<p class="algo-empty-text">Brak zadań odpowiadających wybranemu kryterium.</p>'
        + '</div>';
    }

    var html = '';
    filtered.forEach(function (task) {
      var completed = isDone(task.id);
      var cat = getCategoryMeta(task.category);
      html += '<a class="algo-task-row' + (completed ? ' is-completed' : '') + '" href="#task-' + task.id + '">'
        + '<div class="algo-task-row-main">'
          + '<div class="algo-task-row-meta">'
            + difficultyBadge(task.difficulty)
            + (cat ? '<span class="pill-badge">' + escHtml(cat.label) + '</span>' : '')
          + '</div>'
          + '<div class="algo-task-row-title">' + escHtml(task.title) + '</div>'
        + '</div>'
        + '<div class="algo-task-row-right">'
          + (completed ? '<span class="pill-badge pill-badge--done">Ukończono</span>' : '')
          + arrowSvg()
        + '</div>'
      + '</a>';
    });

    return html;
  }

  // --- Kolorowanie skladni (Prism.js) i obsluga edytora ---
  function highlightPython(code) {
    if (!code) return '';
    if (window.Prism && window.Prism.languages && window.Prism.languages.python) {
      try {
        return Prism.highlight(code, Prism.languages.python, 'python');
      } catch (e) {
        return escHtml(code);
      }
    }
    return escHtml(code);
  }

  function updateEditorHighlighting(editorEl) {
    if (!editorEl) return;
    var codeEl = document.getElementById('algo-editor-highlight');
    if (!codeEl) return;

    var val = editorEl.value || '';
    // Dodaj spacje na koncu jesli tekst konczy sie znakiem nowej linii,
    // aby HTML nie zwinal ostatniej pustej linii
    var text = val.slice(-1) === '\n' ? val + ' ' : val;

    if (window.Prism && window.Prism.languages && window.Prism.languages.python) {
      try {
        codeEl.innerHTML = Prism.highlight(text, Prism.languages.python, 'python');
        editorEl.classList.remove('is-plain');
      } catch (err) {
        codeEl.textContent = text;
        editorEl.classList.add('is-plain');
      }
    } else {
      codeEl.textContent = text;
      editorEl.classList.add('is-plain');
    }
  }

  function syncEditorScroll(editorEl) {
    var pre = document.querySelector('.algo-editor-pre');
    if (pre && editorEl) {
      pre.scrollTop = editorEl.scrollTop;
      pre.scrollLeft = editorEl.scrollLeft;
    }
  }

  function ensurePrismLoaded(callback) {
    if (window.Prism && window.Prism.languages && window.Prism.languages.python) {
      if (callback) callback();
      return;
    }
    var checkCount = 0;
    var interval = setInterval(function () {
      checkCount++;
      if (window.Prism && window.Prism.languages && window.Prism.languages.python) {
        clearInterval(interval);
        if (callback) callback();
      } else if (checkCount > 50) {
        clearInterval(interval);
      }
    }, 100);
  }

  function highlightDescriptionCode() {
    // Tresc zadania ma czytelny, monochromatyczny kod CKE bez jaskrawych kolorow
  }

  // ==========================================================================
  // ASYSTENT KODU (INTERAKTYWNY COMPANION)
  // ==========================================================================
  var companionState = 'idle'; // 'idle' | 'typing' | 'paused' | 'error' | 'success'
  var companionTypingTimer = null;
  var companionPauseTimer = null;

  function renderCompanion() {
    return '<div class="algo-companion-orb is-idle" id="algo-companion" aria-hidden="true">'
      + '<svg class="algo-orb-svg" viewBox="0 0 100 100" width="54" height="54" fill="none" xmlns="http://www.w3.org/2000/svg">'
      + '<defs>'
      + '<filter id="mochiGlow" x="-20%" y="-20%" width="140%" height="140%">'
      + '<feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="rgba(0,0,0,0.45)"/>'
      + '</filter>'
      + '<radialGradient id="mochiGradBody" cx="45%" cy="38%" r="62%">'
      + '<stop offset="0%" stop-color="#FAF8F5"/>'
      + '<stop offset="75%" stop-color="#F1EFE9"/>'
      + '<stop offset="100%" stop-color="#E4E0D6"/>'
      + '</radialGradient>'
      + '</defs>'
      + '<path class="orb-body" filter="url(#mochiGlow)" d="M 4.62 50.00 C 5.35 54.66, 7.19 59.22, 9.20 63.26 C 11.20 67.30, 13.83 70.97, 16.66 74.23 C 19.49 77.48, 22.70 80.41, 26.17 82.80 C 29.64 85.18, 33.50 87.28, 37.47 88.55 C 41.44 89.83, 45.82 90.41, 50.00 90.43 C 54.18 90.44, 58.50 89.81, 62.56 88.66 C 66.62 87.51, 70.68 85.78, 74.36 83.53 C 78.03 81.27, 81.61 78.44, 84.62 75.15 C 87.63 71.86, 90.52 67.97, 92.41 63.78 C 94.30 59.59, 95.78 54.65, 95.94 50.00 C 96.10 45.35, 95.16 40.18, 93.37 35.91 C 91.59 31.64, 88.48 27.55, 85.26 24.38 C 82.03 21.22, 77.90 18.84, 74.03 16.93 C 70.16 15.02, 66.04 14.04, 62.04 12.94 C 58.04 11.85, 54.19 10.90, 50.00 10.36 C 45.81 9.83, 41.39 9.29, 36.92 9.73 C 32.44 10.17, 27.38 10.98, 23.13 13.01 C 18.87 15.05, 14.43 18.22, 11.37 21.94 C 8.32 25.65, 5.93 30.64, 4.81 35.32 C 3.68 39.99, 3.89 45.34, 4.62 50.00 Z"/>'
      + '<g class="orb-eyes-group">'
      + '<g class="orb-eyes-normal">'
      + '<rect class="orb-eye" x="22" y="26" width="6.2" height="16" rx="3.1"/>'
      + '<rect class="orb-eye" x="35" y="26" width="6.2" height="16" rx="3.1"/>'
      + '</g>'
      + '<g class="orb-eyes-error">'
      + '<path d="M 21 29 L 28 34 L 21 39" stroke="#11141d" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      + '<path d="M 42 29 L 35 34 L 42 39" stroke="#11141d" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      + '</g>'
      + '<g class="orb-eyes-success">'
      + '<path d="M 20 37 C 22 29, 29 29, 31 37" stroke="#11141d" stroke-width="3.2" stroke-linecap="round" fill="none"/>'
      + '<path d="M 33 37 C 35 29, 42 29, 44 37" stroke="#11141d" stroke-width="3.2" stroke-linecap="round" fill="none"/>'
      + '</g>'
      + '</g>'
      + '</svg>'
      + '</div>';
  }

  function updateCompanionGaze() {
    var comp = document.getElementById('algo-companion');
    var editor = document.getElementById('algo-editor');
    if (!comp || !editor) return;

    var eyesGroup = comp.querySelector('.orb-eyes-group');
    if (!eyesGroup) return;

    var following = companionState === 'typing' || companionState === 'paused';
    if (!following) {
      eyesGroup.style.transform = '';
      comp.style.top = '';
      return;
    }

    var pane = editor.closest('.algo-editor-pane');
    var card = editor.closest('.algo-editor-card');
    if (!pane || !card) return;

    var cs = window.getComputedStyle(editor);
    var lineHeight = parseFloat(cs.lineHeight);
    if (!isFinite(lineHeight) || lineHeight <= 0) {
      lineHeight = (parseFloat(cs.fontSize) || 15) * 1.65;
    }
    var paddingTop = parseFloat(cs.paddingTop);
    if (!isFinite(paddingTop)) paddingTop = 20;

    var start = editor.selectionStart || 0;
    var lineIndex = editor.value.substring(0, start).split('\n').length - 1;
    var lineCenterInEditor = paddingTop + lineIndex * lineHeight + lineHeight / 2 - editor.scrollTop;

    var paneRect = pane.getBoundingClientRect();
    var editorRect = editor.getBoundingClientRect();
    var cardRect = card.getBoundingClientRect();
    var lineCenterY = (editorRect.top - paneRect.top) + lineCenterInEditor;
    var orbH = comp.offsetHeight || 54;
    var mobile = window.matchMedia('(max-width: 1060px)').matches;

    if (!mobile) {
      var tabsBar = card.querySelector('.code-tabs-bar');
      var actions = card.querySelector('.algo-editor-actions');
      var tabsH = tabsBar ? tabsBar.offsetHeight : 42;
      var actionsH = actions ? actions.offsetHeight : 52;
      var minTop = Math.max(tabsH + 6, (editorRect.top - paneRect.top) + 4);
      var maxTop = Math.min(
        (cardRect.bottom - paneRect.top) - actionsH - orbH - 6,
        (editorRect.bottom - paneRect.top) - orbH - 4
      );
      if (maxTop < minTop) maxTop = minTop;

      var targetTop = Math.max(minTop, Math.min(maxTop, lineCenterY - orbH / 2));
      comp.style.top = Math.round(targetTop) + 'px';

      var dy = lineCenterY - (targetTop + orbH / 2);
      var angleOffset = Math.max(-8, Math.min(8, dy * 0.12));
      var yOffset = Math.max(-3, Math.min(3, dy * 0.05));
      eyesGroup.style.transform = 'translate(-3px, ' + (Math.round(yOffset * 10) / 10) + 'px) rotate(' + Math.round(-18 + angleOffset) + 'deg)';
    } else {
      var dy = lineCenterY - (8 + orbH / 2);
      var angleOffset = Math.max(-10, Math.min(10, dy * 0.06));
      var yOffset = Math.max(-3, Math.min(3, dy * 0.03));
      eyesGroup.style.transform = 'translate(-2px, ' + (Math.round(yOffset * 10) / 10) + 'px) rotate(' + Math.round(-16 + angleOffset) + 'deg)';
    }
  }

  function setCompanionState(newState) {
    companionState = newState;
    var el = document.getElementById('algo-companion');
    if (!el) return;
    el.classList.remove('is-idle', 'is-typing', 'is-paused', 'is-error', 'is-success');
    el.classList.add('is-' + newState);
    if (newState === 'typing' || newState === 'paused') {
      updateCompanionGaze();
    } else if (newState === 'idle') {
      var idleEyes = el.querySelector('.orb-eyes-group');
      if (idleEyes) idleEyes.style.transform = '';
      el.style.top = '';
    } else {
      var faceEyes = el.querySelector('.orb-eyes-group');
      if (faceEyes) faceEyes.style.transform = '';
    }
  }

  function notifyCompanionTyping() {
    if (companionTypingTimer) clearTimeout(companionTypingTimer);
    if (companionPauseTimer) clearTimeout(companionPauseTimer);

    if (companionState !== 'typing') {
      setCompanionState('typing');
    }
    updateCompanionGaze();

    // Po 1400ms braku pisania zostaje przy linii (paused), potem wraca do idle
    companionTypingTimer = setTimeout(function () {
      setCompanionState('paused');

      companionPauseTimer = setTimeout(function () {
        setCompanionState('idle');
      }, 8000);
    }, 1400);
  }

  // ==========================================================================
  // WIDOK ROZWIĄZYWANIA ZADANIA
  // ==========================================================================
  function renderTaskView(taskId) {
    if (companionTypingTimer) clearTimeout(companionTypingTimer);
    if (companionPauseTimer) clearTimeout(companionPauseTimer);
    companionState = 'idle';

    state.view          = 'task';
    state.currentTaskId = taskId;

    var task = getTaskById(taskId);
    if (!task) {
      renderCategories();
      return;
    }

    var cat = getCategoryMeta(task.category);
    var completed = isDone(taskId);
    var initialCode = loadUserCode(task.id, task.starterCode);

    var html = '<section class="hero has-breadcrumbs algo-solver-header" aria-labelledby="algo-task-title-h">'
      + '<div class="container">'
      + breadcrumbs([
          { label: 'Algorytmy', href: '#' },
          { label: cat ? cat.label : task.category, href: '#category-' + task.category },
          { label: task.title, href: null }
        ])
      + '<div class="card-meta" style="margin-top:14px">'
        + difficultyBadge(task.difficulty)
        + (cat ? '<span class="pill-badge">' + escHtml(cat.label) + '</span>' : '')
        + (completed ? '<span class="pill-badge pill-badge--done">Ukończono</span>' : '')
      + '</div>'
      + '<div class="algo-solver-toolbar">'
        + '<div class="algo-actions-row">'
          + '<a href="#category-' + task.category + '" class="algo-btn-secondary">Wróć do kategorii</a>'
          + (completed ? '<button type="button" class="algo-btn-secondary" id="algo-uncomplete-btn">Wyczyść postęp zadania</button>' : '')
        + '</div>'
        + '<button type="button" class="algo-btn-secondary" id="algo-random-any">'
          + randomIconSvg()
          + '<span>Losowe zadanie</span>'
        + '</button>'
      + '</div>'
      + '</div></section>'

      + '<section class="algo-solver-section">'
      + '<div class="container">'
      + '<div class="algo-workspace-layout">'

      // --- LEWA KOLUMNA: Opis zadania (Problem Pane) ---
      + '<div class="algo-problem-pane">'
        + '<div class="algo-card">'
          + '<h1 id="algo-task-title-h" class="algo-problem-title">' + escHtml(task.title) + '</h1>'
          + '<div class="algo-section-subhead">Treść polecenia</div>'
          + '<div class="algo-problem-desc">' + task.description + '</div>'

          + '<div class="algo-section-subhead">Specyfikacja wejścia i wyjścia</div>'
          + '<div class="algo-spec-box">'
            + '<div class="algo-spec-item"><strong>Wejście:</strong> <span>' + escHtml(task.inputDesc) + '</span></div>'
            + '<div class="algo-spec-item"><strong>Wyjście:</strong> <span>' + escHtml(task.outputDesc) + '</span></div>'
            + (task.timeComplexity ? '<div class="algo-spec-item"><strong>Wymagana złożoność czasowa:</strong> <code>' + escHtml(task.timeComplexity) + '</code></div>' : '')
            + (task.spaceComplexity ? '<div class="algo-spec-item"><strong>Wymagana złożoność pamięciowa:</strong> <code>' + escHtml(task.spaceComplexity) + '</code></div>' : '')
          + '</div>'

          + '<div class="algo-section-subhead">Przykłady testowe</div>'
          + '<div class="algo-examples-list">'
            + renderExamples(task.examples)
          + '</div>'

          + (task.explanation ? '<div style="margin-top:20px"><button type="button" class="algo-btn-secondary" id="algo-toggle-solution-btn">Pokaż wzorcowe rozwiązanie CKE</button></div>' : '')
          + '<div id="algo-solution-panel" style="display:none;margin-top:16px">'
            + '<div class="algo-solution-card">'
              + '<div class="algo-section-subhead" style="margin:0 0 8px">Wzorcowy kod (Python)</div>'
              + '<div class="code-viewer algo-solution-viewer">'
                + '<div class="code-panel-header">'
                  + '<span class="code-file-name">rozwiazanie.py</span>'
                  + '<button type="button" class="copy-code-btn" id="algo-copy-solution-btn" aria-label="Kopiuj wzorcowy kod">'
                    + '<svg class="copy-icon" viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true"><rect x="5" y="5" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M11 3H4C3.44772 3 3 3.44772 3 4V11" stroke="currentColor" stroke-width="1.5"/></svg>'
                    + '<span class="copy-btn-text">Kopiuj</span>'
                  + '</button>'
                + '</div>'
                + '<pre class="code-pre"><code class="language-python" id="algo-solution-code-el">' + highlightPython(task.solution) + '</code></pre>'
              + '</div>'
              + '<div class="algo-section-subhead" style="margin:16px 0 8px">Wyjaśnienie algorytmu</div>'
              + '<div class="algo-problem-desc">' + task.explanation + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>'

      // --- PRAWA KOLUMNA: Edytor kodu i konsola testów (Editor Pane) ---
      + '<div class="algo-editor-pane">'
        + renderCompanion()
        + '<div class="code-viewer algo-editor-card">'
          + '<div class="code-tabs-bar" role="tablist">'
            + '<div style="display:flex;align-items:center;gap:6px">'
              + '<span class="code-tab is-active" role="tab" aria-selected="true">'
                + '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="opacity:0.8;margin-right:4px"><path d="M4 1h8l3 3v10a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1zm7 1v3h3"/></svg>'
                + 'solution.py'
              + '</span>'
            + '</div>'
            + '<span class="algo-py-status" id="algo-py-status">Środowisko Python: ładowanie...</span>'
          + '</div>'
          + '<div class="algo-editor-wrapper" id="algo-editor-wrapper">'
            + '<pre class="algo-editor-pre code-pre" aria-hidden="true"><code class="language-python" id="algo-editor-highlight"></code></pre>'
            + '<textarea class="algo-editor-textarea" id="algo-editor" spellcheck="false" autocorrect="off" autocapitalize="off" aria-label="Edytor kodu Python">'
              + escHtml(initialCode)
            + '</textarea>'
          + '</div>'
          + '<div class="algo-editor-actions">'
            + '<button type="button" class="btn-cta" id="algo-run-btn">'
              + '<span id="algo-run-label">Uruchom i sprawdź testy</span>'
            + '</button>'
            + '<button type="button" class="algo-btn-secondary" id="algo-reset-code-btn">Przywróć kod startowy</button>'
          + '</div>'
        + '</div>'

        // Konsola z wynikami testow
        + '<div class="algo-console-card" id="algo-console-card">'
          + '<div class="algo-console-header">'
            + '<span>Wyniki testów jednostkowych</span>'
            + '<span id="algo-console-count">' + task.testCases.length + ' ' + polishPlural(task.testCases.length, 'przypadek', 'przypadki', 'przypadków') + '</span>'
          + '</div>'
          + '<div class="algo-console-body" id="algo-console-body">'
            + '<p style="color:var(--text-muted);font-size:0.875rem;margin:0">Naciśnij „Uruchom i sprawdź testy”, aby przetestować swoją funkcję na ' + task.testCases.length + ' ' + polishPlural(task.testCases.length, 'przypadku testowym', 'przypadkach testowych', 'przypadkach testowych') + ' CKE.</p>'
          + '</div>'
        + '</div>'
      + '</div>'

      + '</div>'
      + '</div></section>';

    setContent(html);
    bindTaskEvents(task);

    // Inicjalizacja ładowania Pyodide w tle
    loadPyodide();
  }

  function renderExamples(examples) {
    if (!examples || !examples.length) return '';
    var html = '';
    examples.forEach(function (ex, i) {
      html += '<div class="algo-example-card">'
        + '<div class="algo-example-line"><strong>Przykład ' + (i + 1) + ':</strong></div>'
        + '<div class="algo-example-line"><strong>Wejście:</strong> <code>' + escHtml(ex.input) + '</code></div>'
        + '<div class="algo-example-line"><strong>Wyjście:</strong> <code>' + escHtml(ex.output) + '</code></div>'
        + (ex.explanation ? '<div class="algo-example-exp">' + escHtml(ex.explanation) + '</div>' : '')
        + '</div>';
    });
    return html;
  }

  // --- Zdarzenia w widoku zadania ---
  function bindTaskEvents(task) {
    var rBtn = document.getElementById('algo-random-any');
    if (rBtn) {
      rBtn.addEventListener('click', function () {
        var t = getRandomTask(null);
        if (t) navigate('task-' + t.id);
      });
    }

    var uncompleteBtn = document.getElementById('algo-uncomplete-btn');
    if (uncompleteBtn) {
      uncompleteBtn.addEventListener('click', function () {
        if (window.confirm('Czy na pewno chcesz wyczyścić postęp tego zadania i przywrócić kod początkowy?')) {
          var p = loadProgress();
          if (p.done && p.done[task.id]) {
            delete p.done[task.id];
            try {
              localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(p));
            } catch (e) {}
          }
          clearUserCode(task.id);
          renderTaskView(task.id);
        }
      });
    }

    // Toggle wzorcowego rozwiązania i kopiowanie
    var solBtn = document.getElementById('algo-toggle-solution-btn');
    var solPanel = document.getElementById('algo-solution-panel');
    if (solBtn && solPanel) {
      solBtn.addEventListener('click', function () {
        var isHidden = solPanel.style.display === 'none';
        solPanel.style.display = isHidden ? 'block' : 'none';
        solBtn.textContent = isHidden ? 'Ukryj wzorcowe rozwiązanie CKE' : 'Pokaż wzorcowe rozwiązanie CKE';
      });
    }

    var copySolBtn = document.getElementById('algo-copy-solution-btn');
    if (copySolBtn) {
      copySolBtn.addEventListener('click', function () {
        if (!navigator.clipboard || !navigator.clipboard.writeText) return;
        navigator.clipboard.writeText(task.solution).then(function () {
          var txt = copySolBtn.querySelector('.copy-btn-text');
          if (txt) txt.textContent = 'Skopiowano';
          copySolBtn.classList.add('is-copied');
          setTimeout(function () {
            if (txt) txt.textContent = 'Kopiuj';
            copySolBtn.classList.remove('is-copied');
          }, 2000);
        });
      });
    }

    // Edytor: kolorowanie skladni, smart indent, taby i autozapis
    var editor = document.getElementById('algo-editor');
    if (editor) {
      updateEditorHighlighting(editor);
      syncEditorScroll(editor);

      ensurePrismLoaded(function () {
        updateEditorHighlighting(editor);
        var solCodeEl = document.getElementById('algo-solution-code-el');
        if (solCodeEl && task.solution) {
          solCodeEl.innerHTML = highlightPython(task.solution);
        }
        highlightDescriptionCode();
      });

      editor.addEventListener('keydown', function (e) {
        if (!['Control', 'Alt', 'Shift', 'Meta', 'CapsLock', 'Escape'].includes(e.key)) {
          if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            notifyCompanionTyping();
          }
          setTimeout(updateCompanionGaze, 0);
        }

        var start = editor.selectionStart;
        var end   = editor.selectionEnd;
        var val   = editor.value;

        // 1. Tab oraz Shift+Tab
        if (e.key === 'Tab') {
          e.preventDefault();

          if (e.shiftKey) {
            // Shift + Tab: cofnij wcięcie o maksymalnie jeden poziom na każdej linii.
            var lineStart = val.lastIndexOf('\n', start - 1) + 1;
            var lineEnd = val.indexOf('\n', end);
            if (lineEnd === -1) lineEnd = val.length;

            var lines = val.substring(lineStart, lineEnd).split('\n');
            var unindented = [];
            var removedBeforeStart = 0;
            var removedBeforeEnd = 0;
            var offset = lineStart;

            for (var i = 0; i < lines.length; i++) {
              var l = lines[i];
              var match = l.match(/^( {1,4}|\t)/);
              var removeLen = match ? match[0].length : 0;
              unindented.push(l.substring(removeLen));

              // Only characters before a selection endpoint affect that endpoint.
              if (offset + removeLen <= start) removedBeforeStart += removeLen;
              if (offset + removeLen <= end) removedBeforeEnd += removeLen;
              offset += l.length + 1;
            }

            editor.value = val.substring(0, lineStart) + unindented.join('\n') + val.substring(lineEnd);
            var newStart = Math.max(lineStart, start - removedBeforeStart);
            var newEnd = Math.max(newStart, end - removedBeforeEnd);
            editor.selectionStart = newStart;
            editor.selectionEnd = newEnd;
          } else {
            // Tab: wciecie 4 spacjami lub wciecie bloku
            if (start === end) {
              var lineStart = val.lastIndexOf('\n', start - 1) + 1;
              var col = start - lineStart;
              var spacesNeeded = 4 - (col % 4);
              if (spacesNeeded === 0) spacesNeeded = 4;
              var insert = '    '.substring(0, spacesNeeded);

              editor.value = val.substring(0, start) + insert + val.substring(end);
              editor.selectionStart = editor.selectionEnd = start + spacesNeeded;
            } else {
              var lineStart = val.lastIndexOf('\n', start - 1) + 1;
              var lineEnd = val.indexOf('\n', end);
              if (lineEnd === -1) lineEnd = val.length;

              var lines = val.substring(lineStart, lineEnd).split('\n');
              var indented = lines.map(function (l) { return '    ' + l; });

              editor.value = val.substring(0, lineStart) + indented.join('\n') + val.substring(lineEnd);
              editor.selectionStart = start + 4;
              editor.selectionEnd = end + (4 * lines.length);
            }
          }

          updateEditorHighlighting(editor);
          saveUserCode(task.id, editor.value);
          syncEditorScroll(editor);
          return;
        }

        // 2. Enter (New line): dopasowanie wciecia z poprzedniej linii + 4 spacje po dwukropku
        if (e.key === 'Enter') {
          e.preventDefault();

          var lineStart = val.lastIndexOf('\n', start - 1) + 1;
          var currentLineToCursor = val.substring(lineStart, start);

          // Pobiegnij po wcieciu biezacej linii
          var indentMatch = currentLineToCursor.match(/^[ \t]*/);
          var currentIndent = indentMatch ? indentMatch[0] : '';

          // Jesli kod przed kursorem konczy sie dwukropkiem ':'
          var codeWithoutComment = currentLineToCursor.replace(/#.*$/, '').trim();
          var extraIndent = codeWithoutComment.endsWith(':') ? '    ' : '';
          var newIndent = currentIndent + extraIndent;
          var insertion = '\n' + newIndent;

          editor.value = val.substring(0, start) + insertion + val.substring(end);
          editor.selectionStart = editor.selectionEnd = start + insertion.length;

          updateEditorHighlighting(editor);
          saveUserCode(task.id, editor.value);
          syncEditorScroll(editor);
          return;
        }

        // 3. Backspace: usuń wcięcie do poprzedniego poziomu (także przy 1–3 spacjach).
        if (e.key === 'Backspace') {
          if (start === end) {
            var lineStart = val.lastIndexOf('\n', start - 1) + 1;
            var lineBeforeCursor = val.substring(lineStart, start);
            if (/^[ \t]+$/.test(lineBeforeCursor)) {
              var indentColumns = lineBeforeCursor.replace(/\t/g, '    ').length;
              var removeLen = lineBeforeCursor.charAt(lineBeforeCursor.length - 1) === '\t'
                ? 1
                : (indentColumns % 4 || 4);
              removeLen = Math.min(removeLen, lineBeforeCursor.length);
              e.preventDefault();
              editor.value = val.substring(0, start - removeLen) + val.substring(end);
              editor.selectionStart = editor.selectionEnd = start - removeLen;
              updateEditorHighlighting(editor);
              saveUserCode(task.id, editor.value);
              syncEditorScroll(editor);
              return;
            }
          }
        }

        // 4. Parowanie nawiasow: () [] {}
        var PAIRS = { '(': ')', '[': ']', '{': '}' };
        if (PAIRS[e.key]) {
          var open = e.key;
          var close = PAIRS[open];
          if (start !== end) {
            e.preventDefault();
            var selected = val.substring(start, end);
            editor.value = val.substring(0, start) + open + selected + close + val.substring(end);
            editor.selectionStart = start + 1;
            editor.selectionEnd = end + 1;
            updateEditorHighlighting(editor);
            saveUserCode(task.id, editor.value);
            return;
          } else {
            e.preventDefault();
            editor.value = val.substring(0, start) + open + close + val.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 1;
            updateEditorHighlighting(editor);
            saveUserCode(task.id, editor.value);
            return;
          }
        }

        if (e.key === ')' || e.key === ']' || e.key === '}') {
          if (start === end && val.charAt(start) === e.key) {
            e.preventDefault();
            editor.selectionStart = editor.selectionEnd = start + 1;
            return;
          }
        }
      });

      editor.addEventListener('input', function () {
        updateEditorHighlighting(editor);
        saveUserCode(task.id, editor.value);
        notifyCompanionTyping();
        updateCompanionGaze();
      });

      editor.addEventListener('scroll', function () {
        syncEditorScroll(editor);
        updateCompanionGaze();
      }, { passive: true });

      editor.addEventListener('click', updateCompanionGaze);
      editor.addEventListener('keyup', updateCompanionGaze);
      editor.addEventListener('select', updateCompanionGaze);
      window.addEventListener('resize', updateCompanionGaze);
      setTimeout(updateCompanionGaze, 60);
    }

    // Reset kodu do szablonu
    var resetCodeBtn = document.getElementById('algo-reset-code-btn');
    if (resetCodeBtn && editor) {
      resetCodeBtn.addEventListener('click', function () {
        if (window.confirm('Czy na pewno chcesz przywrócić kod startowy? Twoje bieżące zmiany w tym zadaniu zostaną utracone.')) {
          editor.value = task.starterCode;
          clearUserCode(task.id);
          updateEditorHighlighting(editor);
          syncEditorScroll(editor);
          setCompanionState('idle');
          setTimeout(updateCompanionGaze, 0);
        }
      });
    }

    // Uruchomienie testow
    var runBtn = document.getElementById('algo-run-btn');
    if (runBtn) {
      runBtn.addEventListener('click', function () {
        runTaskTests(task);
      });
    }

    updatePyodideStatusDisplay();
  }

  // --- Silnik Pyodide i uruchamianie testow ---
  function createLegacyPyodideWorker() {
    var workerSource = [
      "'use strict';",
      "var pyodidePromise = null;",
      "function getPyodide() {",
      "  if (!pyodidePromise) {",
      "    importScripts(" + JSON.stringify(PYODIDE_CDN) + ");",
      "    pyodidePromise = loadPyodide({ indexURL: " + JSON.stringify(PYODIDE_INDEX_URL) + " });",
      "  }",
      "  return pyodidePromise;",
      "}",
      "function executeTests(data) {",
      "  return getPyodide().then(function (py) {",
      "    if (data.userCode.length > " + PYODIDE_MAX_CODE_LENGTH + ") {",
      "      throw new Error('Kod przekracza limit rozmiaru.');",
      "    }",
      "    var testCasesJson = JSON.stringify(data.testCases);",
      "    var fnNameJson = JSON.stringify(data.functionName);",
      "    var runnerScript = [",
      "      'import json, time',",
      "      '',",
      "      '_scope = {}',",
      "      'exec(compile(' + JSON.stringify(data.userCode) + ', \"<user_code>\", \"exec\"), _scope)',",
      "      '',",
      "      '_results = []',",
      "      '_fn = _scope.get(' + fnNameJson + ')',",
      "      'if _fn is None:',",
      "      '    raise NameError(\"Nie zdefiniowano funkcji o nazwie: \" + ' + fnNameJson + ')',",
      "      '',",
      "      '_test_cases = json.loads(' + JSON.stringify(testCasesJson) + ')',",
      "      'for tc in _test_cases:',",
      "      '    try:',",
      "      '        args = eval(tc[\"input\"], _scope)',",
      "      '    except Exception as _e:',",
      "      '        args = ()',",
      "      '    if isinstance(args, tuple):',",
      "      '        if len(args) == 1:',",
      "      '            _input_repr = repr(args[0])',",
      "      '        else:',",
      "      '            _input_repr = \", \".join(repr(a) for a in args)',",
      "      '    else:',",
      "      '        _input_repr = repr(args)',",
      "      '    expected = tc[\"expected\"]',",
      "      '    t0 = time.perf_counter()',",
      "      '    try:',",
      "      '        got = _fn(*args)',",
      "      '        t1 = time.perf_counter()',",
      "      '        passed = bool(got == expected)',",
      "      '        _results.append({',",
      "      '            \"passed\": passed,',",
      "      '            \"input\": _input_repr,',",
      "      '            \"got\": repr(got),',",
      "      '            \"expected\": repr(expected),',",
      "      '            \"timeMs\": round((t1 - t0) * 1000, 2),',",
      "      '            \"error\": None',",
      "      '        })',",
      "      '    except Exception as _e:',",
      "      '        _results.append({',",
      "      '            \"passed\": False,',",
      "      '            \"input\": _input_repr,',",
      "      '            \"got\": None,',",
      "      '            \"expected\": repr(expected),',",
      "      '            \"timeMs\": 0,',",
      "      '            \"error\": str(_e)',",
      "      '        })',",
      "      '',",
      "      'del _scope',",
      "      '_out_json = json.dumps(_results)'",
      "    ].join('\\n');",
      "    py.runPython(runnerScript);",
      "    var jsonProxy = py.globals.get('_out_json');",
      "    var jsonStr = String(jsonProxy);",
      "    jsonProxy.destroy();",
      "    if (jsonStr.length > 200000) {",
      "      throw new Error('Wynik testów przekroczył limit rozmiaru.');",
      "    }",
      "    self.postMessage({ type: 'result', requestId: data.requestId, results: JSON.parse(jsonStr) });",
      "  });",
      "}",
      "self.onmessage = function (event) {",
      "  var data = event.data || {};",
      "  if (data.type === 'load') {",
      "    getPyodide().then(function () {",
      "      self.postMessage({ type: 'ready' });",
      "    }).catch(function (err) {",
      "      self.postMessage({ type: 'error', message: String(err) });",
      "    });",
      "    return;",
      "  }",
      "  if (data.type === 'run') {",
      "    executeTests(data).catch(function (err) {",
      "      self.postMessage({ type: 'error', requestId: data.requestId, message: String(err) });",
      "    });",
      "  }",
      "};"
    ].join('\n');
    var blob = new Blob([workerSource], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    return {
      worker: new Worker(url),
      url: url
    };
  }

  function createPyodideWorker() {
    var workerSource = [
      "'use strict';",
      "var pyodidePromise = null;",
      "function getPyodide() {",
      "  if (!pyodidePromise) {",
      "    importScripts(" + JSON.stringify(PYODIDE_CDN) + ");",
      "    pyodidePromise = loadPyodide({ indexURL: " + JSON.stringify(PYODIDE_INDEX_URL) + " });",
      "  }",
      "  return pyodidePromise;",
      "}",
      "self.onmessage = function (event) {",
      "  var data = event.data || {};",
      "  if (data.type === 'load') {",
      "    getPyodide().then(function () {",
      "      self.postMessage({ type: 'ready' });",
      "    }).catch(function (err) {",
      "      self.postMessage({ type: 'error', message: String(err) });",
      "    });",
      "    return;",
      "  }",
      "  if (data.type === 'run') {",
      "    getPyodide().then(function (py) {",
      "      if (data.runnerScript.length > " + PYODIDE_MAX_CODE_LENGTH + ") {",
      "        throw new Error('Kod przekracza limit rozmiaru.');",
      "      }",
      "      py.runPython(data.runnerScript);",
      "      var jsonProxy = py.globals.get('_out_json');",
      "      var jsonStr = String(jsonProxy);",
      "      jsonProxy.destroy();",
      "      if (jsonStr.length > 200000) {",
      "        throw new Error('Wynik testów przekroczył limit rozmiaru.');",
      "      }",
      "      self.postMessage({ type: 'result', requestId: data.requestId, results: JSON.parse(jsonStr) });",
      "    }).catch(function (err) {",
      "      self.postMessage({ type: 'error', requestId: data.requestId, message: String(err) });",
      "    });",
      "  }",
      "};"
    ].join('\n');
    var blob = new Blob([workerSource], { type: 'application/javascript' });
    var url = URL.createObjectURL(blob);
    return {
      worker: new Worker(url),
      url: url
    };
  }

  function terminatePyodideWorker(nextState) {
    if (state.pyodideWorker) {
      state.pyodideWorker.terminate();
    }
    if (state.pyodideWorkerUrl) {
      URL.revokeObjectURL(state.pyodideWorkerUrl);
    }
    state.pyodideWorker = null;
    state.pyodideWorkerUrl = null;
    state.pyodidePromise = null;
    state.pyodideState = nextState;
    updatePyodideStatusDisplay();
  }

  function loadPyodide() {
    if (state.pyodideState === 'ready') return Promise.resolve(state.pyodideWorker);
    if (state.pyodideState === 'loading') return state.pyodidePromise;

    state.pyodideState = 'loading';
    updatePyodideStatusDisplay();

    var created = createPyodideWorker();
    state.pyodideWorker = created.worker;
    state.pyodideWorkerUrl = created.url;
    state.pyodidePromise = new Promise(function (resolve, reject) {
      function onMessage(event) {
        var data = event.data || {};
        if (data.type === 'ready') {
          state.pyodideState = 'ready';
          state.pyodideWorker.removeEventListener('message', onMessage);
          state.pyodideWorker.removeEventListener('error', onError);
          updatePyodideStatusDisplay();
          resolve(state.pyodideWorker);
        } else if (data.type === 'error') {
          onError(new Error(data.message || 'Nie udało się uruchomić środowiska Python.'));
        }
      }
      function onError(err) {
        state.pyodideState = 'error';
        state.pyodideWorker.removeEventListener('message', onMessage);
        state.pyodideWorker.removeEventListener('error', onError);
        terminatePyodideWorker('error');
        reject(err instanceof Error ? err : new Error('Nie udało się uruchomić środowiska Python.'));
      }
      state.pyodideWorker.addEventListener('message', onMessage);
      state.pyodideWorker.addEventListener('error', onError);
      state.pyodideWorker.postMessage({ type: 'load' });
    });

    return state.pyodidePromise;
  }

  function updatePyodideStatusDisplay() {
    var status = document.getElementById('algo-py-status');
    if (!status) return;

    switch (state.pyodideState) {
      case 'idle':
        status.textContent = 'Środowisko Python: oczekiwanie...';
        status.className   = 'algo-py-status';
        break;
      case 'loading':
        status.textContent = 'Środowisko Python: ładowanie...';
        status.className   = 'algo-py-status';
        break;
      case 'ready':
        status.textContent = 'Python 3.11 gotowy';
        status.className   = 'algo-py-status is-ready';
        break;
      case 'error':
        status.textContent = 'Środowisko Python: błąd ładowania';
        status.className   = 'algo-py-status';
        break;
    }
  }

  function runTaskTests(task) {
    var editor = document.getElementById('algo-editor');
    var runBtn = document.getElementById('algo-run-btn');
    var consoleBody = document.getElementById('algo-console-body');
    var runLabel = document.getElementById('algo-run-label');

    if (!editor || !consoleBody || !runBtn) return;

    var userCode = editor.value;

    runBtn.disabled = true;
    if (runLabel) runLabel.textContent = 'Testowanie...';
    if (companionTypingTimer) clearTimeout(companionTypingTimer);
    if (companionPauseTimer) clearTimeout(companionPauseTimer);
    setCompanionState('typing');

    if (window.WarpLoader && consoleBody) {
      WarpLoader.mount(consoleBody, {
        phrases: [
          'Kreślenie mgławicy',
          'Inicjalizacja środowiska Python...',
          'Wykonywanie testów jednostkowych...',
          'Weryfikacja przypadków brzegowych...',
          'Analizowanie złożoności kodu...'
        ]
      });
    }

    // Skonstruuj skrypt ewaluacyjny Pythona
    var testCasesJson = JSON.stringify(task.testCases);
    var fnNameJson    = JSON.stringify(task.functionName);

    var runnerScript = [
      'import json, time',
      '',
      userCode,
      '',
      '_results = []',
      '_fn = globals().get(' + fnNameJson + ')',
      'if _fn is None:',
      '    raise NameError("Nie zdefiniowano funkcji o nazwie: " + ' + fnNameJson + ')',
      '',
      '_test_cases = json.loads(' + JSON.stringify(testCasesJson) + ')',
      'for tc in _test_cases:',
      '    try:',
      '        args = eval(tc["input"])',
      '    except Exception as _e:',
      '        args = ()',
      '    if isinstance(args, tuple):',
      '        if len(args) == 1:',
      '            _input_repr = repr(args[0])',
      '        else:',
      '            _input_repr = ", ".join(repr(a) for a in args)',
      '    else:',
      '        _input_repr = repr(args)',
      '    expected = tc["expected"]',
      '    t0 = time.perf_counter()',
      '    try:',
      '        got = _fn(*args)',
      '        t1 = time.perf_counter()',
      '        passed = bool(got == expected)',
      '        _results.append({',
      '            "passed": passed,',
      '            "input": _input_repr,',
      '            "got": repr(got),',
      '            "expected": repr(expected),',
      '            "timeMs": round((t1 - t0) * 1000, 2),',
      '            "error": None',
      '        })',
      '    except Exception as _e:',
      '        _results.append({',
      '            "passed": False,',
      '            "input": _input_repr,',
      '            "got": None,',
      '            "expected": repr(expected),',
      '            "timeMs": 0,',
      '            "error": str(_e)',
      '        })',
      '',
      '_out_json = json.dumps(_results)'
    ].join('\n');

    var requestId = ++state.runRequestId;
    loadPyodide().then(function (worker) {
      return new Promise(function (resolve, reject) {
        var timeoutId;
        function cleanup() {
          clearTimeout(timeoutId);
          worker.removeEventListener('message', onMessage);
          worker.removeEventListener('error', onError);
        }
        function onMessage(event) {
          var data = event.data || {};
          if (data.requestId !== requestId) return;
          cleanup();
          if (data.type === 'result') {
            resolve(data.results);
          } else {
            reject(new Error(data.message || 'Nie udało się wykonać testów.'));
          }
        }
        function onError(err) {
          cleanup();
          terminatePyodideWorker('error');
          reject(err instanceof Error ? err : new Error('Nie udało się wykonać testów.'));
        }
        timeoutId = setTimeout(function () {
          cleanup();
          terminatePyodideWorker('idle');
          var timeoutError = new Error('Przekroczono limit czasu wykonania testów.');
          timeoutError.code = 'PYODIDE_TIMEOUT';
          reject(timeoutError);
        }, PYODIDE_RUN_TIMEOUT_MS);
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
        worker.postMessage({
          type: 'run',
          requestId: requestId,
          runnerScript: runnerScript
        });
      });
    }).then(function (results) {
      if (window.WarpLoader && consoleBody) WarpLoader.unmount(consoleBody);
      displayTestResults(task, results);

      var allPassed = results.every(function (r) { return r.passed; });
      if (allPassed) {
        setCompanionState('success');
        saveProgress(task.id);
        // Zaktualizuj nagłówek jeśli trzeba
        var meta = document.querySelector('.card-meta');
        if (meta && !meta.querySelector('.pill-badge--done')) {
          var badge = document.createElement('span');
          badge.className = 'pill-badge pill-badge--done';
          badge.textContent = 'Ukończono';
          meta.appendChild(badge);
        }
      } else {
        setCompanionState('error');
      }
    }).catch(function (err) {
      setCompanionState('error');
      if (window.WarpLoader && consoleBody) WarpLoader.unmount(consoleBody);
      var cleanedErr = cleanPythonTraceback(err, userCode);
      consoleBody.innerHTML = '<div class="algo-console-banner is-failure">'
        + '<span>' + (err && err.code === 'PYODIDE_TIMEOUT'
          ? 'Przekroczono limit czasu wykonania testów'
          : 'Błąd w kodzie lub brak definicji funkcji') + '</span>'
        + '</div>'
        + '<pre class="algo-error-pre">'
        + escHtml(cleanedErr)
        + '</pre>';
    }).finally(function () {
      runBtn.disabled = false;
      if (runLabel) runLabel.textContent = 'Uruchom i sprawdź testy';
    });
  }

  function cleanPythonTraceback(err, userCode) {
    if (!err) return 'Nieznany błąd wykonania.';
    var str = String(err).trim();
    // Usuń prefiks "PythonError: "
    str = str.replace(/^PythonError:\s*/i, '');

    var prefixLines = 2; // Liczba linii przed userCode w runnerScript ('import json, time\n\n')
    var userLinesCount = userCode ? userCode.split('\n').length : 9999;

    var lines = str.split('\n');
    var cleaned = [];
    var skipInternal = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];

      // Wykryj wewnętrzne moduły Pyodide / biblioteki standardowej WebAssembly
      if (line.indexOf('/lib/python3') !== -1 || line.indexOf('_pyodide') !== -1) {
        skipInternal = true;
        continue;
      }
      if (skipInternal) {
        if (/^\s*File\s+"/.test(line) || /^[A-Z][a-zA-Z0-9_]*(?:Error|Exception):/.test(line)) {
          skipInternal = false;
        } else {
          continue;
        }
      }

      var userCodeMatch = line.match(/^(\s*)File\s+"<user_code>",\s+line\s+(\d+)(.*)/);
      if (userCodeMatch) {
        line = userCodeMatch[1] + 'File "solution.py", line ' + userCodeMatch[2] + userCodeMatch[3];
      }

      // Zamień odwołanie do pliku wewnętrznego <exec> na solution.py i zmapuj numer linii
      var execMatch = line.match(/^(\s*)File\s+"<exec>",\s+line\s+(\d+)(.*)/);
      if (execMatch) {
        var rawLineNum = parseInt(execMatch[2], 10);
        var userLineNum = rawLineNum - prefixLines;
        if (userLineNum > 0 && userLineNum <= userLinesCount) {
          line = execMatch[1] + 'Plik "solution.py", linia ' + userLineNum + execMatch[3];
        } else {
          line = execMatch[1] + 'Plik "solution.py"' + execMatch[3];
        }
      }

      cleaned.push(line);
    }

    var result = cleaned.join('\n').trim();
    result = result.replace(/^Traceback\s*\(most recent call last\):/i, 'Ślad błędu (ostatnie wywołania):');
    return result || str;
  }

  function displayTestResults(task, results) {
    var consoleBody = document.getElementById('algo-console-body');
    if (!consoleBody) return;

    var passedCount = results.filter(function (r) { return r.passed; }).length;
    var totalCount  = results.length;
    var allPassed   = passedCount === totalCount;

    var html = '<div class="algo-console-banner ' + (allPassed ? 'is-success' : 'is-failure') + '">'
      + (allPassed ? checkmarkSvg() : crossSvg())
      + '<span>' + (allPassed ? 'Zaliczono wszystkie testy (' + passedCount + ' / ' + totalCount + ')' : 'Zaliczono ' + passedCount + ' z ' + totalCount + ' ' + (totalCount === 1 ? 'testu' : 'testów')) + '</span>'
      + '</div>'
      + '<div class="algo-tests-table-wrapper">'
      + '<table class="algo-tests-table" aria-label="Tabela wyników testów">'
      + '<thead><tr>'
      + '<th>Test</th>'
      + '<th>Status</th>'
      + '<th>Wejście</th>'
      + '<th>Oczekiwano</th>'
      + '<th>Otrzymano</th>'
      + '<th>Czas</th>'
      + '</tr></thead><tbody>';

    results.forEach(function (r, i) {
      html += '<tr>'
        + '<td><strong>#' + (i + 1) + '</strong></td>'
        + '<td class="' + (r.passed ? 'algo-test-status--ok' : 'algo-test-status--fail') + '">'
        + (r.passed ? 'Zaliczony' : 'Niezaliczony')
        + '</td>'
        + '<td><code>' + escHtml(r.input) + '</code></td>'
        + '<td><code>' + escHtml(r.expected) + '</code></td>'
        + '<td><code>' + (r.error ? ('Błąd: ' + escHtml(r.error)) : escHtml(r.got)) + '</code></td>'
        + '<td>' + r.timeMs + ' ms</td>'
        + '</tr>';
    });

    html += '</tbody></table></div>';

    if (allPassed) {
      html += '<div style="margin-top:16px;padding:14px;background:rgba(34,197,94,0.06);border:1px solid rgba(74,222,128,0.25);border-radius:8px;font-size:0.875rem;color:#86efac">'
        + 'Rozwiązanie spełnia wymagania CKE. Poniżej możesz przejrzeć wzorcowe rozwiązanie i analizę złożoności.'
        + '</div>';

      // Automatycznie odsłoń wzorcowe rozwiązanie
      var solPanel = document.getElementById('algo-solution-panel');
      if (solPanel) solPanel.style.display = 'block';
      var solBtn = document.getElementById('algo-toggle-solution-btn');
      if (solBtn) solBtn.textContent = 'Ukryj wzorcowe rozwiązanie CKE';
    }

    consoleBody.innerHTML = html;
  }

  // --- UI Helpers ---
  function setContent(html) {
    if (!elements.main) return;
    elements.main.innerHTML = html;
  }

  function breadcrumbs(items) {
    var html = '<nav class="breadcrumbs" aria-label="Ścieżka powrotu"><ol class="breadcrumb-list">'
      + '<li class="breadcrumb-item"><a href="/" class="breadcrumb-link">Strona główna</a>'
        + '<span class="breadcrumb-separator" aria-hidden="true">/</span></li>';
    items.forEach(function (item, i) {
      var isLast = i === items.length - 1;
      html += '<li class="breadcrumb-item">';
      if (!isLast && item.href) {
        html += '<a href="' + escAttr(item.href) + '" class="breadcrumb-link">' + escHtml(item.label) + '</a>';
      } else {
        html += '<span class="breadcrumb-current" aria-current="page">' + escHtml(item.label) + '</span>';
      }
      if (!isLast) {
        html += '<span class="breadcrumb-separator" aria-hidden="true">/</span>';
      }
      html += '</li>';
    });
    html += '</ol></nav>';
    return html;
  }

  function difficultyBadge(diff) {
    var label = DIFFICULTY_LABELS[diff] || diff;
    return '<span class="pill-badge pill-badge--' + escAttr(diff) + '">' + escHtml(label) + '</span>';
  }

  function arrowSvg() {
    return '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">'
      + '<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

  function randomIconSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">'
      + '<path d="M2 5h2l2 2-2 2H2M14 5h-2l-2 2 2 2h2M5 2l2 2M5 14l2-2M11 2l-2 2M11 14l-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

  function checkmarkSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">'
      + '<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>'
      + '<path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

  function crossSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">'
      + '<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>'
      + '<path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
      + '</svg>';
  }

  function escHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .split('&').join('&amp;')
      .split('<').join('&lt;')
      .split('>').join('&gt;')
      .split('"').join('&quot;');
  }

  function escAttr(s) {
    return escHtml(s);
  }

  // --- Start ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
