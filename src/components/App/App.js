import { Component } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";

export default class App extends Component {
  state = {
    todoData: [],
    buttons: [
      { id: crypto.randomUUID(), isActive: true, name: "All" },
      { id: crypto.randomUUID(), isActive: false, name: "Active" },
      { id: crypto.randomUUID(), isActive: false, name: "Completed" },
    ],
    status: "All",
  };

  createTask = (label) => {
    return {
      label,
      creationTime: formatDistanceToNow(Date.now(), { includeSeconds: true }),
      done: false,
      edit: false,
      id: crypto.randomUUID(),
    };
  };

  handleAdded = (text) => {
    this.setState(({ todoData }) => {
      const newArr = structuredClone(todoData);

      newArr.push(this.createTask(text));

      return {
        todoData: newArr,
      };
    });
  };

  handleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => {
          task = task.id === id ? { ...task, done: !task.done } : task;

          return task;
        }),
      };
    });
  };

  handleDeleted = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((task) => task.id !== id) };
    });
  };

  handleSelected = (name) => {
    this.setState(({ buttons }) => ({
      buttons: buttons.map((btn) => ({
        ...btn,
        isActive: btn.name === name,
      })),
      status: name,
    }));
  };

  handleClear = () => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter((el) => !el.done) };
    });
  };

  handleEdited = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => {
          task = task.id === id ? { ...task, edit: !task.edit } : task;

          return task;
        }),
      };
    });
  };

  handleSetLabelChange = (id, newLabel) => {
    if (newLabel !== "") {
      this.setState(({ todoData }) => {
        return {
          todoData: todoData.map((task) => {
            task = task.id === id ? { ...task, label: newLabel } : task;

            return task;
          }),
        };
      });
    }
  };

  getFilteredTasks = () => {
    switch (this.state.status) {
      case "Active":
        return this.state.todoData.filter((task) => !task.done);
      case "Completed":
        return this.state.todoData.filter((task) => task.done);
      default:
        return this.state.todoData;
    }
  };

  render() {
    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={this.handleAdded} />
        </header>
        <section className="main">
          <TaskList
            todos={this.getFilteredTasks()}
            onDone={this.handleDone}
            onDeleted={this.handleDeleted}
            onEdited={this.handleEdited}
            onSetLabelChange={this.handleSetLabelChange}
          />
          <Footer
            btn={this.state.buttons}
            active={this.state.todoData.filter((task) => !task.done)}
            onSelect={this.handleSelected}
            onClear={this.handleClear}
          />
        </section>
      </>
    );
  }
}
