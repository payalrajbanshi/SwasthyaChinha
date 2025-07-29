import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5099/api/hospital",
});

export const getHospitalStats = (hospitalId) =>
  API.get(`/stats?hospitalId=${hospitalId}`);

export const registerDoctor = (data) =>
  API.post("/register-doctor", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
