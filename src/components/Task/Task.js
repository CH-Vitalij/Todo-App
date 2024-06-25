export default function Task({
  label,
  creationTime,
  done,
  id,
  onDone,
  onDeleted,
}) {
  console.log(done);
  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        id={id}
        onChange={onDone}
        checked={done}
      />
      <label htmlFor={id}>
        <span className="description">{label}</span>
        <span className="created">{`created ${creationTime} ago`}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
}
