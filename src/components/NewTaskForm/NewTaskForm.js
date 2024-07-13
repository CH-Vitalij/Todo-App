import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = { label: '', sec: '', min: '' };

  static defaultProps = {
    onAdded: () => {},
  };

  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  };

  handleLabelChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  handleSubmit = (evt) => {
    if (evt.keyCode === 13) {
      this.props.onAdded(
        this.state.label,
        this.state.min === '' ? null : this.state.min,
        this.state.sec === '' ? null : this.state.sec,
      );
      this.setState({ label: '', sec: '', min: '' });
    }
  };

  handleSecChange = (evt) => {
    if (!isNaN(evt.target.value)) {
      this.setState({ sec: Number(evt.target.value) });
    }
  };

  handleMinChange = (evt) => {
    if (!isNaN(evt.target.value)) {
      this.setState({ min: Number(evt.target.value) });
    }
  };

  render() {
    return (
      <form className="new-todo-form" onKeyDown={this.handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.handleLabelChange}
          value={this.state.label}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.handleMinChange}
          value={this.state.min}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.handleSecChange}
          value={this.state.sec}
        />
      </form>
    );
  }
}
