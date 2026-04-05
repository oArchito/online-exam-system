import axios from "axios";

const API = axios.create({
  baseURL: "https://online-exam-system-w05s.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getMyResults = () => API.get("/exams/my-results");

export default API;
