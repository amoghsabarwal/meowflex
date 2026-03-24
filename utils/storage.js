export function loadScores() {
  return JSON.parse(localStorage.getItem("scores") || "[]");
}

export function saveScores(scores) {
  localStorage.setItem("scores", JSON.stringify(scores));
}