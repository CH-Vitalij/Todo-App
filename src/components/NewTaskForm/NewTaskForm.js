import { Component } from "react";

export default class NewTaskForm extends Component {
  state = { label: "" };

  handleLabelChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  handleSubmit = (evt) => {
    if (evt.keyCode === 13) {
      this.props.onAdded(this.state.label);
      this.setState({ label: "" });
    }
  };

  render() {
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={this.handleLabelChange}
        onKeyDown={this.handleSubmit}
        value={this.state.label}
      />
    );
  }
}
