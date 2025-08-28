import React, { useEffect, useState } from "react";
import { getPrescriptions } from "../../services/api";
import PrescriptionCard from "../../components/Patient/PrescriptionCard";

export default function PrescriptionHistory() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await getPrescriptions();
        setPrescriptions(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrescriptions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Prescription History</h1>
      {prescriptions.length > 0 ? prescriptions.map(p => (
        <PrescriptionCard key={p.prescriptionId} prescription={p} />
      )) : <p>No prescriptions found.</p>}
    </div>
  );
}
