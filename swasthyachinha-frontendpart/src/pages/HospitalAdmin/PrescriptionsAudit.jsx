import { useEffect, useState } from "react";
import { getHospitalPrescriptions } from "../../services/hospitalService";
import PrescriptionTable from "../../components/HospitalAdmin/PrescriptionTable";

const PrescriptionAudit = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const hospitalId = localStorage.getItem("hospitalId");

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const { data } = await getHospitalPrescriptions(hospitalId);
        setPrescriptions(data);
      } catch (err) {
        console.error("❌ Failed to fetch prescriptions:", err);
      } finally {
        setLoading(false);
      }
    };
    if (hospitalId) fetchPrescriptions();
  }, [hospitalId]);

  if (loading) return <div className="flex items-center justify-center h-screen">⏳ Loading prescriptions...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Prescription Audit</h1>
      <PrescriptionTable prescriptions={prescriptions} />
    </div>
  );
};

export default PrescriptionAudit;
