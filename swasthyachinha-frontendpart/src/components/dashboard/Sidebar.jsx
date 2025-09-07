
import React from "react";
import { Link } from "react-router-dom";
import { FaUserMd, FaClipboardList, FaHistory, FaUserCog, FaSignOutAlt } from "react-icons/fa";
import defaultAvatar from "../../assets/doctor.jpg";

const BACKEND_URL = "http://localhost:5099"; // Backend URL

const Sidebar = ({ doctor }) => {
  const displayImage = doctor?.profileImageUrl ||defaultAvatar;
    // ? doctor.profileImageUrl.startsWith("http")
    //   ? doctor.profileImageUrl
    //   : `${BACKEND_URL}${doctor.profileImageUrl}?t=${Date.now()}` // cache-buster
    // : "/default-doctor.png";

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-6">
      <div className="flex flex-col items-center"></div>
      <img
        src={displayImage}
        alt="Doctor"
        className="w-20 h-20 rounded-full border-2 border-blue-500 object-cover"
      />
      <h2 className="mt-3 text-lg font-semibold">{doctor?.fullName || "Doctor"}</h2>
      <p className="text-gray-500">{doctor?.specialty || "Specialty"}</p>

      <nav className="mt-6 w-full">
        <Link to="/doctor/dashboard" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50">
          <FaUserMd /> Dashboard
        </Link>
        <Link to="/doctor/prescribe" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50">
          <FaClipboardList /> New Prescription
        </Link>
        <Link to="/doctor/patients" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50">
          <FaHistory /> Patient History
        </Link>
        <Link to="/doctor/profile" className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50">
          <FaUserCog /> Manage Profile
        </Link>
        <Link to="/logout" className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50">
          <FaSignOutAlt /> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
