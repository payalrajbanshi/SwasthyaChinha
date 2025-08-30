import axios from "axios";

// Axios instance
const API = axios.create({
   baseURL: "http://localhost:5099/api", // backend URL
  //baseURL: " https://radiation-quantity-retention-abc.trycloudflare.com ",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Export all API calls
export const getProfile = () => API.get("/patient/profile");
export const getPrescriptions = () => API.get("/patient/prescriptions");
// Remove patientId from calls
// export const getLastVisit = () => API.get("/patient/last-visit");
// export const getLastPrescription = () => API.get("/patient/last-prescription");

//export const getLastVisit = (patientId) => API.get(`/patient/last-visit/${patientId}`);
//export const getLastPrescription = (patientId) => API.get(`/patient/last-prescription/${patientId}`);

export default API;
