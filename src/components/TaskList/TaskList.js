import Task from "../Task";
import PropTypes from "prop-types";

export default function TaskList({
  todos = [],
  onDone = () => {},
  onDeleted = () => {},
  onEdited = () => {},
  onSetLabelChange = () => {},
}) {
  const handleLabelChange = (evt, id) => {
    onSetLabelChange(id, evt.target.value);
  };

  const handleSubmit = (evt, id) => {
    if (evt.keyCode === 13) {
      onEdited(id);
    }
  };

  const elements = todos.map((el) => {
    const { ...elProps } = el;

    let className = "";

    if (elProps.done) {
      className += "completed";
    } else if (elProps.edit) {
      className += "editing";
    }

    return (
      <li key={elProps.id} className={className}>
        <Task
          {...elProps}
          onDone={() => onDone(elProps.id)}
          onDeleted={() => onDeleted(elProps.id)}
          onEdited={() => onEdited(elProps.id)}
        />
        <input
          type="text"
          className="edit"
          placeholder="Editing task"
          onChange={(evt) => handleLabelChange(evt, elProps.id)}
          onKeyDown={(evt) => handleSubmit(evt, elProps.id)}
          value={elProps.label}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onSetLabelChange: PropTypes.func.isRequired,
};
