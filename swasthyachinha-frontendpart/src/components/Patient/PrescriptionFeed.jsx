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
import { useEffect, useState } from "react";
import { getPatientPrescriptions } from "../../services/patientService";
//import QRCode from "qrcode.react";

const PrescriptionFeed = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPatientPrescriptions();
        setPrescriptions(res.data || []); // ✅ fetch from API
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading prescriptions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex h-[80vh] bg-gray-100 rounded-xl shadow-lg">
      {/* Left Side: Chat Feed */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Prescription Chat Feed</h2>

        {prescriptions.length === 0 ? (
          <p className="text-gray-500">No prescriptions found.</p>
        ) : (
          <div className="flex flex-col space-y-3">
            {prescriptions.map((prescription, index) => (
              <div
                key={prescription.id}
                onClick={() => setSelectedPrescription(prescription)}
                className={`cursor-pointer max-w-[70%] p-3 rounded-xl shadow transition
                  ${index % 2 === 0 ? "bg-green-100 self-start" : "bg-blue-100 self-end"}
                  hover:scale-[1.02]`}
              >
                <p className="text-sm font-semibold">
                  Prescription sent by {prescription.doctorName}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(prescription.dateIssued).toLocaleDateString()}
                </p>
                <p className="text-xs mt-1 text-gray-700">
                  {prescription.medicines?.length || 0} medicines prescribed
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Prescription Detail / Printable */}
      <div className="w-[40%] p-4 border-l bg-white">
        <h2 className="text-lg font-bold mb-3">Prescription Detail</h2>

        {!selectedPrescription ? (
          <p className="text-gray-500">Select a prescription to view</p>
        ) : (
          <div id="prescription-detail" className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-bold text-green-600 mb-2">
              Prescription
            </h3>
            <p>
              <strong>Doctor:</strong> {selectedPrescription.doctorName}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedPrescription.dateIssued).toLocaleDateString()}
            </p>
            <h4 className="mt-3 font-semibold">Medicines:</h4>
            <ul className="list-disc list-inside text-sm mb-3">
              {selectedPrescription.medicines?.map((med, i) => (
                <li key={i}>
                  {med.name} – {med.dosage}
                </li>
              ))}
            </ul>

            {/* QR Code */}
            <div className="flex justify-center my-4">
              <QRCode
                value={JSON.stringify(selectedPrescription)} // could encode prescriptionId
                size={100}
              />
            </div>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
            >
              Print Prescription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionFeed;
