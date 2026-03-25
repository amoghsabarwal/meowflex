import { useEffect, useState } from "react";

const SIDES = ["LEFT", "RIGHT"];

export default function Peripheral({ record, next, type }) {
  const [cue, setCue] = useState(null);
  const [start, setStart] = useState(0);
  const [message, setMessage] = useState("Focus center marker");

  useEffect(() => {
    const timer = setTimeout(() => {
      const side = SIDES[Math.floor(Math.random() * SIDES.length)];
      setCue(side);
      setStart(performance.now());
      setMessage("Peripheral flash active");
    }, Math.random() * 1600 + 1000);

    return () => clearTimeout(timer);
  }, []);

  function submit(side) {
    if (!cue) return;

    const rt = Math.round(performance.now() - start);
    const penalty = side === cue ? 0 : 200;
    record({ game: type, score: rt + penalty, raw: rt, note: `${side}/${cue}` });

    setMessage(side === cue ? `Locked: ${rt} ms` : `Missed side: ${rt} ms (+200)`);
    setTimeout(next, 900);
  }

  return (
    <div className="game-screen peripheral">
      <h2>Peripheral Scan</h2>
      <div className="peripheral-lane">
        <span className={cue === "LEFT" ? "flash" : "dot"}>●</span>
        <span className="center">+</span>
        <span className={cue === "RIGHT" ? "flash" : "dot"}>●</span>
      </div>
      <p>{message}</p>
      <div className="split-buttons">
        <button onClick={() => submit("LEFT")}>LEFT FLASH</button>
        <button onClick={() => submit("RIGHT")}>RIGHT FLASH</button>
      </div>
    </div>
  );
}
