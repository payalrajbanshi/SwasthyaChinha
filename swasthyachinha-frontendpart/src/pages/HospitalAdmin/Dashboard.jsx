// import { useEffect, useState } from "react";
// import { getHospitalStats } from "@/api/hospital";
// import StatCard from "@/components/HospitalAdmin/StatCard";
// import Topbar from "@/components/HospitalAdmin/Topbar";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const navigate = useNavigate();
//   const hospitalId = localStorage.getItem("hospitalId");

//   useEffect(() => {
//     getHospitalStats(hospitalId).then((res) => {
//       setStats(res.data);
//     });
//   }, [hospitalId]);

//   if (!stats) return <div className="p-6 text-gray-500">Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <Topbar hospitalName={stats.hospitalName || "Hospital"} />

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 mb-6">
//         <StatCard label="Total Doctors" value={stats.totalDoctors} type="doctors" />
//         <StatCard label="Patients Registered" value={stats.totalPatients} type="patients" />
//         <StatCard label="Prescriptions" value={stats.totalPrescriptions} type="prescriptions" />
//         <StatCard label="Revenue" value={`Rs. ${stats.totalRevenue}`} type="revenue" />
//       </div>

//       <button
//         onClick={() => navigate("/register-doctor")}
//         className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
//       >
//         + Register New Doctor
//       </button>
//     </div>
//   );
// };

// export default Dashboard;
// src/pages/HospitalAdmin/Dashboard.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const hospitalId = localStorage.getItem("hospitalId");

//   useEffect(() => {
//     console.log("Fetched hospitalId:", hospitalId);
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:5099/api/Hospital/stats?hospitalId=${hospitalId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("✅ Hospital stats response:", response.data);
//         setStats(response.data);
//       } catch (error) {
//         console.error("Failed to fetch hospital stats:", error);
//       }
//     };

//     fetchStats();
//   }, [hospitalId]);

//   if (!stats) return <div>Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* 🏥 Hospital Info Header */}
//       <div className="flex items-center gap-4">
//         {stats.hospitalLogoUrl && (
//           <img
//             src={stats.hospitalLogoUrl}
//             alt="Hospital Logo"
//             className="w-16 h-16 rounded-full object-cover border"
//           />
//         )}
//         <div>
//           <h1 className="text-2xl font-bold">{stats.hospitalName}</h1>
//           <p className="text-gray-600">{stats.hospitalAddress}</p>
//         </div>
//       </div>

//       {/* 📊 Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <StatCard label="Total Doctors" value={stats.totalDoctors} />
//         <StatCard label="Total Patients" value={stats.totalPatients} />
//         <StatCard label="Total Prescriptions" value={stats.totalPrescriptions} />
//         <StatCard label="Total Expense" value={`Rs. ${stats.totalExpense}`} />
//         <StatCard label="Unique Patients" value={stats.uniquePatients} />
//         <StatCard label="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
//       </div>

//       {/* 🧑‍⚕️ Doctor Management */}
//       <DoctorForm onSuccess={() => window.location.reload()} />
//       <DoctorList />

//       {/* 👥 Patient List */}
//       <PatientList />
//     </div>
//   );
// };

// const StatCard = ({ label, value }) => (
//   <div className="bg-white rounded-xl shadow p-4 text-center">
//     <p className="text-gray-500 text-sm mb-1">{label}</p>
//     <p className="text-xl font-bold">{value}</p>
//   </div>
// );

// export default Dashboard;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const hospitalId = localStorage.getItem("userId"); // 'userId' holds hospital ID
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//         console.log("📦 Token:", token);
//     console.log("🏥 HospitalId:", hospitalId)
//     const fetchStats = async () => {
//       if (!token || !hospitalId) {
//         console.error("❌ Missing token or hospitalId");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:5099/api/Hospital/stats?hospitalId=${hospitalId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("✅ Fetched hospital stats:", response.data);
//         setStats(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch hospital stats:", error);
//       } finally{
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [hospitalId, token]);
//     if (loading) return <div>⏳ Loading...</div>;

//   if (!stats) return <div>Failed to load stats.</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* 🏥 Hospital Info Header */}
//       <div className="flex items-center gap-4">
//         {stats.hospitalLogoUrl && (
//           <img
//             src={stats.hospitalLogoUrl}
//             alt="Hospital Logo"
//             className="w-16 h-16 rounded-full object-cover border"
//           />
//         )}
//         <div>
//           <h1 className="text-2xl font-bold">{stats.hospitalName}</h1>
//           <p className="text-gray-600">{stats.hospitalAddress}</p>
//         </div>
//       </div>

//       {/* 📊 Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <StatCard label="Total Doctors" value={stats.totalDoctors} />
//         <StatCard label="Total Patients" value={stats.totalPatients} />
//         <StatCard label="Total Prescriptions" value={stats.totalPrescriptions} />
//         <StatCard label="Total Expense" value={`Rs. ${stats.totalExpense}`} />
//         <StatCard label="Unique Patients" value={stats.uniquePatients} />
//         <StatCard label="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
//       </div>

//       {/* 🧑‍⚕️ Doctor Management */}
//       <DoctorForm onSuccess={() => window.location.reload()} />
//       <DoctorList />

//       {/* 👥 Patient List */}
//       <PatientList />
//     </div>
//   );
// };

// const StatCard = ({ label, value }) => (
//   <div className="bg-white rounded-xl shadow p-4 text-center">
//     <p className="text-gray-500 text-sm mb-1">{label}</p>
//     <p className="text-xl font-bold">{value}</p>
//   </div>
// );

// export default Dashboard;
// src/pages/HospitalAdmin/Dashboard.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Settings,
//   UserPlus
// } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const hospitalId = localStorage.getItem("userId");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     console.log("📦 Token:", token);
//     console.log("🏥 HospitalId:", hospitalId);
//     const fetchStats = async () => {
//       if (!token || !hospitalId) {
//         console.error("❌ Missing token or hospitalId");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:5099/api/Hospital/stats?hospitalId=${hospitalId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log("✅ Fetched hospital stats:", response.data);
//         setStats(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch hospital stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [hospitalId, token]);

//   if (loading) return <div>⏳ Loading...</div>;
//   if (!stats) return <div>❌ Failed to load stats.</div>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-4">
//         <h2 className="text-2xl font-bold text-green-700 mb-8">SwasthyaChinha</h2>
//         <nav className="space-y-4">
//           <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
//           <NavItem icon={<UserPlus size={18} />} label="Doctors" />
//           <NavItem icon={<FileText size={18} />} label="Prescriptions Audit" />
//           <NavItem icon={<Users size={18} />} label="Patients" />
//           <NavItem icon={<Settings size={18} />} label="Settings" />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 space-y-8">
//         {/* Hospital Info */}
//         <div className="flex items-center gap-4">
//           {stats.hospitalLogoUrl && (
//             <img
//               src={stats.hospitalLogoUrl}
//               alt="Hospital Logo"
//               className="w-16 h-16 rounded-full object-cover border"
//             />
//           )}
//           <div>
//             <h1 className="text-3xl font-bold">{stats.hospitalName}</h1>
//             <p className="text-gray-600">{stats.hospitalAddress}</p>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <StatCard label="Total Doctors" value={stats.totalDoctors} />
//           <StatCard label="Total Patients" value={stats.totalPatients} />
//           <StatCard label="Total Prescriptions" value={stats.totalPrescriptions} />
//           <StatCard label="Total Expense" value={`Rs. ${stats.totalExpense}`} />
//           <StatCard label="Unique Patients" value={stats.uniquePatients} />
//           <StatCard label="Total Revenue" value={`Rs. ${stats.totalRevenue}`} />
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-4 rounded-lg shadow">
//               <h2 className="font-semibold text-lg mb-2">Register Doctor</h2>
//               <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
//                 Add Doctor
//               </button>
//             </div>
//           </div> */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//   <StatCard label="Total Doctors" value={stats.totalDoctors} />
//   <StatCard label="Total Prescriptions Issued" value={stats.totalPrescriptionsIssued} />
//   <StatCard label="Prescriptions Verified Today" value={stats.prescriptionsVerifiedToday} />
//   <StatCard label="Active Prescriptions" value={stats.activePrescriptions} />
//   <StatCard label="QR Codes Generated Today" value={stats.qrCodesGeneratedToday} />
//   <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//     <div className="bg-white p-4 rounded-lg shadow">
//       <h2 className="font-semibold text-lg mb-2">Register Doctor</h2>
//       <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
//         Add Doctor
//       </button>
//     </div>
//   </div>
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-4 rounded-lg shadow h-full">
//               <h2 className="font-semibold text-lg mb-2">Weekly Prescription Graph</h2>
//               <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
//                 Graph
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor & Patient Management */}
//         <DoctorForm onSuccess={() => window.location.reload()} />
//         <DoctorList />
//         <PatientList />

//         {/* Prescriptions Table */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Prescriptions</h2>
//           <table className="w-full table-auto text-left">
//             <thead>
//               <tr className="border-b">
//                 <th className="py-2">Date</th>
//                 <th className="py-2">Doctor</th>
//                 <th className="py-2">Patient</th>
//                 <th className="py-2">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="py-2">2025-07-28</td>
//                 <td className="py-2">Dr. Sharma</td>
//                 <td className="py-2">Ram</td>
//                 <td className="py-2">Completed</td>
//               </tr>
//               {/* TODO: Map prescription data from backend here */}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// const NavItem = ({ icon, label }) => (
//   <div className="flex items-center space-x-2 text-gray-700 hover:text-green-600 cursor-pointer">
//     {icon}
//     <span>{label}</span>
//   </div>
// );

// const StatCard = ({ label, value }) => (
//   <div className="bg-white p-4 rounded-lg shadow text-center">
//     <p className="text-gray-500 text-sm mb-1">{label}</p>
//     <p className="text-xl font-bold">{value}</p>
//   </div>
// );

// export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import DoctorList from "../../components/HospitalAdmin/DoctorList";
import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
import PatientList from "../../components/HospitalAdmin/PatientList";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  UserPlus,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const hospitalId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      if (!token || !hospitalId) {
        console.error("❌ Missing token or hospitalId");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5099/api/Hospital/stats?hospitalId=${hospitalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch hospital stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [hospitalId, token]);

  if (loading) return <div>⏳ Loading...</div>;
  if (!stats) return <div>❌ Failed to load stats.</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-green-700 mb-8">SwasthyaChinha</h2>
        <nav className="space-y-4">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem icon={<UserPlus size={18} />} label="Doctors" />
          <NavItem icon={<FileText size={18} />} label="Prescriptions Audit" />
          <NavItem icon={<Users size={18} />} label="Patients" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Hospital Info */}
        <div className="flex items-center gap-4">
          {stats.hospitalLogoUrl && (
            <img
              src={stats.hospitalLogoUrl}
              alt="Hospital Logo"
              className="w-16 h-16 rounded-full object-cover border"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{stats.hospitalName}</h1>
            <p className="text-gray-600">{stats.hospitalAddress}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="Total Doctors" value={stats.totalDoctors} />
          <StatCard label="Total Prescriptions Issued" value={stats.totalPrescriptionsIssued} />
          <StatCard label="Prescriptions Verified Today" value={stats.prescriptionsVerifiedToday} />
          <StatCard label="Active Prescriptions" value={stats.activePrescriptions} />
          <StatCard label="QR Codes Generated Today" value={stats.qrCodesGeneratedToday} />

          {/* Add Doctor Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold text-lg mb-2">Register Doctor</h2>
              <button
                onClick={() => setShowDoctorForm(!showDoctorForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              >
                {showDoctorForm ? "Close Form" : "Add Doctor"}
              </button>
              {showDoctorForm && (
                <div className="mt-4">
                  <DoctorForm />
                </div>
              )}
            </div>
          </div>

          {/* Prescription Graph Placeholder */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow h-full">
              <h2 className="font-semibold text-lg mb-2">Weekly Prescription Graph</h2>
              <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                Graph
              </div>
            </div>
          </div>
        </div>

        {/* Doctor & Patient Management */}
        <DoctorList />
        <PatientList />

        {/* Prescription Table */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Prescriptions</h2>
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Doctor</th>
                <th className="py-2">Patient</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Real prescription data will be mapped here dynamically */}
              {/* TODO: Map prescription data from backend here */}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-2 text-gray-700 hover:text-green-600 cursor-pointer">
    {icon}
    <span>{label}</span>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-[#fefaf6] p-4 rounded-lg shadow text-center">
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
