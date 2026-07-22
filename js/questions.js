(function () {
  "use strict";

  var DRAW_COUNTS = [1, 5, 10];
  var CATEGORIES = [
    { id: "systemy", label: "Systemy liczbowe" },
    { id: "sieci", label: "Sieci i protokoły" },
    { id: "sql", label: "Bazy danych i SQL" },
    { id: "algorytmy", label: "Algorytmy i struktury" },
    { id: "bezpieczenstwo", label: "Bezpieczeństwo" },
    { id: "arkusz", label: "Arkusz kalkulacyjny" },
    { id: "multimedia", label: "Grafika i multimedia" },
    { id: "oprogramowanie", label: "Oprogramowanie i sprzęt" }
  ];

  var questionBank = [];
  var currentPicked = [];
  var lastRequestedCount = 5;
  var selectedCount = 5;
  var activeCategory = "all";
  var elements = {};

  function init() {
    document.documentElement.setAttribute("data-theme", "dark");
    cacheElements();
    setCurrentYear();
    initScrollHeader();
    loadQuestions();
    bindEvents();
    renderCategoryFilters();
    renderCountSeg();
    updateDrawAction();
    showEmptyState();
  }

  function cacheElements() {
    elements.header = document.getElementById("site-header");
    elements.currentYear = document.getElementById("current-year");
    elements.categoryFilters = document.getElementById("category-filters");
    elements.drawCountSeg = document.getElementById("draw-count-seg");
    elements.drawBtn = document.getElementById("draw-btn");
    elements.resultsSection = document.getElementById("questions-section");
    elements.results = document.getElementById("questions-results");
    elements.drawSummary = document.getElementById("draw-summary");
    elements.redrawBtn = document.getElementById("redraw-btn");
    elements.checkBtn = document.getElementById("check-answers-btn");
    elements.checkBar = document.getElementById("check-answers-bar");
    elements.checkScore = document.getElementById("check-answers-score");
    elements.backToTop = document.getElementById("back-to-top");
  }

  function getCategoryLabel(categoryId) {
    if (!categoryId || categoryId === "all") return "";
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === categoryId) return CATEGORIES[i].label;
    }
    return categoryId;
  }

  function getFilteredBank() {
    if (activeCategory === "all") return questionBank;
    return questionBank.filter(function (q) {
      return q.category === activeCategory;
    });
  }

  function countByCategory(categoryId) {
    if (categoryId === "all") return questionBank.length;
    var n = 0;
    for (var i = 0; i < questionBank.length; i++) {
      if (questionBank[i].category === categoryId) n++;
    }
    return n;
  }

  function renderCategoryFilters() {
    if (!elements.categoryFilters) return;
    elements.categoryFilters.innerHTML = "";

    var allBtn = createCategoryChip("all", "Wszystkie", questionBank.length);
    elements.categoryFilters.appendChild(allBtn);

    CATEGORIES.forEach(function (cat) {
      var count = countByCategory(cat.id);
      if (count === 0) return;
      elements.categoryFilters.appendChild(
        createCategoryChip(cat.id, cat.label, count)
      );
    });
  }

  function createCategoryChip(id, label, count) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className =
      "category-chip" + (activeCategory === id ? " is-active" : "");
    btn.setAttribute("data-category", id);
    btn.setAttribute("aria-pressed", activeCategory === id ? "true" : "false");
    btn.setAttribute(
      "aria-label",
      label + ", " + count + (count === 1 ? " pytanie" : " pytań")
    );

    var labelSpan = document.createElement("span");
    labelSpan.className = "category-chip-label";
    labelSpan.textContent = label;

    var countSpan = document.createElement("span");
    countSpan.className = "category-chip-count";
    countSpan.textContent = String(count);

    btn.appendChild(labelSpan);
    btn.appendChild(countSpan);
    btn.addEventListener("click", function () {
      setActiveCategory(id);
    });
    return btn;
  }

  function setActiveCategory(categoryId) {
    if (activeCategory === categoryId) return;
    activeCategory = categoryId;

    if (elements.categoryFilters) {
      var chips = elements.categoryFilters.querySelectorAll(".category-chip");
      chips.forEach(function (chip) {
        var isActive = chip.getAttribute("data-category") === activeCategory;
        chip.classList.toggle("is-active", isActive);
        chip.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
    }

    updateDrawAction();
  }

  function setActionsBarVisible(visible) {
    if (elements.checkBar) elements.checkBar.hidden = !visible;
    if (elements.checkBtn) {
      elements.checkBtn.hidden = !visible;
      elements.checkBtn.disabled = false;
    }
    if (elements.redrawBtn) {
      elements.redrawBtn.hidden = !visible;
      elements.redrawBtn.disabled = false;
    }
  }

  function setCheckButtonLabel(label) {
    if (elements.checkBtn) {
      elements.checkBtn.textContent = label;
      elements.checkBtn.disabled = false;
    }
  }

  function redrawLastSet() {
    var last = Number(lastRequestedCount);
    if (!isFinite(last) || last < 1) last = selectedCount || 5;
    drawQuestions(last);
  }

  function drawSelected() {
    drawQuestions(selectedCount);
  }

  function loadQuestions() {
    if (typeof window.QUESTIONS_JSON !== "undefined" && Array.isArray(window.QUESTIONS_JSON)) {
      questionBank = window.QUESTIONS_JSON.filter(function (q) {
        return q && typeof q.html === "string" && q.html.trim() !== "";
      });
    } else {
      questionBank = [];
    }
  }

  function setCurrentYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = String(new Date().getFullYear());
    }
  }

  function initScrollHeader() {
    if (!elements.header && !elements.backToTop) return;
    var ticking = false;

    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          if (elements.header) {
            if (window.pageYOffset > 48) {
              elements.header.classList.add("header--scrolled");
            } else {
              elements.header.classList.remove("header--scrolled");
            }
          }

          if (elements.backToTop) {
            var scrollPos = window.pageYOffset;
            var docHeight = document.documentElement.scrollHeight;
            var show = selectedCount === 10 && scrollPos > docHeight / 2;
            elements.backToTop.hidden = false;
            elements.backToTop.classList.toggle("is-visible", show);
            elements.backToTop.setAttribute("aria-hidden", show ? "false" : "true");
          }

          ticking = false;
        });
      },
      { passive: true }
    );
  }

  function pluralizeQuestions(n) {
    if (n === 1) return "1 pytanie";
    var mod10 = n % 10;
    var mod100 = n % 100;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
      return n + " pytania";
    }
    return n + " pytań";
  }

  function renderCountSeg() {
    if (!elements.drawCountSeg) return;
    elements.drawCountSeg.innerHTML = "";

    DRAW_COUNTS.forEach(function (count) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className =
        "draw-count-opt" + (selectedCount === count ? " is-active" : "");
      btn.setAttribute("role", "radio");
      btn.setAttribute(
        "aria-checked",
        selectedCount === count ? "true" : "false"
      );
      btn.setAttribute("data-count", String(count));
      btn.textContent = String(count);
      btn.addEventListener("click", function () {
        setSelectedCount(count);
      });
      elements.drawCountSeg.appendChild(btn);
    });
  }

  function setSelectedCount(count) {
    if (selectedCount === count) return;
    selectedCount = count;

    if (elements.drawCountSeg) {
      var opts = elements.drawCountSeg.querySelectorAll(".draw-count-opt");
      opts.forEach(function (opt) {
        var isActive = Number(opt.getAttribute("data-count")) === selectedCount;
        opt.classList.toggle("is-active", isActive);
        opt.setAttribute("aria-checked", isActive ? "true" : "false");
      });
    }

    updateDrawAction();
  }

  function updateDrawAction() {
    var pool = getFilteredBank();
    var canDraw = pool.length > 0;

    if (elements.drawBtn) {
      elements.drawBtn.disabled = !canDraw;
      if (!canDraw && questionBank.length === 0) {
        elements.drawBtn.textContent = "Brak pytań";
      } else if (!canDraw) {
        elements.drawBtn.textContent = "Brak w temacie";
      } else {
        elements.drawBtn.textContent =
          "Losuj " + pluralizeQuestions(Math.min(selectedCount, pool.length));
      }
    }
  }

  function shuffleCopy(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function drawQuestions(requestedCount) {
    var pool = getFilteredBank();
    if (!pool.length) {
      showEmptyState();
      return;
    }

    lastRequestedCount = requestedCount;
    var count = Math.min(requestedCount, pool.length);
    currentPicked = shuffleCopy(pool).slice(0, count);
    renderResults(currentPicked, requestedCount, pool.length);
  }

  function normalizeFillAnswer(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, "")
      .toLowerCase()
      .replace(/[_\u2080-\u2089]/g, "");
  }

  function normalizePf(value) {
    var v = String(value || "").trim().toUpperCase();
    if (v === "P" || v === "T" || v === "TRUE" || v === "1") return "P";
    if (v === "F" || v === "FALSE" || v === "0") return "F";
    return v;
  }

  function escapeHtmlAttr(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function injectFillBlanks(html, question) {
    var index = 0;
    var selectOptions = (question && question.selectOptions) || ["<", "=", ">"];

    return String(html).replace(/\{\{(blank|d|select)\}\}/g, function (_, kind) {
      var i = index++;

      if (kind === "select") {
        var optionsHtml = selectOptions
          .map(function (opt) {
            var val = String(opt);
            return (
              '<option value="' +
              escapeHtmlAttr(val) +
              '">' +
              escapeHtmlAttr(val) +
              "</option>"
            );
          })
          .join("");
        return (
          '<select class="answer-select answer-input" data-answer-index="' +
          i +
          '" aria-label="Wybierz odpowiedź ' +
          (i + 1) +
          '">' +
          '<option value="">-</option>' +
          optionsHtml +
          "</select>"
        );
      }

      var cls =
        kind === "d"
          ? "math-input math-input--digit answer-input"
          : "math-input answer-input";
      var maxLen = kind === "d" ? ' maxlength="1"' : "";
      return (
        '<input type="text" class="' +
        cls +
        '" data-answer-index="' +
        i +
        '" autocomplete="off" spellcheck="false"' +
        maxLen +
        ' aria-label="Odpowiedź ' +
        (i + 1) +
        '">'
      );
    });
  }

  function buildChoiceList(question, cardIndex) {
    var wrap = document.createElement("div");
    wrap.className = "question-choice-list";
    wrap.setAttribute("role", "radiogroup");
    wrap.setAttribute("aria-label", "Wybierz odpowiedź");

    var options = question.options || [];
    var groupName = "choice-" + cardIndex;

    options.forEach(function (opt) {
      var id = String(opt.id || "").toUpperCase();
      var label = document.createElement("label");
      label.className = "choice-option";

      var input = document.createElement("input");
      input.type = "radio";
      input.name = groupName;
      input.value = id;
      input.className = "choice-radio answer-input";
      input.setAttribute("data-choice-id", id);

      var key = document.createElement("span");
      key.className = "choice-key";
      key.textContent = id + ".";

      var text = document.createElement("span");
      text.className = "choice-text";
      text.textContent = opt.text || "";

      label.appendChild(input);
      label.appendChild(key);
      label.appendChild(text);
      wrap.appendChild(label);
    });

    return wrap;
  }

  function buildTrueFalseTable(question, cardIndex) {
    var wrap = document.createElement("div");
    wrap.className = "question-tf-wrap";

    var table = document.createElement("table");
    table.className = "question-pf-table";

    var thead = document.createElement("thead");
    thead.innerHTML =
      "<tr>" +
      '<th scope="col" class="pf-num"></th>' +
      '<th scope="col">Zdanie</th>' +
      '<th scope="col" class="pf-mark">P</th>' +
      '<th scope="col" class="pf-mark">F</th>' +
      "</tr>";
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    var items = question.items || [];

    items.forEach(function (item, itemIndex) {
      var tr = document.createElement("tr");
      tr.className = "tf-row";
      tr.setAttribute("data-item-index", String(itemIndex));

      var tdNum = document.createElement("td");
      tdNum.className = "pf-num";
      tdNum.textContent = itemIndex + 1 + ".";

      var tdText = document.createElement("td");
      tdText.textContent = item.text || "";

      var groupName = "q-" + cardIndex + "-item-" + itemIndex;

      var tdP = document.createElement("td");
      tdP.className = "pf-mark";
      tdP.appendChild(buildPfChoice(groupName, "P", itemIndex));

      var tdF = document.createElement("td");
      tdF.className = "pf-mark";
      tdF.appendChild(buildPfChoice(groupName, "F", itemIndex));

      tr.appendChild(tdNum);
      tr.appendChild(tdText);
      tr.appendChild(tdP);
      tr.appendChild(tdF);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  }

  function buildPfChoice(groupName, value, itemIndex) {
    var label = document.createElement("label");
    label.className = "pf-choice";

    var input = document.createElement("input");
    input.type = "radio";
    input.name = groupName;
    input.value = value;
    input.className = "pf-radio answer-input";
    input.setAttribute("data-item-index", String(itemIndex));
    input.setAttribute("aria-label", value === "P" ? "Prawda" : "Fałsz");

    var span = document.createElement("span");
    span.className = "pf-choice-face";
    span.textContent = value;

    label.appendChild(input);
    label.appendChild(span);
    return label;
  }

  function scrollToResultsHeading() {
    var target =
      document.getElementById("results-heading") ||
      document.querySelector(".questions-toolbar") ||
      elements.results;
    if (target && target.scrollIntoView) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderResults(picked, requestedCount, poolSize) {
    if (!elements.results) return;

    var available = typeof poolSize === "number" ? poolSize : getFilteredBank().length;

    if (elements.resultsSection) elements.resultsSection.hidden = false;

    if (elements.drawSummary) {
      var summary = "Wylosowano " + pluralizeQuestions(picked.length);
      var catLabel = getCategoryLabel(activeCategory);
      if (catLabel) {
        summary += " · " + catLabel;
      }
      if (requestedCount > picked.length) {
        summary +=
          " (w filtrze jest tylko " + pluralizeQuestions(available) + ")";
      }
      elements.drawSummary.textContent = summary;
      elements.drawSummary.hidden = false;
    }

    if (elements.checkScore) {
      elements.checkScore.hidden = true;
      elements.checkScore.textContent = "";
      elements.checkScore.className = "check-answers-score";
    }
    setActionsBarVisible(true);
    setCheckButtonLabel("Sprawdź odpowiedzi");

    var fragment = document.createDocumentFragment();

    picked.forEach(function (question, index) {
      var card = document.createElement("article");
      card.className = "question-card";
      card.setAttribute("data-question-id", question.id || "");
      card.setAttribute("data-question-index", String(index));
      card.setAttribute("aria-label", "Pytanie " + (index + 1));

      var header = document.createElement("div");
      header.className = "question-card-header";

      var badge = document.createElement("span");
      badge.className = "question-badge";
      badge.textContent = "Pytanie " + (index + 1);

      header.appendChild(badge);

      var catName = getCategoryLabel(question.category);
      if (catName) {
        var catBadge = document.createElement("span");
        catBadge.className = "question-category-badge";
        catBadge.textContent = catName;
        header.appendChild(catBadge);
      }

      if (question.source) {
        var source = document.createElement("span");
        source.className = "question-source";
        source.textContent = question.source;
        header.appendChild(source);
      }

      var body = document.createElement("div");
      body.className = "question-body";

      var type = question.type || "fill";
      if (type === "truefalse") {
        body.innerHTML = question.html || "";
        body.appendChild(buildTrueFalseTable(question, index));
      } else if (type === "choice") {
        body.innerHTML = question.html || "";
        body.appendChild(buildChoiceList(question, index));
      } else {
        body.innerHTML = injectFillBlanks(question.html || "", question);
      }

      var feedback = document.createElement("div");
      feedback.className = "question-feedback";
      feedback.hidden = true;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(feedback);
      fragment.appendChild(card);
    });

    elements.results.innerHTML = "";
    elements.results.appendChild(fragment);

    requestAnimationFrame(function () {
      scrollToResultsHeading();
    });
  }

  function formatExpectedDisplay(value) {
    return String(value == null ? "" : value).trim();
  }

  function clearFillReveals(card) {
    card.querySelectorAll(".answer-reveal").forEach(function (el) {
      el.remove();
    });

    card.querySelectorAll("[data-user-value]").forEach(function (input) {
      input.value = input.getAttribute("data-user-value") || "";
      input.removeAttribute("data-user-value");
      input.removeAttribute("readonly");
      if (input.hasAttribute("data-prev-aria")) {
        var prevAria = input.getAttribute("data-prev-aria");
        if (prevAria) {
          input.setAttribute("aria-label", prevAria);
        } else {
          input.removeAttribute("aria-label");
        }
        input.removeAttribute("data-prev-aria");
      }
    });
  }

  function revealFillAnswer(input, expectedRaw) {
    var display = formatExpectedDisplay(expectedRaw);
    if (!display) return;

    var isDigit = input.classList.contains("math-input--digit");
    var inAdditionGrid = !!(input.closest && input.closest(".addition-grid"));

    if (isDigit || inAdditionGrid) {
      if (!input.hasAttribute("data-user-value")) {
        input.setAttribute("data-user-value", input.value);
      }
      if (!input.hasAttribute("data-prev-aria")) {
        input.setAttribute(
          "data-prev-aria",
          input.getAttribute("aria-label") || ""
        );
      }
      input.value = display;
      input.setAttribute("readonly", "readonly");
      input.classList.add("is-revealed");
      input.setAttribute("aria-label", "Poprawna odpowiedź: " + display);
      return;
    }

    var reveal = document.createElement("span");
    reveal.className = "answer-reveal";
    reveal.textContent = display;
    reveal.setAttribute("title", "Poprawna odpowiedź");
    reveal.setAttribute("aria-label", "Poprawna odpowiedź: " + display);
    input.insertAdjacentElement("afterend", reveal);
  }

  function markCorrectPfChoice(row, expected) {
    if (!row || !expected) return;
    var correctInput = row.querySelector(
      'input.pf-radio[value="' + expected + '"]'
    );
    if (!correctInput) return;
    var label = correctInput.closest(".pf-choice");
    if (label) {
      label.classList.add("is-correct", "is-answer-key");
    }
  }

  function markCorrectChoiceOption(card, expected) {
    if (!expected) return;
    var correctInput = card.querySelector(
      'input.choice-radio[value="' + expected + '"]'
    );
    if (!correctInput) return;
    var label = correctInput.closest(".choice-option");
    if (label) {
      label.classList.add("is-correct", "is-answer-key");
    }
  }

  function clearCheckMarks(card) {
    card.classList.remove("is-correct", "is-incorrect", "is-partial", "is-checked");
    card
      .querySelectorAll(
        ".is-correct, .is-incorrect, .is-missed, .is-revealed, .is-answer-key"
      )
      .forEach(function (el) {
        el.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-missed",
          "is-revealed",
          "is-answer-key"
        );
      });
    clearFillReveals(card);
    var feedback = card.querySelector(".question-feedback");
    if (feedback) {
      feedback.hidden = true;
      feedback.textContent = "";
      feedback.className = "question-feedback";
    }
  }

  function checkFillQuestion(card, question) {
    var inputs = card.querySelectorAll(
      ".math-input, input.answer-input[type='text'], select.answer-select"
    );
    var expected = question.answers || [];
    var correctParts = 0;
    var totalParts = expected.length || inputs.length;
    var allAnswered = true;
    var revealedAnswers = [];

    inputs.forEach(function (input) {
      var idxAttr = input.getAttribute("data-answer-index");
      var idx = idxAttr ? parseInt(idxAttr, 10) : 0;
      var user = normalizeFillAnswer(input.value);
      var rawExpected = expected[idx];
      var exp = normalizeFillAnswer(rawExpected);
      input.classList.remove(
        "is-correct",
        "is-incorrect",
        "is-missed",
        "is-revealed"
      );

      if (!user) {
        allAnswered = false;
        input.classList.add("is-missed");
        if (exp) {
          revealFillAnswer(input, rawExpected);
          revealedAnswers.push(formatExpectedDisplay(rawExpected));
        }
        return;
      }

      if (exp && user === exp) {
        input.classList.add("is-correct");
        correctParts += 1;
      } else {
        input.classList.add("is-incorrect");
        if (exp) {
          revealFillAnswer(input, rawExpected);
          revealedAnswers.push(formatExpectedDisplay(rawExpected));
        }
      }
    });

    return {
      correctParts: correctParts,
      totalParts: totalParts,
      allAnswered: allAnswered && totalParts > 0,
      fullyCorrect: totalParts > 0 && correctParts === totalParts,
      correctSummary: revealedAnswers.length
        ? "Poprawne: " + revealedAnswers.join(" · ")
        : ""
    };
  }

  function checkTrueFalseQuestion(card, question) {
    var items = question.items || [];
    var correctParts = 0;
    var totalParts = items.length;
    var allAnswered = true;
    var revealedParts = [];

    items.forEach(function (item, itemIndex) {
      var row = card.querySelector('.tf-row[data-item-index="' + itemIndex + '"]');
      if (!row) return;

      var selected = row.querySelector("input.pf-radio:checked");
      var faces = row.querySelectorAll(".pf-choice");
      faces.forEach(function (face) {
        face.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-missed",
          "is-answer-key"
        );
      });

      var expected = normalizePf(item.answer);
      var partLabel = itemIndex + 1 + ". " + (expected || "?");

      if (!selected) {
        allAnswered = false;
        markCorrectPfChoice(row, expected);
        revealedParts.push(partLabel);
        return;
      }

      var user = normalizePf(selected.value);
      var selectedLabel = selected.closest(".pf-choice");

      if (user === expected) {
        correctParts += 1;
        if (selectedLabel) selectedLabel.classList.add("is-correct");
      } else {
        if (selectedLabel) selectedLabel.classList.add("is-incorrect");
        markCorrectPfChoice(row, expected);
        revealedParts.push(partLabel);
      }
    });

    return {
      correctParts: correctParts,
      totalParts: totalParts,
      allAnswered: allAnswered && totalParts > 0,
      fullyCorrect: totalParts > 0 && correctParts === totalParts,
      correctSummary: revealedParts.length
        ? "Poprawne: " + revealedParts.join(" · ")
        : ""
    };
  }

  function checkChoiceQuestion(card, question) {
    var expected = String(question.answer || "").trim().toUpperCase();
    var selected = card.querySelector("input.choice-radio:checked");
    var options = card.querySelectorAll(".choice-option");

    options.forEach(function (opt) {
      opt.classList.remove(
        "is-correct",
        "is-incorrect",
        "is-missed",
        "is-answer-key"
      );
    });

    if (!selected) {
      markCorrectChoiceOption(card, expected);
      return {
        correctParts: 0,
        totalParts: 1,
        allAnswered: false,
        fullyCorrect: false,
        correctSummary: expected ? "Poprawna odpowiedź: " + expected : ""
      };
    }

    var user = String(selected.value || "").trim().toUpperCase();
    var selectedLabel = selected.closest(".choice-option");
    var isCorrect = user === expected;

    if (isCorrect) {
      if (selectedLabel) selectedLabel.classList.add("is-correct");
    } else {
      if (selectedLabel) selectedLabel.classList.add("is-incorrect");
      markCorrectChoiceOption(card, expected);
    }

    return {
      correctParts: isCorrect ? 1 : 0,
      totalParts: 1,
      allAnswered: true,
      fullyCorrect: isCorrect,
      correctSummary:
        !isCorrect && expected ? "Poprawna odpowiedź: " + expected : ""
    };
  }

  function setQuestionFeedback(card, result) {
    card.classList.add("is-checked");
    card.classList.remove("is-correct", "is-incorrect", "is-partial");

    if (!result.totalParts) return;

    if (result.fullyCorrect) {
      card.classList.add("is-correct");
    } else if (result.correctParts === 0) {
      card.classList.add("is-incorrect");
    } else {
      card.classList.add("is-partial");
    }

    var feedback = card.querySelector(".question-feedback");
    if (feedback) {
      feedback.hidden = true;
    }
  }

  function checkAnswers() {
    if (!elements.results || !currentPicked.length) return;

    var cards = elements.results.querySelectorAll(".question-card");
    var totalParts = 0;
    var correctParts = 0;
    var fullyCorrectQuestions = 0;

    cards.forEach(function (card, index) {
      var question = currentPicked[index];
      if (!question) return;

      clearCheckMarks(card);

      var type = question.type || "fill";
      var result;
      if (type === "truefalse") {
        result = checkTrueFalseQuestion(card, question);
      } else if (type === "choice") {
        result = checkChoiceQuestion(card, question);
      } else {
        result = checkFillQuestion(card, question);
      }

      totalParts += result.totalParts;
      correctParts += result.correctParts;
      if (result.fullyCorrect) fullyCorrectQuestions += 1;
      setQuestionFeedback(card, result);
    });

    if (elements.checkScore) {
      elements.checkScore.hidden = false;
      elements.checkScore.textContent =
        "Wynik: " +
        correctParts +
        "/" +
        totalParts +
        " punktów · " +
        fullyCorrectQuestions +
        "/" +
        currentPicked.length +
        " pytań w całości poprawnych";
      elements.checkScore.className =
        correctParts === totalParts && totalParts > 0
          ? "check-answers-score is-ok"
          : correctParts === 0
            ? "check-answers-score is-bad"
            : "check-answers-score is-partial-msg";
    }

    setCheckButtonLabel("Sprawdź ponownie");
  }

  function showEmptyState() {
    currentPicked = [];
    if (elements.resultsSection) elements.resultsSection.hidden = true;
    if (elements.results) elements.results.innerHTML = "";
    if (elements.drawSummary) {
      elements.drawSummary.hidden = true;
      elements.drawSummary.textContent = "";
    }
    setActionsBarVisible(false);
    if (elements.checkScore) {
      elements.checkScore.hidden = true;
      elements.checkScore.textContent = "";
    }
  }

  function bindEvents() {
    if (elements.drawBtn) {
      elements.drawBtn.addEventListener("click", function () {
        drawSelected();
      });
    }

    if (elements.backToTop) {
      elements.backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    document.addEventListener("click", function (event) {
      var target = event.target;
      if (!target || typeof target.closest !== "function") return;

      var redrawEl = target.closest('[data-action="redraw"]');
      if (redrawEl) {
        event.preventDefault();
        redrawLastSet();
        return;
      }

      var checkEl = target.closest('[data-action="check"]');
      if (checkEl) {
        event.preventDefault();
        checkAnswers();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
