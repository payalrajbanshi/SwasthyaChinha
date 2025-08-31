


// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Settings,
//   UserPlus,
// } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDoctorForm, setShowDoctorForm] = useState(false);

//   const hospitalId = localStorage.getItem("hospitalId");
//   const token = localStorage.getItem("token");

//   // Fetch Hospital Stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       if (!token || !hospitalId) {
//         console.error("❌ Missing token or hospitalId");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await API.get(`/hospital/stats?hospitalId=${hospitalId}`);
//         setStats(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch hospital stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, [hospitalId, token]);

//   // Fetch Prescriptions
//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const respone = await API.get(`/hospital/prescriptions?hospitalId=${hospitalId}`);
//         setPrescriptions(response.data);
//       } catch (error) {
//         console.error("❌ Failed to load prescriptions:", err);
//       }
//     };

//     if (hospitalId && token) fetchPrescriptions();
//   }, [hospitalId, token]);

//   if (loading) return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;
//   if (!stats) return <div className="flex items-center justify-center h-screen text-red-600">❌ Failed to load stats.</div>;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 rounded-r-2xl">
//         <h2 className="text-2xl font-extrabold text-green-700 mb-10">SwasthyaChinha</h2>
//         <nav className="space-y-6">
//           <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
//           <NavItem icon={<UserPlus size={20} />} label="Doctors" />
//           <NavItem icon={<FileText size={20} />} label="Prescriptions Audit" />
//           <NavItem icon={<Users size={20} />} label="Patients" />
//           <NavItem icon={<Settings size={20} />} label="Settings" />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10 space-y-10">
//         {/* Hospital Info */}
//         <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
//           {stats.logoUrl && (
//             <img
//               src={stats.logoUrl}
//               alt="Hospital Logo"
//               className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
//             />
//           )}
//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-800">{stats.HospitalName}</h1>
//             <p className="text-gray-600">{stats.address}</p>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <StatCard label="Total Doctors" value={stats.totalDoctors} />
//           <StatCard label="Total Prescriptions Issued" value={stats.totalPrescriptionsIssued} />
//           <StatCard label="Prescriptions Verified Today" value={stats.prescriptionsVerifiedToday} />
//           <StatCard label="Active Prescriptions" value={stats.activePrescriptions} />
//           <StatCard label="QR Codes Generated Today" value={stats.qrCodesGeneratedToday} />

//           {/* Add Doctor Section */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h2 className="font-semibold text-lg mb-3">Register Doctor</h2>
//               <button
//                 onClick={() => setShowDoctorForm(!showDoctorForm)}
//                 className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
//               >
//                 {showDoctorForm ? "Close Form" : "Add Doctor"}
//               </button>
//               {showDoctorForm && (
//                 <div className="mt-4">
//                   <DoctorForm />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Prescription Graph Placeholder */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
//               <h2 className="font-semibold text-lg mb-3">Weekly Prescription Graph</h2>
//               <div className="flex-1 bg-gradient-to-r from-green-200 to-green-100 rounded-xl flex items-center justify-center text-gray-500">
//                 📊 Coming Soon
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor & Patient Management */}
//         <DoctorList />
//         <PatientList />

//         {/* Prescription Table */}
//         <div className="bg-white p-6 rounded-2xl shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto text-left border-collapse">
//               <thead>
//                 <tr className="bg-green-100 text-green-900">
//                   <th className="py-3 px-4">Date</th>
//                   <th className="py-3 px-4">Doctor</th>
//                   <th className="py-3 px-4">Patient</th>
//                   <th className="py-3 px-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {prescriptions.length > 0 ? (
//                   prescriptions.map((p, idx) => (
//                     <tr key={idx} className="border-b hover:bg-green-50 transition">
//                       <td className="py-3 px-4">{new Date(p.date).toLocaleDateString()}</td>
//                       <td className="py-3 px-4">{p.doctor}</td>
//                       <td className="py-3 px-4">{p.patient}</td>
//                       <td className="py-3 px-4">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${
//                             p.status === "Active"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : "bg-green-100 text-green-800"
//                           }`}
//                         >
//                           {p.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="py-6 text-center text-gray-500">
//                       No prescriptions found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// const NavItem = ({ icon, label }) => (
//   <div className="flex items-center space-x-3 text-gray-700 hover:text-green-600 cursor-pointer transition">
//     {icon}
//     <span className="font-medium">{label}</span>
//   </div>
// );

// const StatCard = ({ label, value }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
//     <p className="text-gray-500 text-sm mb-1">{label}</p>
//     <p className="text-2xl font-bold text-green-700">{value}</p>
//   </div>
// );

// export default Dashboard;




// import { useEffect, useState } from "react";
// import { getHospitalStats, getHospitalPrescriptions } from "../../services/hospitalService";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import PrescriptionTable from "../../components/HospitalAdmin/PrescriptionTable";
// import HospitalProfile from "../../components/HospitalAdmin/HospitalProfile";
// import { LayoutDashboard, Users, FileText, Settings, UserPlus } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDoctorForm, setShowDoctorForm] = useState(false);

//   const hospitalId = localStorage.getItem("hospitalId");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const statsResp = await getHospitalStats(hospitalId);
//         setStats(statsResp.data);
//         const prescResp = await getHospitalPrescriptions(hospitalId);
//         setPrescriptions(prescResp.data);
//       } catch (err) {
//         console.error("❌ Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (hospitalId) fetchData();
//   }, [hospitalId]);

//   if (loading) return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 rounded-r-2xl">
//         <h2 className="text-2xl font-extrabold text-green-700 mb-10">SwasthyaChinha</h2>
//         <nav className="space-y-6">
//           <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
//           <NavItem icon={<UserPlus size={20} />} label="Doctors" />
//           <NavItem icon={<FileText size={20} />} label="Prescriptions Audit" />
//           <NavItem icon={<Users size={20} />} label="Patients" />
//           <NavItem icon={<Settings size={20} />} label="Settings" />
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-10 space-y-8">
//         {/* Hospital Info */}
//         {stats && (
//           <div className="flex items-center gap-6 bg-white shadow-md rounded-2xl p-6">
//             {stats.logoUrl && <img src={stats.logoUrl} alt="Hospital Logo" className="w-20 h-20 rounded-full object-cover border-4 border-green-200" />}
//             <div>
//               <h1 className="text-3xl font-extrabold text-gray-800">{stats.HospitalName}</h1>
//               <p className="text-gray-600">{stats.address}</p>
//             </div>
//           </div>
//         )}

//         {/* Doctor Form Toggle */}
//         <div>
//           <button onClick={() => setShowDoctorForm(!showDoctorForm)} className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
//             {showDoctorForm ? "Close Form" : "Add Doctor"}
//           </button>
//           {showDoctorForm && <DoctorForm hospitalId={hospitalId} onSuccess={() => setShowDoctorForm(false)} />}
//         </div>

//         {/* Lists */}
//         <DoctorList />
//         <PatientList />
//         <HospitalProfile stats={stats} />

//         {/* Prescriptions */}
//         <PrescriptionTable prescriptions={prescriptions} />
//       </main>
//     </div>
//   );
// };

// const NavItem = ({ icon, label }) => (
//   <div className="flex items-center space-x-3 text-gray-700 hover:text-green-600 cursor-pointer transition">
//     {icon}
//     <span className="font-medium">{label}</span>
//   </div>
// );

// export default Dashboard;



// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import DoctorList from "../../components/HospitalAdmin/DoctorList";
// import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
// import PatientList from "../../components/HospitalAdmin/PatientList";
// import PrescriptionTable from "../../components/HospitalAdmin/PrescriptionTable";
// import HospitalProfile from "../../components/HospitalAdmin/HospitalProfile";
// import { getHospitalStats, getHospitalPrescriptions } from "../../services/hospitalService";
// import {
//   LayoutDashboard,
//   Users,
//   FileText,
//   Settings,
//   UserPlus,
// } from "lucide-react";

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showDoctorForm, setShowDoctorForm] = useState(false);

//   const hospitalId = localStorage.getItem("hospitalId");
//   const token = localStorage.getItem("token");

//   // Fetch Hospital Stats
//   useEffect(() => {
//     const fetchStats = async () => {
//       if (!token || !hospitalId) {
//         console.error("❌ Missing token or hospitalId");
//         setLoading(false);
//         return;
//       }
//       try {
//         const response = await API.get(`/hospital/stats?hospitalId=${hospitalId}`);
//         setStats(response.data);
//       } catch (error) {
//         console.error("❌ Failed to fetch hospital stats:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, [hospitalId, token]);

//   useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const statsResp = await getHospitalStats(hospitalId);
//       setStats(statsResp.data);

//       const prescResp = await getHospitalPrescriptions(hospitalId);
//       setPrescriptions(prescResp.data);   // ✅ same as your working snippet
//     } catch (err) {
//       console.error("❌ Error fetching data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (hospitalId) fetchData();


//   // Fetch Prescriptions
//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const response = await API.get(`/hospital/prescriptions?hospitalId=${hospitalId}`);
//         const data = Array.isArray(response.data)
//           ? response.data
//           : response.data?.items || [];
//         setPrescriptions(data);
//       } catch (error) {
//         console.error("❌ Failed to load prescriptions:", error);
//       }
//     };
//     if (hospitalId && token) fetchPrescriptions();
//   }, [hospitalId, token]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">⏳ Loading...</div>
//     );
//   }
//   if (!stats) {
//     return (
//       <div className="flex items-center justify-center h-screen text-red-600">
//         ❌ Failed to load stats.
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-6 rounded-r-2xl">
//         <h2 className="text-2xl font-extrabold text-green-700 mb-10">
//           SwasthyaChinha
//         </h2>
//         <nav className="space-y-6">
//           <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
//           <NavItem icon={<UserPlus size={20} />} label="Doctors" />
//           <NavItem icon={<FileText size={20} />} label="Prescriptions Audit" />
//           <NavItem icon={<Users size={20} />} label="Patients" />
//           <NavItem icon={<Settings size={20} />} label="Settings" />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10 space-y-10">
//         {/* ✅ Hospital Profile (editable) at the very top */}
//         <HospitalProfile stats={stats} onUpdated={setStats} />

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           <StatCard label="Total Doctors" value={stats.totalDoctors} />
//           <StatCard label="Total Prescriptions Issued" value={stats.totalPrescriptionsIssued} />
//           <StatCard label="Prescriptions Verified Today" value={stats.prescriptionsVerifiedToday} />
//           <StatCard label="Active Prescriptions" value={stats.activePrescriptions} />
//           <StatCard label="QR Codes Generated Today" value={stats.qrCodesGeneratedToday} />

//           {/* Add Doctor Section */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg">
//               <h2 className="font-semibold text-lg mb-3">Register Doctor</h2>
//               <button
//                 onClick={() => setShowDoctorForm(!showDoctorForm)}
//                 className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
//               >
//                 {showDoctorForm ? "Close Form" : "Add Doctor"}
//               </button>
//               {showDoctorForm && (
//                 <div className="mt-4">
//                   {/* pass hospitalId so it registers to this hospital */}
//                   <DoctorForm hospitalId={hospitalId} onSuccess={() => setShowDoctorForm(false)} />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Prescription Graph Placeholder */}
//           <div className="col-span-1 sm:col-span-2 lg:col-span-1">
//             <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
//               <h2 className="font-semibold text-lg mb-3">Weekly Prescription Graph</h2>
//               <div className="flex-1 bg-gradient-to-r from-green-200 to-green-100 rounded-xl flex items-center justify-center text-gray-500">
//                 📊 Coming Soon
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Doctor & Patient Management (we leave your components as-is, no “no X yet” text) */}
//         <DoctorList />
//         <PatientList />

//         {/* ✅ Prescription Table — renders properly */}
//         <PrescriptionTable prescriptions={prescriptions} />
//       </main>
//     </div>
//   );
// };

// const NavItem = ({ icon, label }) => (
//   <div className="flex items-center space-x-3 text-gray-700 hover:text-green-600 cursor-pointer transition">
//     {icon}
//     <span className="font-medium">{label}</span>
//   </div>
// );

// const StatCard = ({ label, value }) => (
//   <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
//     <p className="text-gray-500 text-sm mb-1">{label}</p>
//     <p className="text-2xl font-bold text-green-700">{value}</p>
//   </div>
// );

// export default Dashboard;


import { useEffect, useState } from "react";
import API from "../../services/api";
import DoctorList from "../../components/HospitalAdmin/DoctorList";
import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
import PatientList from "../../components/HospitalAdmin/PatientList";
import PrescriptionTable from "../../components/HospitalAdmin/PrescriptionTable";
import HospitalProfile from "../../components/HospitalAdmin/HospitalProfile";
import { getHospitalStats, getHospitalPrescriptions } from "../../services/hospitalService";
import { LayoutDashboard, Users, FileText, Settings, UserPlus } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDoctorForm, setShowDoctorForm] = useState(false);

  const hospitalId = localStorage.getItem("hospitalId");

  useEffect(() => {
    const fetchAllData = async () => {
      if (!hospitalId) {
        console.error("❌ Missing hospitalId");
        setLoading(false);
        return;
      }

      try {
        const statsResp = await getHospitalStats(hospitalId);
        setStats(statsResp.data);

        const prescResp = await getHospitalPrescriptions(hospitalId);
        const prescData = Array.isArray(prescResp.data) ? prescResp.data : prescResp.data?.items || [];
        setPrescriptions(prescData);
      } catch (err) {
        console.error("❌ Error fetching hospital data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [hospitalId]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-screen text-red-600">❌ Failed to load stats.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 rounded-r-2xl">
        <h2 className="text-2xl font-extrabold text-green-700 mb-10">SwasthyaChinha</h2>
        <nav className="space-y-6">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<UserPlus size={20} />} label="Doctors" />
          <NavItem icon={<FileText size={20} />} label="Prescriptions Audit" />
          <NavItem icon={<Users size={20} />} label="Patients" />
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        {/* Hospital Profile */}
        <HospitalProfile stats={stats} onUpdated={setStats} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard label="Total Doctors" value={stats.totalDoctors} />
          <StatCard label="Total Prescriptions Issued" value={stats.totalPrescriptionsIssued} />
          <StatCard label="Prescriptions Verified Today" value={stats.prescriptionsVerifiedToday} />
          <StatCard label="Active Prescriptions" value={stats.activePrescriptions} />
          <StatCard label="QR Codes Generated Today" value={stats.qrCodesGeneratedToday} />

          {/* Add Doctor Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="font-semibold text-lg mb-3">Register Doctor</h2>
              <button
                onClick={() => setShowDoctorForm(!showDoctorForm)}
                className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
              >
                {showDoctorForm ? "Close Form" : "Add Doctor"}
              </button>
              {showDoctorForm && (
                <div className="mt-4">
                  <DoctorForm hospitalId={hospitalId} onSuccess={() => setShowDoctorForm(false)} />
                </div>
              )}
            </div>
          </div>

          {/* Prescription Graph Placeholder */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
              <h2 className="font-semibold text-lg mb-3">Weekly Prescription Graph</h2>
              <div className="flex-1 bg-gradient-to-r from-green-200 to-green-100 rounded-xl flex items-center justify-center text-gray-500">
                📊 Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Doctor & Patient Management */}
        <DoctorList />
        <PatientList />

        {/* Prescription Table */}
        <PrescriptionTable prescriptions={prescriptions} />
      </main>
    </div>
  );
};

const NavItem = ({ icon, label }) => (
  <div className="flex items-center space-x-3 text-gray-700 hover:text-green-600 cursor-pointer transition">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-green-700">{value}</p>
  </div>
);

export default Dashboard;
