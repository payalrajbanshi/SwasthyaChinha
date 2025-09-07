//src/services/doctorService.js
import api from "./api"; // Axios instance

// Fetch doctor profile
export const getDoctorProfile = async () => {
  const res = await api.get("/doctor/profile");
  return res.data;
};

// Fetch my patients
export const getDoctorPatients = async () => {
  const res = await api.get("/doctor/patients");
  return res.data;
};
// Create a new prescription
export const createPrescription = async (payload) => {
  const res = await api.post("/doctor/prescribe", payload);
  return res.data;
};

// export const updateDoctorProfile = async (formData) => {
//   const res = await api.put("/doctor/profile", formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return res.data;
// };
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
