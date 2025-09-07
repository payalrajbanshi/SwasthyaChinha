import api from "./api";

// ✅ Hospital Stats
export const getHospitalStats = (hospitalId) =>
  api.get(`/hospital/stats?hospitalId=${hospitalId}`);

// ✅ Prescriptions
export const getHospitalPrescriptions = (hospitalId) =>
  api.get(`/hospital/prescriptions?hospitalId=${hospitalId}`);

// ✅ Register Doctor
export const registerDoctor = (doctorData) =>
  api.post(`/hospital/register-doctor`, doctorData);

// ✅ Update Hospital Profile
export const updateHospitalProfile = (hospitalId, data) =>
  api.put(`/hospital/${hospitalId}`, data);

// ✅ Get Hospital Doctors
// export const getDoctors = (hospitalId) =>
//   api.get(`/hospital/${hospitalId}/doctors`);

// // ✅ Get Hospital Patients
// export const getPatients = (hospitalId) =>
//   api.get(`/hospital/${hospitalId}/patients`);
export const getDoctors = () => api.get(`/hospital/doctors`);

// Get Hospital Patients ✅ (fixed)
export const getPatients = () => api.get(`/hospital/patients`);
// ✅ Get full patient stats with Email & Name
export const getPatientStats = (hospitalId) =>
  api.get(`/hospital/patient-stats?hospitalId=${hospitalId}`);
