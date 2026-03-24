import { useEffect, useState } from "react";

export default function Reaction({ record, next, type }) {
  const [state, setState] = useState("wait");
  const [start, setStart] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delay = Math.random() * 2000 + 900;
    const timer = setTimeout(() => {
      setState("go");
      setStart(performance.now());
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  function complete(score, text) {
    if (done) return;
    setDone(true);
    record({ game: type, score, raw: score });
    setState(text);
    navigator.vibrate?.(10);
    setTimeout(next, 900);
  }

  function handleTap() {
    if (done || state === "wait") return;
    if (state !== "go") return;

    const t = Math.round(performance.now() - start);
    complete(t, `Result: ${t} ms`);
  }

  return (
    <div className="game-screen" onPointerDown={handleTap} role="button" tabIndex={0}>
      <h2>Simple Reaction</h2>
      <p>{state === "wait" ? "Hold steady... wait for GO" : state === "go" ? "GO" : state}</p>
      <small>Tap anywhere when the cue appears.</small>
    </div>
  );
}
