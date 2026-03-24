export default function Menu({ startTraining, startSingle }) {
  return (
    <div className="menu">
      <button onClick={startTraining}>START TRAINING</button>

      <button onClick={()=>startSingle("reaction")}>Reaction</button>
      <button onClick={()=>startSingle("false")}>False Start</button>
      <button onClick={()=>startSingle("choice")}>Choice</button>
      <button onClick={()=>startSingle("peripheral")}>Peripheral</button>
      <button onClick={()=>startSingle("tracking")}>Tracking</button>
    </div>
  );
}