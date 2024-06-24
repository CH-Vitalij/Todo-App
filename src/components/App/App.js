import { useState } from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

export default function App() {
  const [tasks, setTasks] = useState({
    todoData: [
      {
        id: crypto.randomUUID(),
        status: "editing",
        label: "Editing task",
        creationTime: "created 5 minutes ago",
      },
      {
        id: crypto.randomUUID(),
        status: null,
        label: "Active task",
        creationTime: "created 5 minutes ago",
      },
      {
        id: crypto.randomUUID(),
        status: "completed",
        label: "Completed task",
        creationTime: "created 17 seconds ago",
      },
    ],
  });

  const buttons = [
    { id: crypto.randomUUID(), status: "selected", type: "All" },
    { id: crypto.randomUUID(), type: "Active" },
    { id: crypto.randomUUID(), type: "Completed" },
  ];

  const handleDone = (id, evt) => {
    if (!evt.target.matches(".toggle")) {
      return null;
    }

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
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={tasks.todoData} onDone={handleDone} />
        <Footer btn={buttons} />
      </section>
    </>
  );
}
