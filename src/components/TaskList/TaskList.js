import Task from "../Task";
import { Component } from "react";

export default class TaskList extends Component {
  state = { label: "" };

  handleLabelChange = (evt) => {
    this.setState({ label: evt.target.value });
  };

  handleSubmit = (evt, id) => {
    if (evt.keyCode === 13) {
      this.props.onEdited(id);
      this.props.onSetLabelChange(id, this.state.label);
    }
  };

  render() {
    const elements = this.props.todos.map((el) => {
      const { ...elProps } = el;

      let className = "";

      if (elProps.done) {
        className += "completed";
      } else if (elProps.edit) {
        className += "editing";
      }

      return (
        <li key={elProps.id} className={className}>
          <Task
            {...elProps}
            onDone={() => this.props.onDone(elProps.id)}
            onDeleted={() => this.props.onDeleted(elProps.id)}
            onEdited={() => this.props.onEdited(elProps.id)}
          />
          <input
            type="text"
            className="edit"
            placeholder="Editing task"
            onChange={this.handleLabelChange}
            onKeyDown={(evt) => this.handleSubmit(evt, elProps.id)}
            value={this.state.label}
          />
        </li>
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
