const DRILLS = [
  { id: "reaction", label: "Reaction", desc: "Tap at go cue" },
  { id: "false", label: "False Start", desc: "Release discipline" },
  { id: "choice", label: "Choice", desc: "Fast left/right selection" },
  { id: "peripheral", label: "Peripheral", desc: "Side-flash detection" },
  { id: "tracking", label: "Tracking", desc: "Moving target control" },
];

export default function Menu({ startTraining, startSingle }) {
  return (
    <section className="menu card">
      <div className="menu-intro">
        <h2>Start Training</h2>
        <p>Run the full circuit for a complete benchmark, or launch a single drill to isolate one skill area.</p>
      </div>

      <button className="primary" onClick={startTraining}>
        Launch Full Pilot Circuit
      </button>

      <p className="menu-title">Single drills</p>
      <div className="drill-grid">
        {DRILLS.map((drill) => (
          <button key={drill.id} className="drill-btn" onClick={() => startSingle(drill.id)}>
            <strong>{drill.label}</strong>
            <span>{drill.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
