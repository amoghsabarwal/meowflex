import { useEffect, useState } from "react";

export default function Reaction({ record, next }) {
  const [state, setState] = useState("wait");
  const [start, setStart] = useState(0);

  useEffect(() => {
    const delay = Math.random()*2000 + 1000;
    const timer = setTimeout(() => {
      setState("go");
      setStart(performance.now());
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  function handleTap() {
    if (state !== "go") return;

    const t = performance.now() - start;
    record(t);

    navigator.vibrate?.(10);

    setState(`Result: ${Math.round(t)} ms`);

    setTimeout(next, 800);
  }

  return (
    <div className="game-screen" onPointerDown={handleTap}>
      {state === "wait" ? "WAIT" : state}
    </div>
  );
}