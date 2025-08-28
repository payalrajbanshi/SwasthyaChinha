// import api from "./api"; // your axios instance (already configured with baseURL + token interceptor)

// // Get patient profile (dynamically uses token from backend)
// // export const getPatientProfile = async () => {
// //   try {
// //     const response = await api.get("/api/patient/profile");
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error fetching patient profile:", error);
// //     throw error;
// //   }
// // };

// // Get patient prescriptions
// export const getPatientPrescriptions = async () => {
//   try {
//     const response = await api.get("/patient/prescriptions");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching patient prescriptions:", error);
//     throw error;
//   }
// };

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
// import axios from "axios";

// const API_URL = "http://localhost:5099/api"; 

// export const getPatientPrescriptions = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get(`${API_URL}/patient/prescriptions`);
//     return res;
//   } catch (err) {
//     console.error("Error fetching patient prescriptions:", err);
//     throw err;
//   }
// };

// import axios from "axios";

// const API_URL = "http://localhost:5099/api/patient";

// export const getPatientPrescriptions = async ( token) => {
//   try {
//     const response = await axios.get(`http://localhost:5099/api/patient/prescriptions?patientId=${patientId}`, {
//       headers: {
//         Authorization: `Bearer ${token}` // attach token here
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching patient prescriptions:", error);
//     throw error;
//   }
// };

// export default { getPatientPrescriptions };


import axios from "axios";

const API_URL = "http://localhost:5099/api/patient";

export const getPatientPrescriptions = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/prescriptions`, {
      headers: {
        Authorization: `Bearer ${token}` // attach token here
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching patient prescriptions:", error);
    throw error;
  }
};

export default { getPatientPrescriptions };
