// import React from "react";

// export default function PrescriptionFeedItem({ prescription, onView }) {
//   return (
//     <div className="flex items-center p-3 bg-white shadow rounded-lg mb-2 cursor-pointer hover:bg-gray-100">
//       <img 
//         src="/doctor-avatar.png" 
//         alt="Doctor" 
//         className="w-12 h-12 rounded-full mr-3"
//       />
//       <div className="flex-1">
//         <div className="flex justify-between">
//           <h4 className="font-semibold">{prescription.doctorName}</h4>
//           <span className="text-xs text-gray-500">
//             {new Date(prescription.dateIssued).toLocaleDateString()}
//           </span>
//         </div>
//         <p className="text-sm text-gray-600">{prescription.hospitalName}</p>
//         <p className="text-sm mt-1">{prescription.summary}</p>
//       </div>
//       <button 
//         onClick={onView} 
//         className="ml-3 p-2 bg-green-600 text-white rounded-full">
//         💬
//       </button>
//     </div>
//   );
// }
// import React from "react";
// import { Link } from "react-router-dom";

// export default function PrescriptionFeedItem({ prescription }) {
//   if (!prescription) return null;

//   return (
//     <Link to={`/patient/prescription/${prescription.id}`}>
//       <div className="bg-white shadow rounded-lg p-4 mb-3 flex justify-between items-center hover:bg-gray-50">
//         <div>
//           <h3 className="font-bold">{prescription.doctorName}</h3>
//           <p className="text-sm text-gray-600">{prescription.hospitalName}</p>
//           <p className="text-xs text-gray-500">{new Date(prescription.dateIssued).toLocaleString()}</p>
//         </div>
//         <span className="text-green-600 font-semibold">View →</span>
//       </div>
//     </Link>
//   );
// }
// import { useEffect, useState } from "react";
// import { getPatientPrescriptions  } from "../../services/patientService";

// const PrescriptionFeed = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getPatientPrescriptions();
//         setPrescriptions(data);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading prescriptions...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">My Prescriptions</h2>
//       {prescriptions.length === 0 ? (
//         <p>No prescriptions found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {prescriptions.map((prescription) => (
//             <li key={prescription.id} className="p-4 bg-white rounded-xl shadow">
//               <p><strong>Doctor:</strong> {prescription.doctorName}</p>
//               <p><strong>Date:</strong> {new Date(prescription.dateIssued).toLocaleDateString()}</p>
//               <p><strong>Medicines:</strong></p>
//               <ul className="list-disc list-inside">
//                 {prescription.medicines?.map((med, index) => (
//                   <li key={index}>{med.name} – {med.dosage}</li>
//                 ))}
//               </ul>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PrescriptionFeed;
// import { useEffect, useState } from "react";
// import { getPatientPrescriptions } from "../../services/patientService";
// //import QRCode from "qrcode.react";

// const PrescriptionFeed = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPrescription, setSelectedPrescription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getPatientPrescriptions();
//         setPrescriptions(res.data || []); // ✅ fetch from API
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading prescriptions...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg">
//       {/* Left Side: Chat Feed */}
//       <div className="flex-1 p-4 overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Prescription Chat Feed</h2>

//         {prescriptions.length === 0 ? (
//           <p className="text-gray-500">No prescriptions found.</p>
//         ) : (
//           <div className="flex flex-col space-y-3">
//             {prescriptions.map((prescription, index) => (
//               <div
//                 key={prescription.id}
//                 onClick={() => setSelectedPrescription(prescription)}
//                 className={`cursor-pointer max-w-[70%] p-3 rounded-xl shadow transition
//                   ${index % 2 === 0 ? "bg-green-100 self-start" : "bg-blue-100 self-end"}
//                   hover:scale-[1.02]`}
//               >
//                 <p className="text-sm font-semibold">
//                   Prescription sent by {prescription.doctorName}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(prescription.dateIssued).toLocaleDateString()}
//                 </p>
//                 <p className="text-xs mt-1 text-gray-700">
//                   {prescription.medicines?.length || 0} medicines prescribed
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Right Side: Prescription Detail / Printable */}
//       <div className="w-[40%] p-4 border-l bg-white">
//         <h2 className="text-lg font-bold mb-3">Prescription Detail</h2>

//         {!selectedPrescription ? (
//           <p className="text-gray-500">Select a prescription to view</p>
//         ) : (
//           <div id="prescription-detail" className="p-4 border rounded-lg shadow">
//             <h3 className="text-xl font-bold text-green-600 mb-2">
//               Prescription
//             </h3>
//             <p>
//               <strong>Doctor:</strong> {selectedPrescription.doctorName}
//             </p>
//             <p>
//               <strong>Date:</strong>{" "}
//               {new Date(selectedPrescription.dateIssued).toLocaleDateString()}
//             </p>
//             <h4 className="mt-3 font-semibold">Medicines:</h4>
//             <ul className="list-disc list-inside text-sm mb-3">
//               {selectedPrescription.medicines?.map((med, i) => (
//                 <li key={i}>
//                   {med.name} – {med.dosage}
//                 </li>
//               ))}
//             </ul>

//             {/* QR Code */}
//             <div className="flex justify-center my-4">
//               <QRCode
//                 value={JSON.stringify(selectedPrescription)} // could encode prescriptionId
//                 size={100}
//               />
//             </div>

//             {/* Print Button */}
//             <button
//               onClick={() => window.print()}
//               className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//             >
//               Print Prescription
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionFeed;



// 


// import { useEffect, useState } from "react";
// //import { getPatientPrescriptions } from "../../services/patientService";
// import QRCode from "react-qr-code";
// import patientService from "../../services/patientService";


// const PrescriptionFeed = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPrescription, setSelectedPrescription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await patientService.getPatientPrescriptions(token);
//         // sort latest first
//         const sorted = (res || []).sort(
//           (a, b) => new Date(b.dateIssued) - new Date(a.dateIssued)
//         );
//         setPrescriptions(sorted);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   // Group prescriptions by doctor
//   const doctorsMap = {};
//   prescriptions.forEach((p) => {
//     if (!doctorsMap[p.doctorId]) doctorsMap[p.doctorId] = [];
//     doctorsMap[p.doctorId].push(p);
//   });
//   const doctorList = Object.keys(doctorsMap).map((id) => ({
//     doctorId: id,
//     doctorName: doctorsMap[id][0].doctorName,
//     prescriptions: doctorsMap[id],
//   }));

//   return (
//     <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg">
//       {/* Left Panel: Doctors */}
//       <div className="w-1/3 p-4 bg-white overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Doctors</h2>
//         <div className="flex flex-col gap-2">
//           {doctorList.map((doc) => (
//             <div
//               key={doc.doctorId}
//               onClick={() => setSelectedPrescription(doc.prescriptions[0])} // latest at top
//               className={`cursor-pointer p-3 rounded shadow transition
//                 ${
//                   selectedPrescription?.doctorId === doc.doctorId
//                     ? "bg-green-100"
//                     : "bg-gray-50"
//                 }
//                 hover:bg-green-200`}
//             >
//               <p className="font-semibold">{doc.doctorName}</p>
//               <p className="text-xs text-gray-500">sent you a prescription</p>
//               <p className="text-xs text-gray-400">
//                 {new Date(
//                   doc.prescriptions[0].dateIssued
//                 ).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel: Prescription Slip Style */}
//       <div className="flex-1 p-6 bg-white overflow-y-auto">
//         {!selectedPrescription ? (
//           <p className="text-gray-500">
//             Select a doctor to view prescriptions
//           </p>
//         ) : (
//           <div className="max-w-lg mx-auto border rounded-xl p-6 shadow-lg bg-white">
//             {/* Hospital Info */}
//             <div className="text-center mb-6">
//               <h3 className="font-bold text-2xl uppercase">
//                 {selectedPrescription.hospitalName}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {selectedPrescription.hospitalAddress}
//               </p>
//             </div>

//             {/* Patient + Doctor Info */}
//             <div className="flex justify-between mb-6">
//               <div>
//                 <p className="font-semibold text-sm">Patient Name</p>
//                 <p>{selectedPrescription.patientName}</p>
//                 <p className="font-semibold text-sm mt-2">Age</p>
//                 <p>{selectedPrescription.patientAge}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold">
//                   {selectedPrescription.doctorName}, MD
//                 </p>
//                 <p className="text-sm">{selectedPrescription.doctorSpecialty}</p>
//               </div>
//             </div>

//             {/* Medicines (handwriting style) */}
//             <div className="mb-6 text-lg italic space-y-2">
//               {selectedPrescription.medicines?.map((med, i) => (
//                 <p key={i}>
//                   {med.name} {med.dosage} – {med.instructions || "as directed"}
//                 </p>
//               ))}
//             </div>

//             {/* Signature + QR */}
//             <div className="flex justify-between items-center mt-6">
//               <div>
//                 <p className="italic">{selectedPrescription.doctorName}, MD</p>
//                 <div className="border-t border-black w-40 mt-1"></div>
//                 <p className="text-xs">Signature</p>
//               </div>
//               <QRCode
//                 value={JSON.stringify(selectedPrescription)}
//                 style={{ width: 80, height: 80 }}
//               />
//             </div>

//             {/* Print button */}
//             <button
//               onClick={() => window.print()}
//               className="mt-6 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//             >
//               Print Prescription
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionFeed;
// import { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
// import patientService from "../../services/patientService";

// const PrescriptionFeed = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPrescription, setSelectedPrescription] = useState(null);
//   const [qrModalOpen, setQrModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await patientService.getPatientPrescriptions(token);

//         // Sort latest first
//         const sorted = (res || []).sort(
//           (a, b) => new Date(b.dateIssued) - new Date(a.dateIssued)
//         );
//         setPrescriptions(sorted);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   // Group prescriptions by doctor
//   const doctorsMap = {};
//   prescriptions.forEach((p) => {
//     if (!doctorsMap[p.doctorId]) doctorsMap[p.doctorId] = [];
//     doctorsMap[p.doctorId].push(p);
//   });
//   const doctorList = Object.keys(doctorsMap).map((id) => ({
//     doctorId: id,
//     doctorName: doctorsMap[id][0]?.doctorName || "Unknown Doctor",
//     doctorTitle: doctorsMap[id][0]?.doctorTitle || "", // dynamic title
//     prescriptions: doctorsMap[id],
//   }));

//   return (
//     <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg">
//       {/* Left Panel: Doctors */}
//       <div className="w-1/3 p-4 bg-white overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Doctors</h2>
//         <div className="flex flex-col gap-2">
//           {doctorList.map((doc) => (
//             <div
//               key={doc.doctorId}
//               onClick={() => setSelectedPrescription(doc.prescriptions[0])} // latest at top
//               className={`cursor-pointer p-3 rounded shadow transition
//                 ${
//                   selectedPrescription?.doctorId === doc.doctorId
//                     ? "bg-green-100"
//                     : "bg-gray-50"
//                 }
//                 hover:bg-green-200`}
//             >
//               <p className="font-semibold">{doc.doctorName}</p>
//               <p className="text-xs text-gray-500">sent you a prescription</p>
//               <p className="text-xs text-gray-400">
//                 {new Date(doc.prescriptions[0].dateIssued).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel: Prescription Slip */}
//       <div className="flex-1 p-6 bg-white overflow-y-auto">
//         {!selectedPrescription ? (
//           <p className="text-gray-500">Select a doctor to view prescriptions</p>
//         ) : (
//           <div className="max-w-lg mx-auto border rounded-xl p-6 shadow-lg bg-white">
//             {/* Hospital Info */}
//             <div className="text-center mb-6">
//               <h3 className="font-bold text-2xl uppercase">
//                 {selectedPrescription.hospitalName || "Hospital Name"}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {selectedPrescription.hospitalAddress || ""}
//               </p>
//             </div>

//             {/* Patient + Doctor Info */}
//             <div className="flex justify-between mb-6">
//               <div>
//                 <p className="font-semibold text-sm">Patient Name</p>
//                 <p>{selectedPrescription.patientName || "Unknown Patient"}</p>
//                 <p className="font-semibold text-sm mt-2">Age</p>
//                 <p>{selectedPrescription.patientAge || "N/A"}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold">
//                   {selectedPrescription.doctorName}{" "}
//                   {selectedPrescription.doctorTitle || ""}
//                 </p>
//                 <p className="text-sm">{selectedPrescription.doctorSpecialty || ""}</p>
//               </div>
//             </div>

//             {/* Medicines */}
//             <div className="mb-6 text-lg italic space-y-2">
//               {selectedPrescription.medicines?.map((med, i) => (
//                 <p key={i}>
//                   {med.name} {med.dosage} – {med.instructions || "as directed"}
//                 </p>
//               ))}
//             </div>

//             {/* Signature + QR */}
//             <div className="flex justify-between items-center mt-6">
//               <div>
//                 <p className="italic">
//                   {selectedPrescription.doctorName}{" "}
//                   {selectedPrescription.doctorTitle || ""}
//                 </p>
//                 <div className="border-t border-black w-40 mt-1"></div>
//                 <p className="text-xs">Signature</p>
//               </div>
//               <div className="cursor-pointer" onClick={() => setQrModalOpen(true)}>
//                 <QRCode
//                   value={JSON.stringify(selectedPrescription)}
//                   style={{ width: 80, height: 80 }}
//                 />
//               </div>
//             </div>

//             {/* Print button */}
//             <button
//               onClick={() => window.print()}
//               className="mt-6 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//             >
//               Print Prescription
//             </button>

//             {/* QR Modal */}
//             {qrModalOpen && (
//               <div
//                 onClick={() => setQrModalOpen(false)}
//                 className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
//               >
//                 <QRCode
//                   value={JSON.stringify(selectedPrescription)}
//                   style={{ width: 300, height: 300 }}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionFeed;
// import { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
// import patientService from "../../services/patientService";

// const PrescriptionFeed = () => {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedPrescription, setSelectedPrescription] = useState(null);
//   const [qrModalOpen, setQrModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await patientService.getPatientPrescriptions(token);

//         const sorted = (res || []).sort(
//           (a, b) => new Date(b.dateIssued) - new Date(a.dateIssued)
//         );
//         setPrescriptions(sorted);
//         if (sorted.length) setSelectedPrescription(sorted[0]);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch prescriptions");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   // Group prescriptions by doctor
//   const doctorsMap = {};
//   prescriptions.forEach((p) => {
//     if (!doctorsMap[p.doctorId]) doctorsMap[p.doctorId] = [];
//     doctorsMap[p.doctorId].push(p);
//   });
//   const doctorList = Object.keys(doctorsMap).map((id) => ({
//     doctorId: id,
//     doctorName: doctorsMap[id][0]?.doctorName || "Unknown Doctor",
//     doctorTitle: doctorsMap[id][0]?.doctorTitle || "", 
//     prescriptions: doctorsMap[id],
//   }));

//   return (
//     <div className="flex flex-col md:flex-row h-full bg-gray-100 rounded-xl shadow-lg">
//       {/* Left Panel: Doctors */}
//       <div className="w-1/3 p-4 bg-white overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Doctors</h2>
//         <div className="flex flex-col gap-2">
//           {doctorList.map((doc) => (
//             <div
//               key={doc.doctorId}
//               onClick={() => setSelectedPrescription(doc.prescriptions[0])}
//               className={`cursor-pointer p-3 rounded shadow transition
//                 ${
//                   selectedPrescription?.doctorId === doc.doctorId
//                     ? "bg-green-100"
//                     : "bg-gray-50"
//                 } hover:bg-green-200`}
//             >
//               <p className="font-semibold">{doc.doctorName}</p>
//               <p className="text-xs text-gray-500">sent you a prescription</p>
//               <p className="text-xs text-gray-400">
//                 {new Date(doc.prescriptions[0].dateIssued).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel: Prescription Slip */}
//       <div className="flex-1 p-4 bg-white overflow-y-auto">
//         {!selectedPrescription ? (
//           <p className="text-gray-500">Select a doctor to view prescriptions</p>
//         ) : (
//           <div className="max-w-lg mx-auto border rounded-xl p-6 shadow-lg bg-white">
//             {/* Hospital Info */}
//             <div className="text-center mb-6">
//               <h3 className="font-bold text-2xl uppercase">
//                 {selectedPrescription.hospitalName || "Hospital Name"}
//               </h3>
//               <p className="text-sm text-gray-600">
//                 {selectedPrescription.hospitalAddress || ""}
//               </p>
//             </div>

//             {/* Patient + Doctor Info */}
//             <div className="flex justify-between mb-6">
//               <div>
//                 <p className="font-semibold text-sm">Patient Name</p>
//                 <p>{selectedPrescription.patientName || "Unknown Patient"}</p>
//                 <p className="font-semibold text-sm mt-2">Age</p>
//                 <p>{selectedPrescription.patientAge || "N/A"}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-semibold">
//                   {selectedPrescription.doctorName} {selectedPrescription.doctorTitle || ""}
//                 </p>
//                 <p className="text-sm">{selectedPrescription.doctorSpecialty || ""}</p>
//               </div>
//             </div>

//             {/* Medicines */}
//             <div className="mb-6 text-lg italic space-y-2">
//               {selectedPrescription.medicines?.map((med, i) => (
//                 <p key={i}>
//                   {med.name} {med.dosage} – {med.instructions || "as directed"}
//                 </p>
//               ))}
//             </div>

//             {/* Signature + QR */}
//             <div className="flex justify-between items-center mt-6">
//               <div>
//                 <p className="italic">
//                   {selectedPrescription.doctorName} {selectedPrescription.doctorTitle || ""}
//                 </p>
//                 <div className="border-t border-black w-40 mt-1"></div>
//                 <p className="text-xs">Signature</p>
//               </div>
//               <div className="cursor-pointer" onClick={() => setQrModalOpen(true)}>
//                 <QRCode
//                   value={JSON.stringify(selectedPrescription)}
//                   style={{ width: 80, height: 80 }}
//                 />
//               </div>
//             </div>

//             {/* Print button */}
//             <button
//               onClick={() => window.print()}
//               className="mt-6 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
//             >
//               Print Prescription
//             </button>

//             {/* QR Modal */}
//             {qrModalOpen && (
//               <div
//                 onClick={() => setQrModalOpen(false)}
//                 className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
//               >
//                 <QRCode
//                   value={JSON.stringify(selectedPrescription)}
//                   style={{ width: 300, height: 300 }}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionFeed;

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import patientService from "../../services/patientService";

const PrescriptionFeed = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await patientService.getPatientPrescriptions(token);

        const sorted = (res || []).sort(
          (a, b) => new Date(b.dateIssued) - new Date(a.dateIssued)
        );
        setPrescriptions(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Group prescriptions by doctor
  const doctorsMap = {};
  prescriptions.forEach((p) => {
    if (!doctorsMap[p.doctorId]) doctorsMap[p.doctorId] = [];
    doctorsMap[p.doctorId].push(p);
  });

  const doctorList = Object.keys(doctorsMap).map((id) => ({
    doctorId: id,
    doctorName: doctorsMap[id][0]?.doctorName || "Unknown Doctor",
    doctorTitle: doctorsMap[id][0]?.doctorTitle || "",
    prescriptions: doctorsMap[id],
  }));

  // Toggle doctor selection
  const handleDoctorClick = (id) => {
    if (selectedDoctorId === id) {
      setSelectedDoctorId(null);
      setSelectedPrescription(null);
    } else {
      setSelectedDoctorId(id);
      setSelectedPrescription(doctorsMap[id][0]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-gray-100 rounded-xl shadow-lg">
      {/* Left Panel: Doctors */}
      <div className="md:w-1/3 w-full p-4 bg-white overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Doctors</h2>
        <div className="flex flex-col gap-2">
          {doctorList.map((doc) => (
            <div
              key={doc.doctorId}
              onClick={() => handleDoctorClick(doc.doctorId)}
              className={`cursor-pointer p-3 rounded shadow transition
                ${
                  selectedDoctorId === doc.doctorId
                    ? "bg-green-100"
                    : "bg-gray-50"
                } hover:bg-green-200`}
            >
              <p className="font-semibold">{doc.doctorName}</p>
              <p className="text-xs text-gray-500">sent you {doc.prescriptions.length} prescription(s)</p>
              <p className="text-xs text-gray-400">
                {new Date(doc.prescriptions[0].dateIssued).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Prescriptions */}
      <div className="flex-1 p-4 bg-white overflow-y-auto">
        {!selectedDoctorId ? (
          <p className="text-gray-500">Select a doctor to view prescriptions</p>
        ) : (
          doctorsMap[selectedDoctorId].map((prescription, idx) => (
            <div key={idx} className="max-w-lg mx-auto border rounded-xl p-6 shadow-lg bg-white mb-6">
              {/* Hospital Info */}
              <div className="text-center mb-6">
                <h3 className="font-bold text-2xl uppercase">
                  {prescription.hospitalName || "Hospital Name"}
                </h3>
                <p className="text-sm text-gray-600">{prescription.hospitalAddress || ""}</p>
              </div>

              {/* Patient + Doctor Info */}
              <div className="flex justify-between mb-6">
                <div>
                  <p className="font-semibold text-sm">Patient Name</p>
                  <p>{prescription.patientName || "Unknown Patient"}</p>
                  <p className="font-semibold text-sm mt-2">Age</p>
                  <p>{prescription.patientAge || "N/A"}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {prescription.doctorName} {prescription.doctorTitle || ""}
                  </p>
                  <p className="text-sm">{prescription.doctorSpecialty || ""}</p>
                </div>
              </div>

              {/* Medicines */}
              <div className="mb-6 text-lg italic space-y-2">
                {prescription.medicines?.map((med, i) => (
                  <p key={i}>
                    {med.name} {med.dosage} – {med.instructions || "as directed"}
                  </p>
                ))}
              </div>

              {/* Signature + QR */}
              <div className="flex justify-between items-center mt-6">
                <div>
                  <p className="italic">{prescription.doctorName} {prescription.doctorTitle || ""}</p>
                  <div className="border-t border-black w-40 mt-1"></div>
                  <p className="text-xs">Signature</p>
                </div>
                <div className="cursor-pointer" onClick={() => setQrModalOpen(true)}>
                  <QRCode value={JSON.stringify(prescription)} style={{ width: 80, height: 80 }} />
                </div>
              </div>

              {/* Print button */}
              <button
                onClick={() => window.print()}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
              >
                Print Prescription
              </button>
            </div>
          ))
        )}

        {/* QR Modal */}
        {qrModalOpen && selectedPrescription && (
          <div
            onClick={() => setQrModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 cursor-pointer"
          >
            <QRCode
              value={JSON.stringify(selectedPrescription)}
              style={{ width: 300, height: 300 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionFeed;
