// js/algorytmy.ts - Logika platformy zadań algorytmicznych dla matury rozszerzonej z informatyki
// Pełne środowisko programistyczne w przeglądarce (Pyodide), testy jednostkowe, postęp w localStorage

declare const Prism: any;



  // --- Stale ---
export var STORAGE_PROGRESS_KEY = 'algo_progress_v1';
export var STORAGE_CODE_PREFIX  = 'algo_code_';
export var PYODIDE_CDN          = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
export var PYODIDE_INDEX_URL    = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/';
export var PYODIDE_RUN_TIMEOUT_MS = 5000;
export var PYODIDE_MAX_CODE_LENGTH = 100000;

export var DIFFICULTY_LABELS = {
    easy:   'Łatwe',
    medium: 'Średnie',
    hard:   'Trudne'
  };

export function polishPlural(n: number, one: string, few: string, many: string): string {
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
export interface AlgoAppState {
    view: "categories" | "tasklist" | "task";
    currentCat: string | null;
    currentTaskId: string | null;
    currentFilter: string;
    pyodideWorker: Worker | null;
    pyodideWorkerUrl: string | null;
    pyodideState: "idle" | "loading" | "ready" | "error";
    pyodidePromise: Promise<Worker> | null;
    runRequestId: number;
  }

export var state: AlgoAppState = {
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

export var elements: { [key: string]: any } = {};

export function scrollToTopInstant() {
    var root = document.documentElement;
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    root.style.scrollBehavior = prev;
  }

export function blurEditorIfFocused() {
    var editor = document.getElementById('algo-editor');
    if (editor && document.activeElement === editor) {
      editor.blur();
    }
  }

  // --- Zarzadzanie postepem i kodem (localStorage) ---
export interface AlgoProgress {
    done?: { [taskId: string]: boolean };
  }

export function loadProgress(): AlgoProgress {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_PROGRESS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

export function saveProgress(taskId: string) {
    var p = loadProgress();
    if (!p.done) p.done = {};
    p.done[taskId] = true;
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(p));
    } catch (e) {}
  }

export function isDone(taskId: string): boolean {
    var p = loadProgress();
    return !!(p.done && p.done[taskId]);
  }

export function getDoneCountForCat(catId: string): number {
    var p = loadProgress();
    if (!p.done) return 0;
    var tasks = getTasksForCat(catId);
    return tasks.filter(function (t) { return p.done![t.id]; }).length;
  }

export function getTotalDoneCount(): number {
    var p = loadProgress();
    return p.done ? Object.keys(p.done).length : 0;
  }

export function saveUserCode(taskId: string, code: string) {
    try {
      localStorage.setItem(STORAGE_CODE_PREFIX + taskId, code);
    } catch (e) {}
  }

export function loadUserCode(taskId: string, fallback: string): string {
    try {
      var saved = localStorage.getItem(STORAGE_CODE_PREFIX + taskId);
      return (saved !== null && saved !== undefined) ? saved : fallback;
    } catch (e) {
      return fallback;
    }
  }

export function clearUserCode(taskId: string) {
    try {
      localStorage.removeItem(STORAGE_CODE_PREFIX + taskId);
    } catch (e) {}
  }

export function clearAllUserCode() {
    try {
      var toRemove: string[] = [];
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
export function getTasksForCat(catId: string | null): AlgoTask[] {
    if (!window.ALGO_TASKS) return [];
    return window.ALGO_TASKS.filter(function (t) { return t.category === catId; });
  }

export function getTaskById(taskId: string): AlgoTask | null {
    if (!window.ALGO_TASKS) return null;
    for (var i = 0; i < window.ALGO_TASKS.length; i++) {
      if (window.ALGO_TASKS[i].id === taskId) return window.ALGO_TASKS[i];
    }
    return null;
  }

export function getCategoryMeta(catId: string): AlgoCategory | null {
    if (!window.ALGO_CATEGORIES) return null;
    for (var i = 0; i < window.ALGO_CATEGORIES.length; i++) {
      if (window.ALGO_CATEGORIES[i].id === catId) return window.ALGO_CATEGORIES[i];
    }
    return null;
  }

export function getRandomTask(catId: string | null): AlgoTask | null {
    var pool = catId ? getTasksForCat(catId) : (window.ALGO_TASKS || []);
    if (!pool.length) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

export function getAdjacentTask(taskId: string): { prev: AlgoTask | null; next: AlgoTask | null } {
    var tasks = window.ALGO_TASKS || [];
    var idx   = tasks.findIndex(function (t) { return t.id === taskId; });
    return {
      prev: idx > 0 ? tasks[idx - 1] : null,
      next: idx < tasks.length - 1 ? tasks[idx + 1] : null
    };
  }
