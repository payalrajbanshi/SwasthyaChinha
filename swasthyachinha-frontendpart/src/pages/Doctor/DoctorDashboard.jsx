
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import QRCode from "react-qr-code"; // You can install via: npm i react-qr-code

// export default function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return;
//     }

//     axios
//       .get("http://localhost:5099/api/doctor/patients", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setPatients(res.data))
//       .catch(() => alert("Failed to load patients"));
//   }, [navigate]);

//   const totalPatientsToday = patients.length;
//   const prescriptionsGiven = 5; // Replace with API call if available

//   return (
//     <div className="min-h-screen bg-gray-100 px-6 py-10">
//       {/* Welcome & Stats */}
//       <h1 className="text-3xl font-bold mb-4 text-green-800">Welcome, Doctor 👨‍⚕️</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold">🧑‍🤝‍🧑 Patients Today</h2>
//           <p className="text-3xl mt-2 font-bold text-blue-600">{totalPatientsToday}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold">💊 Prescriptions Given</h2>
//           <p className="text-3xl mt-2 font-bold text-purple-600">{prescriptionsGiven}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold">📅 Date</h2>
//           <p className="text-lg mt-2 text-gray-700">{new Date().toLocaleDateString()}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow text-center">
//           <h2 className="text-xl font-semibold">🔳 QR Preview</h2>
//           <div className="mt-2 flex justify-center">
//             <QRCode value="Sample QR for Prescription" size={100} />
//           </div>
//         </div>
//       </div>

//       {/* Quick Links */}
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Links</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//         <button
//           onClick={() => navigate("/doctor/prescribe")}
//           className="bg-green-600 text-white px-4 py-3 rounded shadow hover:bg-green-700"
//         >
//           ➕ Write New Prescription
//         </button>
//         <button
//           onClick={() => navigate("/doctor/patient-history")}
//           className="bg-blue-600 text-white px-4 py-3 rounded shadow hover:bg-blue-700"
//         >
//           🔍 View Patient History
//         </button>
//       </div>

//       {/* Patients List */}
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Patients</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
//         {patients.map((patient) => (
//           <div
//             key={patient.id}
//             className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer"
//             onClick={() => navigate(`/doctor/prescribe/${patient.id}`)}
//           >
//             <h3 className="text-lg font-semibold">{patient.fullName}</h3>
//             <p className="text-sm text-gray-600">Email: {patient.email}</p>
//             <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Prescriptions (Static - Replace Later) */}
//       <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Prescriptions</h2>
//       <ul className="bg-white p-6 rounded-xl shadow space-y-3">
//         <li className="text-gray-700">• Paracetamol - for Ramesh (12 July)</li>
//         <li className="text-gray-700">• Amoxicillin - for Sita (11 July)</li>
//         <li className="text-gray-700">• Ibuprofen - for Gita (10 July)</li>
//       </ul>
//     </div>
//   );
// }
// import React from "react";
// import Sidebar from "../../components/dashboard/Sidebar";
// import DoctorProfileCard from "../../components/dashboard/DoctorProfileCard";
// import StatsCard from "../../components/dashboard/StatsCard";
// import ChartWidget from "../../components/dashboard/ChartWidget";
// import PatientsTable from "../../components/dashboard/PatientsTable";
// import PrescriptionQuickForm from "../../components/dashboard/PrescriptionQuickForm";

// const DoctorDashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-100">
//         <DoctorProfileCard doctor={null} /> {/* Replace null with API data */}
//         <div className="grid grid-cols-3 gap-4 my-6">
//           <StatsCard title="Total Patients" value="0" />
//           <StatsCard title="Total Prescriptions" value="0" />
//           <StatsCard title="Today's Patients" value="0" />
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="col-span-2">
//             <PatientsTable patients={[]} />
//           </div>
//           <div>
//             <ChartWidget />
//             <div className="mt-4">
//               <PrescriptionQuickForm />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Sidebar from "../../components/dashboard/Sidebar";
// import DoctorProfileCard from "../../components/dashboard/DoctorProfileCard";
// import StatsCard from "../../components/dashboard/StatsCard";
// import ChartWidget from "../../components/dashboard/ChartWidget";
// import PatientsTable from "../../components/dashboard/PatientsTable";
// import PrescriptionQuickForm from "../../components/dashboard/PrescriptionQuickForm";


// import { getDoctorProfile, getDoctorPatients } from "../../services/doctorService";

// const DoctorDashboard = () => {
//   const [doctor, setDoctor] = useState(null);
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();


//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const profileData = await getDoctorProfile();
//         setDoctor(profileData);

//         const patientsData = await getDoctorPatients();
//         setPatients(patientsData);
//       } catch (error) {
//         console.error("Error loading dashboard data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return <div className="p-6">Loading dashboard...</div>;
//   }

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-100">
//         {/* Profile Overview */}
//         <DoctorProfileCard doctor={doctor} />

//         {/* Stats Cards */}
//         <div className="grid grid-cols-3 gap-4 my-6">
//           <StatsCard title="Total Patients" value={patients.length} />
//           <StatsCard title="Total Prescriptions" value="--" /> {/* Future API */}
//           <StatsCard title="Today's Patients" value="--" /> {/* Future API */}
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-3 gap-4">
//           <div className="col-span-2">
//             <PatientsTable patients={patients} />
//           </div>
//           <div>
//             <ChartWidget />
//             <div className="mt-4">
//                             {/* 🔘 Add New Prescription Button */}
//               <button
//                 onClick={() => navigate("/doctor/prescribe")}
//                 className="bg-green-600 text-white px-4 py-2 rounded mb-4 w-full"
//               >
//                 ➕ Add New Prescription
//               </button>
//               <PrescriptionQuickForm />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;







// // src/pages/doctor/DoctorDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUserMd, FaClipboardList, FaHistory, FaQrcode, FaSignOutAlt } from "react-icons/fa";
// import api from "../../services/api";

// const DoctorDashboard = () => {
//   const [doctor, setDoctor] = useState({});
//   const [stats, setStats] = useState({ totalPatients: 0, prescriptionsGiven: 0 });

//   useEffect(() => {
//     // Fetch doctor profile
//     api.get("/doctor/profile").then(res => setDoctor(res.data));

//     // Fetch doctor stats
//     api.get("/doctor/stats").then(res => setStats(res.data));
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg flex flex-col items-center py-6">
//         {/* Doctor Profile */}
//         <img
//           src={doctor.profilePicture || "/default-doctor.png"}
//           alt="Doctor"
//           className="w-20 h-20 rounded-full border-2 border-blue-500"
//         />
//         <h2 className="mt-3 text-lg font-semibold">{doctor.fullName}</h2>
//         <p className="text-gray-500">{doctor.specialty}</p>

//         {/* Navigation Links */}
//         <nav className="mt-6 w-full">
//           <Link
//             to="/doctor-dashboard"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaUserMd /> Dashboard
//           </Link>
//           <Link
//             to="/write-prescription"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaClipboardList /> Write Prescription
//           </Link>
//           <Link
//             to="/patient-history"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaHistory /> Patient History
//           </Link>
//           <Link
//             to="/scan-qr"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaQrcode /> Scan QR
//           </Link>
//           <Link
//             to="/logout"
//             className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50"
//           >
//             <FaSignOutAlt /> Logout
//           </Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

//         {/* Stats Cards (Removed Total Cost) */}
//         <div className="grid grid-cols-2 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Total Patients Today</h3>
//             <p className="text-3xl font-bold">{stats.totalPatients}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Prescriptions Given</h3>
//             <p className="text-3xl font-bold">{stats.prescriptionsGiven}</p>
//           </div>
//         </div>

//         {/* Additional Content */}
//         <div className="mt-8">
//           <h2 className="text-lg font-semibold mb-4">Recent Prescriptions</h2>
//           {/* Add recent prescription table here */}
//         </div>
//       </div>
//     </div>
//   );
// };




// export default DoctorDashboard;
//src/pages/doctor/DoctorDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUserMd, FaClipboardList, FaHistory, FaUserCog, FaSignOutAlt } from "react-icons/fa"; 
// import api from "../../services/api";

// const DoctorDashboard = () => {
//   const [doctor, setDoctor] = useState({});
//   const [stats, setStats] = useState({ totalPatients: 0, prescriptionsGiven: 0 });
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     // Fetch doctor profile
//     api.get("/doctor/profile").then(res => setDoctor(res.data));

//     // Fetch doctor stats
//     api.get("/doctor/stats").then(res => setStats(res.data));

//     // Fetch patients list
//     api.get("/doctor/patients").then(res => setPatients(res.data));
//   }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-white shadow-lg flex flex-col items-center py-6">
//         {/* Doctor Profile */}
//         <img
//           src={doctor.profilePicture || "/default-doctor.png"}
//           alt="Doctor"
//           className="w-20 h-20 rounded-full border-2 border-blue-500"
//         />
//         <h2 className="mt-3 text-lg font-semibold">{doctor.fullName}</h2>
//         <p className="text-gray-500">{doctor.specialty}</p>

//         {/* Navigation Links */}
//         <nav className="mt-6 w-full">
//           <Link
//             to="/doctor-dashboard"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaUserMd /> Dashboard
//           </Link>
//           <Link
//             to="/write-prescription"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaClipboardList /> Write Prescription
//           </Link>
//           <Link
//             to="/patient-history"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaHistory /> Patient History
//           </Link>
//           <Link
//             to="/manage-profile"
//             className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-50"
//           >
//             <FaUserCog /> Manage Profile
//           </Link>
//           <Link
//             to="/logout"
//             className="flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50"
//           >
//             <FaSignOutAlt /> Logout
//           </Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Total Patients Today</h3>
//             <p className="text-3xl font-bold">{stats.totalPatients}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Prescriptions Given</h3>
//             <p className="text-3xl font-bold">{stats.prescriptionsGiven}</p>
//           </div>
//         </div>

//         {/* My Patients Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-lg font-semibold mb-4">My Patients</h2>
//           <table className="w-full border-collapse border text-left">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="border px-4 py-2">Full Name</th>
//                 <th className="border px-4 py-2">Patient ID</th>
//                 <th className="border px-4 py-2">Last Visit Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length > 0 ? (
//                 patients.map((p) => (
//                   <tr key={p.id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2">{p.name}</td>
//                     <td className="border px-4 py-2">{p.id}</td>
//                     <td className="border px-4 py-2">{p.lastVisitDate || "N/A"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center py-4 text-gray-500">
//                     No patients found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Prescriptions */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Recent Prescriptions</h2>
//           {/* Prescription table goes here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;




// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import Sidebar from "../../components/dashboard/Sidebar"; // ✅ Import Sidebar

// const DoctorDashboard = () => {
//   const [doctor, setDoctor] = useState({});
//   const [stats, setStats] = useState({ totalPatients: 0, prescriptionsGiven: 0 });
//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     // Fetch doctor profile
//     api.get("/doctor/profile").then((res) => setDoctor(res.data));

//     // Fetch doctor stats
//     api.get("/doctor/stats").then((res) => setStats(res.data));

//     // Fetch patients list
//   //   api.get("/doctor/patients").then((res) => setPatients(res.data));
//   // }, []);
//   api.get("/doctor/patients").then((res) => {
//     const latestPatients = Array.from(
//       new Map(res.data.map(p => [p.patientId, p])).values()
//     ).sort((a, b) => new Date(b.lastVisitDate) - new Date(a.lastVisitDate));

//     setPatients(latestPatients);
//   });
// }, []);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* ✅ Sidebar */}
//       <Sidebar doctor={doctor} />

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-2xl font-bold mb-6">Doctor Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Total Patients Today</h3>
//             <p className="text-3xl font-bold">{stats.patientsToday}</p>
//           </div>
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold">Prescriptions Given</h3>
//             <p className="text-3xl font-bold">{stats.prescriptionsGiven}</p>
//           </div>
//         </div>

//         {/* My Patients Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//           <h2 className="text-lg font-semibold mb-4">My Patients</h2>
//           <table className="w-full border-collapse border text-left">
//             <thead>
//               <tr className="bg-gray-50">
//                 <th className="border px-4 py-2">Full Name</th>
//                 <th className="border px-4 py-2">Patient ID</th>
//                 <th className="border px-4 py-2">Phone Number</th>
//                 <th className="border px-4 py-2">Last Visit Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {patients.length > 0 ? (
//                 patients.map((p) => (
//                   <tr key={p.Id} className="hover:bg-gray-50">
//                     <td className="border px-4 py-2">{p.fullName}</td>
//                     <td className="border px-4 py-2">{p.patientId}</td>
//                     <td className="border px-4 py-2">{p.phoneNumber || "N/A"}</td>
//                     <td className="border px-4 py-2">{p.lastVisitDate || "N/A"}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center py-4 text-gray-500">
//                     No patients found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Recent Prescriptions */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg font-semibold mb-4">Recent Prescriptions</h2>
//           {/* Prescription table goes here */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;

import { useEffect, useState } from "react";
import api from "../../services/api";
import Sidebar from "../../components/dashboard/Sidebar";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState({});
  const [stats, setStats] = useState({ patientsToday: 0, prescriptionsGiven: 0 });
  const [patients, setPatients] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    // Fetch doctor profile
    api.get("/doctor/profile").then((res) => setDoctor(res.data));

    // Fetch doctor stats
    api.get("/doctor/stats").then((res) => setStats(res.data));

    // Fetch patients list and sort by last visit (most recent first)
    api.get("/doctor/patients").then((res) => {
      const latestPatients = Array.from(
        new Map(res.data.map(p => [p.patientId, p])).values()
      ).sort((a, b) => new Date(b.lastVisitDate) - new Date(a.lastVisitDate));
      setPatients(latestPatients);
    });
    api.get("/doctor/total-patients").then(res => setTotalPatients(res.data.count));

  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar doctor={doctor} />

      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Doctor Dashboard</h1>

        {/* ===== Stats Cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Total Patients Today</h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">{stats.patientsToday}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Prescriptions Given</h3>
            <p className="text-4xl font-bold text-green-600 mt-2">{stats.prescriptionsGiven}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800">Registered Patients</h3>
            <p className="text-4xl font-bold text-purple-600 mt-2">{totalPatients}</p>
          </div>
        </div>

        {/* ===== My Patients Table ===== */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-black">My Patients</h2>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Patient ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Last Visit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.length > 0 ? (
                patients.map((p) => (
                  <tr key={p.patientId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-black">{p.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{p.patientId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{p.phoneNumber || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-black">{p.lastVisitDate || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Recent Prescriptions Section ===== */}
        <div className="bg-white p-6 rounded-xl shadow-md mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Prescriptions</h2>
          {/* Prescription table goes here */}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
