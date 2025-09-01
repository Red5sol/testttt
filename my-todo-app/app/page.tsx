"use client";

import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
    setNewTask("");
  };

  const toggleDone = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Ma Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          type="text"
          placeholder="Nouvelle tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={addTask}
        >
          Ajouter
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              <span className={task.done ? "line-through text-gray-400" : ""}>
                {task.text}
              </span>
            </div>
            <button
              className="text-red-500 font-bold"
              onClick={() => deleteTask(task.id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}