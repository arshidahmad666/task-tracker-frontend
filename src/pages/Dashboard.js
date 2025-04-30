import React, { useState, useEffect } from "react";
import { fetchProjects, createProject } from "../services/projectService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      alert("Failed to load projects");
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return alert("Title required");
    try {
      await createProject(newTitle);
      setNewTitle("");
      loadProjects();
    } catch (err) {
      alert(err.response?.data?.message || "Could not create project");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            onClick={() => navigate(`/project/${project._id}`)}
            style={{ cursor: "pointer" }}
          >
            {project.title}
          </li>
        ))}
      </ul>

      {projects.length < 4 && (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New project title"
          />
          <button onClick={handleCreate}>Add Project</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
