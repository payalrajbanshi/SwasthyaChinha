
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
      {/* Sidebar */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Last Visit</th>
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
                  <td colSpan="4" className="text-center py-6 text-gray-400">No patients found</td>
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
