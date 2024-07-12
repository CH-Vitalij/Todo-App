import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { Component } from 'react';

export default class Task extends Component {
  static defaultProps = {
    label: '',
    creationTime: new Date(),
    done: false,
    id: '',
    timer: 0,
    onDone: () => {},
    onDeleted: () => {},
    onEdited: () => {},
    onUpdateTimer: () => {},
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

  handleTimer = (evt) => {
    if (evt.target.matches('.icon-play')) {
      evt.target.disabled = true;
      this.timerId = setInterval(() => {
        this.props.onUpdateTimer();
      }, 1000);

      console.log('timerId', this.timerId);
    } else if (evt.target.matches('.icon-pause')) {
      console.log('timerId', this.timerId);

      evt.target.previousSibling.disabled = false;
      clearInterval(this.timerId);
    }
  };

  componentWillUnmount() {
    console.log('timer Id', this.timerId);
    clearInterval(this.timerId);
  }

  render() {
    const { label, creationTime, done, id, timer, onDone, onDeleted, onEdited } = this.props;

    const formattedDate = formatDistanceToNow(creationTime, {
      includeSeconds: true,
      addSuffix: true,
    });

    return (
      <div className="view">
        <input className="toggle" type="checkbox" id={id} onChange={onDone} checked={done} />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <span className="description" onClick={(evt) => this.handleTimer(evt)}>
            <button className="icon icon-play"></button>
            <button className="icon icon-pause"></button>
            {` ${this.updateTimerView(timer)}`}
          </span>
          <span className="description">{`created ${formattedDate}`}</span>
        </label>
        <button className="icon icon-edit" onClick={() => onEdited(id)}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
