declare const marked: any;

(function () {
  "use strict";

  var ALLOWED_TAGS: Record<string, string[]> = {
    a: ["href", "title"],
    p: [],
    br: [],
    strong: [],
    em: [],
    b: [],
    i: [],
    u: [],
    s: [],
    del: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    ul: [],
    ol: ["start"],
    li: [],
    pre: [],
    code: ["class"],
    blockquote: [],
    table: [],
    thead: [],
    tbody: [],
    tfoot: [],
    tr: [],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    hr: [],
    img: ["src", "alt", "title"],
    span: ["class"],
    div: ["class"],
    sup: [],
    sub: []
  };

  var FORBIDDEN_TAGS = /^(script|iframe|object|embed|form|link|meta|base|svg|math|style|textarea|input|button|select|option|video|audio|source|track|frame|frameset|applet|html|head|body|template)$/;
  var VOID_TAGS: Record<string, number> = { br: 1, hr: 1, img: 1 };
  var markedConfigured = false;

  function init() {
    initScrollHeader();
    initBackToTop();
    initPdfViewer();
    configureMarked();
    renderMarkdown();
    initCodeTabs();
    initCopyButtons();
  }

  function initScrollHeader() {
    var header = document.getElementById("site-header");
    var backToTop = document.getElementById("back-to-top");

    window.addEventListener(
      "scroll",
      function () {
        var y = window.pageYOffset;
        if (header) {
          if (y > 48) header.classList.add("header--scrolled");
          else header.classList.remove("header--scrolled");
        }
        if (backToTop) {
          var show = y > 400;
          backToTop.hidden = false;
          backToTop.classList.toggle("is-visible", show);
        }
      },
      { passive: true }
    );
  }

  function initBackToTop() {
    var backToTop = document.getElementById("back-to-top");
    if (!backToTop) return;
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function decodeHtmlEntities(str: string): string {
    if (!str || str.indexOf("&") === -1) return str;
    var ta = document.createElement("textarea");
    ta.innerHTML = str;
    return ta.value;
  }

  function escapeText(value: unknown): string {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function escapeAttr(value: unknown): string {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function isSafeUrl(url: string | null, attr?: string): boolean {
    var u = String(url || "").trim();
    if (!u) return false;
    if (/^\s*(javascript|vbscript|data):/i.test(u)) return false;
    if (attr === "src") {
      return /^(https?:)?\/\//i.test(u) || u.charAt(0) === "/";
    }
    if (/^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(u)) return true;
    return !/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u);
  }

  function sanitizeToString(node: Node): string {
    if (node.nodeType === 3) return escapeText(node.nodeValue);
    if (node.nodeType !== 1) return "";

    var el = node as Element;
    var tag = el.tagName.toLowerCase();
    if (FORBIDDEN_TAGS.test(tag)) return "";

    var allowed = ALLOWED_TAGS[tag];
    if (!allowed) {
      var unwrapped = "";
      for (var i = 0; i < node.childNodes.length; i++) {
        unwrapped += sanitizeToString(node.childNodes[i]);
      }
      return unwrapped;
    }

    var attrs = "";
    for (var a = 0; a < allowed.length; a++) {
      var name = allowed[a];
      if (!el.hasAttribute(name)) continue;
      var val = el.getAttribute(name);
      if ((name === "href" || name === "src") && !isSafeUrl(val, name)) continue;
      attrs += " " + name + '="' + escapeAttr(val) + '"';
    }

    if (VOID_TAGS[tag]) return "<" + tag + attrs + ">";

    var inner = "";
    for (var c = 0; c < node.childNodes.length; c++) {
      inner += sanitizeToString(node.childNodes[c]);
    }
    return "<" + tag + attrs + ">" + inner + "</" + tag + ">";
  }

  function sanitizeHtml(dirty: string | null | undefined): string {
    var template = document.createElement("template");
    template.innerHTML = String(dirty == null ? "" : dirty);
    var out = "";
    var children = template.content.childNodes;
    for (var i = 0; i < children.length; i++) {
      out += sanitizeToString(children[i]);
    }
    return out;
  }

  function configureMarked() {
    if (markedConfigured || typeof marked === "undefined") return;
    try {
      marked.use({
        gfm: true,
        breaks: true
      });
    } catch (err) {
      try {
        marked.setOptions({ gfm: true, breaks: true });
      } catch (err2) {}
    }
    markedConfigured = true;
  }

  function parseMarkdown(src: string): string {
    if (typeof marked === "undefined") return "";
    configureMarked();
    var html = marked.parse(src);
    return sanitizeHtml(html);
  }

  function getMarkdownSource(panel: Element): string {
    var rawScript = panel.querySelector('script[type="text/markdown"]');
    if (!rawScript) return "";
    return decodeHtmlEntities(rawScript.textContent || "").trim();
  }

  var markdownRetries = 0;
  var MARKDOWN_MAX_RETRIES = 100;

  function renderMarkdown() {
    if (typeof marked === "undefined") {
      if (++markdownRetries > MARKDOWN_MAX_RETRIES) return;
      window.setTimeout(renderMarkdown, 50);
      return;
    }

    document.querySelectorAll(".code-panel-md").forEach(function (panel) {
      var target = panel.querySelector(".markdown-rendered") as HTMLElement | null;
      if (!target || target.dataset.rendered) return;
      target.innerHTML = parseMarkdown(getMarkdownSource(panel));
      target.dataset.rendered = "true";
    });
  }


  function initCodeTabs() {
    document.querySelectorAll(".code-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var viewer = tab.closest(".code-viewer");
        if (!viewer) return;
        viewer.querySelectorAll(".code-tab").forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        viewer.querySelectorAll(".code-panel").forEach(function (p) {
          p.classList.remove("is-active");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        var targetId = tab.getAttribute("aria-controls");
        var targetPanel = targetId ? document.getElementById(targetId) : null;
        if (targetPanel) {
          targetPanel.classList.add("is-active");
          renderMarkdown();
        }
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll(".copy-code-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = btn.closest(".code-panel");
        if (!panel) return;
        var textToCopy = "";
        if (panel.classList.contains("code-panel-md")) {
          textToCopy = getMarkdownSource(panel);
        } else {
          var codeEl = panel.querySelector("code") as HTMLElement | null;
          if (codeEl) textToCopy = codeEl.innerText || codeEl.textContent || "";
        }

        if (!navigator.clipboard || !navigator.clipboard.writeText) return;

        navigator.clipboard.writeText(textToCopy).then(function () {
          var label = btn.querySelector(".copy-btn-text");
          var originalText = label ? label.textContent : "Kopiuj";
          if (label) label.textContent = "Skopiowano";
          btn.classList.add("is-copied");
          window.setTimeout(function () {
            if (label) label.textContent = originalText;
            btn.classList.remove("is-copied");
          }, 2000);
        });
      });
    });
  }

  function getExamPdfLinks(): { url: string; label: string }[] {
    var bar = document.querySelector(".exam-actions-bar");
    if (!bar) return [];
    var out: { url: string; label: string }[] = [];
    var links = bar.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      if (!/\.pdf(\?|#|$)/i.test(href)) continue;
      if (!/Arkusz/i.test(href)) continue;
      var labelEl = links[i].querySelector("span");
      var label = ((labelEl ? labelEl.textContent : links[i].textContent) || "").trim();
      if (/^Arkusz PDF$/i.test(label)) label = "Arkusz";
      out.push({ url: href, label: label || "Arkusz" });
    }
    return out;
  }

  function pdfFrameSrc(url: string): string {
    var base = String(url || "").split("#")[0];
    return base + "#view=FitH";
  }

  var PDF_PREVIEW_MQ = "(min-width: 769px)";

  function canShowPdfPreview(): boolean {
    return window.matchMedia(PDF_PREVIEW_MQ).matches;
  }

  function whenPdfPreviewAllowed(callback: () => void) {
    var mq = window.matchMedia(PDF_PREVIEW_MQ);
    var onChange = function (e: MediaQueryListEvent) {
      if (!e.matches) return;
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else if ((mq as any).removeListener) (mq as any).removeListener(onChange);
      callback();
    };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if ((mq as any).addListener) (mq as any).addListener(onChange);
  }

  function initPdfViewer() {
    if (!canShowPdfPreview()) {
      whenPdfPreviewAllowed(initPdfViewer);
      return;
    }

    if (document.getElementById("pdf-viewer-section")) {
      bindPdfViewer(document.getElementById("pdf-viewer-section") as HTMLElement);
      return;
    }

    var pdfs = getExamPdfLinks();
    if (!pdfs.length) return;

    var actions = document.querySelector(".exam-actions-section");
    if (!actions || !actions.parentNode) return;

    var section = document.createElement("section");
    section.className = "pdf-viewer-section";
    section.id = "pdf-viewer-section";
    section.setAttribute("aria-labelledby", "pdf-viewer-heading");

    var header = document.createElement("div");
    header.className = "pdf-viewer-header";

    var headingWrap = document.createElement("div");
    var heading = document.createElement("h2");
    heading.id = "pdf-viewer-heading";
    heading.className = "pdf-viewer-title";
    heading.textContent = "Podgląd arkusza";
    headingWrap.appendChild(heading);

    var hint = document.createElement("p");
    hint.className = "pdf-viewer-hint";
    hint.textContent =
      "Chwyć dolną krawędź podglądu i przeciągnij, żeby zmienić wysokość - albo użyj przycisku Rozwiń.";
    headingWrap.appendChild(hint);

    var expandBtn = document.createElement("button");
    expandBtn.type = "button";
    expandBtn.className = "solutions-header-btn pdf-expand-btn";
    expandBtn.setAttribute("aria-expanded", "false");
    expandBtn.innerHTML = "<span>Rozwiń</span>";

    var headerActions = document.createElement("div");
    headerActions.className = "pdf-viewer-header-actions";
    headerActions.appendChild(expandBtn);

    header.appendChild(headingWrap);
    header.appendChild(headerActions);
    section.appendChild(header);

    var viewer = document.createElement("div");
    viewer.className = "pdf-viewer";

    if (pdfs.length > 1) {
      var tabs = document.createElement("div");
      tabs.className = "code-tabs-bar pdf-tabs-bar";
      tabs.setAttribute("role", "tablist");
      tabs.setAttribute("aria-label", "Części arkusza");
      pdfs.forEach(function (pdf, index) {
        var tab = document.createElement("button");
        tab.type = "button";
        tab.className = "code-tab pdf-tab" + (index === 0 ? " is-active" : "");
        tab.setAttribute("role", "tab");
        tab.setAttribute("aria-selected", index === 0 ? "true" : "false");
        tab.setAttribute("data-pdf-url", pdf.url);
        tab.textContent = pdf.label;
        tabs.appendChild(tab);
      });
      viewer.appendChild(tabs);
    }

    var frameWrap = document.createElement("div");
    frameWrap.className = "pdf-frame-wrap";

    var iframe = document.createElement("iframe");
    iframe.className = "pdf-frame";
    iframe.title = pdfs[0].label;
    iframe.setAttribute("loading", "lazy");
    iframe.src = pdfFrameSrc(pdfs[0].url);
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");

    var fallback = document.createElement("p");
    fallback.className = "pdf-fallback";
    fallback.innerHTML =
      'Jeśli podgląd się nie wczytuje, <a class="pdf-fallback-link" href="' +
      escapeAttr(pdfs[0].url) +
      '" target="_blank" rel="noopener noreferrer">otwórz PDF w nowej karcie</a>.';

    var resizeHandle = document.createElement("div");
    resizeHandle.className = "pdf-resize-handle";
    resizeHandle.setAttribute("role", "separator");
    resizeHandle.setAttribute("aria-orientation", "horizontal");
    resizeHandle.setAttribute("aria-label", "Zmień wysokość podglądu - przeciągnij");
    resizeHandle.tabIndex = 0;
    resizeHandle.innerHTML =
      '<span class="pdf-resize-handle-label">Przeciągnij, aby powiększyć</span>';

    frameWrap.appendChild(iframe);
    viewer.appendChild(frameWrap);
    viewer.appendChild(resizeHandle);
    viewer.appendChild(fallback);
    section.appendChild(viewer);

    actions.parentNode.insertBefore(section, actions.nextSibling);
    bindPdfViewer(section);
  }

  function setPdfExpanded(section: Element, expanded: boolean) {
    var wrap = section.querySelector(".pdf-frame-wrap") as HTMLElement | null;
    var btn = section.querySelector(".pdf-expand-btn");
    if (wrap) wrap.style.height = "";
    section.classList.toggle("is-expanded", expanded);
    if (btn) {
      btn.setAttribute("aria-expanded", expanded ? "true" : "false");
      var label = btn.querySelector("span") || btn;
      label.textContent = expanded ? "Zwiń" : "Rozwiń";
    }
    if ((section as HTMLElement).scrollIntoView) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function bindPdfViewer(section: HTMLElement) {
    var iframe = section.querySelector(".pdf-frame") as HTMLIFrameElement | null;
    var fallbackLink = section.querySelector(".pdf-fallback-link") as HTMLAnchorElement | null;
    var tabs = section.querySelectorAll(".pdf-tab");
    var expandBtn = section.querySelector(".pdf-expand-btn");
    var wrap = section.querySelector(".pdf-frame-wrap") as HTMLElement | null;
    var handle = section.querySelector(".pdf-resize-handle") as HTMLElement | null;

    if (iframe && tabs.length) {
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var url = tab.getAttribute("data-pdf-url");
          if (!url) return;
          tabs.forEach(function (t) {
            var active = t === tab;
            t.classList.toggle("is-active", active);
            t.setAttribute("aria-selected", active ? "true" : "false");
          });
          iframe!.src = pdfFrameSrc(url);
          iframe!.title = tab.textContent || "Arkusz";
          if (fallbackLink) fallbackLink.href = url;
        });
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener("click", function () {
        setPdfExpanded(section, !section.classList.contains("is-expanded"));
      });
    }

    if (!handle || !wrap) return;

    var dragging = false;
    var startY = 0;
    var startH = 0;

    function clampHeight(next: number): number {
      var min = 240;
      var max = Math.max(min, window.innerHeight - 120);
      return Math.round(Math.min(max, Math.max(min, next)));
    }

    handle.addEventListener("pointerdown", function (e: PointerEvent) {
      dragging = true;
      startY = e.clientY;
      startH = wrap!.getBoundingClientRect().height;
      section.classList.add("is-resizing");
      section.classList.remove("is-expanded");
      wrap!.style.height = startH + "px";
      if (expandBtn) {
        expandBtn.setAttribute("aria-expanded", "false");
        var expandLabel = expandBtn.querySelector("span") || expandBtn;
        expandLabel.textContent = "Rozwiń";
      }
      if (typeof handle!.setPointerCapture === 'function') handle!.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    handle.addEventListener("pointermove", function (e: PointerEvent) {
      if (!dragging) return;
      wrap!.style.height = clampHeight(startH + (e.clientY - startY)) + "px";
    });

    function stopDrag() {
      dragging = false;
      section.classList.remove("is-resizing");
    }

    handle.addEventListener("pointerup", stopDrag);
    handle.addEventListener("pointercancel", stopDrag);

    handle.addEventListener("keydown", function (e: KeyboardEvent) {
      var step = e.shiftKey ? 48 : 24;
      var h = wrap!.getBoundingClientRect().height;
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setPdfExpanded(section, false);
        wrap!.style.height = clampHeight(h - step) + "px";
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setPdfExpanded(section, false);
        wrap!.style.height = clampHeight(h + step) + "px";
      } else if (e.key === "Home") {
        e.preventDefault();
        setPdfExpanded(section, false);
        wrap!.style.height = "";
      } else if (e.key === "End") {
        e.preventDefault();
        setPdfExpanded(section, true);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
