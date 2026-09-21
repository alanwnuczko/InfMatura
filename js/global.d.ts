/**
 * Ambient type declarations for global data injected by plain <script> tags
 * (data/exams.js, data/algorytmy.js, data/questions.js) and for the
 * WarpLoader global exposed by js/warp-loader.ts.
 *
 * Those data files intentionally stay as plain, untouched JavaScript (see
 * CLAUDE.md content-authoring workflow), so their shape is declared here
 * for the TypeScript-migrated consumer scripts (js/*.ts), which remain
 * classic non-module scripts and therefore rely on the true global
 * namespace declared below.
 */

export {};

declare global {
  interface Exam {
    id: string;
    year: number;
    month: string;
    type: "PP" | "PR";
    formula: "F2007" | "F2015" | "F2023";
    parts: string[];
    hasData: boolean;
    hasSolution: boolean;
    hasZasady: boolean;
  }

  interface ArkuszLink {
    label: string;
    url: string;
  }

  interface AlgoCategory {
    id: string;
    label: string;
    description: string;
  }

  interface AlgoExample {
    input: string;
    output: string;
    explanation?: string;
  }

  interface AlgoTestCase {
    input: string;
    expected: unknown;
  }

  interface AlgoTask {
    id: string;
    title: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    ckeSource?: string;
    description: string;
    inputDesc: string;
    outputDesc: string;
    timeComplexity?: string;
    spaceComplexity?: string;
    examples: AlgoExample[];
    starterCode: string;
    functionName: string;
    testCases: AlgoTestCase[];
    solution: string;
    explanation?: string;
    inPlaceArg?: number;
    hints?: string[];
    tags?: string[];
    relatedTopic?: string;
  }

  interface QuestionOption {
    id: string;
    text: string;
  }

  interface QuestionItem {
    text: string;
    answer: string;
  }

  interface Question {
    id: string;
    category: string;
    type: "fill" | "truefalse" | "choice";
    source?: string;
    level?: "PP" | "PR";
    html: string;
    answers?: string[];
    selectOptions?: string[];
    items?: QuestionItem[];
    options?: QuestionOption[];
    answer?: string;
  }

  interface WarpLoaderOptions {
    phrases?: string[];
    initialText?: string;
    staticText?: boolean;
    duration?: number;
    text?: string;
    onComplete?: () => void;
  }

  interface WarpLoaderInstance {
    destroy(): void;
    setText(text: string): void;
  }

  interface WarpLoaderApi {
    mount(container: HTMLElement | null, options?: WarpLoaderOptions): WarpLoaderInstance | null;
    unmount(container: HTMLElement | null): void;
    showOverlay(options?: WarpLoaderOptions): void;
    hideOverlay(): void;
  }

  interface Window {
    EXAMS_JSON?: Exam[];
    ALGO_CATEGORIES?: AlgoCategory[];
    ALGO_TASKS?: AlgoTask[];
    QUESTIONS_JSON?: Question[];
    WarpLoader?: WarpLoaderApi;
    Prism?: {
      languages?: Record<string, unknown> & { python?: unknown };
      highlight?: (code: string, grammar: unknown, language: string) => string;
    };
  }
}
