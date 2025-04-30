import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";
const getToken = () => localStorage.getItem("token");

export const getTasksByProject = async (projectId) => {
  const res = await axios.get(`${API_URL}/${projectId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/${id}`, task, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
