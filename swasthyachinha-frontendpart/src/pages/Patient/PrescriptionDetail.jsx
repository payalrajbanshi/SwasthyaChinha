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


// import React from "react";
// import QRCode from "react-qr-code";

// export default function PrescriptionDetail({ prescription }) {
//   if (!prescription) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
//       {/* Hospital Info */}
//       <div className="text-center mb-6">
//         <h1 className="font-bold text-2xl uppercase">{prescription.hospitalName}</h1>
//         <p className="text-sm text-gray-600">{prescription.hospitalAddress}</p>
//       </div>

//       {/* Patient + Doctor Info */}
//       <div className="flex justify-between mb-6">
//         <div>
//           <p className="font-semibold text-sm">Patient Name</p>
//           <p>{prescription.patientName}</p>
//           <p className="font-semibold text-sm mt-2">Age</p>
//           <p>{prescription.patientAge}</p>
//         </div>
//         <div className="text-right">
//           <p className="font-semibold">{prescription.doctorName}, MD</p>
//           <p className="text-sm">{prescription.doctorSpecialty}</p>
//         </div>
//       </div>
//       {/* Diagnosis */}
// {prescription.diagnosis && (
//   <div className="mb-6">
//     <p className="font-semibold text-sm">Diagnosis</p>
//     <p className="italic text-lg">{prescription.diagnosis}</p>
//   </div>
// )}


//       {/* Medicines */}
//       <div className="mb-6 text-lg italic space-y-2">
//         {prescription.medicines?.map((m, i) => (
//           <p key={i}>
//             {m.name} {m.dosage} – {m.instructions || "as directed"}
//           </p>
//         ))}
//       </div>

//       {/* Signature + QR */}
//       <div className="flex justify-between items-center mt-6">
//         <div>
//           <p className="italic">{prescription.doctorName}, MD</p>
//           <div className="border-t border-black w-40 mt-1"></div>
//           <p className="text-xs">Signature</p>
//         </div>
//         <QRCode value={JSON.stringify(prescription)} style={{ width: 80, height: 80 }} />
//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import QRCode from "react-qr-code";

// export default function PrescriptionDetail({ prescription }) {
//   const [manualId, setManualId] = useState("");

//   if (!prescription) return <p>Loading...</p>;

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
//       {/* Hospital Info */}
//       <div className="text-center mb-6">
//         <h1 className="font-bold text-2xl uppercase">{prescription.hospitalName}</h1>
//         <p className="text-sm text-gray-600">{prescription.hospitalAddress}</p>
//       </div>

//       {/* Patient + Doctor Info */}
//       <div className="flex justify-between mb-6">
//         <div>
//           <p className="font-semibold text-sm">Patient Name</p>
//           <p>{prescription.patientName}</p>
//           <p className="font-semibold text-sm mt-2">Age</p>
//           <p>{prescription.patientAge}</p>
//         </div>
//         <div className="text-right">
//           <p className="font-semibold">{prescription.doctorName}, MD</p>
//           <p className="text-sm">{prescription.doctorSpecialty}</p>
//         </div>
//       </div>

//       {/* Diagnosis */}
//       {prescription.diagnosis && (
//         <div className="mb-6">
//           <p className="font-semibold text-sm">Diagnosis</p>
//           <p className="italic text-lg">{prescription.diagnosis}</p>
//         </div>
//       )}

//       {/* Medicines */}
//       <div className="mb-6 text-lg italic space-y-2">
//         {prescription.medicines?.map((m, i) => (
//           <p key={i}>
//             {m.name} {m.dosage} – {m.instructions || "as directed"}
//           </p>
//         ))}
//       </div>

//       {/* Signature + QR */}
//       <div className="flex justify-between items-center mt-6">
//         <div>
//           <p className="italic">{prescription.doctorName}, MD</p>
//           <div className="border-t border-black w-40 mt-1"></div>
//           <p className="text-xs">Signature</p>
//         </div>
//         <div className="flex flex-col items-center">
//           {/* <QRCode value={JSON.stringify(prescription)} style={{ width: 80, height: 80 }} /> */}
//           <QRCode value={prescription.qrCodeData} style={{ width: 80, height: 80 }} />
//           <p className="text-sm mt-1 text-gray-700">Prescription ID: {prescription.qrCodeData}</p>

//           <p className="text-xs text-gray-600 mt-2">Or enter Prescription ID manually:</p>
//           <input
//             type="text"
//             placeholder="Prescription ID"
//             value={manualId}
//             onChange={(e) => setManualId(e.target.value)}
//             className="border rounded px-2 py-1 mt-1 w-36 text-sm text-center"
//           />
//              <button
//       onClick={() => fetchPrescription(manualId)}
//       className="bg-blue-500 text-white px-2 py-1 mt-1 rounded text-xs"
//     >
//       Fetch
//     </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import QRCode from "react-qr-code";

// export default function PrescriptionDetail({ prescription: initialPrescription }) {
//   const [prescription, setPrescription] = useState(initialPrescription);
//   const [manualId, setManualId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   const fetchPrescription = async (id) => {
//     if (!id) return;
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`/api/pharmacist/prescription/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Prescription not found");
//       const data = await res.json();
//       setPrescription(data);
//     } catch (err) {
//       setError(err.message);
//       setPrescription(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!prescription && !loading) return <p className="p-4">No prescription selected.</p>;

//   return (
//     <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
//       {loading && <p className="text-blue-500">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {prescription && (
//         <>
//           {/* Hospital Info */}
//           <div className="text-center mb-6">
//             <h1 className="font-bold text-2xl uppercase">{prescription.hospitalName}</h1>
//             <p className="text-sm text-gray-600">{prescription.hospitalAddress}</p>
//           </div>

//           {/* Patient + Doctor Info */}
//           <div className="flex justify-between mb-6">
//             <div>
//               <p className="font-semibold text-sm">Patient Name</p>
//               <p>{prescription.patientName}</p>
//               <p className="font-semibold text-sm mt-2">Age</p>
//               <p>{prescription.patientAge}</p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold">{prescription.doctorName}, MD</p>
//               <p className="text-sm">{prescription.doctorSpecialty}</p>
//             </div>
//           </div>

//           {/* Diagnosis */}
//           {prescription.diagnosis && (
//             <div className="mb-6">
//               <p className="font-semibold text-sm">Diagnosis</p>
//               <p className="italic text-lg">{prescription.diagnosis}</p>
//             </div>
//           )}

//           {/* Medicines */}
//           <div className="mb-6 text-lg italic space-y-2">
//             {prescription.medicines?.map((m, i) => (
//               <p key={i}>
//                 {m.name} {m.dosage} – {m.instructions || "as directed"}
//               </p>
//             ))}
//           </div>

//           {/* Signature + QR */}
//           <div className="flex justify-between items-center mt-6">
//             <div>
//               <p className="italic">{prescription.doctorName}, MD</p>
//               <div className="border-t border-black w-40 mt-1"></div>
//               <p className="text-xs">Signature</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <QRCode value={prescription.qrCodeData} style={{ width: 80, height: 80 }} />
//               <p className="text-sm mt-1 text-gray-700">
//                 Prescription ID: {prescription.qrCodeData}
//               </p>

//               <p className="text-xs text-gray-600 mt-2">Or enter Prescription ID manually:</p>
//               <div className="flex gap-1 mt-1">
//                 <input
//                   type="text"
//                   placeholder="Prescription ID"
//                   value={manualId}
//                   onChange={(e) => setManualId(e.target.value)}
//                   className="border rounded px-2 py-1 w-36 text-sm text-center"
//                 />
//                 <button
//                   onClick={() => fetchPrescription(manualId)}
//                   className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
//                 >
//                   Fetch
//                 </button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import QRCode from "react-qr-code";

export default function PrescriptionDetail({ prescription: initialPrescription }) {
  const [prescription, setPrescription] = useState(initialPrescription);
  const [manualId, setManualId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchPrescription = async (id) => {
    if (!id.trim()) return; // Prevent empty fetch
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/pharmacist/prescription/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Prescription not found");
      const data = await res.json();
      setPrescription(data);
    } catch (err) {
      setError(err.message);
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  if (!prescription && !loading) return <p className="p-4">No prescription selected.</p>;

  // Determine QR code value (new vs old prescriptions)
  const qrValue = prescription?.qrCodeData || prescription?.QRCode || "N/A";

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      {loading && <p className="text-blue-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {prescription && (
        <>
          {/* Hospital Info */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl uppercase">{prescription.hospitalName || "Unknown Hospital"}</h1>
            <p className="text-sm text-gray-600">{prescription.hospitalAddress || "-"}</p>
          </div>

          {/* Patient + Doctor Info */}
          <div className="flex justify-between mb-6">
            <div>
              <p className="font-semibold text-sm">Patient Name</p>
              <p>{prescription.patientName || "Unknown"}</p>
              <p className="font-semibold text-sm mt-2">Age</p>
              <p>{prescription.patientAge || "-"}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{prescription.doctorName || "Unknown"}, MD</p>
              <p className="text-sm">{prescription.doctorSpecialty || "-"}</p>
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
            {prescription.medicines?.length > 0 ? (
              prescription.medicines.map((m, i) => (
                <p key={i}>
                  {m.name} {m.dosage} – {m.instructions || "as directed"}
                </p>
              ))
            ) : (
              <p>No medicines prescribed.</p>
            )}
          </div>

          {/* Signature + QR */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="italic">{prescription.doctorName || "Unknown"}, MD</p>
              <div className="border-t border-black w-40 mt-1"></div>
              <p className="text-xs">Signature</p>
            </div>
            <div className="flex flex-col items-center">
              <QRCode value={qrValue} style={{ width: 80, height: 80 }} />
              <p className="text-sm mt-1 text-gray-700">Prescription ID: {qrValue}</p>

              <p className="text-xs text-gray-600 mt-2">Or enter Prescription ID manually:</p>
              <div className="flex gap-1 mt-1">
                <input
                  type="text"
                  placeholder="Prescription ID"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="border rounded px-2 py-1 w-36 text-sm text-center"
                />
                <button
                  onClick={() => fetchPrescription(manualId)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
