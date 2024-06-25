export default function TasksFilter({ status, name, onSelect }) {
  return (
    <button className={status} onClick={onSelect}>
      {name}
    </button>
  );
}
