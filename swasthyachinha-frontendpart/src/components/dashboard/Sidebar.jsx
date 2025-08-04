import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/doctor/dashboard" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
        <Link to="/doctor/prescribe" className="hover:bg-blue-700 p-2 rounded">New Prescription</Link>
        <Link to="/doctor/patients" className="hover:bg-blue-700 p-2 rounded">My Patients</Link>
        <Link to="/doctor/profile" className="hover:bg-blue-700 p-2 rounded">Profile</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
