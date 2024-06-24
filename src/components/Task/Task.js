export default function TaskFunct({ label, creationTime, onDone }) {
  return (
    <div className="view" onClick={onDone}>
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{label}</span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
}
