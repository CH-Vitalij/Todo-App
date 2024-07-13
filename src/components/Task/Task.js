import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    creationTime: new Date(),
    done: false,
    id: '',
    timer: null,
    timerId: null,
    isTimerSet: false,
    onDone: () => {},
    onDeleted: () => {},
    onEdited: () => {},
    onUpdateTimer: () => {},
    onStartTimer: () => {},
    onStopTimer: () => {},
  };

  static propTypes = {
    label: PropTypes.string.isRequired,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    done: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    onDone: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdited: PropTypes.func,
  };

  updateTimerView = (timer) => {
    return new Date(timer * 1000).toISOString().slice(11, 19);
  };

  componentDidUpdate(prevProps) {
    if (this.props.timer === prevProps.timer - prevProps.timer) {
      clearInterval(this.props.timerId);
    }
  }

  componentWillUnmount() {
    if (this.wasDeleted) {
      clearInterval(this.props.timerId);
    }
  }

  render() {
    const { label, creationTime, done, id, timer, onDone, onDeleted, onEdited, onStartTimer, onStopTimer, isTimerSet } =
      this.props;

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
            <button className="icon icon-play" onClick={(evt) => onStartTimer(evt, isTimerSet)}></button>
            <button className="icon icon-pause" onClick={onStopTimer}></button>
            {` ${this.updateTimerView(timer)}`}
          </span>
          <span className="description">{`created ${formattedDate}`}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdited(id)}></button>
        <button
          className="icon icon-destroy"
          onClick={() => {
            this.wasDeleted = id;
            onDeleted();
          }}
        ></button>
      </div>
    );
  }
}
