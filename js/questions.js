(function () {
  "use strict";

  var DRAW_COUNTS = [1, 5, 10];
  var questionBank = [];
  var currentPicked = [];
  var lastRequestedCount = 1;
  var elements = {};

  function init() {
    document.documentElement.setAttribute("data-theme", "dark");
    cacheElements();
    setCurrentYear();
    initScrollHeader();
    loadQuestions();
    bindEvents();
    updateBankMeta();
    renderDrawButtons();
    showEmptyState();
  }

  function cacheElements() {
    elements.header = document.getElementById("site-header");
    elements.currentYear = document.getElementById("current-year");
    elements.drawControls = document.getElementById("draw-controls");
    elements.results = document.getElementById("questions-results");
    elements.empty = document.getElementById("questions-empty");
    elements.bankCount = document.getElementById("questions-bank-count");
    elements.drawSummary = document.getElementById("draw-summary");
    elements.redrawBtn = document.getElementById("redraw-btn");
    elements.redrawBtnBottom = document.getElementById("redraw-btn-bottom");
    elements.checkBtnTop = document.getElementById("check-answers-btn-top");
    elements.checkBtnBottom = document.getElementById("check-answers-btn-bottom");
    elements.checkBar = document.getElementById("check-answers-bar");
    elements.checkScore = document.getElementById("check-answers-score");
  }

  function getCheckButtons() {
    return [elements.checkBtnTop, elements.checkBtnBottom].filter(Boolean);
  }

  function getRedrawButtons() {
    return [elements.redrawBtn, elements.redrawBtnBottom].filter(Boolean);
  }

  function setCheckButtonsVisible(visible) {
    getCheckButtons().forEach(function (btn) {
      btn.hidden = !visible;
      btn.disabled = false;
    });
    if (elements.checkBar) elements.checkBar.hidden = !visible;
  }

  function setCheckButtonsLabel(label) {
    getCheckButtons().forEach(function (btn) {
      btn.textContent = label;
      btn.disabled = false;
    });
  }

  function setRedrawButtonsVisible(visible) {
    if (elements.redrawBtn) {
      elements.redrawBtn.hidden = !visible;
      elements.redrawBtn.disabled = false;
    }
    if (elements.redrawBtnBottom) {
      elements.redrawBtnBottom.disabled = false;
      elements.redrawBtnBottom.removeAttribute("hidden");
    }
  }

  function redrawLastSet() {
    var last = Number(lastRequestedCount);
    if (!isFinite(last) || last < 1) last = 1;
    drawQuestions(last);
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
    if (!elements.header) return;
    var ticking = false;

    window.addEventListener(
      "scroll",
      function () {
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
      },
      { passive: true }
    );
  }

  function updateBankMeta() {
    if (elements.bankCount) {
      var n = questionBank.length;
      elements.bankCount.textContent =
        n === 1 ? "1 pytanie w bazie" : n + " pytań w bazie";
    }
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

  function renderDrawButtons() {
    if (!elements.drawControls) return;
    elements.drawControls.innerHTML = "";

    if (questionBank.length === 0) {
      var disabled = document.createElement("p");
      disabled.className = "questions-hint";
      disabled.textContent = "Baza pytań jest pusta.";
      elements.drawControls.appendChild(disabled);
      return;
    }

    DRAW_COUNTS.forEach(function (count) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-cta draw-btn";
      btn.setAttribute("data-count", String(count));
      btn.textContent = "Losuj " + pluralizeQuestions(count);
      btn.disabled = questionBank.length === 0;
      btn.addEventListener("click", function () {
        drawQuestions(count);
      });
      elements.drawControls.appendChild(btn);
    });
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
    if (!questionBank.length) {
      showEmptyState();
      return;
    }

    lastRequestedCount = requestedCount;
    var count = Math.min(requestedCount, questionBank.length);
    currentPicked = shuffleCopy(questionBank).slice(0, count);
    renderResults(currentPicked, requestedCount);
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

  function renderResults(picked, requestedCount) {
    if (!elements.results) return;

    var alreadyVisible =
      !elements.results.hidden && elements.results.childElementCount > 0;

    if (elements.empty) elements.empty.hidden = true;
    elements.results.hidden = false;
    elements.results.innerHTML = "";

    if (elements.drawSummary) {
      var summary = "Wylosowano " + pluralizeQuestions(picked.length);
      if (requestedCount > picked.length) {
        summary +=
          " (w bazie jest tylko " + pluralizeQuestions(questionBank.length) + ")";
      }
      elements.drawSummary.textContent = summary;
      elements.drawSummary.hidden = false;
    }

    setRedrawButtonsVisible(true);

    if (elements.checkScore) {
      elements.checkScore.hidden = true;
      elements.checkScore.textContent = "";
      elements.checkScore.className = "check-answers-score";
    }
    setCheckButtonsVisible(true);
    setCheckButtonsLabel("Sprawdź odpowiedzi");

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

      var feedback = document.createElement("p");
      feedback.className = "question-feedback";
      feedback.hidden = true;

      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(feedback);
      elements.results.appendChild(card);
    });

    if (!alreadyVisible) {
      var toolbar = document.querySelector(".questions-toolbar");
      if (toolbar && toolbar.scrollIntoView) {
        toolbar.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        elements.results.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  function clearCheckMarks(card) {
    card.classList.remove("is-correct", "is-incorrect", "is-partial", "is-checked");
    card.querySelectorAll(".is-correct, .is-incorrect, .is-missed").forEach(function (el) {
      el.classList.remove("is-correct", "is-incorrect", "is-missed");
    });
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

    inputs.forEach(function (input, i) {
      var user = normalizeFillAnswer(input.value);
      var exp = normalizeFillAnswer(expected[i]);
      input.classList.remove("is-correct", "is-incorrect", "is-missed");

      if (!user) {
        allAnswered = false;
        input.classList.add("is-missed");
        return;
      }

      if (exp && user === exp) {
        input.classList.add("is-correct");
        correctParts += 1;
      } else {
        input.classList.add("is-incorrect");
      }
    });

    return {
      correctParts: correctParts,
      totalParts: totalParts,
      allAnswered: allAnswered && totalParts > 0,
      fullyCorrect: totalParts > 0 && correctParts === totalParts
    };
  }

  function checkTrueFalseQuestion(card, question) {
    var items = question.items || [];
    var correctParts = 0;
    var totalParts = items.length;
    var allAnswered = true;

    items.forEach(function (item, itemIndex) {
      var row = card.querySelector('.tf-row[data-item-index="' + itemIndex + '"]');
      if (!row) return;

      var selected = row.querySelector('input.pf-radio:checked');
      var faces = row.querySelectorAll(".pf-choice");
      faces.forEach(function (face) {
        face.classList.remove("is-correct", "is-incorrect", "is-missed");
      });

      var expected = normalizePf(item.answer);

      if (!selected) {
        allAnswered = false;
        faces.forEach(function (face) {
          face.classList.add("is-missed");
        });
        return;
      }

      var user = normalizePf(selected.value);
      var selectedLabel = selected.closest(".pf-choice");

      if (user === expected) {
        correctParts += 1;
        if (selectedLabel) selectedLabel.classList.add("is-correct");
      } else if (selectedLabel) {
        selectedLabel.classList.add("is-incorrect");
      }
    });

    return {
      correctParts: correctParts,
      totalParts: totalParts,
      allAnswered: allAnswered && totalParts > 0,
      fullyCorrect: totalParts > 0 && correctParts === totalParts
    };
  }

  function checkChoiceQuestion(card, question) {
    var expected = String(question.answer || "").trim().toUpperCase();
    var selected = card.querySelector("input.choice-radio:checked");
    var options = card.querySelectorAll(".choice-option");

    options.forEach(function (opt) {
      opt.classList.remove("is-correct", "is-incorrect", "is-missed");
    });

    if (!selected) {
      options.forEach(function (opt) {
        opt.classList.add("is-missed");
      });
      return {
        correctParts: 0,
        totalParts: 1,
        allAnswered: false,
        fullyCorrect: false
      };
    }

    var user = String(selected.value || "").trim().toUpperCase();
    var selectedLabel = selected.closest(".choice-option");
    var isCorrect = user === expected;

    if (selectedLabel) {
      selectedLabel.classList.add(isCorrect ? "is-correct" : "is-incorrect");
    }

    return {
      correctParts: isCorrect ? 1 : 0,
      totalParts: 1,
      allAnswered: true,
      fullyCorrect: isCorrect
    };
  }

  function setQuestionFeedback(card, result) {
    var feedback = card.querySelector(".question-feedback");
    card.classList.add("is-checked");
    card.classList.remove("is-correct", "is-incorrect", "is-partial");

    if (!result.totalParts) {
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = "Brak zdefiniowanych odpowiedzi do sprawdzenia.";
        feedback.className = "question-feedback is-neutral";
      }
      return;
    }

    if (result.fullyCorrect) {
      card.classList.add("is-correct");
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = "Poprawnie";
        feedback.className = "question-feedback is-ok";
      }
      return;
    }

    if (result.correctParts === 0) {
      card.classList.add("is-incorrect");
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent =
          "Błędnie (" + result.correctParts + "/" + result.totalParts + ")";
        feedback.className = "question-feedback is-bad";
      }
      return;
    }

    card.classList.add("is-partial");
    if (feedback) {
      feedback.hidden = false;
      feedback.textContent =
        "Częściowo poprawnie (" + result.correctParts + "/" + result.totalParts + ")";
      feedback.className = "question-feedback is-partial-msg";
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

    setCheckButtonsLabel("Sprawdź ponownie");
  }

  function showEmptyState() {
    currentPicked = [];
    if (elements.results) {
      elements.results.hidden = true;
      elements.results.innerHTML = "";
    }
    if (elements.empty) elements.empty.hidden = false;
    if (elements.drawSummary) {
      elements.drawSummary.hidden = true;
      elements.drawSummary.textContent = "";
    }
    if (elements.redrawBtn) elements.redrawBtn.hidden = true;
    if (elements.checkBar) elements.checkBar.hidden = true;
    getCheckButtons().forEach(function (btn) {
      btn.hidden = true;
    });
    if (elements.checkScore) {
      elements.checkScore.hidden = true;
      elements.checkScore.textContent = "";
    }
  }

  function bindEvents() {
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
