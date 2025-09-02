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
// import { useState, useEffect } from "react";
// import { getPrescriptionByQR, dispenseMedicine, getPharmacistProfile } from "../../services/pharmacistService";
// import QRScanner from "../../components/pharmacist/QRScanner";
// import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
// import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";

// export default function PharmacistDashboard() {
//   const [qr, setQr] = useState("");
//   const [pharmacist, setPharmacist] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//    useEffect(() => {
//   //const token = localStorage.getItem("token");
//   if (!token) return;
//   const fetchProfile = async () => {
//     try {
//       const res = await getPharmacistProfile(token);
//       setPharmacist(res);
//     } catch (err) {
//       console.log("Failed to fetch pharmacist profile", err);
//       setError("Failed to load profile. Please login again.");
//     }
//   };
//   fetchProfile();
// }, [token]);

//   const fetchPrescription = async (qrCode) => {
//     if (!qrCode) return;
//     try {
//       const data = await getPrescriptionByQR(qrCode.trim(), token);
//       setPrescription(data);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   const handleDispense = async () => {
//     if (!prescription) return;
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch (err){
//       console.error(err);
//       setError("Failed to dispense");
//     }
//   };

 
//   return (
//     <div className="p-4 space-y-6">
//       {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* QR Scanner */}
//       <QRScanner
//         onScan={(qrCode) => {
//           const trimmedQr = qrCode.trim();
//           setQr(trimmedQr);
//           fetchPrescription(trimmedQr);
//           //setQr(qrCode);
//           //fetchPrescription(qrCode);
//         }}
//       />

//       {/* Manual QR input */}
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

//       {/* Error */}
//       {error && <p className="text-red-500">{error}</p>}
//             {/* Prescription Details */}
//       {prescription && (
//         <PrescriptionCard
//           prescription={prescription}
//           onDispense={handleDispense}
//         />
//       )}

//       {/* Prescription details */}
//       {prescription && (
//         <div className="border p-4 rounded shadow-md bg-white">
//           <h2 className="font-bold text-lg mb-2">Prescription Details</h2>
//           <p><strong>Patient:</strong> {prescription.patientName}</p>
//           <p><strong>Doctor:</strong> {prescription.doctorName}</p>
//           <p><strong>Hospital:</strong> {prescription.hospitalName}</p>

//           <h3 className="mt-2 font-semibold">Medicines</h3>
//           <ul className="list-disc pl-5">
//             {prescription.medicines.map((m, i) => (
//               <li key={i}>
//                 {m.name} - {m.dosage} - Rs.{m.price}
//               </li>
//             ))}
//           </ul>

//           <p className="mt-2"><strong>Status:</strong> {prescription.isDispensed ? "✅ Dispensed" : "⏳ Pending"}</p>

//           {!prescription.isDispensed && (
//             <button
//               onClick={handleDispense}
//               className="mt-3 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//             >
//               Mark as Dispensed
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import { getPrescriptionByQR, dispenseMedicine, getPharmacistProfile } from "../../services/pharmacistService";
// import QRScanner from "../../components/pharmacist/QRScanner";
// import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
// import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";

// export default function PharmacistDashboard() {
//   const [pharmacist, setPharmacist] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   // Load pharmacist profile
//   useEffect(() => {
//     if (!token) return;
//     const fetchProfile = async () => {
//       try {
//         const res = await getPharmacistProfile(token);
//         setPharmacist(res);
//       } catch (err) {
//         console.log("Failed to fetch profile", err);
//         setError("Failed to load profile. Please login again.");
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   // Fetch prescription by QR automatically
//   const fetchPrescription = async (qrCode) => {
//     if (!qrCode) return;
//     try {
//       const data = await getPrescriptionByQR(qrCode.trim(), token);
//       setPrescription(data);
//       setError("");
//     } catch (err) {
//       console.error(err);
//       setError("Prescription not found or invalid QR code");
//       setPrescription(null);
//     }
//   };

//   // Mark as dispensed
//   const handleDispense = async () => {
//     if (!prescription) return;
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to dispense medicine");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}

//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* QR Scanner */}
//       <QRScanner onScan={fetchPrescription} />

//       {/* Prescription Details */}
//       {error && <p className="text-red-500">{error}</p>}
//       {prescription && (
//         <PrescriptionCard
//           prescription={prescription}
//           onDispense={handleDispense}
//         />
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import QRScanner from "../../components/pharmacist/QRScanner";
// import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
// import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";
// import { getPrescriptionByQR, dispenseMedicine, getPharmacistProfile } from "../../services/pharmacistService";

// export default function PharmacistDashboard() {
//   const [pharmacist, setPharmacist] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [qr, setQr] = useState("");
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   // Load pharmacist profile
//   useEffect(() => {
//     if (!token) return;
//     getPharmacistProfile(token)
//       .then(setPharmacist)
//       .catch(() => setError("Failed to load profile"));
//   }, [token]);

//   // Fetch prescription by QR code
//   const fetchPrescription = async (qrCode) => {
//     if (!qrCode) return;
//     try {
//       const data = await getPrescriptionByQR(qrCode.trim(), token);
//       setPrescription(data);
//       setError("");
//     } catch {
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   // Dispense medicine
//   const handleDispense = async () => {
//     if (!prescription) return;
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch {
//       setError("Failed to dispense");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* QR Scanner */}
//       <QRScanner
//         onScan={(scannedQr) => {
//           setQr(scannedQr);
//           fetchPrescription(scannedQr);
//         }}
//       />

//       {/* Manual input */}
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

//       {/* Error message */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Prescription card */}
//       {prescription && (
//         <PrescriptionCard
//           prescription={prescription}
//           onDispense={!prescription.isDispensed ? handleDispense : null}
//         />
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import QRScanner from "../../components/pharmacist/QRScanner";
// import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
// import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";
// import {
//   getPrescriptionByQR,
//   dispenseMedicine,
//   getPharmacistProfile,
// } from "../../services/pharmacistService";

// export default function PharmacistDashboard() {
//   const [pharmacist, setPharmacist] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [qr, setQr] = useState("");
//   const [inputQr, setInputQr] = useState("");
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   // Load pharmacist profile
//   useEffect(() => {
//     if (!token) return;
//     getPharmacistProfile(token)
//       .then(setPharmacist)
//       .catch(() => setError("Failed to load profile"));
//   }, [token]);

//   // Unified function to fetch prescription
//   const handleFetch = async (qrCode) => {
//     if (!qrCode) return;
//     try {
//       const data = await getPrescriptionByQR(qrCode.trim(), token);
//       setPrescription(data);
//       setError("");
//     } catch {
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   // Dispense medicine
//   const handleDispense = async () => {
//     if (!prescription) return;
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch {
//       setError("Failed to dispense");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* QR Scanner */}
//       <QRScanner
//         onScan={(scannedQr) => {
//           setQr(scannedQr);
//           handleFetch(scannedQr);
//         }}
//       />

//       {/* Manual input */}
//       <div className="flex gap-2 my-4">
//         <input
//           type="text"
//           placeholder="Enter QR code manually"
//           value={inputQr}
//           onChange={(e) => setInputQr(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button
//           onClick={() => handleFetch(inputQr)}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search Prescription
//         </button>
//       </div>

//       {/* Error message */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Prescription card */}
//       {prescription && (
//         <PrescriptionCard
//           prescription={prescription}
//           onDispense={!prescription.isDispensed ? handleDispense : null}
//         />
//       )}
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
// import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";
// import {
//   getPrescriptionByQR,
//   dispenseMedicine,
//   getPharmacistProfile,
// } from "../../services/pharmacistService";

// export default function PharmacistDashboard() {
//   const [pharmacist, setPharmacist] = useState(null);
//   const [prescription, setPrescription] = useState(null);
//   const [qrCodeData, setQrCodeData] = useState(""); // manual QRCodeData entry
//   const [error, setError] = useState("");
//   const token = localStorage.getItem("token");

//   // Load pharmacist profile
//   useEffect(() => {
//     if (!token) return;
//     getPharmacistProfile(token)
//       .then(setPharmacist)
//       .catch(() => setError("Failed to load profile"));
//   }, [token]);

//   // Fetch prescription by QRCodeData
//   const handleFetch = async () => {
//     if (!qrCodeData.trim()) return;
//     try {
//       const data = await getPrescriptionByQR(qrCodeData.trim(), token);
//       setPrescription(data);
//       setError("");
//     } catch {
//       setError("Prescription not found");
//       setPrescription(null);
//     }
//   };

//   // Dispense medicine
//   const handleDispense = async () => {
//     if (!prescription) return;
//     try {
//       await dispenseMedicine(prescription.prescriptionId, token);
//       setPrescription({ ...prescription, isDispensed: true });
//     } catch {
//       setError("Failed to dispense");
//     }
//   };

//   return (
//     <div className="p-4 space-y-6">
//       {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}
//       <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

//       {/* Manual QRCodeData input only */}
//       <div className="flex gap-2 my-4">
//         <input
//           type="text"
//           placeholder="Enter QRCodeData (e.g., PRESC-XXXX)"
//           value={qrCodeData}
//           onChange={(e) => setQrCodeData(e.target.value)}
//           className="border p-2 rounded flex-1"
//         />
//         <button
//           onClick={handleFetch}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Search Prescription
//         </button>
//       </div>

//       {/* Error message */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Prescription card */}
//       {prescription && (
//         <PrescriptionCard
//           prescription={prescription}
//           onDispense={!prescription.isDispensed ? handleDispense : null}
//         />
//       )}
//     </div>
//   );
// }
 
import { useState, useEffect } from "react";
import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";
import PharmacistProfileCard from "../../components/pharmacist/PharmacistProfileCard";
import { getPrescriptionByQR, dispenseMedicine, getPharmacistProfile } from "../../services/pharmacistService";

export default function PharmacistDashboard() {
  const [pharmacist, setPharmacist] = useState(null);
  const [prescription, setPrescription] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(""); // manual QRCodeData entry
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Load pharmacist profile
  useEffect(() => {
    if (!token) return;
    getPharmacistProfile(token)
      .then(setPharmacist)
      .catch(() => setError("Failed to load profile"));
  }, [token]);

  // Fetch prescription by QRCodeData
  const handleFetch = async () => {
    if (!qrCodeData.trim()) return;
    try {
      const data = await getPrescriptionByQR(qrCodeData.trim(), token);
      setPrescription(data);
      setError("");
    } catch {
      setError("Prescription not found");
      setPrescription(null);
    }
  };

  // Handle price change for individual medicine
  const handlePriceChange = (index, value) => {
    const updatedMedicines = [...prescription.medicines];
    updatedMedicines[index].price = parseFloat(value) || 0;
    setPrescription({ ...prescription, medicines: updatedMedicines });
  };

  // Calculate total cost (optional)
  const calculateTotalPrice = () => {
    if (!prescription || !prescription.medicines) return 0;
    return prescription.medicines.reduce((sum, m) => sum + (m.price || 0), 0);
  };

  // Dispense medicine with price info
  const handleDispense = async () => {
    if (!prescription) return;

    const dto = {
      prescriptionId: prescription.id,
      medicines: prescription.medicines.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        price: m.price,
        instructions: m.instructions,
      })),
    };

    try {
      await dispenseMedicine(dto, token); // backend should accept this DTO
      setPrescription({ ...prescription, isDispensed: true });
    } catch {
      setError("Failed to dispense");
    }
  };

  return (
    <div className="p-4 space-y-6">
      {pharmacist && <PharmacistProfileCard pharmacist={pharmacist} />}
      <h1 className="text-xl font-bold mb-4">Pharmacist Dashboard</h1>

      {/* Manual QRCodeData input */}
      <div className="flex gap-2 my-4">
        <input
          type="text"
          placeholder="Enter QRCodeData (e.g., PRESC-XXXX)"
          value={qrCodeData}
          onChange={(e) => setQrCodeData(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search Prescription
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Prescription card */}
      {prescription && (
        <div className="border p-4 rounded space-y-4">
          <h2 className="text-lg font-semibold">Prescription: {prescription.qrCodeData}</h2>
              <p><strong>Patient:</strong> {prescription.patientName}</p>
    <p><strong>Doctor:</strong> {prescription.doctorName}</p>
    <p><strong>Diagnosis:</strong> {prescription.diagnosis}</p>

          {/* Medicines with price input */}
          {prescription.medicines.map((med, i) => (
            <div key={i} className="flex gap-2 items-center my-1">
              <span className="w-32">{med.name} ({med.dosage})</span>
              <input
                type="number"
                placeholder="Enter price"
                value={med.price || ""}
                onChange={(e) => handlePriceChange(i, e.target.value)}
                className="border p-1 rounded w-24"
              />
            </div>
          ))}

          {/* Total cost display */}
          <div className="mt-2 font-semibold">
            Total: {calculateTotalPrice()} 
          </div>

          {/* Dispense button */}
          {!prescription.isDispensed && (
            <button
              onClick={handleDispense}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Dispense
            </button>
          )}

          {prescription.isDispensed && (
            <p className="text-green-600 font-semibold mt-2">
              Prescription dispensed successfully
            </p>
          )}
        </div>
      )}
    </div>
  );
}
