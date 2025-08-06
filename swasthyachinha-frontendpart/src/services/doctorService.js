// src/services/doctorService.js
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
export const createPrescription = async (data) => {
  const res = await api.post("/Doctor/prescribe", data);
  return res.data;
};
