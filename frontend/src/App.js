import { useState, useEffect } from "react";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Något gick fel");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Kunde inte hämta tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskTitle: newTask, isDone: false }),
      });
      if (!res.ok) throw new Error("Något gick fel vid skapande");
      const createdTask = await res.json();
      setTasks([...tasks, createdTask]);
      setNewTask("");
    } catch (error) {
      console.error("Kunde inte lägga till task:", error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const updatedTask = { ...task, isDone: !task.isDone };

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Något gick fel vid uppdatering");
      let data = null;
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      } else {
        data = updatedTask;
      }

      const updatedTasks = tasks.map((t) => (t.id === id ? data : t));
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Kunde inte uppdatera task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Något gick fel vid borttagning");
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Kunde inte ta bort task:", error);
    }
  };

  const startEdit = (id) => {
    setEditIndex(id);
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setEditedText(task.taskTitle);
  };

  const saveEdit = async (id) => {
    if (editedText.trim() === "") return;
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        console.error("Ingen task hittades med id:", id);
        return;
      }

      const updatedTask = { ...task, taskTitle: editedText };

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!res.ok) throw new Error("Något gick fel vid sparning");
      let data = null;
      const text = await res.text();
      if (text) {
        data = JSON.parse(text);
      } else {
        data = updatedTask;
      }

      const updatedTasks = tasks.map((t) => (t.id === id ? data : t));
      setTasks(updatedTasks);

      setEditIndex(null);
      setEditedText("");
    } catch (error) {
      console.error("Kunde inte spara task:", error);
    }
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
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <label>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => toggleTask(task.id)}
                />
                {editIndex === task.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    onBlur={() => saveEdit(task.id)}
                    autoFocus
                  />
                ) : (
                  <span className={task.isDone ? "task-done" : "task-todo"}>
                    {task.taskTitle}
                  </span>
                )}
              </label>
              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => startEdit(task.id)}
                  title="Redigera"
                >
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
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
