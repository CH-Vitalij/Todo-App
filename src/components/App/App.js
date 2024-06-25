import { useState } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState({
    todoData: [createTask("Task1")],
  });

  const [btns, setBtns] = useState({
    buttons: [
      { id: crypto.randomUUID(), status: "selected", name: "All" },
      { id: crypto.randomUUID(), status: null, name: "Active" },
      { id: crypto.randomUUID(), status: null, name: "Completed" },
    ],
  });

  function createTask(label) {
    return {
      label,
      creationTime: formatDistanceToNow(Date.now(), { includeSeconds: true }),
      done: false,
      id: crypto.randomUUID(),
    };
  }

  function handleAdded(text) {
    const newTask = createTask(text);

    setTasks(({ todoData }) => {
      const newArr = structuredClone(todoData);

      newArr.push(newTask);

      return {
        todoData: newArr,
      };
    });
  }

  function handleDone(id) {
    setTasks(({ todoData }) => {
      const newArr = todoData.map((el) => {
        el = el.id === id ? { ...el, done: !el.done } : el;

        return el;
      });

      return { todoData: newArr };
    });
  }

  function handleDeleted(id) {
    setTasks(({ todoData }) => {
      const newArr = todoData.filter((el) => el.id !== id);

      return { todoData: newArr };
    });
  }

  function handleSelect(id) {
    setBtns(({ buttons }) => {
      const newArr = buttons.map((el) => {
        if (el.status) {
          el = el.id === id ? { ...el, status: "selected" } : el;
        }

        return el;
      });

      return { buttons: newArr };
    });
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAdded={handleAdded} />
      </header>
      <section className="main">
        <TaskList
          todos={tasks.todoData}
          onDone={handleDone}
          onDeleted={handleDeleted}
        />
        <Footer btn={btns.buttons} onSelect={handleSelect} />
      </section>
    </>
  );
}
