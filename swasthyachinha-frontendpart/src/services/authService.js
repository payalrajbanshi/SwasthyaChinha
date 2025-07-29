// const BASE_URL = "http://localhost:5099/api/auth"; // or your actual backend URL

// export async function login(data) {
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) throw new Error("Login failed");
//   return await res.json();
// }

// export async function register(data) {
//   const res = await fetch(`${BASE_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data)
//   });
//   if (!res.ok) throw new Error("Register failed");
//   return await res.json();
// }
// src/services/auth.js

const BASE_URL = "http://localhost:5099/api/auth"; // Update if your backend URL changes

// 🔐 Login function
export async function login(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await res.json();
}

// 📝 Role-based registration function
export async function registerUser(role, data) {
  const res = await fetch(`${BASE_URL}/register/${role}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Register failed");
  }

  return await res.json();
}

