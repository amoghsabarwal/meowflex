import { useEffect } from "react";
import Reaction from "../games/reaction";
import FalseStart from "../games/falseStart";
import Choice from "../games/choice";
import Peripheral from "../games/peripheral";
import Tracking from "../games/tracking";

export default function GameContainer({ type, record, next }) {

  const map = {
    reaction: Reaction,
    false: FalseStart,
    choice: Choice,
    peripheral: Peripheral,
    tracking: Tracking
  };

  const Game = map[type];

  return (
    <div className="game-container">
      <Game record={record} next={next}/>
    </div>
  );
}