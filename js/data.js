const REPO_BASE = "https://github.com/alanwnuczko/matura-informatyka-rozszerzona";
const PDF_CDN_BASE = "https://cdn.jsdelivr.net/gh/alanwnuczko/matura-informatyka-rozszerzona@main/Arkusze";

const MONTHS = {
  "05": "Maj",
  "06": "Czerwiec",
  "12": "Grudzie\u0144"
};

const FORMULAS = {
  F2007: { label: "Formu\u0142a 2007", tag: "stara" },
  F2015: { label: "Formu\u0142a 2015", tag: "stara" },
  F2023: { label: "Formu\u0142a 2023", tag: "nowa" }
};

const EXAM_TYPES = {
  PP: "Poziom podstawowy",
  PR: "Poziom rozszerzony"
};

let examData = [];

function loadExamData() {
  if (typeof window.EXAMS_JSON !== "undefined" && Array.isArray(window.EXAMS_JSON)) {
    examData = window.EXAMS_JSON;
  } else {
    examData = [];
  }
  return examData;
}

function getArkuszLinks(exam) {
  var parts = exam.parts || exam.arkpieces || [];
  return parts.map(function (part) {
    var label = part === "Arkusz" ? "Arkusz" : part.replace("_cz", " cz. ").replace("_", " ");
    return {
      label: label,
      url: PDF_CDN_BASE + "/" + exam.id + "/" + part + ".pdf"
    };
  });
}

function getDaneLink(exam) {
  if (!exam.hasData) return null;
  return REPO_BASE + "/raw/main/Arkusze/" + exam.id + "/Dane.zip";
}

function getSolutionLink(exam) {
  if (!exam.hasSolution) return null;
  return REPO_BASE + "/tree/main/Arkusze/" + exam.id + "/Rozwiazanie";
}

function getZasadyLink(exam) {
  if (!exam.hasZasady) return null;
  return PDF_CDN_BASE + "/" + exam.id + "/Zasady.pdf";
}

function getDisplayTitle(exam) {
  return MONTHS[exam.month] + " " + exam.year;
}

function getFormulaLabel(exam) {
  return FORMULAS[exam.formula].label;
}

function getFormulaTag(exam) {
  return FORMULAS[exam.formula].tag;
}

function getTypeLabel(exam) {
  return EXAM_TYPES[exam.type];
}
