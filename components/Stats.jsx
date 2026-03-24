import { summarizeHistory } from "../utils/metrics";

export default function Stats({ scores }) {
  if (!scores.length) return null;

  const summary = summarizeHistory(scores);

  return (
    <section className="card stats">
      <h2>Performance Snapshot</h2>
      <div className="stats-grid">
        <div>
          <p className="stat-label">Total Sessions</p>
          <p className="stat-value">{summary.sessions}</p>
        </div>
        <div>
          <p className="stat-label">Overall Average</p>
          <p className="stat-value">{summary.overall} ms</p>
        </div>
        <div>
          <p className="stat-label">Best Session</p>
          <p className="stat-value">{summary.best} ms</p>
        </div>
        <div>
          <p className="stat-label">Last Session</p>
          <p className="stat-value">{summary.last} ms</p>
        </div>
      </div>
      <p className="stat-footnote">Lower is better. History stores up to the 40 most recent sessions.</p>
    </section>
  );
}
