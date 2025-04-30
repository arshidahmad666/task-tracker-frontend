import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const ProjectPage = () => {
  const { id } = useParams(); // project ID
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Not Started",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasksByProject(id);
      setTasks(data);
    } catch {
      alert("Could not load tasks");
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) return alert("Title is required");
    await createTask({ ...form, project: id });
    setForm({ title: "", description: "", status: "Not Started" });
    loadTasks();
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    await updateTask(taskId, {
      ...tasks.find((t) => t._id === taskId),
      status: newStatus,
      completedAt: newStatus === "Completed" ? new Date() : null,
    });
    loadTasks();
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    loadTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <b>{task.title}</b> - {task.status}
            {task.status === "Completed" && (
              <small>
                {" "}
                (Done: {new Date(task.completedAt).toLocaleDateString()})
              </small>
            )}
            <br />
            <button onClick={() => handleUpdateStatus(task._id, "Not Started")}>
              Not Started
            </button>
            <button onClick={() => handleUpdateStatus(task._id, "In Progress")}>
              In Progress
            </button>
            <button onClick={() => handleUpdateStatus(task._id, "Completed")}>
              Completed
            </button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
            <hr />
          </li>
        ))}
      </ul>

      <h3>Add Task</h3>
      <input
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <br />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <br />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <br />
      <button onClick={handleCreate}>Create Task</button>
    </div>
  );
};

export default ProjectPage;
