const DISPLAY = {
  reaction: "Reaction",
  false: "False Start",
  choice: "Choice",
  peripheral: "Peripheral",
  tracking: "Tracking",
};

export function formatGameName(id) {
  return DISPLAY[id] || id;
}

export function buildSessionSummary(entries) {
  const valid = entries.filter((entry) => Number.isFinite(entry?.score));
  const overall = Math.round(valid.reduce((sum, item) => sum + item.score, 0) / valid.length);

  const games = valid.reduce((acc, item) => {
    if (!acc[item.game]) {
      acc[item.game] = { total: 0, count: 0 };
    }

    acc[item.game].total += item.score;
    acc[item.game].count += 1;
    return acc;
  }, {});

  const gameAverages = Object.fromEntries(
    Object.entries(games).map(([game, value]) => [game, Math.round(value.total / value.count)]),
  );

  return {
    timestamp: Date.now(),
    overall,
    gameAverages,
    rounds: valid.length,
  };
}

export function summarizeHistory(scores) {
  const normalized = scores.map((item) => {
    if (typeof item === "number") {
      return { overall: Math.round(item), rounds: 1, gameAverages: {}, timestamp: Date.now() };
    }

    return item;
  });

  const sessions = normalized.length;
  const overall = Math.round(normalized.reduce((sum, item) => sum + item.overall, 0) / sessions);
  const best = Math.min(...normalized.map((item) => item.overall));
  const last = normalized[0]?.overall ?? overall;

  return {
    sessions,
    overall,
    best,
    last,
  };
}
