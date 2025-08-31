import HospitalProfile from "../../components/HospitalAdmin/HospitalProfile";
import { useEffect, useState } from "react";
import { getHospitalStats } from "../../services/hospitalService";

const SettingsPage = () => {
  const [stats, setStats] = useState(null);
  const hospitalId = localStorage.getItem("hospitalId");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await getHospitalStats(hospitalId);
        setStats(data);
      } catch (err) {
        console.error("❌ Failed to fetch hospital stats:", err);
      }
    };
    if (hospitalId) fetchStats();
  }, [hospitalId]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Hospital Settings</h1>
      {stats ? <HospitalProfile stats={stats} /> : <p>⏳ Loading...</p>}
    </div>
  );
};

export default SettingsPage;
