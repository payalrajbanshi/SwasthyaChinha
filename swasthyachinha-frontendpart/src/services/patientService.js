import api from "./api"; // your axios instance (already configured with baseURL + token interceptor)

// Get patient profile (dynamically uses token from backend)
// export const getPatientProfile = async () => {
//   try {
//     const response = await api.get("/api/patient/profile");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching patient profile:", error);
//     throw error;
//   }
// };

// Get patient prescriptions
export const getPatientPrescriptions = async () => {
  try {
    const response = await api.get("/api/patient/prescriptions");
    return response.data;
  } catch (error) {
    console.error("Error fetching patient prescriptions:", error);
    throw error;
  }
};

// Get recent visits (if you have such endpoint)
// export const getRecentVisits = async () => {
//   try {
//     const response = await api.get("/api/patient/recent-visits");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching recent visits:", error);
//     throw error;
//   }
// };
