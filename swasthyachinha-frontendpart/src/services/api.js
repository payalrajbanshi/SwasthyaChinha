// src/services/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://localhost:5099/api", // Replace with your backend URL/port
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
// src/services/api.js
// import axios from "axios";

// // Centralized axios instance
// const api = axios.create({
//   baseURL: "http://localhost:5099/api", 
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;
// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5099/api", // your backend URL
});

// Attach token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
