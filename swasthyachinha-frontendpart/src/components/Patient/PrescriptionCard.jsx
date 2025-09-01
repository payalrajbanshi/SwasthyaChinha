// import React from "react";
// import { Link } from "react-router-dom";

// export default function PrescriptionCard({ prescription }) {
//   return (
//     <div className="border-b border-gray-200 py-2 flex justify-between">
//       <div>
//         <p className="font-medium">{prescription.doctorName}</p>
//         <p className="text-sm text-gray-500">{new Date(prescription.dateIssued).toLocaleDateString()}</p>
//       </div>
//       <Link
//         to={`/patient/prescription/${prescription.prescriptionId}`}
//         className="text-green-600 underline"
//       >
//         View
//       </Link>
//     </div>
//   );
// }
// import React from "react";
// import MedicineList from "../../components/Patient/MedicineList";
// import QRCodeDisplay from "../../components/Patient/QRCodeDisplay";

// export default function PrescriptionDetail({ prescription }) {
//   if (!prescription) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-4">
//       <h1 className="text-2xl font-bold mb-4">Digital Prescription</h1>
//       <p><strong>Doctor:</strong> {prescription.doctorName}</p>
//       <p><strong>Hospital:</strong> {prescription.hospitalName}</p>
//       <p><strong>Date:</strong> {new Date(prescription.dateIssued).toLocaleDateString()}</p>

//       <MedicineList medicines={prescription.medicines} />

//       <div className="flex justify-end mt-4">
//         <QRCodeDisplay value={prescription.id} />
//       </div>
//     </div>
//   );
// }
// import React from "react";
// import { Link } from "react-router-dom";

// export default function PrescriptionCard({ prescription }) {
//   return (
//     <div className="border-b border-gray-200 py-2 flex justify-between">
//       <div>
//         <p className="font-medium">{prescription.doctorName}</p>
//         <p className="text-sm text-gray-500">{new Date(prescription.dateIssued).toLocaleDateString()}</p>
//       </div>
//       <Link to={`/patient/prescription/${prescription.prescriptionId}`} className="text-green-600 underline">
//         View
//       </Link>
//     </div>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";

export default function PrescriptionCard({ prescription }) {
  return (
    <div className="border-b border-gray-200 py-2 flex justify-between">
      <div>
        {/* Doctor Name */}
        <p className="font-medium">{prescription.doctorName}</p>

        {/* Doctor Specialty */}
        {prescription.specialty && (
          <p className="text-sm text-gray-500">{prescription.specialty}</p>
        )}

        {/* Diagnosis */}
        {prescription.diagnosis && (
          <p className="text-sm text-gray-700 mt-1">{prescription.diagnosis}</p>
        )}

        {/* Date Issued */}
        <p className="text-sm text-gray-500">
          {new Date(prescription.dateIssued).toLocaleDateString()}
        </p>

        {/* Medicines List */}
        {prescription.medicines?.map((med, idx) => (
          <p key={idx} className="text-sm text-gray-700">
            {med.name} - {med.dosage}
          </p>
        ))}
      </div>

      <Link
        to={`/patient/prescription/${prescription.prescriptionId}`}
        className="text-green-600 underline"
      >
        View
      </Link>
    </div>
  );
}
