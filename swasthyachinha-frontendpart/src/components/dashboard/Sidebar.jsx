// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
//       <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>
//       <nav className="flex flex-col gap-4">
//         <Link to="/doctor/dashboard" className="hover:bg-blue-700 p-2 rounded">Dashboard</Link>
//         <Link to="/doctor/prescribe" className="hover:bg-blue-700 p-2 rounded">New Prescription</Link>
//         <Link to="/doctor/patients" className="hover:bg-blue-700 p-2 rounded">My Patients</Link>
//         <Link to="/doctor/profile" className="hover:bg-blue-700 p-2 rounded">Profile</Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// const Sidebar = () => {
//   const location = useLocation();

//   const linkClass = (path) =>
//     `p-2 rounded ${
//       location.pathname === path ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
//     }`;

//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
//       <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>
//       <nav className="flex flex-col gap-2">
//         <Link to="/doctor/dashboard" className={linkClass("/doctor/dashboard")}>
//           Dashboard
//         </Link>
//         <Link to="/doctor/prescribe" className={linkClass("/doctor/prescribe")}>
//           Write Prescription
//         </Link>
//         <Link to="/doctor/patients" className={linkClass("/doctor/patients")}>
//           My Patients
//         </Link>
//         <Link to="/doctor/profile" className={linkClass("/doctor/profile")}>
//           Manage Profile
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
//       <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>
//       <nav className="flex flex-col gap-4">
//         <Link to="/doctor/dashboard" className="hover:bg-blue-700 p-2 rounded">
//           Dashboard
//         </Link>
//         <Link to="/doctor/prescribe" className="hover:bg-blue-700 p-2 rounded">
//           New Prescription
//         </Link>
//         <Link to="/doctor/patients" className="hover:bg-blue-700 p-2 rounded">
//           My Patients
//         </Link>
//         <Link to="/doctor/profile" className="hover:bg-blue-700 p-2 rounded">
//           Profile
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-blue-900 text-white flex flex-col p-4">
//       <h1 className="text-2xl font-bold mb-6">Doctor Panel</h1>
//       <nav className="flex flex-col gap-4">
//         <Link to="/doctor/dashboard" className="hover:bg-blue-700 p-2 rounded">
//           Dashboard
//         </Link>
//         <Link to="/doctor/prescribe" className="hover:bg-blue-700 p-2 rounded">
//           New Prescription
//         </Link>
//         <Link to="/doctor/patients" className="hover:bg-blue-700 p-2 rounded">
//           My Patients
//         </Link>
//         <Link to="/doctor/profile" className="hover:bg-blue-700 p-2 rounded">
//           Profile
//         </Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaClipboardList,
  FaHistory,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ doctor }) => {
  return (
    <div className="w-64 bg-white shadow-lg flex flex-col items-center py-6">
      {/* Doctor Profile */}
      <img
        src={doctor?.profilePicture || "/default-doctor.png"}
        alt="Doctor"
        className="w-20 h-20 rounded-full border-2 border-blue-500"
      />
      <h2 className="mt-3 text-lg font-semibold">{doctor?.fullName || "Doctor"}</h2>
      <p className="text-gray-500">{doctor?.specialty || "Specialty"}</p>

      {/* Navigation Links */}
      <nav className="mt-6 w-full">
        <Link
          to="/doctor/dashboard"
          className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
        >
          <FaUserMd /> Dashboard
        </Link>
        <Link
          to="/doctor/prescribe"
          className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
        >
          <FaClipboardList /> New Prescription
        </Link>
        <Link
          to="/doctor/patients"
          className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
        >
          <FaHistory /> Patient History
        </Link>
        <Link
          to="/doctor/profile"
          className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
        >
          <FaUserCog /> Manage Profile
        </Link>
        <Link
          to="/logout"
          className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50"
        >
          <FaSignOutAlt /> Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
