import { Component } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class App extends Component {
  state = {
    todoData: [],
    buttons: [
      { id: crypto.randomUUID(), isActive: true, name: 'All' },
      { id: crypto.randomUUID(), isActive: false, name: 'Active' },
      { id: crypto.randomUUID(), isActive: false, name: 'Completed' },
    ],
    status: 'All',
  };

  createTask = (label, min = null, sec = null) => {
    return {
      label,
      creationTime: new Date(),
      done: false,
      edit: false,
      id: crypto.randomUUID(),
      timer: min || sec ? min * 60 + sec : null,
      timerId: null,
      isTimerSet: min || sec ? !!(min * 60 + sec) : !!null,
    };
  };

  handleUpdateTimer = (id, val) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => {
          task = task.id === id ? { ...task, timer: !val ? task.timer + 1 : task.timer - 1 } : task;
          return task;
        }),
      };
    });
  };

  handleStartTimer = (evt, id, val) => {
    evt.target.disabled = true;

    console.log('val', val);

    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => {
          return task.id === id ? { ...task, timerId: setInterval(() => this.handleUpdateTimer(id, val), 1000) } : task;
        }),
      };
    });
  };

  handleStopTimer = (evt, id) => {
    evt.target.previousSibling.disabled = false;

    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => (task.id === id ? { ...task, timerId: clearInterval(task.timerId) } : task)),
      };
    });
  };

  handleAdded = (text, min, sec) => {
    this.setState(({ todoData }) => {
      const newArr = structuredClone(todoData);

      newArr.push(this.createTask(text, min, sec));

      return {
        todoData: newArr,
      };
    });
  };

  handleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => (task.id === id ? { ...task, done: !task.done, timer: 0 } : task)),
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

  handleSetLabelChange = (id, value) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((task) => (task.id === id ? { ...task, label: value } : task)),
      };
    });
  };

  handleEdited = (id, ok = false) => {
    this.setState(({ todoData }) => {
      if (!ok) {
        return {
          todoData: todoData.map((task) => ({
            ...task,
            edit: task.id === id,
          })),
        };
      } else {
        return {
          todoData: todoData.map((task) => (task.id === id ? { ...task, edit: !task.edit } : task)),
        };
      }
    });
  };

  getFilteredTasks = () => {
    switch (this.state.status) {
      case 'Active':
        return this.state.todoData.filter((task) => !task.done);
      case 'Completed':
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
            onUpdateTimer={this.handleUpdateTimer}
            onStartTimer={this.handleStartTimer}
            onStopTimer={this.handleStopTimer}
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
