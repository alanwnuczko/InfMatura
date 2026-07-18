(function () {
  "use strict";

  var state = {
    searchQuery: "",
    formulaFilter: "all",
    levelFilter: "all",
    yearFilter: "all"
  };

  var elements = {};
  var activeSelect = null;

  async function init() {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    var pendingHash = window.location.hash;
    if (!pendingHash) {
      window.scrollTo(0, 0);
    }

    document.documentElement.setAttribute("data-theme", "dark");
    cacheElements();
    initCustomSelects();
    bindEvents();
    initScrollHeader();
    initViewSwitcher();
    setCurrentYear();

    if (typeof loadExamData === "function") {
      await loadExamData();
    }

    populateYearFilter();
    readUrlState();
    render();
    injectExamsSchema();

    if (pendingHash) {
      scrollToExam(pendingHash.slice(1));
    }
  }

  function cacheElements() {
    elements.grid = document.getElementById("exam-grid");
    elements.searchInput = document.getElementById("search-input");
    elements.formulaFilter = document.getElementById("formula-filter");
    elements.levelFilter = document.getElementById("level-filter");
    elements.yearFilter = document.getElementById("year-filter");
    elements.resultCount = document.getElementById("result-count");
    elements.clearBtn = document.getElementById("clear-filters");
    elements.noResultsClear = document.getElementById("no-results-clear");
    elements.header = document.getElementById("site-header");
    elements.currentYear = document.getElementById("current-year");
    elements.noResults = document.getElementById("no-results");
    elements.viewSwitcher = document.getElementById("view-switcher");
  }

  function clearFilters() {
    state.searchQuery = "";
    state.formulaFilter = "all";
    state.levelFilter = "all";
    state.yearFilter = "all";
    if (elements.searchInput) elements.searchInput.value = "";
    setSelectValue(elements.formulaFilter, "all");
    setSelectValue(elements.levelFilter, "all");
    setSelectValue(elements.yearFilter, "all");
    render();
  }

  function closeAllSelects(except) {
    document.querySelectorAll(".custom-select").forEach(function (select) {
      if (except && select === except) return;
      select.classList.remove("open");
      var trigger = select.querySelector(".custom-select-trigger");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      clearActiveOption(select);
    });
    if (!except) activeSelect = null;
  }

  function getOptions(select) {
    return Array.prototype.slice.call(select.querySelectorAll(".custom-select-option"));
  }

  function clearActiveOption(select) {
    getOptions(select).forEach(function (opt) {
      opt.classList.remove("is-active");
    });
  }

  function setActiveOption(select, option) {
    clearActiveOption(select);
    if (!option) return;
    option.classList.add("is-active");
    var trigger = select.querySelector(".custom-select-trigger");
    if (trigger && option.id) {
      trigger.setAttribute("aria-activedescendant", option.id);
    }
    if (option.scrollIntoView) {
      option.scrollIntoView({ block: "nearest" });
    }
  }

  function openSelect(select) {
    closeAllSelects(select);
    select.classList.add("open");
    activeSelect = select;
    var trigger = select.querySelector(".custom-select-trigger");
    if (trigger) trigger.setAttribute("aria-expanded", "true");
    var selected = select.querySelector(".custom-select-option.selected") || getOptions(select)[0];
    setActiveOption(select, selected);
  }

  function closeSelect(select, restoreFocus) {
    select.classList.remove("open");
    var trigger = select.querySelector(".custom-select-trigger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
      trigger.removeAttribute("aria-activedescendant");
      if (restoreFocus) trigger.focus();
    }
    clearActiveOption(select);
    if (activeSelect === select) activeSelect = null;
  }

  function initCustomSelects() {
    var allSelects = document.querySelectorAll(".custom-select");

    allSelects.forEach(function (select) {
      var trigger = select.querySelector(".custom-select-trigger");
      if (!trigger) return;

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        if (select.classList.contains("open")) {
          closeSelect(select, false);
        } else {
          openSelect(select);
        }
      });

      trigger.addEventListener("keydown", function (e) {
        handleSelectKeydown(select, e);
      });

      select.addEventListener("click", function (e) {
        var option = e.target.closest(".custom-select-option");
        if (!option || !select.contains(option)) return;
        e.stopPropagation();
        selectOption(select, option);
      });
    });

    document.addEventListener("click", function () {
      closeAllSelects();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && activeSelect) {
        closeSelect(activeSelect, true);
      }
    });
  }

  function handleSelectKeydown(select, e) {
    var options = getOptions(select);
    if (!options.length) return;

    var isOpen = select.classList.contains("open");
    var active = select.querySelector(".custom-select-option.is-active");
    var index = active ? options.indexOf(active) : options.findIndex(function (o) {
      return o.classList.contains("selected");
    });
    if (index < 0) index = 0;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        openSelect(select);
        return;
      }
      index = Math.min(options.length - 1, index + 1);
      setActiveOption(select, options[index]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        openSelect(select);
        return;
      }
      index = Math.max(0, index - 1);
      setActiveOption(select, options[index]);
    } else if (e.key === "Home") {
      if (!isOpen) return;
      e.preventDefault();
      setActiveOption(select, options[0]);
    } else if (e.key === "End") {
      if (!isOpen) return;
      e.preventDefault();
      setActiveOption(select, options[options.length - 1]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!isOpen) {
        openSelect(select);
        return;
      }
      var current = select.querySelector(".custom-select-option.is-active") || options[index];
      if (current) selectOption(select, current);
    } else if (e.key === "Escape") {
      if (isOpen) {
        e.preventDefault();
        closeSelect(select, true);
      }
    }
  }

  function selectOption(selectEl, optionEl) {
    var valueDisplay = selectEl.querySelector(".custom-select-value");
    var allOptions = selectEl.querySelectorAll(".custom-select-option");
    var trigger = selectEl.querySelector(".custom-select-trigger");

    allOptions.forEach(function (o) {
      o.classList.remove("selected");
      o.setAttribute("aria-selected", "false");
    });
    optionEl.classList.add("selected");
    optionEl.setAttribute("aria-selected", "true");

    if (valueDisplay) {
      valueDisplay.textContent = optionEl.textContent;
    }

    closeSelect(selectEl, true);

    var value = optionEl.getAttribute("data-value");
    if (selectEl.id === "formula-filter") {
      state.formulaFilter = value;
    } else if (selectEl.id === "level-filter") {
      state.levelFilter = value;
    } else if (selectEl.id === "year-filter") {
      state.yearFilter = value;
    }

    render();
  }

  function setSelectValue(selectEl, value) {
    if (!selectEl) return;
    var options = selectEl.querySelectorAll(".custom-select-option");
    var valueDisplay = selectEl.querySelector(".custom-select-value");
    var matched = false;
    options.forEach(function (o) {
      if (String(o.getAttribute("data-value")) === String(value)) {
        o.classList.add("selected");
        o.setAttribute("aria-selected", "true");
        if (valueDisplay) valueDisplay.textContent = o.textContent;
        matched = true;
      } else {
        o.classList.remove("selected");
        o.setAttribute("aria-selected", "false");
      }
    });
    return matched;
  }

  function bindEvents() {
    if (elements.searchInput) {
      elements.searchInput.addEventListener("input", function (e) {
        state.searchQuery = e.target.value.trim().toLowerCase();
        render();
      });

      elements.searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          if (elements.searchInput.value !== "") {
            elements.searchInput.value = "";
            state.searchQuery = "";
            render();
          } else {
            elements.searchInput.blur();
          }
        }
      });
    }

    if (elements.clearBtn) {
      elements.clearBtn.addEventListener("click", clearFilters);
    }

    if (elements.noResultsClear) {
      elements.noResultsClear.addEventListener("click", clearFilters);
    }

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "/" &&
        document.activeElement !== elements.searchInput &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName) &&
        !document.activeElement.isContentEditable
      ) {
        e.preventDefault();
        if (elements.searchInput) elements.searchInput.focus();
      }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var headerHeight = elements.header ? elements.header.offsetHeight : 0;
        var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
        if (history.replaceState) {
          var cleanUrl = window.location.pathname + window.location.search;
          if (targetId !== "#baza-arkuszy") cleanUrl += targetId;
          history.replaceState(null, "", cleanUrl);
        }
      });
    });
  }

  function populateYearFilter() {
    if (!elements.yearFilter) return;
    var years = [];
    examData.forEach(function (exam) {
      if (years.indexOf(exam.year) === -1) years.push(exam.year);
    });
    years.sort(function (a, b) { return b - a; });

    var dropdown = elements.yearFilter.querySelector(".custom-select-dropdown");
    if (!dropdown) return;

    years.forEach(function (year) {
      var opt = document.createElement("div");
      opt.className = "custom-select-option";
      opt.setAttribute("data-value", year);
      opt.setAttribute("role", "option");
      opt.setAttribute("aria-selected", "false");
      opt.id = "year-opt-" + year;
      opt.textContent = year;
      dropdown.appendChild(opt);
    });
  }

  function readUrlState() {
    var params = new URLSearchParams(window.location.search);

    if (params.has("q")) {
      var q = params.get("q") || "";
      state.searchQuery = q.trim().toLowerCase();
      if (elements.searchInput) elements.searchInput.value = q;
    }

    if (params.has("formula")) {
      var formula = params.get("formula");
      if (setSelectValue(elements.formulaFilter, formula)) {
        state.formulaFilter = formula;
      }
    }

    if (params.has("level")) {
      var level = params.get("level");
      if (setSelectValue(elements.levelFilter, level)) {
        state.levelFilter = level;
      }
    }

    if (params.has("year")) {
      var year = params.get("year");
      if (setSelectValue(elements.yearFilter, year)) {
        state.yearFilter = year;
      }
    }
  }

  function syncUrl() {
    var params = new URLSearchParams();
    if (state.searchQuery) params.set("q", state.searchQuery);
    if (state.formulaFilter !== "all") params.set("formula", state.formulaFilter);
    if (state.levelFilter !== "all") params.set("level", state.levelFilter);
    if (state.yearFilter !== "all") params.set("year", state.yearFilter);

    var qs = params.toString();
    var hash = window.location.hash || "";
    var next = window.location.pathname + (qs ? "?" + qs : "") + hash;
    var current = window.location.pathname + window.location.search + window.location.hash;
    if (next !== current) {
      history.replaceState(null, "", next);
    }
  }

  function setCurrentYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = String(new Date().getFullYear());
    }
  }

  function getFilteredData() {
    return examData.filter(function (exam) {
      if (state.formulaFilter !== "all") {
        if (state.formulaFilter === "2023") {
          if (exam.formula !== "F2023") return false;
        } else if (state.formulaFilter === "2015") {
          if (exam.formula !== "F2015") return false;
        } else if (state.formulaFilter === "inne") {
          if (exam.formula === "F2023" || exam.formula === "F2015") return false;
        }
      }

      if (state.levelFilter !== "all" && exam.type !== state.levelFilter) {
        return false;
      }

      if (state.yearFilter !== "all" && exam.year !== parseInt(state.yearFilter, 10)) {
        return false;
      }

      if (state.searchQuery) {
        var query = state.searchQuery.trim().toLowerCase();
        var isNumericQuery = /^\d+$/.test(query);

        if (isNumericQuery) {
          var numericCombined = exam.year + " " + exam.month + " " + getDisplayTitle(exam).toLowerCase();
          if (numericCombined.indexOf(query) === -1) return false;
        } else {
          var title = getDisplayTitle(exam).toLowerCase();
          var formula = getFormulaLabel(exam).toLowerCase();
          var type = getTypeLabel(exam).toLowerCase();
          var combined = title + " " + formula + " " + type + " " + exam.year;
          if (combined.indexOf(query) === -1) return false;
        }
      }

      return true;
    });
  }

  function render() {
    if (!elements.grid) return;
    var filtered = getFilteredData();
    syncUrl();

    var hasActiveFilters =
      state.searchQuery !== "" ||
      state.formulaFilter !== "all" ||
      state.levelFilter !== "all" ||
      state.yearFilter !== "all";

    if (elements.resultCount) {
      if (hasActiveFilters) {
        elements.resultCount.classList.add("result-count--filtered");
        elements.resultCount.innerHTML = "Znaleziono: <strong>" + filtered.length + "</strong> z " + examData.length;
      } else {
        elements.resultCount.classList.remove("result-count--filtered");
        elements.resultCount.innerHTML = "Arkusze: <strong>" + filtered.length + "</strong> z " + examData.length;
      }
    }

    if (elements.clearBtn) {
      if (hasActiveFilters) {
        elements.clearBtn.classList.add("is-visible");
      } else {
        elements.clearBtn.classList.remove("is-visible");
      }
    }

    if (filtered.length === 0) {
      elements.grid.innerHTML = "";
      if (elements.noResults) elements.noResults.style.display = "block";
      return;
    }

    if (elements.noResults) elements.noResults.style.display = "none";
    elements.grid.innerHTML = "";

    filtered.forEach(function (exam) {
      elements.grid.appendChild(buildCard(exam));
    });
  }

  function buildCard(exam) {
    var card = document.createElement("article");
    card.className = "exam-card";
    card.id = exam.id;

    var formulaLabel = getFormulaLabel(exam);
    var typeLabel = getTypeLabel(exam);
    var displayTitle = getDisplayTitle(exam);

    var formulaClass = "pill-badge--fother";
    if (exam.formula === "F2023" || formulaLabel.indexOf("2023") !== -1) {
      formulaClass = "pill-badge--f2023";
    } else if (exam.formula === "F2015" || formulaLabel.indexOf("2015") !== -1) {
      formulaClass = "pill-badge--f2015";
    }

    var typeClass = exam.type === "PP" || typeLabel.indexOf("podstawowy") !== -1
      ? "pill-badge--pp"
      : "pill-badge--pr";

    var arrowUpSVG = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var arrowDownSVG = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12" aria-hidden="true"><path d="M8 3.5V12.5M8 12.5L4.5 9M8 12.5L11.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var headerHTML =
      '<div class="card-info">' +
        '<div class="card-meta">' +
          '<span class="pill-badge ' + typeClass + '">' + typeLabel + '</span>' +
          '<span class="pill-badge ' + formulaClass + '">' + formulaLabel + '</span>' +
        '</div>' +
        '<h3 class="card-title">' + displayTitle + '</h3>' +
      '</div>';

    var linksHTML = '<div class="card-links">';

    getArkuszLinks(exam).forEach(function (link) {
      var pdfTitle = link.label === "Arkusz" ? "Arkusz PDF" : link.label;
      linksHTML +=
        '<a href="' + link.url + '" target="_blank" rel="noopener noreferrer" class="card-link">' +
          '<span>' + pdfTitle + '</span>' + arrowUpSVG +
        '</a>';
    });

    if (exam.hasData) {
      linksHTML +=
        '<a href="' + getDaneLink(exam) + '" download class="card-link">' +
          '<span>Dane ZIP</span>' + arrowDownSVG +
        '</a>';
    }

    if (exam.hasZasady) {
      linksHTML +=
        '<a href="' + getZasadyLink(exam) + '" target="_blank" rel="noopener noreferrer" class="card-link">' +
          '<span>Zasady oceniania</span>' + arrowUpSVG +
        '</a>';
    }

    if (exam.hasSolution) {
      linksHTML +=
        '<a href="' + getSolutionLink(exam) + '" target="_blank" rel="noopener noreferrer" class="card-link">' +
          '<span>Rozwiązanie Python</span>' + arrowUpSVG +
        '</a>';
    }

    linksHTML += '</div>';
    card.innerHTML = headerHTML + linksHTML;
    return card;
  }

  function scrollToExam(examId) {
    if (!examId) return;
    requestAnimationFrame(function () {
      var el = document.getElementById(examId);
      if (!el) return;
      var headerHeight = elements.header ? elements.header.offsetHeight : 0;
      var top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
      window.scrollTo({ top: top, behavior: "smooth" });
      el.classList.add("is-highlighted");
      window.setTimeout(function () {
        el.classList.remove("is-highlighted");
      }, 2200);
    });
  }

  function initScrollHeader() {
    if (!elements.header) return;
    var ticking = false;

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (window.pageYOffset > 48) {
          elements.header.classList.add("header--scrolled");
        } else {
          elements.header.classList.remove("header--scrolled");
        }
        ticking = false;
      });
    }, { passive: true });
  }

  function initViewSwitcher() {
    if (!elements.viewSwitcher || !elements.grid) return;

    var btns = elements.viewSwitcher.querySelectorAll(".view-btn");
    var currentView = "grid";

    try {
      currentView = localStorage.getItem("archive_view_mode") || "grid";
    } catch (err) {
      currentView = "grid";
    }

    function setView(viewMode) {
      currentView = viewMode;
      if (viewMode === "list") {
        elements.grid.classList.add("view-list");
      } else {
        elements.grid.classList.remove("view-list");
      }

      btns.forEach(function (btn) {
        var isActive = btn.getAttribute("data-view") === viewMode;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      try {
        localStorage.setItem("archive_view_mode", viewMode);
      } catch (err) {}
    }

    setView(currentView === "list" ? "list" : "grid");

    elements.viewSwitcher.addEventListener("click", function () {
      setView(currentView === "grid" ? "list" : "grid");
    });
  }

  function injectExamsSchema() {
    var existing = document.getElementById("schema-ld-exams");
    if (existing) existing.remove();

    var items = examData.map(function (exam, i) {
      var title =
        "Matura z Informatyki - " +
        MONTHS[exam.month] + " " + exam.year + ", " +
        EXAM_TYPES[exam.type] + " (" + FORMULAS[exam.formula].label + ")";

      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": ["LearningResource", "DigitalDocument"],
          "@id": "https://infmatura.dev/#" + exam.id,
          "name": title,
          "url": "https://infmatura.dev/#" + exam.id,
          "inLanguage": "pl",
          "datePublished": exam.year + "-" + exam.month + "-01",
          "learningResourceType": "Exam paper",
          "educationalLevel": "Upper Secondary Education",
          "assesses": "Informatyka",
          "publisher": {
            "@type": "Organization",
            "name": "Centralna Komisja Egzaminacyjna",
            "url": "https://cke.gov.pl"
          }
        }
      };
    });

    var schema = {
      "@context": "https://schema.org",
      "@type": ["CollectionPage", "WebPage"],
      "@id": "https://infmatura.dev/#archive",
      "name": "Baza arkuszy maturalnych z informatyki - InfMatura",
      "description": "Archiwum arkuszy CKE z informatyki rozszerzonej i podstawowej. Zawiera arkusze PDF, rozwiązania w Pythonie oraz zasady oceniania.",
      "url": "https://infmatura.dev/",
      "inLanguage": "pl",
      "isPartOf": { "@id": "https://infmatura.dev/#website" },
      "about": {
        "@type": "Thing",
        "name": "Egzamin maturalny z informatyki",
        "sameAs": "https://www.gov.pl/web/edukacja/egzamin-maturalny"
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Arkusze maturalne z informatyki",
        "numberOfItems": examData.length,
        "itemListElement": items
      }
    };

    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "schema-ld-exams";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
