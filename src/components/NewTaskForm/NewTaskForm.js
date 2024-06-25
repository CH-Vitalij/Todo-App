import { useState } from "react";

export default function NewTaskForm({ onAdded }) {
  const [task, setTask] = useState({ label: "" });

  const handleLabelChange = (evt) => {
    setTask({ label: evt.target.value });
  };

  const handleSubmit = (evt) => {
    if (evt.keyCode === 13) {
      onAdded(task.label);
      setTask({ label: "" });
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      onChange={handleLabelChange}
      onKeyDown={handleSubmit}
      value={task.label}
    />
  );
}
