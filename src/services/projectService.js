import axios from "axios";

const API_URL = "http://localhost:5000/api/projects";

const getToken = () => localStorage.getItem("token");

export const fetchProjects = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};

export const createProject = async (title) => {
  const res = await axios.post(
    API_URL,
    { title },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  return res.data;
};
