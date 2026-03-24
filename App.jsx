import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import GameContainer from "./components/GameContainer";
import Stats from "./components/Stats";
import { loadScores, saveScores } from "./utils/storage";

export default function App() {
  const [mode, setMode] = useState("menu");
  const [gameIndex, setGameIndex] = useState(0);
  const [session, setSession] = useState([]);
  const [scores, setScores] = useState(loadScores());

  const games = ["reaction","false","choice","peripheral","tracking"];

  function startTraining() {
    setSession([]);
    setGameIndex(0);
    setMode("training");
  }

  function startSingle(game) {
    setGameIndex(games.indexOf(game));
    setMode("single");
  }

  function record(val) {
    setSession(prev => [...prev, val]);
  }

  function nextGame() {
    if (gameIndex >= games.length - 1) {
      endSession();
    } else {
      setGameIndex(prev => prev + 1);
    }
  }

  function endSession() {
    const avg = session.reduce((a,b)=>a+b)/session.length;
    const updated = [...scores, avg];
    setScores(updated);
    saveScores(updated);
    setMode("menu");
  }

  return (
    <div className="app">
      <header>REFLEX LAB</header>

      {mode === "menu" && (
        <>
          <Menu startTraining={startTraining} startSingle={startSingle}/>
          <Stats scores={scores}/>
        </>
      )}

      {(mode === "training" || mode === "single") && (
        <GameContainer
          type={games[gameIndex]}
          record={record}
          next={nextGame}
        />
      )}
    </div>
  );
}