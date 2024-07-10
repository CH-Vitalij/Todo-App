import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

export default function Task({
  label = '',
  creationTime = new Date(),
  done = false,
  id = '',
  onDone = () => {},
  onDeleted = () => {},
  onEdited = () => {},
}) {
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
          <button className="icon icon-play"></button>
          <button className="icon icon-pause"></button>
        </span>
        <span className="description">{`created ${formattedDate}`}</span>
      </label>
      <button className="icon icon-edit" onClick={onEdited}></button>
      <button className="icon icon-destroy" onClick={onDeleted}></button>
    </div>
  );
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  creationTime: PropTypes.instanceOf(Date).isRequired,
  done: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onDone: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
};
