import TasksFilter from "../TasksFilter";

export default function Footer({ btn, onSelect }) {
  const elements = btn.map((el) => {
    const { id, ...elProps } = el;
    return (
      <li key={id}>
        <TasksFilter {...elProps} onSelect={() => onSelect(id)} />
      </li>
    );
  });

  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <ul className="filters">{elements}</ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
}
