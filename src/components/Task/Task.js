import PropTypes from "prop-types";
import { Component } from "react";
import { formatDistanceToNow } from "date-fns";

export default class Task extends Component {
  state = {
    date: formatDistanceToNow(this.props.creationTime, {
      includeSeconds: true,
    }),
  };

  static defaultProps = {
    label: "",
    creationTime: new Date(),
    done: false,
    id: "",
    onDone: () => {},
    onDeleted: () => {},
    onEdited: () => {},
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

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log(
      formatDistanceToNow(this.props.creationTime, { includeSeconds: true })
    );
    this.setState({
      date: formatDistanceToNow(this.props.creationTime, {
        includeSeconds: true,
      }),
    });
  }

  render() {
    const { label, done, id, onDone, onDeleted, onEdited } = this.props;

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={id}
          onChange={onDone}
          checked={done}
        />
        <label htmlFor={id}>
          <span className="description">{label}</span>
          <span className="created">{`created ${this.state.date} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={onEdited}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    );
  }
}
