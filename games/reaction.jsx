import { useEffect, useState } from "react";

export default function Reaction({ record, next, type }) {
  const [state, setState] = useState("wait");
  const [start, setStart] = useState(0);

  useEffect(() => {
    const delay = Math.random() * 2000 + 1000;
    const timer = setTimeout(() => {
      setState("go");
      setStart(performance.now());
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  function handleTap() {
    if (state === "wait") return;
    if (state !== "go") return;

    const t = performance.now() - start;
    record({ game: type, score: Math.round(t), raw: Math.round(t) });
    navigator.vibrate?.(10);

    setState(`Result: ${Math.round(t)} ms`);
    setTimeout(next, 900);
  }

  return (
    <div className="game-screen" onPointerDown={handleTap}>
      <h2>Simple Reaction</h2>
      <p>{state === "wait" ? "Hold steady... wait for GO" : state === "go" ? "GO" : state}</p>
      <small>Tap anywhere when the cue appears.</small>
    </div>
  );
}
