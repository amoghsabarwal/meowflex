import { useEffect, useState } from "react";

const SIDES = ["LEFT", "RIGHT"];

export default function Choice({ record, next, type }) {
  const [target, setTarget] = useState(null);
  const [start, setStart] = useState(0);
  const [message, setMessage] = useState("Stand by...");

  useEffect(() => {
    const delay = Math.random() * 1600 + 800;
    const timer = setTimeout(() => {
      const chosen = SIDES[Math.floor(Math.random() * SIDES.length)];
      setTarget(chosen);
      setStart(performance.now());
      setMessage(`Select ${chosen}`);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  function choose(side) {
    if (!target) return;

    const rt = Math.round(performance.now() - start);
    const wrongPenalty = side === target ? 0 : 240;
    const score = rt + wrongPenalty;

    record({ game: type, score, raw: rt, note: side === target ? "correct" : "incorrect" });
    setMessage(side === target ? `Correct: ${rt} ms` : `Wrong side: ${rt} ms (+240)`);
    setTimeout(next, 900);
  }

  return (
    <div className="game-screen">
      <h2>Choice Reaction</h2>
      <p>{message}</p>
      <div className="split-buttons">
        <button onClick={() => choose("LEFT")}>LEFT</button>
        <button onClick={() => choose("RIGHT")}>RIGHT</button>
      </div>
    </div>
  );
}
