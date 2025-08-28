import axios from "axios";

const API_URL = "http://localhost:5099/api/pharmacist";

export const getPrescriptionByQR = async (qr, token) => {
  const response = await axios.get(`${API_URL}/prescription/${qr}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
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
  //const res = await fetch("/api/pharmacist/profile", {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return await res.json();
};
