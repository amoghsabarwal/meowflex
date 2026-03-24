const KEY = "scores";

export function loadScores() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveScores(scores) {
  localStorage.setItem(KEY, JSON.stringify(scores));
}
