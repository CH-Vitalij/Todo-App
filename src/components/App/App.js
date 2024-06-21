import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

export default function App() {
  const todoData = [
    {
      id: crypto.randomUUID(),
      status: "editing",
      label: "Editing task",
      creationTime: "created 5 minutes ago",
    },
    {
      id: crypto.randomUUID(),
      label: "Active task",
      creationTime: "created 5 minutes ago",
    },
    {
      id: crypto.randomUUID(),
      status: "completed",
      label: "Completed task",
      creationTime: "created 17 seconds ago",
    },
  ];

  const buttons = [
    { id: crypto.randomUUID(), status: "selected", type: "All" },
    { id: crypto.randomUUID(), type: "Active" },
    { id: crypto.randomUUID(), type: "Completed" },
  ];

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList todos={todoData} />
        <Footer btn={buttons} />
      </section>
    </>
  );
}
