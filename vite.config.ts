import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, transformWithEsbuild, type Plugin } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * The six legacy js/*.js files were converted in place to js/*.ts, but they
 * intentionally remain classic (non-module) global scripts - exactly like
 * the original .js files - because js/app.ts and js/data.ts (and others)
 * rely on sharing bare top-level `function`/`var` declarations across
 * separate <script> tags. Bundling them through Rollup (IIFE/ES output)
 * would wrap/isolate their scope and break that behavior, so they are
 * transformed "raw" via esbuild (type-stripping only, no bundling) instead
 * of being treated as Rollup entry points.
 */
const TS_SCRIPT_ENTRIES = [
  "data",
  "app",
  "exam",
  "questions",
  "algorytmy",
  "warp-loader"
];

/**
 * Everything below is the actual static website. It is copied as-is into
 * the Vite output directory - including the 18 pre-generated
 * arkusze/<id>/index.html pages (see scripts/generate.ps1) - so their
 * markup, URLs and asset references never change. Dev-only files
 * (README, scripts/, CLAUDE.md, etc.) are intentionally left out.
 */
const STATIC_COPY_ITEMS = [
  "index.html",
  "404.html",
  "CNAME",
  "robots.txt",
  "sitemap.xml",
  "google196c32ebec788754.html",
  "assets",
  "css",
  "data",
  "algorytmy",
  "arkusze",
  "polityka-prywatnosci",
  "pytania-teoretyczne"
];

const NOOP_ENTRY_ID = "virtual:infmatura-noop-entry";
const RESOLVED_NOOP_ENTRY_ID = "\0" + NOOP_ENTRY_ID;
const NOOP_ENTRY_FILENAME = "_noop-entry.js";

async function transformTsFile(tsPath: string): Promise<string> {
  const source = fs.readFileSync(tsPath, "utf-8");
  const result = await transformWithEsbuild(source, tsPath, {
    loader: "ts",
    target: "es2020",
    charset: "utf8"
  });
  return result.code;
}

function copyStaticAssets(outDir: string) {
  for (const item of STATIC_COPY_ITEMS) {
    const src = path.resolve(__dirname, item);
    const dest = path.resolve(outDir, item);
    if (!fs.existsSync(src)) continue;
    fs.cpSync(src, dest, { recursive: true });
  }
}

/**
 * Serves js/*.ts as classic global scripts in dev (matching the original
 * js/*.js request URLs), transforms them into fixed-filename js/*.js
 * output on build, and copies the rest of the static site into dist/.
 */
function infmaturaSitePlugin(): Plugin {
  let outDir = "dist";

  return {
    name: "infmatura-site",

    configResolved(config) {
      outDir = config.build.outDir;
    },

    resolveId(id) {
      if (id === NOOP_ENTRY_ID) return RESOLVED_NOOP_ENTRY_ID;
      return null;
    },

    load(id) {
      if (id === RESOLVED_NOOP_ENTRY_ID) {
        return "// InfMatura build placeholder entry (unused, removed after build).\n";
      }
      return null;
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Vite's built-in CSS plugin intercepts every *.css request (even
        // plain <link rel="stylesheet"> requests, not just JS imports) and
        // rewrites it into a JS HMR-injector module. That breaks the site's
        // plain <link> tags in dev (wrong Content-Type, no real CSS is
        // returned), so plain-serve our own css/*.css files here instead.
        const url = req.url || "";
        const cssMatch = url.match(/^\/css\/([a-zA-Z0-9._-]+\.css)(?:\?.*)?$/);
        if (cssMatch) {
          const cssPath = path.resolve(__dirname, "css", cssMatch[1]);
          if (fs.existsSync(cssPath)) {
            res.setHeader("Content-Type", "text/css");
            res.end(fs.readFileSync(cssPath));
            return;
          }
        }
        next();
      });

      server.middlewares.use(async (req, res, next) => {
        const url = req.url || "";
        const match = url.match(/^\/js\/([a-zA-Z0-9-]+)\.js(?:\?.*)?$/);
        if (!match || !TS_SCRIPT_ENTRIES.includes(match[1])) {
          next();
          return;
        }
        const tsPath = path.resolve(__dirname, "js", `${match[1]}.ts`);
        if (!fs.existsSync(tsPath)) {
          next();
          return;
        }
        try {
          const code = await transformTsFile(tsPath);
          res.setHeader("Content-Type", "application/javascript");
          res.end(code);
        } catch (err) {
          next(err as Error);
        }
      });
    },

    async generateBundle() {
      for (const name of TS_SCRIPT_ENTRIES) {
        const tsPath = path.resolve(__dirname, "js", `${name}.ts`);
        const code = await transformTsFile(tsPath);
        this.emitFile({ type: "asset", fileName: `js/${name}.js`, source: code });
      }
    },

    closeBundle() {
      const resolvedOutDir = path.resolve(__dirname, outDir);
      copyStaticAssets(resolvedOutDir);
      // Remove the unused Rollup placeholder entry chunk from the output.
      const noopPath = path.join(resolvedOutDir, NOOP_ENTRY_FILENAME);
      if (fs.existsSync(noopPath)) fs.rmSync(noopPath);
    }
  };
}

export default defineConfig({
  base: "/",
  plugins: [infmaturaSitePlugin()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: NOOP_ENTRY_ID,
      output: {
        entryFileNames: NOOP_ENTRY_FILENAME
      }
    }
  },
  server: {
    port: 5173
  },
  preview: {
    port: 4173
  }
});
