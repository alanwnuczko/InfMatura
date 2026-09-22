/**
 * WarpLoader & Aurora Effects
 * Perspective Horizon Grid Loader & Thinking Component
 */

(function (window: Window, document: Document) {
  "use strict";

  // Ray color stops across the spectrum (matching reference)
  var RAY_PALETTE = [
    "#00b4d8", // Cyan
    "#3b82f6", // Blue
    "#6366f1", // Indigo
    "#8b5cf6", // Royal violet
    "#a855f7", // Purple
    "#d946ef", // Fuchsia
    "#ec4899", // Neon pink
    "#f43f5e", // Rose
    "#ff4d4d", // Crimson
    "#ff6b00", // Fiery orange
    "#f97316", // Bright orange
    "#f59e0b", // Amber
    "#fbbf24"  // Gold
  ];

  var DEFAULT_PHRASES = [
    "Kreślenie mgławicy",
    "Inicjalizacja środowiska Python...",
    "Kompilowanie rozwiązań...",
    "Analizowanie arkuszy CKE...",
    "Optymalizacja złożoności obliczeniowej...",
    "Weryfikacja przypadków brzegowych...",
    "Generowanie testów jednostkowych..."
  ];

  function interpolateColor(color1: string, color2: string, factor: number): string {
    var c1 = parseInt(color1.slice(1), 16);
    var c2 = parseInt(color2.slice(1), 16);

    var r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
    var r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;

    var r = Math.round(r1 + factor * (r2 - r1));
    var g = Math.round(g1 + factor * (g2 - g1));
    var b = Math.round(b1 + factor * (b2 - b1));

    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function getPaletteColor(t: number): string {
    var clamped = Math.max(0, Math.min(1, t));
    var numStops = RAY_PALETTE.length;
    var index = clamped * (numStops - 1);
    var lowerIndex = Math.floor(index);
    var upperIndex = Math.min(numStops - 1, lowerIndex + 1);
    var fraction = index - lowerIndex;

    return interpolateColor(RAY_PALETTE[lowerIndex], RAY_PALETTE[upperIndex], fraction);
  }

  class WarpInstance {
    container: HTMLElement;
    options: WarpLoaderOptions;
    phrases: string[];
    currentPhraseIndex: number;
    phraseTimer: ReturnType<typeof setInterval> | null;
    animFrameId: number | null;
    startTime: number;
    canvas!: HTMLCanvasElement;
    ctx!: CanvasRenderingContext2D | null;
    statusEl!: HTMLDivElement;
    resizeHandler!: () => void;
    w: number = 0;
    h: number = 0;
    dpr: number = 1;

    constructor(container: HTMLElement, options?: WarpLoaderOptions) {
      this.container = container;
      this.options = options || {};
      this.phrases = this.options.phrases || DEFAULT_PHRASES;
      this.currentPhraseIndex = 0;
      this.phraseTimer = null;
      this.animFrameId = null;
      this.startTime = Date.now();

      this.init();
    }

    init() {
      var self = this;
      this.container.classList.add("warp-loader-container");

      this.canvas = document.createElement("canvas");
      this.canvas.className = "warp-loader-canvas";
      this.ctx = this.canvas.getContext("2d");
      this.container.appendChild(this.canvas);

      this.statusEl = document.createElement("div");
      this.statusEl.className = "warp-loader-status";
      this.statusEl.textContent = this.options.initialText || this.phrases[0];
      this.container.appendChild(this.statusEl);

      this.resizeHandler = function () {
        self.resize();
      };
      window.addEventListener("resize", this.resizeHandler);
      this.resize();

      // Rotate status phrase gently
      if (!this.options.staticText && this.phrases.length > 1) {
        this.phraseTimer = setInterval(function () {
          self.cyclePhrase();
        }, 2600);
      }

      this.render = this.render.bind(this);
      this.animFrameId = requestAnimationFrame(this.render);
    }

    resize() {
      var rect = this.container.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      var w = Math.max(rect.width, 240);
      var h = Math.max(rect.height, 200);

      this.canvas.width = Math.floor(w * dpr);
      this.canvas.height = Math.floor(h * dpr);
      this.w = w;
      this.h = h;
      this.dpr = dpr;
    }

    cyclePhrase() {
      var self = this;
      if (!this.statusEl) return;

      this.statusEl.style.opacity = "0";
      this.statusEl.style.transform = "translateY(-4px)";

      setTimeout(function () {
        self.currentPhraseIndex = (self.currentPhraseIndex + 1) % self.phrases.length;
        if (self.statusEl) {
          self.statusEl.textContent = self.phrases[self.currentPhraseIndex];
          self.statusEl.style.opacity = "1";
          self.statusEl.style.transform = "translateY(0)";
        }
      }, 280);
    }

    setText(text: string) {
      if (this.phraseTimer) {
        clearInterval(this.phraseTimer);
        this.phraseTimer = null;
      }
      if (this.statusEl) {
        this.statusEl.textContent = text;
        this.statusEl.style.opacity = "1";
        this.statusEl.style.transform = "translateY(0)";
      }
    }

    render() {
      var ctx = this.ctx;
      if (!ctx) return;
      var dpr = this.dpr;
      var w = this.w;
      var h = this.h;
      var elapsed = (Date.now() - this.startTime) * 0.001;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep dark clean background
      ctx.fillStyle = "#030305";
      ctx.fillRect(0, 0, w, h);

      var vanishingX = w / 2;
      var vanishingY = h * 0.38; // Clean horizon matching screenshot

      // Soft subtle horizon glow
      var glow = ctx.createRadialGradient(vanishingX, vanishingY, 2, vanishingX, vanishingY, w * 0.4);
      glow.addColorStop(0, "rgba(217, 70, 239, 0.08)");
      glow.addColorStop(0.5, "rgba(99, 102, 241, 0.03)");
      glow.addColorStop(1, "rgba(3, 3, 5, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // 1. Subtle Wireframe Ground Grid (flatter, calm, thin lines)
      var numGridSteps = 9;
      for (var j = 1; j <= numGridSteps; j++) {
        // Gentle linear-to-mild perspective spacing
        var tGrid = j / numGridSteps;
        var lineY = vanishingY + (h - vanishingY) * Math.pow(tGrid, 1.4);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, lineY);
        ctx.lineTo(w, lineY);
        var alpha = 0.03 + 0.07 * tGrid;
        ctx.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Faint neutral vertical wireframe lines converging to horizon
      var numBaseRays = 14;
      for (var b = -numBaseRays; b <= numBaseRays; b++) {
        var baseBottomX = vanishingX + (b / numBaseRays) * (w * 0.7);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(baseBottomX, h);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Colored Spectral Rays (crisp, elegant radiating lines matching screenshot)
      var numColoredRays = 18;
      var spanMultiplier = 1.25;
      var startX = vanishingX - (w * 0.55 * spanMultiplier);
      var endX   = vanishingX + (w * 0.55 * spanMultiplier);

      // Gentle breathing pulse
      var pulse = 0.85 + 0.12 * Math.sin(elapsed * 1.5);

      for (var i = 0; i <= numColoredRays; i++) {
        var t = i / numColoredRays;
        var rayBottomX = startX + t * (endX - startX);
        var color = getPaletteColor(t);

        // Distance from center for smooth falloff at extreme sides
        var centerDist = Math.abs(t - 0.5) * 2;
        var rayAlpha = Math.max(0.3, (1 - centerDist * 0.4) * pulse);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(vanishingX, vanishingY);
        ctx.lineTo(rayBottomX, h + 5);

        ctx.strokeStyle = color;
        ctx.globalAlpha = rayAlpha;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();

      this.animFrameId = requestAnimationFrame(this.render);
    }

    destroy() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      if (this.phraseTimer) {
        clearInterval(this.phraseTimer);
        this.phraseTimer = null;
      }
      window.removeEventListener("resize", this.resizeHandler);
      this.container.innerHTML = "";
      this.container.classList.remove("warp-loader-container");
    }
  }

  // ------------------------------------------------------------------------
  // Fullscreen / Modal Overlay
  // ------------------------------------------------------------------------
  var overlayEl: HTMLElement | null = null;
  var overlayWarp: WarpInstance | null = null;

  function showOverlay(options?: WarpLoaderOptions) {
    options = options || {};
    if (!overlayEl) {
      overlayEl = document.createElement("div");
      overlayEl.className = "warp-overlay";
      overlayEl.setAttribute("role", "dialog");
      overlayEl.setAttribute("aria-modal", "true");

      var card = document.createElement("div");
      card.className = "warp-overlay-card";

      var closeBtn = document.createElement("button");
      closeBtn.className = "warp-overlay-close";
      closeBtn.setAttribute("aria-label", "Zamknij");
      closeBtn.innerHTML = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>';
      closeBtn.onclick = hideOverlay;

      var warpMount = document.createElement("div");
      warpMount.style.width = "100%";
      warpMount.style.height = "100%";

      card.appendChild(closeBtn);
      card.appendChild(warpMount);
      overlayEl.appendChild(card);
      document.body.appendChild(overlayEl);

      overlayWarp = new WarpInstance(warpMount, options);
    }

    if (options.text) {
      overlayWarp!.setText(options.text);
    }

    requestAnimationFrame(function () {
      overlayEl!.classList.add("is-open");
    });

    if (options.duration) {
      setTimeout(function () {
        hideOverlay();
        if (typeof options.onComplete === "function") {
          options.onComplete();
        }
      }, options.duration);
    }
  }

  function hideOverlay() {
    if (!overlayEl) return;
    overlayEl.classList.remove("is-open");
    setTimeout(function () {
      if (overlayWarp) {
        overlayWarp.destroy();
        overlayWarp = null;
      }
      if (overlayEl && overlayEl.parentNode) {
        overlayEl.parentNode.removeChild(overlayEl);
        overlayEl = null;
      }
    }, 320);
  }

  // ------------------------------------------------------------------------
  // Public API
  // ------------------------------------------------------------------------
  var instances = new WeakMap<HTMLElement, WarpInstance>();

  var WarpLoader: WarpLoaderApi = {
    mount: function (container, options) {
      if (!container) return null;
      WarpLoader.unmount(container);
      var instance = new WarpInstance(container, options);
      instances.set(container, instance);
      return instance;
    },

    unmount: function (container) {
      if (!container) return;
      var inst = instances.get(container);
      if (inst) {
        inst.destroy();
        instances.delete(container);
      }
    },

    showOverlay: showOverlay,
    hideOverlay: hideOverlay
  };

  window.WarpLoader = WarpLoader;

})(window, document);
