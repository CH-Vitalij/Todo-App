import Task from "../Task";

export default function TaskList({ todos, onDone, onDeleted }) {
  const elements = todos.map((el) => {
    const { status, ...elProps } = el;

    return (
      <li key={elProps.id} className={status}>
        <Task
          {...elProps}
          onDone={() => onDone(elProps.id)}
          onDeleted={() => onDeleted(elProps.id)}
        />
        {/* <input type="text" className="edit" value="Editing task" /> */}
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}
