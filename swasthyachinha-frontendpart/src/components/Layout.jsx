//import React from "react";
import React, { useEffect } from "react";

import Navbar from "./Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Redirect only if user is on root ("/") or auth pages
    if (
      token &&
      role &&
      (location.pathname === "/")
    ) {
      switch (role.toLowerCase()) {
        case "patient":
          navigate("/patient-dashboard");
          break;
        case "doctor":
          navigate("/doctor-dashboard");
          break;
        case "pharmacist":
          navigate("/pharmacist-dashboard");
          break;
        case "hospitaladmin":
          navigate("/hospital-dashboard");
          break;
        default:
          navigate("/");
      }
    }
  }, [navigate, location]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
