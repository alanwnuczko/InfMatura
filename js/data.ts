const REPO_BASE = "https://github.com/alanwnuczko/matura-informatyka-rozszerzona";
const UPSTREAM_COMMIT = "de4fd08559f82002c7e4dfd73f07edc1a11f71d6";
const PDF_CDN_BASE = "https://cdn.jsdelivr.net/gh/alanwnuczko/matura-informatyka-rozszerzona@" + UPSTREAM_COMMIT + "/Arkusze";

const MONTHS: Record<string, string> = {
  "03": "Marzec",
  "05": "Maj",
  "06": "Czerwiec",
  "12": "Grudzie\u0144"
};

const FORMULAS: Record<Exam["formula"], { label: string; tag: string }> = {
  F2007: { label: "Formu\u0142a 2007", tag: "stara" },
  F2015: { label: "Formu\u0142a 2015", tag: "stara" },
  F2023: { label: "Formu\u0142a 2023", tag: "nowa" }
};

const EXAM_TYPES: Record<Exam["type"], string> = {
  PP: "Poziom podstawowy",
  PR: "Poziom rozszerzony"
};

let examData: Exam[] = [];

function loadExamData(): Exam[] {
  if (typeof window.EXAMS_JSON !== "undefined" && Array.isArray(window.EXAMS_JSON)) {
    examData = window.EXAMS_JSON;
  } else {
    examData = [];
  }
  return examData;
}

function getArkuszLinks(exam: Exam): ArkuszLink[] {
  var parts = exam.parts || (exam as { arkpieces?: string[] }).arkpieces || [];
  return parts.map(function (part) {
    var label = part === "Arkusz" ? "Arkusz" : part.replace("_cz", " cz. ").replace("_", " ");
    return {
      label: label,
      url: PDF_CDN_BASE + "/" + exam.id + "/" + part + ".pdf"
    };
  });
}

function getDaneLink(exam: Exam): string | null {
  if (!exam.hasData) return null;
  return REPO_BASE + "/raw/" + UPSTREAM_COMMIT + "/Arkusze/" + exam.id + "/Dane.zip";
}

function getSolutionLink(exam: Exam): string | null {
  if (!exam.hasSolution) return null;
  return REPO_BASE + "/tree/" + UPSTREAM_COMMIT + "/Arkusze/" + exam.id + "/Rozwiazanie";
}

function getSolutionZipLink(exam: Exam): string | null {
  if (!exam.hasSolution) return null;
  return REPO_BASE + "/raw/" + UPSTREAM_COMMIT + "/Arkusze/" + exam.id + "/Rozwiazanie.zip";
}

function getZasadyLink(exam: Exam): string | null {
  if (!exam.hasZasady) return null;
  return PDF_CDN_BASE + "/" + exam.id + "/Zasady.pdf";
}

function getDisplayTitle(exam: Exam): string {
  return MONTHS[exam.month] + " " + exam.year;
}

function getFormulaLabel(exam: Exam): string {
  return FORMULAS[exam.formula].label;
}

function getFormulaTag(exam: Exam): string {
  return FORMULAS[exam.formula].tag;
}

function getTypeLabel(exam: Exam): string {
  return EXAM_TYPES[exam.type];
}
