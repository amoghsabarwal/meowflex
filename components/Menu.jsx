const DRILLS = [
  { id: "reaction", label: "Reaction", desc: "Tap at visual go-signal" },
  { id: "false", label: "False Start", desc: "Prevent premature release" },
  { id: "choice", label: "Choice", desc: "Select correct cue quickly" },
  { id: "peripheral", label: "Peripheral", desc: "Detect side flashes" },
  { id: "tracking", label: "Tracking", desc: "Touch moving target" },
];

export default function Menu({ startTraining, startSingle }) {
  return (
    <section className="menu card">
      <button className="primary" onClick={startTraining}>
        Start Full Pilot Circuit
      </button>

      <p className="menu-title">Single drill</p>

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
