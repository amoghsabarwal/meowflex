import Reaction from "../games/reaction.jsx";
import FalseStart from "../games/falseStart.jsx";
import Choice from "../games/choice.jsx";
import Peripheral from "../games/peripheral.jsx";
import Tracking from "../games/tracking.jsx";

const map = {
  reaction: Reaction,
  false: FalseStart,
  choice: Choice,
  peripheral: Peripheral,
  tracking: Tracking,
};

export default function GameContainer({ type, record, next }) {
  const Game = map[type];

  return (
    <div className="game-container">
      <Game type={type} record={record} next={next} />
    </div>
  );
}
