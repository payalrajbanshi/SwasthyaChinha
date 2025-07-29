// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Check if token exists (from localStorage or sessionStorage)
//     const token = localStorage.getItem("token") || sessionStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//       return; // ⛔ Stop further execution
//     }

//     // ✅ If token exists, proceed to fetch data
//     axios
//       .get("http://localhost:5099/api/doctor/patients", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setPatients(res.data))
//       .catch(() => alert("Failed to load patients"));
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
//       <p className="text-lg mb-6">Select a patient to create a prescription.</p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {patients.map((patient) => (
//           <div
//             key={patient.id}
//             className="bg-white shadow p-4 rounded-xl hover:shadow-md cursor-pointer"
//             onClick={() => navigate(`/doctor/prescribe/${patient.id}`)}
//           >
//             <h2 className="text-xl font-semibold">{patient.fullName}</h2>
//             <p>Email: {patient.email}</p>
//             <p>Gender: {patient.gender}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code"; // You can install via: npm i react-qr-code

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5099/api/doctor/patients", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPatients(res.data))
      .catch(() => alert("Failed to load patients"));
  }, [navigate]);

  const totalPatientsToday = patients.length;
  const prescriptionsGiven = 5; // Replace with API call if available

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Welcome & Stats */}
      <h1 className="text-3xl font-bold mb-4 text-green-800">Welcome, Doctor 👨‍⚕️</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">🧑‍🤝‍🧑 Patients Today</h2>
          <p className="text-3xl mt-2 font-bold text-blue-600">{totalPatientsToday}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">💊 Prescriptions Given</h2>
          <p className="text-3xl mt-2 font-bold text-purple-600">{prescriptionsGiven}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">📅 Date</h2>
          <p className="text-lg mt-2 text-gray-700">{new Date().toLocaleDateString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-xl font-semibold">🔳 QR Preview</h2>
          <div className="mt-2 flex justify-center">
            <QRCode value="Sample QR for Prescription" size={100} />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <button
          onClick={() => navigate("/doctor/prescribe")}
          className="bg-green-600 text-white px-4 py-3 rounded shadow hover:bg-green-700"
        >
          ➕ Write New Prescription
        </button>
        <button
          onClick={() => navigate("/doctor/patient-history")}
          className="bg-blue-600 text-white px-4 py-3 rounded shadow hover:bg-blue-700"
        >
          🔍 View Patient History
        </button>
      </div>

      {/* Patients List */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Patients</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md cursor-pointer"
            onClick={() => navigate(`/doctor/prescribe/${patient.id}`)}
          >
            <h3 className="text-lg font-semibold">{patient.fullName}</h3>
            <p className="text-sm text-gray-600">Email: {patient.email}</p>
            <p className="text-sm text-gray-600">Gender: {patient.gender}</p>
          </div>
        ))}
      </div>

      {/* Recent Prescriptions (Static - Replace Later) */}
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Prescriptions</h2>
      <ul className="bg-white p-6 rounded-xl shadow space-y-3">
        <li className="text-gray-700">• Paracetamol - for Ramesh (12 July)</li>
        <li className="text-gray-700">• Amoxicillin - for Sita (11 July)</li>
        <li className="text-gray-700">• Ibuprofen - for Gita (10 July)</li>
      </ul>
    </div>
  );
}
