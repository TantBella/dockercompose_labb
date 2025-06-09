import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditedText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editedText.trim() === "") return;
    const updated = [...tasks];
    updated[index].text = editedText;
    setTasks(updated);
    setEditIndex(null);
    setEditedText("");
  };

  const deleteTask = (index) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Procrastinatr</h1>
      </header>
      <div className="input-task">
        <input
          type="text"
          placeholder="Lägg till något att prokrastinera..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <li key={index} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(index)}
                />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                    onBlur={() => saveEdit(index)}
                    autoFocus
                  />
                ) : (
                  <span className={task.done ? "task-done" : "task-todo"}>
                    {task.text}
                  </span>
                )}
              </label>
              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => startEdit(index)}
                  title="Redigera"
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(index)}
                  title="Ta bort"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
