// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   if (!token || !allowedRoles.includes(role?.toLowerCase())) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLowerCase();  // normalize here

  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
