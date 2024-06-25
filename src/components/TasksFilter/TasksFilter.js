export default function TasksFilter({ isActive, name, onSelect }) {
  let className = "";

  if (isActive) {
    className += "selected";
  }

  return (
    <button className={className} onClick={() => onSelect(name)}>
      {name}
    </button>
  );
}
