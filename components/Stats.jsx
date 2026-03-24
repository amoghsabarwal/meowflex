export default function Stats({ scores }) {
  if (!scores.length) return null;

  const avg = scores.reduce((a,b)=>a+b)/scores.length;

  return (
    <div className="card">
      <div>Avg Reaction: {Math.round(avg)} ms</div>
      <div>Sessions: {scores.length}</div>
    </div>
  );
}