import { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = { label: '' };

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
      this.props.onAdded(this.state.label);
      this.setState({ label: '' });
    }
  };

  render() {
    return (
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.handleLabelChange}
          onKeyDown={this.handleSubmit}
          value={this.state.label}
        />
        <input className="new-todo-form__timer" placeholder="Min" />
        <input className="new-todo-form__timer" placeholder="Sec" />
      </form>
    );
  }
}
