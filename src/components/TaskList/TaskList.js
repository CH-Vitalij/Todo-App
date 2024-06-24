import Task from "../Task";

export default function TaskList({ todos, onDone }) {
  const elements = todos.map((el) => {
    const { id, status, ...elProps } = el;

    return (
      <li key={id} className={status}>
        <Task {...elProps} onDone={(evt) => onDone(id, evt)} />
        <input type="text" className="edit" value="Editing task" />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}
