import Reaction from "../games/reaction";
import FalseStart from "../games/falseStart";
import Choice from "../games/choice";
import Peripheral from "../games/peripheral";
import Tracking from "../games/tracking";

const map = {
  reaction: Reaction,
  false: FalseStart,
  choice: Choice,
  peripheral: Peripheral,
  tracking: Tracking,
};

export default function GameContainer({ type, record, next }) {
  const Game = map[type] || Reaction;

  return (
    <div className="game-container">
      <Game type={type} record={record} next={next} />
    </div>
  );
}
