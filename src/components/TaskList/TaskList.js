import PropTypes from 'prop-types';
import { useRef } from 'react';

import Task from '../Task';

const TaskList = ({
  todos = [],
  onDone = () => {},
  onDeleted = () => {},
  onEdited = () => {},
  onSetLabelChange = () => {},
  onStartTimer = () => {},
  onStopTimer = () => {},
}) => {
  const itemRef = useRef(null);

  const handleLabelChange = (evt, id) => {
    onSetLabelChange(id, evt.target.value, false);
  };

  const handleSubmit = (evt, id) => {
    if (evt.keyCode === 13) {
      onSetLabelChange(id, evt.target.value, true);
      onEdited(id, true);
    } else if (evt.keyCode === 27) {
      onSetLabelChange(id, null, false);
      onEdited(id, true);
    }
  };

  const getMap = () => {
    if (!itemRef.current) {
      itemRef.current = new Map();
    }
    return itemRef.current;
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
          onStartTimer={(evt, val) => onStartTimer(evt, elProps.id, val)}
          onStopTimer={(evt) => onStopTimer(evt, elProps.id)}
          onDone={() => onDone(elProps.id)}
          onDeleted={() => onDeleted(elProps.id)}
          onEdited={(id) => {
            if (itemRef.current.get(id)) {
              setTimeout(() => {
                itemRef.current.get(id).focus();
              }, 0);
            }
            onEdited(elProps.id);
          }}
        />
        <input
          type="text"
          className="edit"
          ref={(node) => {
            const map = getMap();

            if (node) {
              map.set(elProps.id, node);
            } else {
              map.delete(elProps.id);
            }
          }}
          onChange={(evt) => handleLabelChange(evt, elProps.id)}
          onKeyDown={(evt) => handleSubmit(evt, elProps.id)}
          value={elProps.label}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onSetLabelChange: PropTypes.func.isRequired,
};

export default TaskList;
