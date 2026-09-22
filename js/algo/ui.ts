import { highlightPython, updateEditorHighlighting, syncEditorScroll, ensurePrismLoaded, highlightDescriptionCode, updateCompanionGaze, setCompanionState, notifyCompanionTyping, renderTaskView } from './editor';
import { navigate } from './main';
import { updatePyodideStatusDisplay, runTaskTests } from './pyodide';
import { STORAGE_PROGRESS_KEY, DIFFICULTY_LABELS, polishPlural, state, elements, scrollToTopInstant, blurEditorIfFocused, loadProgress, isDone, getDoneCountForCat, getTotalDoneCount, saveUserCode, clearUserCode, clearAllUserCode, getTasksForCat, getCategoryMeta, getRandomTask } from './state';


  // --- Widok: Kategorie (Strona główna /algorytmy/) ---
export function renderCategories() {
    state.view = 'categories';
    var cats = window.ALGO_CATEGORIES || [];
    var allTasks = window.ALGO_TASKS || [];
    var totalDone = getTotalDoneCount();

    var html = '<section class="hero has-breadcrumbs" aria-labelledby="algo-title">'
      + '<div class="container"><div class="hero-content">'
      + breadcrumbs([{ label: 'Algorytmy', href: null }])
      + '<h1 id="algo-title" class="hero-title"><span class="aurora-word">Algorytmy.<span class="aurora-beam" aria-hidden="true"></span></span></h1>'
      + '<p class="hero-description">'
      + 'Rozwiązuj zadania algorytmiczne z arkuszy maturalnych '
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
      + '<h2 id="algo-cats-heading" class="algo-section-heading">Kategorie zadań</h2>'
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
export function renderTaskList(catId: string) {
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

export function renderFilterPills(tasks: AlgoTask[]): string {
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

export function bindListEvents(tasks: AlgoTask[], cat: AlgoCategory | null) {
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
          var done = p.done;
          if (done) {
            tasks.forEach(function (t) {
              delete done![t.id];
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
          (b as HTMLElement).tabIndex = -1;
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-checked', 'true');
        (btn as HTMLElement).tabIndex = 0;
        (btn as HTMLElement).focus();
        var filter = btn.getAttribute('data-filter') || 'all';
        var container = document.getElementById('algo-task-items-container');
        if (container) {
          container.innerHTML = renderTaskRows(tasks, filter);
        }
      });
      
      btn.addEventListener("keydown", function (e: any) {
        var eKey = e.key;
        if (eKey === "ArrowRight" || eKey === "ArrowDown" || eKey === "ArrowLeft" || eKey === "ArrowUp") {
          e.preventDefault();
          var btnsArr = Array.from(filterBtns) as HTMLElement[];
          var current = e.target as HTMLElement;
          var idx = btnsArr.indexOf(current);
          if (idx === -1) return;
          var step = (eKey === "ArrowRight" || eKey === "ArrowDown") ? 1 : -1;
          var nextIdx = (idx + step + btnsArr.length) % btnsArr.length;
          var next = btnsArr[nextIdx];
          next.click();
        }
      });
    });
  }

export function countByDiff(tasks: AlgoTask[], diff: string): number {
    return tasks.filter(function (t) { return t.difficulty === diff; }).length;
  }

export function renderTaskRows(tasks: AlgoTask[], filter: string): string {
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

  // --- Zdarzenia w widoku zadania ---
export function bindTaskEvents(task: AlgoTask) {
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
        var isHidden = solPanel!.style.display === 'none';
        solPanel!.style.display = isHidden ? 'block' : 'none';
        solBtn!.textContent = isHidden ? 'Ukryj wzorcowe rozwiązanie' : 'Pokaż wzorcowe rozwiązanie';
      });
    }

    // Podpowiedzi (stopniowe odkrywanie)
    var hintBtn = document.getElementById('algo-hint-btn') as HTMLButtonElement;
    if (hintBtn) {
      hintBtn.addEventListener('click', function () {
        var hints: string[] = [];
        try { hints = JSON.parse(hintBtn.getAttribute('data-hints') || '[]'); } catch (e) {}
        var shown = parseInt(hintBtn.getAttribute('data-shown') || '0', 10);
        if (shown >= hints.length) return;
        var listEl = document.getElementById('algo-hints-list');
        if (listEl) {
          var item = document.createElement('div');
          item.className = 'algo-hint-item';
          item.textContent = (shown + 1) + '. ' + hints[shown];
          listEl.appendChild(item);
        }
        shown++;
        hintBtn.setAttribute('data-shown', String(shown));
        if (shown >= hints.length) {
          hintBtn.style.display = 'none';
        }
      });
    }

    var copySolBtn = document.getElementById('algo-copy-solution-btn');
    if (copySolBtn) {
      copySolBtn.addEventListener('click', function () {
        if (!navigator.clipboard || !navigator.clipboard.writeText) return;
        navigator.clipboard.writeText(task.solution).then(function () {
          var txt = copySolBtn!.querySelector('.copy-btn-text');
          if (txt) txt.textContent = 'Skopiowano';
          copySolBtn!.classList.add('is-copied');
          setTimeout(function () {
            if (txt) txt.textContent = 'Kopiuj';
            copySolBtn!.classList.remove('is-copied');
          }, 2000);
        });
      });
    }

    // Edytor: kolorowanie skladni, smart indent, taby i autozapis
    var editor = document.getElementById('algo-editor') as HTMLTextAreaElement;
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

        // 1a. Escape: release focus to escape the keyboard trap
        if (e.key === 'Escape') {
          e.preventDefault();
          editor.blur();
          return;
        }

        // 1. Tab oraz Shift+Tab
        if (e.key === 'Tab') {
          e.preventDefault();

          if (e.shiftKey) {
            // Shift + Tab: cofnij wcięcie o maksymalnie jeden poziom na każdej linii.
            var lineStart = val.lastIndexOf('\n', start - 1) + 1;
            var lineEnd = val.indexOf('\n', end);
            if (lineEnd === -1) lineEnd = val.length;

            var lines = val.substring(lineStart, lineEnd).split('\n');
            var unindented: string[] = [];
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

        // 3. Backspace: usuń wcięcie do poprzedniego poziomu (także przy 1-3 spacjach).
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
      
      // Fix memory leak: store resize handler and attach once per task
      var resizeHandler = function() { updateCompanionGaze(); };
      window.addEventListener('resize', resizeHandler);
      
      // Optional cleanup on task leave, since this is bound to current view
      var unbindResize = function() {
        window.removeEventListener('resize', resizeHandler);
      };
      
      var oldHashChange = window.onhashchange;
      window.onhashchange = function(e) {
        unbindResize();
        if (oldHashChange && typeof oldHashChange === 'function') {
           return (oldHashChange as any).apply(this, arguments);
        }
      };

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

  // --- UI Helpers ---
export function setContent(html: string) {
    if (!elements.main) return;
    elements.main.innerHTML = html;
    blurEditorIfFocused();
    scrollToTopInstant();
  }

export function breadcrumbs(items: { label: string; href: string | null }[]): string {
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

export function difficultyBadge(diff: string): string {
    var label = DIFFICULTY_LABELS[diff] || diff;
    return '<span class="pill-badge pill-badge--' + escAttr(diff) + '">' + escHtml(label) + '</span>';
  }

export function arrowSvg() {
    return '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true">'
      + '<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

export function randomIconSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="13" height="13" aria-hidden="true">'
      + '<path d="M2 5h2l2 2-2 2H2M14 5h-2l-2 2 2 2h2M5 2l2 2M5 14l2-2M11 2l-2 2M11 14l-2-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

export function checkmarkSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">'
      + '<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>'
      + '<path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'
      + '</svg>';
  }

export function crossSvg() {
    return '<svg viewBox="0 0 16 16" fill="none" width="16" height="16" aria-hidden="true">'
      + '<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>'
      + '<path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
      + '</svg>';
  }

export function escHtml(s: unknown): string {
    if (s === null || s === undefined) return '';
    return String(s)
      .split('&').join('&amp;')
      .split('<').join('&lt;')
      .split('>').join('&gt;')
      .split('"').join('&quot;');
  }

export function escAttr(s: unknown): string {
    return escHtml(s);
  }
