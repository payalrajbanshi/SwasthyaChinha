import { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/dashboard/Sidebar"; // ✅ use the proper Sidebar
import DoctorList from "../../components/HospitalAdmin/DoctorList";
import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
import PatientList from "../../components/HospitalAdmin/PatientList";
import PrescriptionTable from "../../components/HospitalAdmin/PrescriptionTable";
import HospitalProfile from "../../components/HospitalAdmin/HospitalProfile";
import { getHospitalStats, getHospitalPrescriptions } from "../../services/hospitalService";

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

  if (loading) return <div className="flex items-center justify-center h-screen">⏳ Loading...</div>;
  if (!stats) return <div className="flex items-center justify-center h-screen text-red-600">❌ Failed to load stats.</div>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* ✅ Use your reusable Sidebar component */}
      <Sidebar hospital={stats} />

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

const StatCard = ({ label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition text-center">
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p className="text-2xl font-bold text-green-700">{value}</p>
  </div>
);

export default Dashboard;
