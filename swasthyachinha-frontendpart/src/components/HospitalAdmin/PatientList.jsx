// import { useEffect, useState } from "react";
// import { getPatients } from "../../services/hospitalService";

// const PatientList = () => {
//   const [patients, setPatients] = useState([]);
//   const hospitalId = localStorage.getItem("hospitalId");

//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         const { data } = await getPatients(hospitalId);
//         setPatients(data);
//       } catch (err) {
//         console.error("❌ Failed to fetch patients:", err);
//       }
//     };
//     if (hospitalId) fetchPatients();
//   }, [hospitalId]);

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
//       <h2 className="text-xl font-semibold mb-4">Patients</h2>
//       {patients.length > 0 ? (
//         <ul className="space-y-2">
//           {patients.map((p) => (
//             <li key={p.id} className="border p-3 rounded">
//               {p.fullName} – {p.email}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No patients found.</p>
//       )}
//     </div>
//   );
// };

// export default PatientList;

import { useEffect, useState } from "react";
import { getPatients } from "../../services/hospitalService";
import { getPatientStats } from "../../services/hospitalService";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await getPatientStats(hospitalId); // ✅ no hospitalId param
        setPatients(data);
      } catch (err) {
        console.error("❌ Failed to fetch patients:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg mt-6">
        ⏳ Loading patients...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Patients</h2>
      {patients.length > 0 ? (
        <ul className="space-y-2">
          {patients.map((p) => (
            <li key={p.patientid} className="border p-3 rounded">
              {/* {p.FullName} – {p.email || "No email"} */}
               {/* {p.fullName || p.FullName} – {p.email || p.Email || "No email"} */}
               {p.fullName} – {p.email || p.username || "No email"}

               
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No patients found.</p>
      )}
    </div>
  );
};

export default PatientList;
