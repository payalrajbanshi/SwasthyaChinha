//src/services/doctorService.js
import api from "./api"; // Axios instance

// Fetch doctor profile
export const getDoctorProfile = async () => {
  const res = await api.get("/Doctor/profile");
  return res.data;
};

// Fetch my patients
export const getDoctorPatients = async () => {
  const res = await api.get("/Doctor/patients");
  return res.data;
};
// Create a new prescription
export const createPrescription = async (payload) => {
  const res = await api.post("/Doctor/prescribe", payload);
  return res.data;
};
// src/services/doctorService.js
// import api from "./api";

// // Get doctor profile
// export const getDoctorProfile = () => {
//   return api.get("/doctor/profile");
// };

// // Get doctor stats
// export const getDoctorStats = () => {
//   return api.get("/doctor/stats");
// };

// // Get patients assigned to doctor
// export const getDoctorPatients = () => {
//   return api.get("/doctor/patients");
// };
