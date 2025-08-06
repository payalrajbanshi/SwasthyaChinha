
// import React, { useState } from "react";
// import { createPrescription } from "../../services/doctorService";
// import Sidebar from "../../components/dashboard/Sidebar";

// const PrescriptionPage = () => {
//   const [patientId, setPatientId] = useState("");
//   const [hospitalId, setHospitalId] = useState(""); // Autofill later
//   const [medicines, setMedicines] = useState([{ name: "", dosage: "" }]);
//   const [loading, setLoading] = useState(false);
//   const [qrCode, setQrCode] = useState(null);
//   const [successMsg, setSuccessMsg] = useState("");

//   const handleMedicineChange = (index, field, value) => {
//     const updated = [...medicines];
//     updated[index][field] = value;
//     setMedicines(updated);
//   };

//   const addMedicine = () => {
//     setMedicines([...medicines, { name: "", dosage: "" }]);
//   };

//   const removeMedicine = (index) => {
//     const updated = medicines.filter((_, i) => i !== index);
//     setMedicines(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");
//     setQrCode(null);

//     try {
//       const res = await createPrescription({
//         patientId,
//         hospitalId,
//         medicines,
//       });

//       // If backend sends QRCode in response, save it
//       if (res.qrCode) {
//         setQrCode(res.qrCode);
//       }

//       setSuccessMsg("✅ Prescription created successfully!");
//       setPatientId("");
//       setHospitalId("");
//       setMedicines([{ name: "", dosage: "" }]);
//     } catch (error) {
//       console.error("Error creating prescription:", error);
//       alert("❌ Failed to create prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">Create Prescription</h1>

//         <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-3xl">
//           {/* Patient ID */}
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Patient ID</label>
//             <input
//               type="text"
//               value={patientId}
//               onChange={(e) => setPatientId(e.target.value)}
//               className="border rounded p-2 w-full"
//               required
//             />
//           </div>

//           {/* Hospital ID */}
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Hospital ID</label>
//             <input
//               type="text"
//               value={hospitalId}
//               onChange={(e) => setHospitalId(e.target.value)}
//               className="border rounded p-2 w-full"
//               required
//             />
//           </div>

//           {/* Medicines */}
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Medicines</label>
//             {medicines.map((med, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Medicine Name"
//                   value={med.name}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "name", e.target.value)
//                   }
//                   className="border p-2 flex-1 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Dosage"
//                   value={med.dosage}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "dosage", e.target.value)
//                   }
//                   className="border p-2 flex-1 rounded"
//                   required
//                 />
//                 {index > 0 && (
//                   <button
//                     type="button"
//                     onClick={() => removeMedicine(index)}
//                     className="bg-red-500 text-white px-2 rounded"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addMedicine}
//               className="text-blue-500 text-sm"
//             >
//               ➕ Add Medicine
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//           >
//             {loading ? "Sending..." : "Send Prescription"}
//           </button>

//           {/* Success Message */}
//           {successMsg && (
//             <p className="text-green-600 text-sm mt-2">{successMsg}</p>
//           )}
//         </form>

//         {/* QR Code Display */}
//         {qrCode && (
//           <div className="mt-6 bg-white p-4 rounded shadow-md max-w-sm">
//             <h2 className="font-semibold mb-2">Prescription QR Code</h2>
//             <img
//               src={`data:image/png;base64,${qrCode}`}
//               alt="Prescription QR"
//               className="w-40 h-40"
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createPrescription } from "../../services/doctorService";

// const PrescriptionPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     patientId: "",
//     hospitalId: "", // can be hidden or auto-filled from profile
//     medicines: [{ name: "", dosage: "" }]
//   });

//   const [qrCode, setQrCode] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle patient & hospital changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle medicine changes
//   const handleMedicineChange = (index, field, value) => {
//     const updatedMedicines = [...formData.medicines];
//     updatedMedicines[index][field] = value;
//     setFormData({ ...formData, medicines: updatedMedicines });
//   };

//   // Add new medicine row
//   const addMedicine = () => {
//     setFormData({
//       ...formData,
//       medicines: [...formData.medicines, { name: "", dosage: "" }]
//     });
//   };

//   // Remove medicine row
//   const removeMedicine = (index) => {
//     const updatedMedicines = formData.medicines.filter((_, i) => i !== index);
//     setFormData({ ...formData, medicines: updatedMedicines });
//   };

//   // Submit prescription
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await createPrescription({
//         patientId: formData.patientId,
//         hospitalId: formData.hospitalId,
//         medicines: formData.medicines
//       });

//       setQrCode(res.qrCode); // QR from backend
//     } catch (error) {
//       console.error("Error creating prescription:", error);
//       alert("Failed to create prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Create New Prescription</h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-4 rounded shadow w-full max-w-2xl"
//       >
//         {/* Patient ID */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Patient ID</label>
//           <input
//             type="text"
//             name="patientId"
//             value={formData.patientId}
//             onChange={handleChange}
//             className="border px-3 py-2 w-full rounded"
//             required
//           />
//         </div>

//         {/* Hospital ID */}
//         <div className="mb-4">
//           <label className="block font-medium mb-1">Hospital ID</label>
//           <input
//             type="text"
//             name="hospitalId"
//             value={formData.hospitalId}
//             onChange={handleChange}
//             className="border px-3 py-2 w-full rounded"
//             required
//           />
//         </div>

//         {/* Medicines */}
//         <div>
//           <label className="block font-medium mb-1">Medicines</label>
//           {formData.medicines.map((med, index) => (
//             <div key={index} className="flex items-center gap-2 mb-2">
//               <input
//                 type="text"
//                 placeholder="Medicine Name"
//                 value={med.name}
//                 onChange={(e) =>
//                   handleMedicineChange(index, "name", e.target.value)
//                 }
//                 className="border px-3 py-2 rounded flex-1"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Dosage"
//                 value={med.dosage}
//                 onChange={(e) =>
//                   handleMedicineChange(index, "dosage", e.target.value)
//                 }
//                 className="border px-3 py-2 rounded flex-1"
//                 required
//               />
//               {formData.medicines.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeMedicine(index)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addMedicine}
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//           >
//             ➕ Add Medicine
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-green-600 text-white px-4 py-2 rounded mt-4"
//           disabled={loading}
//         >
//           {loading ? "Sending..." : "Send Prescription"}
//         </button>
//       </form>

//       {/* QR Code Preview */}
//       {qrCode && (
//         <div className="mt-6 p-4 bg-white rounded shadow w-fit">
//           <h2 className="text-lg font-bold mb-2">Prescription QR Code</h2>
//           <img
//             src={`data:image/png;base64,${qrCode}`}
//             alt="Prescription QR"
//             className="border rounded"
//           />
//           <button
//             onClick={() => navigate("/doctor/dashboard")}
//             className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrescriptionPage;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/dashboard/Sidebar";
// import { createPrescription, getDoctorProfile } from "../../services/doctorService";

// const PrescriptionPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     patientId: "",
//     hospitalId: "",
//     medicines: [{ name: "", dosage: "" }],
//   });

//   const [doctor, setDoctor] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [qrCode, setQrCode] = useState(null);
//   const [successMsg, setSuccessMsg] = useState("");

//   const doctorSignature = localStorage.getItem("doctorSignature"); // Doctor signature stored locally

//   // Load doctor profile (auto-fill hospitalId, hospital name, doctor name)
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profile = await getDoctorProfile();
//         setDoctor(profile);
//         setFormData((prev) => ({
//           ...prev,
//           hospitalId: profile.hospitalId || "",
//         }));
//       } catch (error) {
//         console.error("Error fetching doctor profile:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Handle general form input change
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle medicine changes
//   const handleMedicineChange = (index, field, value) => {
//     const updated = [...formData.medicines];
//     updated[index][field] = value;
//     setFormData({ ...formData, medicines: updated });
//   };

//   // Add new medicine row
//   const addMedicine = () => {
//     setFormData({
//       ...formData,
//       medicines: [...formData.medicines, { name: "", dosage: "" }],
//     });
//   };

//   // Remove medicine row
//   const removeMedicine = (index) => {
//     const updated = formData.medicines.filter((_, i) => i !== index);
//     setFormData({ ...formData, medicines: updated });
//   };

//   // Submit prescription
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");
//     setQrCode(null);

//     try {
//       const res = await createPrescription(formData);

//       if (res.qrCode) {
//         setQrCode(res.qrCode);
//         setSuccessMsg("✅ Prescription created successfully!");
//       }

//       setFormData({
//         patientId: "",
//         hospitalId: doctor?.hospitalId || "",
//         medicines: [{ name: "", dosage: "" }],
//       });
//     } catch (error) {
//       console.error("Error creating prescription:", error);
//       alert("❌ Failed to create prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         {/* Prescription Header */}
//         {doctor && (
//           <div className="bg-white border rounded shadow p-6 mb-6">
//             <h1 className="text-2xl font-bold text-center uppercase">
//               {doctor.hospitalName || "Hospital Name"}
//             </h1>
//             <p className="text-center text-sm text-gray-600">
//               {doctor.hospitalAddress || "Hospital Address"}
//             </p>
//             <div className="mt-4 flex justify-between items-center">
//               <div>
//                 <p className="font-semibold">Dr. {doctor.fullName}</p>
//                 <p className="text-sm text-gray-600">{doctor.specialty}</p>
//               </div>
//               {doctorSignature && (
//                 <div>
//                   <img
//                     src={doctorSignature}
//                     alt="Doctor Signature"
//                     className="h-12 object-contain"
//                   />
//                   <p className="text-xs text-gray-500 text-center">Signature</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Prescription Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded shadow-md max-w-3xl"
//         >
//           {/* Patient ID */}
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Patient ID</label>
//             <input
//               type="text"
//               name="patientId"
//               value={formData.patientId}
//               onChange={handleChange}
//               placeholder="Enter patient GUID or search"
//               className="border rounded p-2 w-full"
//               required
//             />
//           </div>

//           {/* Medicines */}
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Medicines</label>
//             {formData.medicines.map((med, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Medicine Name"
//                   value={med.name}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "name", e.target.value)
//                   }
//                   className="border p-2 flex-1 rounded"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Dosage"
//                   value={med.dosage}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "dosage", e.target.value)
//                   }
//                   className="border p-2 flex-1 rounded"
//                   required
//                 />
//                 {formData.medicines.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeMedicine(index)}
//                     className="bg-red-500 text-white px-2 rounded"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addMedicine}
//               className="text-blue-600 text-sm mt-2"
//             >
//               ➕ Add Medicine
//             </button>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-2 rounded w-full"
//           >
//             {loading ? "Sending..." : "Send Prescription"}
//           </button>

//           {/* Success Message */}
//           {successMsg && (
//             <p className="text-green-600 text-sm mt-2">{successMsg}</p>
//           )}
//         </form>

//         {/* QR Code Preview */}
//         {qrCode && (
//           <div className="mt-6 bg-white p-4 rounded shadow-md max-w-sm">
//             <h2 className="font-semibold mb-2">Prescription QR Code</h2>
//             <img
//               src={`data:image/png;base64,${qrCode}`}
//               alt="Prescription QR"
//               className="w-40 h-40 border mx-auto"
//             />
//             <button
//               onClick={() => navigate("/doctor/dashboard")}
//               className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPage;



// src/pages/doctor/PrescriptionPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../../components/dashboard/Sidebar";
// import { createPrescription, getDoctorProfile } from "../../services/doctorService";

// const PrescriptionPage = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const [doctor, setDoctor] = useState(null);
//   const [formData, setFormData] = useState({
//     patientId: "",
//     hospitalId: "",
//     medicines: [{ name: "", dosage: "" }]
//   });
//   // const [loading, setLoading] = useState(false);
//   const [qrCode, setQrCode] = useState(null);
//   const [successMsg, setSuccessMsg] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const data = await getDoctorProfile();
//         setDoctor(data);
//         setFormData((prev) => ({
//           ...prev,
//           hospitalId: data.hospitalId || ""
//         }));
//       } catch (err) {
//         console.error("Error fetching profile", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleMedicineChange = (index, field, value) => {
//     const updated = [...formData.medicines];
//     updated[index][field] = value;
//     setFormData({ ...formData, medicines: updated });
//   };

//   const addMedicine = () =>
//     setFormData({
//       ...formData,
//       medicines: [...formData.medicines, { name: "", dosage: "" }]
//     });

//   const removeMedicine = (index) => {
//     const updated = formData.medicines.filter((_, i) => i !== index);
//     setFormData({ ...formData, medicines: updated });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccessMsg("");
//     setQrCode(null);

//     try {
//       const res = await createPrescription(formData);
//       if (res.qrCode) {
//         setQrCode(res.qrCode);
//         setSuccessMsg("✅ Prescription created successfully!");
//       }
//     } catch (err) {
//       console.error("Error creating prescription", err);
//       alert("❌ Failed to create prescription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!doctor) {
//     return <div className="p-6">Loading prescription page...</div>;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 flex justify-center p-6">
//         <div className="bg-white shadow-md border border-gray-400 p-8 w-full max-w-4xl rounded-lg print:border-black">
//           {/* Hospital Header */}
//           <div className="text-center border-b border-gray-400 pb-2 mb-4">
//             <h1 className="text-2xl font-bold uppercase tracking-wide">
//               {doctor.hospitalName || "Hospital Name"}
//             </h1>
//             <p className="text-gray-700 text-sm italic">
//               {doctor.hospitalAddress || "Hospital Address"}
//             </p>
//           </div>

//           {/* Doctor Info */}
//           <div className="flex justify-between border-b border-gray-300 pb-2 mb-4">
//             <div>
//               <h2 className="font-semibold">Dr. {doctor.fullName}</h2>
//               <p className="text-gray-700 text-sm">
//                 {doctor.specialty || "Specialist"}
//               </p>
//             </div>
//             {doctor.profileImageUrl && (
//               <img
//                 src={doctor.profileImageUrl}
//                 alt="Doctor"
//                 className="w-16 h-16 rounded-full border"
//               />
//             )}
//           </div>

//           {/* Patient ID */}
//           <div className="mb-4">
//             <label className="font-medium">Patient ID:</label>
//             <input
//               type="text"
//               value={formData.patientId}
//               onChange={(e) =>
//                 setFormData({ ...formData, patientId: e.target.value })
//               }
//               className="border-b border-gray-500 focus:outline-none ml-2 w-1/2"
//               placeholder="Enter patient GUID"
//               required
//             />
//           </div>

//           {/* Medicines Section */}
//           <div className="mb-6">
//             <label className="font-medium block mb-2">Medicines:</label>
//             {formData.medicines.map((med, index) => (
//               <div key={index} className="flex gap-2 mb-2">
//                 <input
//                   type="text"
//                   placeholder="Medicine Name"
//                   value={med.name}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "name", e.target.value)
//                   }
//                   className="border-b border-gray-500 focus:outline-none flex-1"
//                   required
//                 />
//                 <input
//                   type="text"
//                   placeholder="Dosage"
//                   value={med.dosage}
//                   onChange={(e) =>
//                     handleMedicineChange(index, "dosage", e.target.value)
//                   }
//                   className="border-b border-gray-500 focus:outline-none flex-1"
//                   required
//                 />
//                 {formData.medicines.length > 1 && (
//                   <button
//                     type="button"
//                     onClick={() => removeMedicine(index)}
//                     className="text-red-600 font-bold"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addMedicine}
//               className="text-blue-600 text-sm mt-1"
//             >
//               ➕ Add Medicine
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             disabled={loading}
//             className="bg-green-600 text-white px-4 py-2 rounded w-full"
//           >
//             {loading ? "Sending..." : "Send Prescription"}
//           </button>

//           {/* Signature & QR after submission */}
//           {successMsg && (
//             <div className="mt-6">
//               <p className="text-green-600 font-medium">{successMsg}</p>
//               <div className="flex justify-between mt-6">
//                 {/* Signature */}
//                 <div>
//                   <p className="text-sm text-gray-500">Doctor's Signature</p>
//                   {doctor.signatureUrl ? (
//                     <img
//                       src={doctor.signatureUrl}
//                       alt="Signature"
//                       className="w-32 border-b border-gray-500"
//                     />
//                   ) : (
//                     <div className="h-12 border-b border-gray-500 w-32"></div>
//                   )}
//                 </div>
//                 {/* QR Code */}
//                 {qrCode && (
//                   <div>
//                     <p className="text-sm text-gray-500">QR Code</p>
//                     <img
//                       src={`data:image/png;base64,${qrCode}`}
//                       alt="Prescription QR"
//                       className="w-32 h-32 border"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPrescription, getDoctorProfile } from "../../services/doctorService";
import Sidebar from "../../components/dashboard/Sidebar";

const PrescriptionPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState({});
  const [formData, setFormData] = useState({
    patientId: "",
    hospitalId: "",
    medicines: [{ name: "", dosage: "" }]
  });
  const [qrCode, setQrCode] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch doctor profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getDoctorProfile();
        setDoctorInfo(profile);

        // Autofill hospital ID if available
        setFormData((prev) => ({
          ...prev,
          hospitalId: profile.hospitalId || ""
        }));
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMedicineChange = (index, field, value) => {
    const updated = [...formData.medicines];
    updated[index][field] = value;
    setFormData({ ...formData, medicines: updated });
  };

  const addMedicine = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: "", dosage: "" }]
    });
  };

  const removeMedicine = (index) => {
    const updated = formData.medicines.filter((_, i) => i !== index);
    setFormData({ ...formData, medicines: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setQrCode(null);

    try {
      const res = await createPrescription(formData);
      if (res.qrCode) {
        setQrCode(res.qrCode);
        setSuccessMsg("✅ Prescription created successfully!");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("❌ Failed to create prescription");
    }
  };

  if (loading) return <div className="p-6">Loading prescription page...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Prescription Header */}
        <div className="bg-white p-6 rounded shadow-md max-w-4xl mx-auto border border-gray-300">
          <div className="text-center border-b pb-3">
            <h1 className="text-2xl font-bold">{doctorInfo.hospitalName}</h1>
            <p className="text-gray-600">{doctorInfo.hospitalAddress}</p>
          </div>

          <div className="flex justify-between mt-4 border-b pb-3">
            <div>
              <p className="font-semibold">{doctorInfo.fullName}</p>
              <p className="text-gray-600">{doctorInfo.specialty}</p>
            </div>
            {doctorInfo.signatureUrl && (
              <img
                src={doctorInfo.signatureUrl}
                alt="Doctor Signature"
                className="h-12"
              />
            )}
          </div>

          {/* Prescription Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label className="block font-medium">Patient ID</label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>

            {/* Medicines */}
            <div className="mb-4">
              <label className="block font-medium">Medicines</label>
              {formData.medicines.map((med, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                    className="border p-2 flex-1 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedicineChange(index, "dosage", e.target.value)}
                    className="border p-2 flex-1 rounded"
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeMedicine(index)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addMedicine} className="text-blue-500">
                ➕ Add Medicine
              </button>
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
              Send Prescription
            </button>
          </form>

          {/* QR Code */}
          {qrCode && (
            <div className="mt-6 text-center">
              <img
                src={`data:image/png;base64,${qrCode}`}
                alt="Prescription QR"
                className="mx-auto w-40 h-40"
              />
              <p className="mt-2 text-green-600">{successMsg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPage;
