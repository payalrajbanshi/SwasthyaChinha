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
// import React, { useState, useEffect } from "react";
// import TopNav from "../../components/Patient/TopNav";
// import BottomNav from "../../components/Patient/BottomNav";
// import SummaryCard from "../../components/Patient/SummaryCard";
// import PrescriptionFeedItem from "../../components/Patient/PrescriptionFeedItem";

// export default function Dashboard() {
//   const [prescriptions, setPrescriptions] = useState([]);

//   useEffect(() => {
//     // Replace with your API
//     fetch("/api/patient/prescriptions")
//       .then(res => res.json())
//       .then(data => setPrescriptions(data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <TopNav />

//       {/* Summary Cards */}
//       <div className="p-4 grid grid-cols-2 gap-4">
//         <SummaryCard title="Last Visit" value="Aug 20, 2025" />
//         <SummaryCard title="Total Prescriptions" value={prescriptions.length} />
//       </div>

//       {/* Feed */}
//       <div className="flex-1 overflow-y-auto p-4">
//         {prescriptions.length > 0 ? (
//           prescriptions
//             .slice()
//             .reverse() // latest on top
//             .map((p, idx) => (
//               <PrescriptionFeedItem key={idx} prescription={p} />
//             ))
//         ) : (
//           <p className="text-gray-500 text-center">No prescriptions yet.</p>
//         )}
//       </div>

//       <BottomNav />
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Dashboard() {
//   const [patient, setPatient] = useState(null);
//   const [appointments, setAppointments] = useState([]);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);

//   const patientId = localStorage.getItem("patientId"); 
//   // 👆 assuming patientId is saved in localStorage after login

//   useEffect(() => {
//     if (!patientId) return;

//     // Fetch profile
//     axios.get(`/api/patient/profile/${patientId}`)
//       .then(res => setPatient(res.data))
//       .catch(err => console.error("Profile fetch error:", err));

//     // Fetch appointments
//     axios.get(`/api/patient/appointments/${patientId}`)
//       .then(res => setAppointments(res.data))
//       .catch(err => console.error("Appointments fetch error:", err));

//     // Fetch prescriptions
//     axios.get(`/api/patient/prescriptions/${patientId}`)
//       .then(res => setPrescriptions(res.data))
//       .catch(err => console.error("Prescription fetch error:", err));

//     // Fetch last visit
//     axios.get(`/api/patient/visits/${patientId}`)
//       .then(res => setLastVisit(res.data))
//       .catch(err => console.error("Visit fetch error:", err));
//   }, [patientId]);

//   if (!patient) return <p className="p-6">Loading dashboard...</p>;

//   return (
//     <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      
//       {/* Profile Summary */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Profile Summary</h2>
//         <p><strong>Name:</strong> {patient.name}</p>
//         <p><strong>Email:</strong> {patient.email}</p>
//         <p><strong>Age:</strong> {patient.age}</p>
//       </div>

//       {/* Last Visit */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Last Visit</h2>
//         {lastVisit ? (
//           <>
//             <p><strong>Doctor:</strong> {lastVisit.doctorName}</p>
//             <p><strong>Date:</strong> {lastVisit.date}</p>
//             <p><strong>Reason:</strong> {lastVisit.reason}</p>
//           </>
//         ) : (
//           <p>No visit records found.</p>
//         )}
//       </div>

//       {/* Last Prescription */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Last Prescription</h2>
//         {prescriptions.length > 0 ? (
//           <>
//             <p><strong>Medicine:</strong> {prescriptions[0].medicine}</p>
//             <p><strong>Dosage:</strong> {prescriptions[0].dosage}</p>
//           </>
//         ) : (
//           <p>No prescriptions available.</p>
//         )}
//       </div>

//       {/* Upcoming Appointments */}
//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-xl font-bold mb-2">Upcoming Appointments</h2>
//         {appointments.length > 0 ? (
//           <ul className="list-disc ml-5">
//             {appointments.map((appt, index) => (
//               <li key={index}>
//                 {appt.date} at {appt.time} with {appt.doctorName}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No upcoming appointments.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import API from "../../api";
// import { Link } from "react-router-dom";
// import API, { getProfile, getPrescriptions } from "../../api";


// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);
//   const [lastPrescription, setLastPrescription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const prof = await API.get("/patient/profile");
//         setProfile(prof.data);

//         const pres = await API.get("/patient/prescriptions");
//         setPrescriptions(pres.data);

//         const lv = await API.get(`/patient/last-visit/${prof.data.id}`);
//         setLastVisit(lv.data);

//         const lp = await API.get(`/patient/last-prescription/${prof.data.id}`);
//         setLastPrescription(lp.data);
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Profile Card */}
//       {profile && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-2">👤 My Profile</h2>
//           <p><strong>Name:</strong> {profile.fullName}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Phone:</strong> {profile.phoneNumber}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//         </div>
//       )}

//       {/* Last Visit + Last Prescription */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {lastVisit && (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">🩺 Last Visit</h2>
//             <p>{new Date(lastVisit.date).toLocaleString()}</p>
//             <p>Doctor: {lastVisit.doctorName}</p>
//           </div>
//         )}
//         {lastPrescription && (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">💊 Last Prescription</h2>
//             <p>{new Date(lastPrescription.createdAt).toLocaleString()}</p>
//             <p>Doctor: {lastPrescription.doctorName}</p>
//             <p>Hospital: {lastPrescription.hospitalName}</p>
//             <Link
//               to={`/patient/prescription/${lastPrescription.id}`}
//               className="text-blue-600 underline"
//             >
//               View Details
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Prescription Feed */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed</h2>
//         {prescriptions.length > 0 ? (
//           prescriptions.map((p) => (
//             <div
//               key={p.id}
//               className="border-b border-gray-200 py-2 flex justify-between"
//             >
//               <div>
//                 <p className="font-medium">{p.doctorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <Link
//                 to={`/patient/prescription/${p.id}`}
//                 className="text-green-600 underline"
//               >
//                 View
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import API, { getProfile, getPrescriptions, getLastPrescription, getLastVisit } from "../../api";

// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);
//   const [lastPrescription, setLastPrescription] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch profile
//         const profRes = await getProfile();
//         setProfile(profRes.data);

//         // Fetch prescriptions
//         const presRes = await getPrescriptions();
//         setPrescriptions(presRes.data);

//         // Fetch last visit
//         const lvRes = await getLastVisit(profRes.data.id);
//         setLastVisit(lvRes.data);

//         // Fetch last prescription
//         const lpRes = await getLastPrescription(profRes.data.id);
//         setLastPrescription(lpRes.data);

//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       {/* Profile Card */}
//       {profile && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-2">👤 My Profile</h2>
//           <p><strong>Name:</strong> {profile.fullName}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Phone:</strong> {profile.phoneNumber}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//         </div>
//       )}

//       {/* Last Visit + Last Prescription */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {lastVisit && (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">🩺 Last Visit</h2>
//             <p>{new Date(lastVisit.date).toLocaleString()}</p>
//             <p>Doctor: {lastVisit.doctorName}</p>
//           </div>
//         )}
//         {lastPrescription && (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">💊 Last Prescription</h2>
//             <p>{new Date(lastPrescription.createdAt).toLocaleString()}</p>
//             <p>Doctor: {lastPrescription.doctorName}</p>
//             <p>Hospital: {lastPrescription.hospitalName}</p>
//             <Link
//               to={`/patient/prescription/${lastPrescription.id}`}
//               className="text-blue-600 underline"
//             >
//               View Details
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Prescription Feed */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed</h2>
//         {prescriptions.length > 0 ? (
//           prescriptions.map((p) => (
//             <div
//               key={p.id}
//               className="border-b border-gray-200 py-2 flex justify-between"
//             >
//               <div>
//                 <p className="font-medium">{p.doctorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(p.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//               <Link
//                 to={`/patient/prescription/${p.id}`}
//                 className="text-green-600 underline"
//               >
//                 View
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import API, { getProfile, getPrescriptions, getLastPrescription, getLastVisit } from "../../services/api";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);
//   const [lastPrescription, setLastPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const profResp = await getProfile();
//         const prof = profResp.data;
//         if (!prof) throw new Error("Profile not found");
//         setProfile(prof);

//         const presResp = await getPrescriptions();
//         setPrescriptions(presResp.data || []);

//         const lvResp = await getLastVisit(prof.id);
//         setLastVisit(lvResp.data || null);

//         const lpResp = await getLastPrescription(prof.id);
//         setLastPrescription(lpResp.data || null);

//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//         if (err.response) {
//           if (err.response.status === 401) {
//             setError("Unauthorized. Please login again.");
//           } else if (err.response.status === 500) {
//             setError("Server error. Please try later.");
//           } else {
//             setError("Failed to load dashboard.");
//           }
//         } else {
//           setError(err.message || "Something went wrong.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-gray-500 text-lg">Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-lg">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Profile Card */}
//       {profile && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-2">👤 My Profile</h2>
//           <p><strong>Name:</strong> {profile.fullName}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Phone:</strong> {profile.phoneNumber}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//         </div>
//       )}

//       {/* Last Visit + Last Prescription */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {lastVisit ? (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">🩺 Last Visit</h2>
//             <p>{new Date(lastVisit.date).toLocaleString()}</p>
//             <p>Doctor: {lastVisit.doctorName}</p>
//           </div>
//         ) : (
//           <div className="bg-white shadow rounded-lg p-4 text-gray-500">
//             🩺 No visits yet
//           </div>
//         )}
//         {lastPrescription ? (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">💊 Last Prescription</h2>
//             <p>{new Date(lastPrescription.createdAt).toLocaleString()}</p>
//             <p>Doctor: {lastPrescription.doctorName}</p>
//             <p>Hospital: {lastPrescription.hospitalName}</p>
//             <Link
//               to={`/patient/prescription/${lastPrescription.id}`}
//               className="text-blue-600 underline"
//             >
//               View Details
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white shadow rounded-lg p-4 text-gray-500">
//             💊 No prescriptions yet
//           </div>
//         )}
//       </div>

//       {/* Prescription Feed */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed</h2>
//         {prescriptions.length > 0 ? (
//           prescriptions.map((p) => (
//             <div
//               key={p.prescriptionId}
//               className="border-b border-gray-200 py-2 flex justify-between"
//             >
//               <div>
//                 <p className="font-medium">{p.doctorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(p.dateIssued).toLocaleDateString()}
//                 </p>
//               </div>
//               <Link
//                 to={`/patient/prescription/${p.prescriptionId}`}
//                 className="text-green-600 underline"
//               >
//                 View
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getPrescriptions } from "../../services/api";

// export default function Dashboard() {
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const presResp = await getPrescriptions();
//         setPrescriptions(presResp.data || []);
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//         setError("Failed to load prescriptions.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div className="p-6">Loading...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Prescription Feed */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescriptions</h2>
//         {prescriptions.length > 0 ? (
//           prescriptions.map((p) => (
//             <div
//               key={p.prescriptionId}
//               className="border-b border-gray-200 py-2 flex justify-between"
//             >
//               <div>
//                 <p className="font-medium">{p.doctorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(p.dateIssued).toLocaleDateString()}
//                 </p>
//               </div>
//               <Link
//                 to={`/patient/prescription/${p.prescriptionId}`}
//                 className="text-green-600 underline"
//               >
//                 View
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { getProfile, getPrescriptions, getLastVisit, getLastPrescription } from "../../services/api";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);
//   const [lastPrescription, setLastPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // ✅ Fetch profile
//         const profResp = await getProfile();
//         const prof = profResp.data;
//         if (!prof) throw new Error("Profile not found");
//         setProfile(prof);

//         // ✅ Fetch prescriptions
//         const presResp = await getPrescriptions();
//         setPrescriptions(presResp.data || []);

//         // ✅ Fetch last visit
//         try {
//           const lvResp = await getLastVisit(prof.id);
//           setLastVisit(lvResp.data || null);
//         } catch (err) {
//           console.warn("No last visit found or endpoint missing");
//         }

//         // ✅ Fetch last prescription
//         try {
//           const lpResp = await getLastPrescription(prof.id);
//           setLastPrescription(lpResp.data || null);
//         } catch (err) {
//           console.warn("No last prescription found or endpoint missing");
//         }

//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//         if (err.response) {
//           if (err.response.status === 401) {
//             setError("Unauthorized. Please login again.");
//           } else if (err.response.status === 500) {
//             setError("Server error. Please try later.");
//           } else if (err.response.status === 404) {
//             setError("Resource not found.");
//           } else {
//             setError("Failed to load dashboard.");
//           }
//         } else {
//           setError(err.message || "Something went wrong.");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-gray-500 text-lg">Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-red-500 text-lg">{error}</div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       {/* Profile Card */}
//       {profile && (
//         <div className="bg-white shadow rounded-lg p-4">
//           <h2 className="text-xl font-bold mb-2">👤 My Profile</h2>
//           <p><strong>Name:</strong> {profile.fullName}</p>
//           <p><strong>Gender:</strong> {profile.gender}</p>
//           <p><strong>Phone:</strong> {profile.phoneNumber}</p>
//           <p><strong>Address:</strong> {profile.address}</p>
//         </div>
//       )}

//       {/* Last Visit + Last Prescription */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {lastVisit ? (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">🩺 Last Visit</h2>
//             <p>{new Date(lastVisit.date).toLocaleString()}</p>
//             <p>Doctor: {lastVisit.doctorName}</p>
//           </div>
//         ) : (
//           <div className="bg-white shadow rounded-lg p-4 text-gray-500">
//             🩺 No visits yet
//           </div>
//         )}

//         {lastPrescription ? (
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="text-lg font-semibold">💊 Last Prescription</h2>
//             <p>{new Date(lastPrescription.dateIssued).toLocaleString()}</p>
//             <p>Doctor: {lastPrescription.doctorName}</p>
//             <p>Hospital: {lastPrescription.hospitalName}</p>
//             <Link
//               to={`/patient/prescription/${lastPrescription.prescriptionId}`}
//               className="text-blue-600 underline"
//             >
//               View Details
//             </Link>
//           </div>
//         ) : (
//           <div className="bg-white shadow rounded-lg p-4 text-gray-500">
//             💊 No prescriptions yet
//           </div>
//         )}
//       </div>

//       {/* Prescription Feed */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed</h2>
//         {prescriptions.length > 0 ? (
//           prescriptions.map((p) => (
//             <div
//               key={p.prescriptionId}
//               className="border-b border-gray-200 py-2 flex justify-between"
//             >
//               <div>
//                 <p className="font-medium">{p.doctorName}</p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(p.dateIssued).toLocaleDateString()}
//                 </p>
//               </div>
//               <Link
//                 to={`/patient/prescription/${p.prescriptionId}`}
//                 className="text-green-600 underline"
//               >
//                 View
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No prescriptions found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { getProfile, getPrescriptions, getLastVisit, getLastPrescription } from "../../services/api";
// import TopNav from "../../components/Patient/TopNav";
// import BottomNav from "../../components/Patient/BottomNav";
// import SummaryCard from "../../components/Patient/SummaryCard";
// import PrescriptionCard from "../../components/Patient/PrescriptionCard";


// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   const [lastVisit, setLastVisit] = useState(null);
//   const [lastPrescription, setLastPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const profResp = await getProfile();
//         setProfile(profResp.data);

//         const presResp = await getPrescriptions();
//         setPrescriptions(presResp.data || []);

//         // const lvResp = await getLastVisit(profResp.data.id);
//         // setLastVisit(lvResp.data || null);

//         // const lpResp = await getLastPrescription(profResp.data.id);
//         // setLastPrescription(lpResp.data || null);
//       } catch (err) {const lvResp = await getLastVisit();
// setLastVisit(lvResp.data || null);

// const lpResp = await getLastPrescription();
// setLastPrescription(lpResp.data || null);

//         console.error(err);
//         setError(err.response?.data?.message || err.message || "Failed to load dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <TopNav profile={profile} />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <SummaryCard title="Last Visit" data={lastVisit} />
//         <SummaryCard title="Last Prescription" data={lastPrescription} />
//       </div>

//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed</h2>
//         {prescriptions.length > 0 ? prescriptions.map(p => (
//           <PrescriptionCard key={p.prescriptionId} prescription={p} />
//         )) : <p className="text-gray-500">No prescriptions found.</p>}
//       </div>

//       <BottomNav />
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { getProfile, getPrescriptions } from "../../services/api";
// import TopNav from "../../components/Patient/TopNav";
// import BottomNav from "../../components/Patient/BottomNav";
// //import SummaryCard from "../../components/Patient/SummaryCard";
// import PrescriptionCard from "../../components/Patient/PrescriptionCard";
// import PrescriptionFeed from "../../components/Patient/PrescriptionFeed"; // 👈 added here

// export default function Dashboard() {
//   const [profile, setProfile] = useState(null);
//   const [prescriptions, setPrescriptions] = useState([]);
//   //const [lastVisit, setLastVisit] = useState(null);
//   //const [lastPrescription, setLastPrescription] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const profResp = await getProfile();
//         setProfile(profResp.data);

//         const presResp = await getPrescriptions();
//         setPrescriptions(presResp.data || []);

//         // const lvResp = await getLastVisit();
//         // setLastVisit(lvResp.data || null);

//         // const lpResp = await getLastPrescription();
//         // setLastPrescription(lpResp.data || null);

//       } catch (err) {
//         console.error(err);
//         setError(err.response?.data?.message || err.message || "Failed to load dashboard.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6 space-y-6">
//       <TopNav profile={profile} />

//       {/* Summary Section */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <SummaryCard title="Last Visit" data={lastVisit} />
//         <SummaryCard title="Last Prescription" data={lastPrescription} />
//       </div> */}

//       {/* Existing Prescription List */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📋 Prescription Feed (From API)</h2>
//         {prescriptions.length > 0 ? prescriptions.map(p => (
//           <PrescriptionCard key={p.prescriptionId} prescription={p} />
//         )) : <p className="text-gray-500">No prescriptions found.</p>}
//       </div>

//       {/* New PrescriptionFeed Component */}
//       <div className="bg-white shadow rounded-lg p-4">
//         <h2 className="text-xl font-bold mb-4">📌 Prescription Feed Component</h2>
//         <PrescriptionFeed />
//       </div>

//       <BottomNav />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import TopNav from "../../components/Patient/TopNav";
import BottomNav from "../../components/Patient/BottomNav";
import PrescriptionFeed from "../../components/Patient/PrescriptionFeed";
import { getProfile } from "../../services/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <TopNav profile={profile} />

      <div className="flex h-[75vh] gap-4">
        <PrescriptionFeed />
      </div>

      <BottomNav />
    </div>
  );
}
