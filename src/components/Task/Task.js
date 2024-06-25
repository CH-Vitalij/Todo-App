export default function Task({ label, creationTime, id, onDone, onDeleted }) {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} onChange={onDone} />
      <label htmlFor={id}>
        <span className="description">{label}</span>
        <span className="created">{creationTime}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
}
