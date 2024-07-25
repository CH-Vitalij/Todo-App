import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { forwardRef, useEffect, useRef } from 'react';

const Task = forwardRef(function Task(
  {
    label = '',
    creationTime = new Date(),
    done = false,
    id = '',
    timer = null,
    timerId = null,
    isTimerSet = false,
    onDone = () => {},
    onDeleted = () => {},
    onEdited = () => {},
    onStartTimer = () => {},
    onStopTimer = () => {},
  },
  btnStartRef,
) {
  const wasDeletedTaskRef = useRef(null);

  useEffect(() => {
    if (!timer) {
      clearInterval(timerId);
    }

    return () => {
      if (wasDeletedTaskRef.current) {
        clearInterval(timerId);
      }
    };
  }, [timer]);

  const updateTimerView = (timer) => {
    return new Date(timer * 1000).toISOString().slice(11, 19);
  };

  const formattedDate = formatDistanceToNow(creationTime, {
    includeSeconds: true,
    addSuffix: true,
  });

  return (
    <div className="view">
      <input className="toggle" type="checkbox" id={id} onChange={onDone} checked={done} />
      <label htmlFor={id}>
        <span className="title">{label}</span>
        <span className="description">
          <button
            className="icon icon-play"
            onClick={(evt) => onStartTimer(evt, isTimerSet)}
            ref={btnStartRef}
          ></button>
          <button className="icon icon-pause" onClick={onStopTimer}></button>
          {` ${updateTimerView(timer)}`}
        </span>
        <span className="description">{`created ${formattedDate}`}</span>
      </label>
      <button className="icon icon-edit" onClick={() => onEdited(id)}></button>
      <button
        className="icon icon-destroy"
        onClick={() => {
          wasDeletedTaskRef.current = id;
          onDeleted();
        }}
      ></button>
    </div>
  );
});

Task.propTypes = {
  label: PropTypes.string.isRequired,
  creationTime: PropTypes.instanceOf(Date).isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
};

export default Task;
