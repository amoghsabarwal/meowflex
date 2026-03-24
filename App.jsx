import { useMemo, useState } from "react";
import Menu from "./components/Menu";
import GameContainer from "./components/GameContainer";
import Stats from "./components/Stats";
import SessionReport from "./components/SessionReport";
import { loadScores, saveScores } from "./utils/storage";
import { buildSessionSummary, formatGameName } from "./utils/metrics";

const GAMES = ["reaction", "false", "choice", "peripheral", "tracking"];

export default function App() {
  const [mode, setMode] = useState("menu");
  const [gameIndex, setGameIndex] = useState(0);
  const [session, setSession] = useState([]);
  const [latestSummary, setLatestSummary] = useState(null);
  const [scores, setScores] = useState(loadScores());

  const activeGame = GAMES[gameIndex];
  const runningSingle = mode === "single";
  const progress = Math.round(((gameIndex + 1) / GAMES.length) * 100);

  const headline = useMemo(() => {
    if (mode === "training") {
      return `Pilot Circuit ${gameIndex + 1}/${GAMES.length}`;
    }
    if (mode === "single") {
      return `Single Drill · ${formatGameName(activeGame)}`;
    }
    if (mode === "results") {
      return "Session Debrief";
    }
    return "Pilot Reflex Lab";
  }, [mode, gameIndex, activeGame]);

  function startTraining() {
    setSession([]);
    setLatestSummary(null);
    setGameIndex(0);
    setMode("training");
  }

  function startSingle(game) {
    setSession([]);
    setLatestSummary(null);
    setGameIndex(GAMES.indexOf(game));
    setMode("single");
  }

  function record(entry) {
    setSession((prev) => [...prev, entry]);
  }

  function nextGame() {
    if (runningSingle || gameIndex >= GAMES.length - 1) {
      endSession();
    } else {
      setGameIndex((prev) => prev + 1);
    }
  }

  function endSession() {
    if (!session.length) {
      setMode("menu");
      return;
    }

    const summary = buildSessionSummary(session);
    const updated = [summary, ...scores].slice(0, 40);
    setScores(updated);
    setLatestSummary(summary);
    saveScores(updated);
    setMode("results");
  }

  return (
    <div className="app-shell">
      <div className="app">
        <header>
          <p className="eyebrow">REFLEX LAB</p>
          <h1>{headline}</h1>
          <p className="subhead">Flight-grade reflex drills for reaction timing, cue discipline, scan behavior, and target tracking.</p>

          {(mode === "training" || mode === "single") && (
            <div className="progress-wrap" aria-label="training progress">
              <p>{runningSingle ? "Single Drill" : `Circuit progress · ${progress}%`}</p>
              {!runningSingle && (
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          )}
        </header>

        {mode === "menu" && (
          <>
            <Menu startTraining={startTraining} startSingle={startSingle} />
            <Stats scores={scores} />
          </>
        )}

        {(mode === "training" || mode === "single") && (
          <GameContainer type={activeGame} record={record} next={nextGame} />
        )}

        {mode === "results" && latestSummary && (
          <SessionReport summary={latestSummary} onDone={() => setMode("menu")} onReplay={startTraining} />
        )}
      </div>
    </div>
  );
}
