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
import axios from "axios";

// Centralized axios instance
const api = axios.create({
  baseURL: "http://localhost:5099/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
