import PropTypes from 'prop-types';

import Task from '../Task';

export default function TaskList({
  todos = [],
  onDone = () => {},
  onDeleted = () => {},
  onEdited = () => {},
  onSetLabelChange = () => {},
  onUpdateTimer = () => {},
  onStartTimer = () => {},
  onStopTimer = () => {},
}) {
  const handleLabelChange = (evt, id) => {
    onSetLabelChange(id, evt.target.value);
  };

  const handleSubmit = (evt, id) => {
    if (evt.keyCode === 13) {
      onEdited(id, true);
    }
  };

  const elements = todos.map((el) => {
    const { ...elProps } = el;

    let className = '';

    if (elProps.done) {
      className += 'completed';
    } else if (elProps.edit) {
      className += 'editing';
    }

    return (
      <li key={elProps.id} className={className}>
        <Task
          {...elProps}
          onUpdateTimer={() => onUpdateTimer(elProps.id)}
          onStartTimer={(evt) => onStartTimer(evt, elProps.id)}
          onStopTimer={(evt) => onStopTimer(evt, elProps.id)}
          onDone={() => onDone(elProps.id)}
          onDeleted={() => onDeleted(elProps.id)}
          onEdited={(id) => {
            const inputEdit = document.querySelector(`input.edit[data-id="${id}"]`);
            if (inputEdit) {
              setTimeout(() => {
                inputEdit.focus();
              }, 0);
            }
            onEdited(elProps.id);
          }}
        />
        <input
          type="text"
          className="edit"
          data-id={elProps.id}
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
