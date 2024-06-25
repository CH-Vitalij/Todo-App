import Task from "../Task";

export default function TaskList({ todos, onDone, onDeleted }) {
  const elements = todos.map((el) => {
    const { ...elProps } = el;

    let className = "";

    if (elProps.done) {
      className += "completed";
    }

    return (
      <li key={elProps.id} className={className}>
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
