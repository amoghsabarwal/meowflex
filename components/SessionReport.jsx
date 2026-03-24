import { formatGameName } from "../utils/metrics";

export default function SessionReport({ summary, onDone, onReplay }) {
  return (
    <section className="card report">
      <h2>Session Complete</h2>
      <p className="report-lede">Composite score: <strong>{summary.overall} ms</strong></p>

      <div className="report-grid">
        {Object.entries(summary.gameAverages).map(([game, value]) => (
          <div key={game} className="report-item">
            <p>{formatGameName(game)}</p>
            <strong>{value} ms</strong>
          </div>
        ))}
      </div>

      <div className="report-actions">
        <button className="primary" onClick={onReplay}>Run Again</button>
        <button onClick={onDone}>Back to Menu</button>
      </div>
    </section>
  );
}
