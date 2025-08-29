// import React from "react";
// import MedicineList from "../components/Patient/MedicineList";
// import QRCodeDisplay from "../components/Patient/QRCodeDisplay";

// export default function PrescriptionDetail({ prescription }) {
//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <header className="mb-4">
//         <h1 className="text-xl font-bold">Prescription</h1>
//         <p>Doctor: {prescription.doctorName}</p>
//         <p>Hospital: {prescription.hospitalName}</p>
//         <p>Date Issued: {new Date(prescription.dateIssued).toLocaleDateString()}</p>
//       </header>

//       <section className="mb-4">
//         <h2 className="font-semibold mb-2">Medicines</h2>
//         <MedicineList medicines={prescription.items} />
//       </section>

//       <section className="mb-4">
//         <h2 className="font-semibold mb-2">Doctor Notes</h2>
//         <p>{prescription.notes || "No additional notes"}</p>
//       </section>

//       <footer className="flex justify-end mt-6">
//         <QRCodeDisplay qrData={prescription.qrCode} />
//       </footer>
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
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../../services/api";

// export default function PrescriptionDetail() {
//   const { id } = useParams();
//   const [prescription, setPrescription] = useState(null);

//   useEffect(() => {
//     const fetchPrescription = async () => {
//       try {
//         const res = await API.get(`/prescription/${id}`);
//         setPrescription(res.data);
//       } catch (err) {
//         console.error("Error fetching prescription:", err);
//       }
//     };
//     fetchPrescription();
//   }, [id]);

//   if (!prescription) return <p className="p-6">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
//       <p><strong>Doctor:</strong> {prescription.doctorName}</p>
//       <p><strong>Hospital:</strong> {prescription.hospitalName}</p>
//       <p><strong>Date:</strong> {new Date(prescription.createdAt).toLocaleString()}</p>
//       <h3 className="font-semibold mt-4">Medicines:</h3>
//       <ul className="list-disc ml-6">
//         {prescription.items?.map((item, idx) => (
//           <li key={idx}>
//             {item.medicineName} – {item.dosage}
//           </li>
//         ))}
//       </ul>
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


import React from "react";
import QRCode from "react-qr-code";

export default function PrescriptionDetail({ prescription }) {
  if (!prescription) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      {/* Hospital Info */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-2xl uppercase">{prescription.hospitalName}</h1>
        <p className="text-sm text-gray-600">{prescription.hospitalAddress}</p>
      </div>

      {/* Patient + Doctor Info */}
      <div className="flex justify-between mb-6">
        <div>
          <p className="font-semibold text-sm">Patient Name</p>
          <p>{prescription.patientName}</p>
          <p className="font-semibold text-sm mt-2">Age</p>
          <p>{prescription.patientAge}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{prescription.doctorName}, MD</p>
          <p className="text-sm">{prescription.doctorSpecialty}</p>
        </div>
      </div>
      {/* Diagnosis */}
{prescription.diagnosis && (
  <div className="mb-6">
    <p className="font-semibold text-sm">Diagnosis</p>
    <p className="italic text-lg">{prescription.diagnosis}</p>
  </div>
)}


      {/* Medicines */}
      <div className="mb-6 text-lg italic space-y-2">
        {prescription.medicines?.map((m, i) => (
          <p key={i}>
            {m.name} {m.dosage} – {m.instructions || "as directed"}
          </p>
        ))}
      </div>

      {/* Signature + QR */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="italic">{prescription.doctorName}, MD</p>
          <div className="border-t border-black w-40 mt-1"></div>
          <p className="text-xs">Signature</p>
        </div>
        <QRCode value={JSON.stringify(prescription)} style={{ width: 80, height: 80 }} />
      </div>
    </div>
  );
}
