import { useMemo, useState } from "react";
import Menu from "./components/Menu";
import GameContainer from "./components/GameContainer";
import Stats from "./components/Stats";
import { loadScores, saveScores } from "./utils/storage";
import { buildSessionSummary } from "./utils/metrics";

const GAMES = ["reaction", "false", "choice", "peripheral", "tracking"];

export default function App() {
  const [mode, setMode] = useState("menu");
  const [gameIndex, setGameIndex] = useState(0);
  const [session, setSession] = useState([]);
  const [scores, setScores] = useState(loadScores());

  const activeGame = GAMES[gameIndex];
  const runningSingle = mode === "single";

  const headline = useMemo(() => {
    if (mode === "training") {
      return `Pilot Circuit ${gameIndex + 1}/${GAMES.length}`;
    }
    if (mode === "single") {
      return `Single Drill · ${activeGame}`;
    }
    return "Pilot Reflex Training";
  }, [mode, gameIndex, activeGame]);

  function startTraining() {
    setSession([]);
    setGameIndex(0);
    setMode("training");
  }

  function startSingle(game) {
    setSession([]);
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
    const updated = [...scores, summary];
    setScores(updated);
    saveScores(updated);
    setMode("menu");
  }

  return (
    <div className="app-shell">
      <div className="app">
        <header>
          <p className="eyebrow">REFLEX LAB</p>
          <h1>{headline}</h1>
          <p className="subhead">Aviation-grade drill stack for reaction, scanning, and control.</p>
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
      </div>
    </div>
  );
}
