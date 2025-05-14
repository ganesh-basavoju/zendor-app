import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000/api", 
=======
  baseURL:  "http://localhost:5000/api", //"https://zendor-backend.onrender.com/api" 
>>>>>>> 071565bbcb15fee98f469c1d5b7475e4ef5dcbb1
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
