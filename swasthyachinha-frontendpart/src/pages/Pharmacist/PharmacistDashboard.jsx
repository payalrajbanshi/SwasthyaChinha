// import { useState } from "react";
// import { getPrescriptionByQR, dispenseMedicine } from "../../services/pharmacistService";

// export default function PharmacistDashboard() {
//   const [qr, setQr] = useState("");
//   const [prescription, setPrescription] = useState(null);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   const handleSearch = async () => {
//     try {
//       const data = await getPrescriptionByQR(qr, token);
//       setPrescription(data);
//       setError("");
//     } catch (err) {
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   const handleDispense = async () => {
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch {
//       setError("Failed to dispense");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           placeholder="Enter QR code"
//           value={qr}
//           onChange={(e) => setQr(e.target.value)}
//           className="border p-2 rounded"
//         />
//         <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {prescription && (
//         <div className="border p-4 rounded shadow">
//           <h2 className="font-bold">Prescription Details</h2>
//           <p>Patient: {prescription.patientName}</p>
//           <p>Doctor: {prescription.doctorName}</p>
//           <p>Hospital: {prescription.hospitalName}</p>

//           <h3 className="mt-2 font-semibold">Medicines</h3>
//           <ul className="list-disc pl-5">
//             {prescription.medicines.map((m, i) => (
//               <li key={i}>
//                 {m.name} - {m.dosage} - Rs.{m.price}
//               </li>
//             ))}
//           </ul>

//           <p className="mt-2">Status: {prescription.isDispensed ? "Dispensed" : "Pending"}</p>

//           {!prescription.isDispensed && (
//             <button
//               onClick={handleDispense}
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Mark as Dispensed
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState } from "react";
// import { getPrescriptionByQR, dispenseMedicine } from "../../services/pharmacistService";
// import QRScanner from "../../components/pharmacist/QRScanner";

// export default function PharmacistDashboard() {
//   const [qr, setQr] = useState("");
//   const [prescription, setPrescription] = useState(null);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   const fetchPrescription = async (qrCode) => {
//     try {
//       const data = await getPrescriptionByQR(qrCode, token);
//       setPrescription(data);
//       setError("");
//     } catch (err) {
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   const handleDispense = async () => {
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch {
//       setError("Failed to dispense");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* QR Scanner */}
//       <QRScanner onScan={(qrCode) => {
//         setQr(qrCode);
//         fetchPrescription(qrCode);
//       }} />

//       <div className="flex gap-2 my-4">
//         <input
//           type="text"
//           placeholder="Enter QR code manually"
//           value={qr}
//           onChange={(e) => setQr(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button
//           onClick={() => fetchPrescription(qr)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search
//         </button>
//       </div>

//       {error && <p className="text-red-500">{error}</p>}

//       {prescription && (
//         <div className="border p-4 rounded shadow">
//           <h2 className="font-bold">Prescription Details</h2>
//           <p>Patient: {prescription.patientName}</p>
//           <p>Doctor: {prescription.doctorName}</p>
//           <p>Hospital: {prescription.hospitalName}</p>

//           <h3 className="mt-2 font-semibold">Medicines</h3>
//           <ul className="list-disc pl-5">
//             {prescription.medicines.map((m, i) => (
//               <li key={i}>
//                 {m.name} - {m.dosage} - Rs.{m.price}
//               </li>
//             ))}
//           </ul>

//           <p className="mt-2">Status: {prescription.isDispensed ? "✅ Dispensed" : "⏳ Pending"}</p>

//           {!prescription.isDispensed && (
//             <button
//               onClick={handleDispense}
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Mark as Dispensed
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { getPrescriptionByQR, dispenseMedicine } from "../../services/pharmacistService";
import QRScanner from "../../components/pharmacist/QRScanner";

export default function PharmacistDashboard() {
  const [qr, setQr] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchPrescription = async (qrCode) => {
    try {
      const data = await getPrescriptionByQR(qrCode, token);
      setPrescription(data);
      setError("");
    } catch (err) {
      setError("Prescription not found");
      setPrescription(null);
    }
  };

  const handleDispense = async () => {
    try {
      await dispenseMedicine(prescription.prescriptionId, token);
      setPrescription({ ...prescription, isDispensed: true });
    } catch {
      setError("Failed to dispense");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

      {/* QR Scanner */}
      <QRScanner
        onScan={(qrCode) => {
          setQr(qrCode);
          fetchPrescription(qrCode);
        }}
      />

      {/* Manual QR input */}
      <div className="flex gap-2 my-4">
        <input
          type="text"
          placeholder="Enter QR code manually"
          value={qr}
          onChange={(e) => setQr(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => fetchPrescription(qr)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Prescription details */}
      {prescription && (
        <div className="border p-4 rounded shadow-md bg-white">
          <h2 className="font-bold text-lg mb-2">Prescription Details</h2>
          <p><strong>Patient:</strong> {prescription.patientName}</p>
          <p><strong>Doctor:</strong> {prescription.doctorName}</p>
          <p><strong>Hospital:</strong> {prescription.hospitalName}</p>

          <h3 className="mt-2 font-semibold">Medicines</h3>
          <ul className="list-disc pl-5">
            {prescription.medicines.map((m, i) => (
              <li key={i}>
                {m.name} - {m.dosage} - Rs.{m.price}
              </li>
            ))}
          </ul>

          <p className="mt-2"><strong>Status:</strong> {prescription.isDispensed ? "✅ Dispensed" : "⏳ Pending"}</p>

          {!prescription.isDispensed && (
            <button
              onClick={handleDispense}
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
              Mark as Dispensed
            </button>
          )}
        </div>
      )}
    </div>
  );
}
