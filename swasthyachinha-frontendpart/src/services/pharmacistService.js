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
