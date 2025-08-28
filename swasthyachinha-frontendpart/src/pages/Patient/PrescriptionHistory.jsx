// import React, { useEffect, useState } from "react";
// import { getPrescriptions } from "../../services/api";
// import PrescriptionCard from "../../components/Patient/PrescriptionCard";

// export default function PrescriptionHistory() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPrescriptions = async () => {
//       try {
//         const res = await getPrescriptions();
//         setPrescriptions(res.data || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPrescriptions();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Prescription History</h1>
//       {prescriptions.length > 0 ? prescriptions.map(p => (
//         <PrescriptionCard key={p.prescriptionId} prescription={p} />
//       )) : <p>No prescriptions found.</p>}
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function PrescriptionCard({ prescription }) {
  return (
    <div className="border rounded-lg p-4 shadow mb-4 bg-white">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{prescription.doctorName}, MD</p>
          <p className="text-sm text-gray-500">{prescription.doctorSpecialty}</p>
          <p className="text-xs text-gray-400">
            {new Date(prescription.dateIssued).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/patient/prescription/${prescription.prescriptionId}`}
          className="text-green-600 underline"
        >
          View
        </Link>
      </div>
      <div className="mt-2 text-sm italic text-gray-700">
        {prescription.medicines?.slice(0, 2).map((m, i) => (
          <p key={i}>{m.name} {m.dosage}</p>
        ))}
        {prescription.medicines?.length > 2 && <p>...more</p>}
      </div>
    </div>
  );
}
