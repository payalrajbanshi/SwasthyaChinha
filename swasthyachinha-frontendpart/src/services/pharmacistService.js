// import axios from "axios";

// const API_URL = "http://localhost:5099/api/pharmacist";

// export const getPrescriptionByQR = async (qr, token) => {
//   const response = await axios.get(`${API_URL}/prescription/${qr}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// export const dispenseMedicine = async (prescriptionId, token) => {
//   const response = await axios.post(
//     `${API_URL}/dispense`,
//     { prescriptionId },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// export const getPharmacistProfile = async (token) => {
//   //const res = await fetch("/api/pharmacist/profile", {
//   const res = await axios.get(`${API_URL}/profile`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   // if (!res.ok) throw new Error("Failed to fetch profile");
//   // return await res.json();
//   return res.data;
// };

// import axios from "axios";

// const API_URL = "http://localhost:5099/api/Pharmacist"; // Match backend casing

// export const getPrescriptionByQR = async (qr, token) => {
//   if (!qr) throw new Error("QR code is required");

//   try {
//     const response = await axios.get(`${API_URL}/prescription/${qr}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching prescription:", error.response?.data || error.message);
//     throw new Error("Prescription not found or invalid QR code");
//   }
// };

// export const dispenseMedicine = async (prescriptionId, token) => {
//   if (!prescriptionId) throw new Error("Prescription ID is required");

//   try {
//     const response = await axios.post(
//       `${API_URL}/dispense`,
//       { prescriptionId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error dispensing medicine:", error.response?.data || error.message);
//     throw new Error("Failed to dispense medicine");
//   }
// };

// export const getPharmacistProfile = async (token) => {
//   try {
//     const response = await axios.get(`${API_URL}/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error.response?.data || error.message);
//     throw new Error("Failed to fetch profile");
//   }
// };
// export const getPrescriptionById = async (id) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(`${API_URL}/prescription/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };



// import axios from "axios";
// import api from "./api";

// const API_URL = "http://localhost:5099/api/Pharmacist"; // Match backend casing

// export const getPrescriptionByQR = async (qr, token) => {
//   if (!qr) throw new Error("QR code is required");

//   try {
//     const response = await axios.get(`${API_URL}/prescription/${qr}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching prescription:", error.response?.data || error.message);
//     throw new Error("Prescription not found or invalid QR code");
//   }
// };

// export const dispenseMedicine = async (prescriptionId, token) => {
//   if (!prescriptionId) throw new Error("Prescription ID is required");

//   try {
//     const response = await axios.post(
//       `${API_URL}/dispense`,
//       { prescriptionId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error dispensing medicine:", error.response?.data || error.message);
//     throw new Error("Failed to dispense medicine");
//   }
// };



// export const getPharmacistProfile = async (token) => {
//   try {
//     const response = await axios.get(`${API_URL}/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching profile:", error.response?.data || error.message);
//     throw new Error("Failed to fetch profile");
//   }
// };

// export const getPrescriptionById = async (id) => {
//   const token = localStorage.getItem("token");
//   const response = await axios.get(`${API_URL}/prescription/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// };

// // ✅ New version using centralized api.js (no need to pass token manually)
// export async function getPrescriptionByQRWithApi(qrId) {
//   try {
//     const response = await api.get(`/pharmacist/prescription/${qrId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching prescription via api.js:", error.response?.data || error.message);
//     throw new Error("Prescription not found or invalid QR code");
//   }
// }
import axios from "axios";

const API_URL = "http://localhost:5099/api/Pharmacist";

export const getPrescriptionByQR = async (qr, token) => {
  if (!qr) throw new Error("QR code is required");
  try {
    const response = await axios.get(`${API_URL}/prescription/${qr}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching prescription:", error.response?.data || error.message);
    throw new Error("Prescription not found or invalid QR code");
  }
};

export const dispenseMedicine = async (prescriptionId, token) => {
  const response = await axios.post(
    `${API_URL}/dispense`,
    { prescriptionId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getPharmacistProfile = async (token) => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
