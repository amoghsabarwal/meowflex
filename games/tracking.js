import { useEffect, useMemo, useState } from "react";

const DURATION = 4000;

function randomPos() {
  return {
    x: Math.random() * 78 + 5,
    y: Math.random() * 70 + 12,
  };
}

export default function Tracking({ record, next, type }) {
  const [hits, setHits] = useState(0);
  const [pos, setPos] = useState(randomPos());
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const endTimer = setTimeout(() => setRunning(false), DURATION);
    return () => clearTimeout(endTimer);
  }, []);

  useEffect(() => {
    if (running) return;
    const score = Math.max(160, 1100 - hits * 95);
    record({ game: type, score, raw: hits, note: "hits" });
    const t = setTimeout(next, 900);
    return () => clearTimeout(t);
  }, [running, hits, next, record, type]);

  const status = useMemo(() => (running ? `Hits: ${hits}` : `Completed · Hits: ${hits}`), [running, hits]);

  function hitTarget() {
    if (!running) return;
    setHits((v) => v + 1);
    setPos(randomPos());
    navigator.vibrate?.(8);
  }

  return (
    <div className="game-screen tracking">
      <h2>Dynamic Tracking</h2>
      <p>{status}</p>
      <div className="tracking-area">
        <button
          className="target"
          onClick={hitTarget}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          aria-label="moving target"
        />
      </div>
      <small>Touch the moving target as many times as possible in 4s.</small>
    </div>
  );
}
