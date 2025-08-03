// // src/services/auth.js
// import api from "./api"; // uses the centralized axios instance

// export async function loginUser(data) {
//   const response = await api.post("/auth/login", data);
//   return response.data; // typically { token, role, userId, etc. }
// }

// export async function registerUser(role, data) {
//   const endpoint = {
//     hospitaladmin: "auth/register/hospitaladmin",
//     doctor: "auth/register/doctor",
//     patient: "auth/register/patient",
//     pharmacist: "auth/register/pharmacist",
//   }[role.toLowerCase()];

//   if (!endpoint) throw new Error("Invalid role");

//   const response = await api.post(`/${endpoint}`, data);
//   return response.data;
// }
// src/services/auth.js
import api from "./api"; // uses the centralized axios instance

export async function loginUser(data) {
  // Explicitly map to what backend expects
  const response = await api.post("/auth/login", {
    emailOrPhone: data.emailOrPhone,
    password: data.password,
  });
  return response.data; // typically { token, role, userId, etc. }
}


export async function registerUser(role, data) {
  const endpoint = {
    hospitaladmin: "auth/register/hospitaladmin",
    doctor: "auth/register/doctor",
    patient: "auth/register/patient",
    pharmacist: "auth/register/pharmacist",
  }[role.toLowerCase()];

  if (!endpoint) throw new Error("Invalid role");

  const response = await api.post(`/${endpoint}`, data);
  return response.data;
}
