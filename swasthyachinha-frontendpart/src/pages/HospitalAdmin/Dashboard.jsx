import { useEffect, useState } from "react";
// import axios from "axios";
import API from "../../services/api";
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

  const hospitalId = localStorage.getItem("hospitalId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      if (!token || !hospitalId) {
        console.error(" Missing token or hospitalId");
        setLoading(false);
        return;
      }

      try {
        // const response = await axios.get(
        //   `http://localhost:5099/api/Hospital/stats?hospitalId=${hospitalId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const response = await API.get(`/Hospital/stats?hospitalId=${hospitalId}`);
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
            <h1 className="text-3xl font-bold">{stats.HospitalName}</h1>
            <p className="text-gray-600">{stats.Address}</p>
            <img src={stats.LogoUrl} alt="Hospital Logo" />
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
