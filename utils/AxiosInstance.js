import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL:  "https://zendor-backend-s1ci.onrender.com/api", //"https://zendor-backend.onrender.com/api" 
=======
  baseURL:  "https://zendor-backend.onrender.com/api",  //"http://localhost:5000/api", ], 
>>>>>>> aa1b56f678b0f3b1dd4ea8213eac21d1eac77328
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
