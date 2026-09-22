import { renderTaskView } from './editor';
import { elements, scrollToTopInstant, blurEditorIfFocused, getRandomTask } from './state';
import { renderCategories, renderTaskList } from './ui';


  // --- Inicjalizacja ---
export function init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    document.documentElement.setAttribute('data-theme', 'dark');
    cacheElements();
    setCurrentYear();
    initScrollHeader();
    bindHashRoute();
    routeFromHash();
    blurEditorIfFocused();
    scrollToTopInstant();
    window.addEventListener('load', function () {
      blurEditorIfFocused();
      scrollToTopInstant();
    });
  }

export function cacheElements() {
    elements.main      = document.getElementById('main-content');
    elements.header    = document.getElementById('site-header');
    elements.yearSpan  = document.getElementById('current-year');
    elements.backToTop = document.getElementById('back-to-top');
  }

export function setCurrentYear() {
    if (elements.yearSpan) {
      elements.yearSpan.textContent = new Date().getFullYear();
    }
  }

export function initScrollHeader() {
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
export function bindHashRoute() {
    window.addEventListener('hashchange', routeFromHash);
  }

export function routeFromHash() {
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

export function navigate(hash: string) {
    window.location.hash = hash;
    scrollToTopInstant();
  }

  // --- Start ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }


