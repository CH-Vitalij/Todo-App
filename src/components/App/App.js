import { useState, StrictMode } from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

const App = () => {
  const [state, setState] = useState({
    todoData: [],
    buttons: [
      { id: crypto.randomUUID(), isActive: true, name: 'All' },
      { id: crypto.randomUUID(), isActive: false, name: 'Active' },
      { id: crypto.randomUUID(), isActive: false, name: 'Completed' },
    ],
    status: 'All',
  });

  const createTask = (label, min = null, sec = null) => {
    return {
      label: label,
      initialLabel: label,
      creationTime: new Date(),
      done: false,
      edit: false,
      id: crypto.randomUUID(),
      timer: min || sec ? min * 60 + sec : null,
      timerId: null,
      isTimerSet: min || sec ? true : false,
    };
  };

  const handleUpdateTimer = (id, val) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoData: prevState.todoData.map((task) => {
          task = task.id === id ? { ...task, timer: !val ? task.timer + 1 : task.timer - 1 } : task;
          return task;
        }),
      };
    });
  };

  const handleStartTimer = (id, val) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoData: prevState.todoData.map((task) => {
          return task.id === id ? { ...task, timerId: setInterval(() => handleUpdateTimer(id, val), 1000) } : task;
        }),
      };
    });
  };

  const handleStopTimer = (id) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoData: prevState.todoData.map((task) =>
          task.id === id ? { ...task, timerId: clearInterval(task.timerId) } : task,
        ),
      };
    });
  };

  const handleAdded = (text, min, sec) => {
    setState((prevState) => {
      const newArr = structuredClone(prevState.todoData);

      newArr.push(createTask(text, min, sec));

      return {
        ...prevState,
        todoData: newArr,
      };
    });
  };

  const handleDone = (id) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoData: prevState.todoData.map((task) =>
          task.id === id
            ? { ...task, done: !task.done, timer: null, isTimerSet: false, timerId: clearInterval(task.timerId) }
            : task,
        ),
      };
    });
  };

  const handleDeleted = (id) => {
    setState((prevState) => {
      return { ...prevState, todoData: prevState.todoData.filter((task) => task.id !== id) };
    });
  };

  const handleSelected = (name) => {
    setState((prevState) => ({
      ...prevState,
      buttons: prevState.buttons.map((btn) => ({
        ...btn,
        isActive: btn.name === name,
      })),
      status: name,
    }));
  };

  const handleClear = () => {
    setState((prevState) => {
      return { ...prevState, todoData: prevState.todoData.filter((el) => !el.done) };
    });
  };

  const handleSetLabelChange = (id, value, newInitialLabel) => {
    setState((prevState) => {
      return {
        ...prevState,
        todoData: prevState.todoData.map((task) =>
          task.id === id
            ? {
                ...task,
                label: value ? value : task.initialLabel,
                initialLabel: newInitialLabel ? value : task.initialLabel,
              }
            : task,
        ),
      };
    });
  };

  const handleEdited = (id, ok = false) => {
    setState((prevState) => {
      if (!ok) {
        return {
          ...prevState,
          todoData: prevState.todoData.map((task) => ({
            ...task,
            edit: task.id === id,
          })),
        };
      } else {
        return {
          ...prevState,
          todoData: prevState.todoData.map((task) => (task.id === id ? { ...task, edit: !task.edit } : task)),
        };
      }
    });
  };

  const getFilteredTasks = () => {
    switch (state.status) {
      case 'Active':
        return state.todoData.filter((task) => !task.done);
      case 'Completed':
        return state.todoData.filter((task) => task.done);
      default:
        return state.todoData;
    }
  };

  return (
    <>
      <StrictMode>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onAdded={handleAdded} />
        </header>
        <section className="main">
          <TaskList
            todos={getFilteredTasks()}
            onDone={handleDone}
            onDeleted={handleDeleted}
            onEdited={handleEdited}
            onSetLabelChange={handleSetLabelChange}
            onStartTimer={handleStartTimer}
            onStopTimer={handleStopTimer}
          />
          <Footer
            btn={state.buttons}
            active={state.todoData.filter((task) => !task.done)}
            onSelect={handleSelected}
            onClear={handleClear}
          />
        </section>
      </StrictMode>
    </>
  );
};

export default App;
