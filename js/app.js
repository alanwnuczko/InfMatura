(function () {
  "use strict";

  var state = {
    searchQuery: "",
    formulaFilter: "all",
    levelFilter: "all",
    yearFilter: "all"
  };

  var elements = {};

  async function init() {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);

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
    render();
    injectExamsSchema();
  }

  function cacheElements() {
    elements.grid = document.getElementById("exam-grid");
    elements.searchInput = document.getElementById("search-input");
    elements.formulaFilter = document.getElementById("formula-filter");
    elements.levelFilter = document.getElementById("level-filter");
    elements.yearFilter = document.getElementById("year-filter");
    elements.resultCount = document.getElementById("result-count");
    elements.clearBtn = document.getElementById("clear-filters");
    elements.header = document.getElementById("site-header");
    elements.currentYear = document.getElementById("current-year");
    elements.noResults = document.getElementById("no-results");
    elements.viewSwitcher = document.getElementById("view-switcher");
  }

  function initCustomSelects() {
    var allSelects = document.querySelectorAll(".custom-select");
    allSelects.forEach(function (select) {
      var trigger = select.querySelector(".custom-select-trigger");
      var dropdown = select.querySelector(".custom-select-dropdown");
      var options = select.querySelectorAll(".custom-select-option");

      if (!trigger) return;

      trigger.addEventListener("click", function (e) {
        e.stopPropagation();
        allSelects.forEach(function (other) {
          if (other !== select) {
            other.classList.remove("open");
            var otherTrigger = other.querySelector(".custom-select-trigger");
            if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
          }
        });
        var isOpen = select.classList.toggle("open");
        trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      options.forEach(function (option) {
        option.addEventListener("click", function (e) {
          e.stopPropagation();
          selectOption(select, option);
        });
      });
    });

    document.addEventListener("click", function () {
      allSelects.forEach(function (s) {
        s.classList.remove("open");
        var t = s.querySelector(".custom-select-trigger");
        if (t) t.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        allSelects.forEach(function (s) {
          s.classList.remove("open");
          var t = s.querySelector(".custom-select-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
      }
    });
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

    selectEl.classList.remove("open");
    if (trigger) trigger.setAttribute("aria-expanded", "false");

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

  function getSelectValue(selectEl) {
    var selected = selectEl.querySelector(".custom-select-option.selected");
    return selected ? selected.getAttribute("data-value") : "all";
  }

  function setSelectValue(selectEl, value) {
    var options = selectEl.querySelectorAll(".custom-select-option");
    var valueDisplay = selectEl.querySelector(".custom-select-value");
    options.forEach(function (o) {
      if (o.getAttribute("data-value") === value) {
        o.classList.add("selected");
        o.setAttribute("aria-selected", "true");
        valueDisplay.textContent = o.textContent;
      } else {
        o.classList.remove("selected");
        o.setAttribute("aria-selected", "false");
      }
    });
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
      elements.clearBtn.addEventListener("click", function () {
        state.searchQuery = "";
        state.formulaFilter = "all";
        state.levelFilter = "all";
        state.yearFilter = "all";
        if (elements.searchInput) elements.searchInput.value = "";
        if (elements.formulaFilter) setSelectValue(elements.formulaFilter, "all");
        if (elements.levelFilter) setSelectValue(elements.levelFilter, "all");
        if (elements.yearFilter) setSelectValue(elements.yearFilter, "all");
        render();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== elements.searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
        e.preventDefault();
        if (elements.searchInput) {
          elements.searchInput.focus();
        }
      } else if (e.key === "Escape") {
        if (state.searchQuery !== "") {
          state.searchQuery = "";
          if (elements.searchInput) elements.searchInput.value = "";
          render();
        }
      }
    });

    var smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = link.getAttribute("href");
        if (targetId === "#") return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerHeight = elements.header ? elements.header.offsetHeight : 0;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 24;
          window.scrollTo({ top: targetTop, behavior: "smooth" });
        }
      });
    });
  }

  function populateYearFilter() {
    if (!elements.yearFilter) return;
    var years = [];
    examData.forEach(function (exam) {
      if (years.indexOf(exam.year) === -1) {
        years.push(exam.year);
      }
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
      opt.textContent = year;
      opt.addEventListener("click", function (e) {
        e.stopPropagation();
        selectOption(elements.yearFilter, opt);
      });
      dropdown.appendChild(opt);
    });
  }

  function setCurrentYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
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

      if (state.levelFilter !== "all") {
        if (exam.type !== state.levelFilter) return false;
      }

      if (state.yearFilter !== "all") {
        if (exam.year !== parseInt(state.yearFilter)) return false;
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

    var hasActiveFilters =
      state.searchQuery !== "" ||
      state.formulaFilter !== "all" ||
      state.levelFilter !== "all" ||
      state.yearFilter !== "all";

    if (elements.resultCount) {
      if (hasActiveFilters) {
        elements.resultCount.classList.add("result-count--filtered");
        elements.resultCount.innerHTML = 'Znaleziono: <strong>' + filtered.length + '</strong> z ' + examData.length;
      } else {
        elements.resultCount.classList.remove("result-count--filtered");
        elements.resultCount.innerHTML = 'Arkusze: <strong>' + filtered.length + '</strong> z ' + examData.length;
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

    filtered.forEach(function (exam, index) {
      var card = buildCard(exam, index);
      elements.grid.appendChild(card);
    });
  }


  function buildCard(exam, index) {
    var card = document.createElement("article");
    card.className = "exam-card";

    var formulaLabel = getFormulaLabel(exam);
    var typeLabel = getTypeLabel(exam);
    var displayTitle = getDisplayTitle(exam);

    var formulaClass = "pill-badge--fother";
    if (exam.formula === "F2023" || formulaLabel.indexOf("2023") !== -1) {
      formulaClass = "pill-badge--f2023";
    } else if (exam.formula === "F2015" || formulaLabel.indexOf("2015") !== -1) {
      formulaClass = "pill-badge--f2015";
    }

    var typeClass = "pill-badge--pr";
    if (exam.type === "PP" || typeLabel.indexOf("podstawowy") !== -1) {
      typeClass = "pill-badge--pp";
    }

    var arrowUpSVG = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var arrowDownSVG = '<svg class="link-arrow-svg" viewBox="0 0 16 16" fill="none" width="12" height="12"><path d="M8 3.5V12.5M8 12.5L4.5 9M8 12.5L11.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var headerHTML =
      '<div class="card-info">' +
        '<div class="card-meta">' +
          '<span class="pill-badge ' + typeClass + '">' + typeLabel + '</span>' +
          '<span class="pill-badge ' + formulaClass + '">' + formulaLabel + '</span>' +
        '</div>' +
        '<h2 class="card-title">' + displayTitle + '</h2>' +
      '</div>';

    var linksHTML = '<div class="card-links">';

    var arkLinks = getArkuszLinks(exam);
    arkLinks.forEach(function (link) {
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

  function initScrollHeader() {
    if (!elements.header) return;
    window.addEventListener("scroll", function () {
      var current = window.pageYOffset;
      if (current > 48) {
        elements.header.classList.add("header--scrolled");
      } else {
        elements.header.classList.remove("header--scrolled");
      }
    }, { passive: true });
  }

  function initViewSwitcher() {
    if (!elements.viewSwitcher || !elements.grid) return;

    var btns = elements.viewSwitcher.querySelectorAll(".view-btn");
    var currentView = localStorage.getItem("archive_view_mode") || "grid";

    function setView(viewMode) {
      currentView = viewMode;
      if (viewMode === "list") {
        elements.grid.classList.add("view-list");
      } else {
        elements.grid.classList.remove("view-list");
      }
      btns.forEach(function (btn) {
        if (btn.getAttribute("data-view") === viewMode) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
      localStorage.setItem("archive_view_mode", viewMode);
    }

    setView(currentView);

    elements.viewSwitcher.addEventListener("click", function () {
      var nextView = currentView === "grid" ? "list" : "grid";
      setView(nextView);
    });
  }

  function injectExamsSchema() {
    var existing = document.getElementById("schema-ld-exams");
    if (existing) existing.remove();

    var items = examData.map(function (exam, i) {
      var title = "Matura z Informatyki \u2013 " + MONTHS[exam.month] + " " + exam.year + ", " + EXAM_TYPES[exam.type] + " (" + FORMULAS[exam.formula].label + ")";
      return {
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": ["LearningResource", "DigitalDocument"],
          "@id": "https://infmatura.dev/#" + exam.id,
          "name": title,
          "url": "https://infmatura.dev/#" + exam.id,
          "inLanguage": "pl",
          "datePublished": exam.year + "-" + exam.month,
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
      "name": "Baza arkuszy maturalnych z informatyki \u2013 InfMatura",
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
