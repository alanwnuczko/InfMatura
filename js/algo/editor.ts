declare const Prism: any;
import { loadPyodide } from './pyodide';
import { polishPlural, state, isDone, loadUserCode, getTaskById, getCategoryMeta } from './state';
import { renderCategories, bindTaskEvents, setContent, breadcrumbs, difficultyBadge, randomIconSvg, escHtml } from './ui';


  // --- Kolorowanie skladni (Prism.js) i obsluga edytora ---
export function highlightPython(code: string): string {
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

export function updateEditorHighlighting(editorEl: HTMLTextAreaElement | null) {
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

export function syncEditorScroll(editorEl: HTMLTextAreaElement | null) {
    var pre = document.querySelector('.algo-editor-pre');
    if (pre && editorEl) {
      pre.scrollTop = editorEl.scrollTop;
      pre.scrollLeft = editorEl.scrollLeft;
    }
  }

export function ensurePrismLoaded(callback?: () => void) {
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

export function highlightDescriptionCode() {
    // Tresc zadania ma czytelny, monochromatyczny kod CKE bez jaskrawych kolorow
  }

  // ==========================================================================
  // ASYSTENT KODU (INTERAKTYWNY COMPANION)
  // ==========================================================================
export var companionState = 'idle'; // 'idle' | 'typing' | 'paused' | 'error' | 'success'
export var companionTypingTimer: ReturnType<typeof setTimeout> | null = null;
export var companionPauseTimer: ReturnType<typeof setTimeout> | null = null;

export function renderCompanion() {
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

export function updateCompanionGaze() {
    var comp = document.getElementById('algo-companion');
    var editor = document.getElementById('algo-editor') as HTMLTextAreaElement;
    if (!comp || !editor) return;

    var eyesGroup = comp.querySelector('.orb-eyes-group') as HTMLElement;
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
      var tabsBar = card.querySelector('.code-tabs-bar') as HTMLElement;
      var actions = card.querySelector('.algo-editor-actions') as HTMLElement;
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

export function setCompanionState(newState: string) {
    companionState = newState;
    var el = document.getElementById('algo-companion');
    if (!el) return;
    el.classList.remove('is-idle', 'is-typing', 'is-paused', 'is-error', 'is-success');
    el.classList.add('is-' + newState);
    if (newState === 'typing' || newState === 'paused') {
      updateCompanionGaze();
    } else if (newState === 'idle') {
      var idleEyes = el.querySelector('.orb-eyes-group') as HTMLElement;
      if (idleEyes) idleEyes.style.transform = '';
      el.style.top = '';
    } else {
      var faceEyes = el.querySelector('.orb-eyes-group') as HTMLElement;
      if (faceEyes) faceEyes.style.transform = '';
    }
  }

export function notifyCompanionTyping() {
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
export function renderTaskView(taskId: string) {
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

          + renderTagsRow(task)
          + renderHints(task)
          + (task.relatedTopic ? '<div class="algo-related-topic"><strong>Powiązane zagadnienie:</strong> ' + escHtml(task.relatedTopic) + '</div>' : '')

          + '<p class="algo-cke-disclaimer">Zadanie na podstawie zbioru zadań CKE. Materiał pomocniczy, nie stanowi oficjalnego arkusza maturalnego.</p>'

          + (task.explanation ? '<div style="margin-top:20px"><button type="button" class="algo-btn-secondary" id="algo-toggle-solution-btn">Pokaż wzorcowe rozwiązanie</button></div>' : '')
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
          + '<div class="code-tabs-bar">'
            + '<span class="code-file-name">rozwiazanie.py</span>'
            + '<span class="algo-py-status" id="algo-py-status">Środowisko Python: ładowanie...</span>'
          + '</div>'
          + '<div class="algo-editor-wrapper" id="algo-editor-wrapper">'
            + '<pre class="algo-editor-pre code-pre" aria-hidden="true"><code class="language-python" id="algo-editor-highlight"></code></pre>'
            + '<textarea class="algo-editor-textarea" id="algo-editor" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-label="Edytor kodu Python">'
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
          + '<div class="algo-console-body" id="algo-console-body" aria-live="polite">'
            + '<p style="color:var(--text-muted);font-size:0.875rem;margin:0">Naciśnij „Uruchom i sprawdź testy”, aby przetestować swoją funkcję na ' + task.testCases.length + ' ' + polishPlural(task.testCases.length, 'przypadku testowym', 'przypadkach testowych', 'przypadkach testowych') + '.</p>'
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

export function renderExamples(examples: AlgoExample[] | undefined): string {
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

export function renderTagsRow(task: AlgoTask): string {
    if (!task.tags || !task.tags.length) return '';
    var html = '<div class="algo-tags-row">';
    task.tags.forEach(function (tag) {
      html += '<span class="pill-badge algo-tag">' + escHtml(tag) + '</span>';
    });
    html += '</div>';
    return html;
  }

export function renderHints(task: AlgoTask): string {
    if (!task.hints || !task.hints.length) return '';
    var hintsJson = escHtml(JSON.stringify(task.hints));
    var html = '<div class="algo-hints-block" id="algo-hints-block">';
    html += '<div class="algo-section-subhead">Podpowiedzi</div>';
    html += '<div id="algo-hints-list" aria-live="polite"></div>';
    html += '<button type="button" class="algo-btn-secondary" id="algo-hint-btn" data-hints="' + hintsJson + '" data-shown="0">Pokaż podpowiedź</button>';
    html += '</div>';
    return html;
  }
