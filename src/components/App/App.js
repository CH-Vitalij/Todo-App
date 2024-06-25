import { useState } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import { formatDistanceToNow } from "date-fns";

export default function App() {
  const [tasks, setTasks] = useState({
    todoData: [],
  });

  const buttons = [
    { id: crypto.randomUUID(), status: "selected", type: "All" },
    { id: crypto.randomUUID(), type: "Active" },
    { id: crypto.randomUUID(), type: "Completed" },
  ];

  function createTask(label) {
    return {
      status: null,
      label,
      creationTime: formatDistanceToNow(Date.now(), { includeSeconds: true }),
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
        if (el.status === null) {
          el = el.id === id ? { ...el, status: "completed" } : el;
        } else if (el.status === "completed") {
          el = el.id === id ? { ...el, status: null } : el;
        }

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
        <Footer btn={buttons} />
      </section>
    </>
  );
}
