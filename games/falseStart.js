import { useEffect, useState } from "react";

export default function FalseStart({ record, next, type }) {
  const [phase, setPhase] = useState("brief");
  const [start, setStart] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prime = setTimeout(() => setPhase("armed"), 500);
    return () => clearTimeout(prime);
  }, []);

  useEffect(() => {
    if (phase !== "armed") return;

    const delay = Math.random() * 2400 + 1100;
    const cue = setTimeout(() => {
      setStart(performance.now());
      setPhase("release");
    }, delay);

    return () => clearTimeout(cue);
  }, [phase]);

  function onUp() {
    if (done) return;

    if (phase === "armed") {
      const penalty = 900;
      setDone(true);
      record({ game: type, score: penalty, raw: penalty, note: "false-start" });
      setPhase("False start! +900 ms penalty");
      setTimeout(next, 950);
      return;
    }

    if (phase === "release") {
      const t = Math.round(performance.now() - start);
      setDone(true);
      record({ game: type, score: t, raw: t });
      setPhase(`Clean release: ${t} ms`);
      setTimeout(next, 850);
    }
  }

  return (
    <div className="game-screen false-start" onPointerUp={onUp}>
      <h2>False Start Discipline</h2>
      <p>
        {phase === "brief" && "Prepare."}
        {phase === "armed" && "Hold touch. Release only at cue."}
        {phase === "release" && "RELEASE"}
        {!["brief", "armed", "release"].includes(phase) && phase}
      </p>
      <small>Early release triggers a fixed penalty.</small>
    </div>
  );
}
