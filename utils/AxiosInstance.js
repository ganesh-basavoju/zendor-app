import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.production === false
      ? "http://localhost:5000/api"
      : "https://zendor-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
