// import { useEffect, useState } from "react";
// import { getDoctors } from "../../services/hospitalService";

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const hospitalId = localStorage.getItem("hospitalId");

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const { data } = await getDoctors("/hospital/doctors");
//         setDoctors(data);
//       } catch (err) {
//         console.error("❌ Failed to fetch doctors:", err);
//       }
//     };
//     if (hospitalId) fetchDoctors();
//   }, [hospitalId]);

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
//       <h2 className="text-xl font-semibold mb-4">Doctors</h2>
//       {doctors.length > 0 ? (
//         <ul className="space-y-2">
//           {doctors.map((doc) => (
//             <li key={doc.id} className="border p-3 rounded flex justify-between">
//               <span>{doc.fullName} – {doc.specialty}</span>
//               <span className="text-gray-500">{doc.email}</span>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500">No doctors registered yet.</p>
//       )}
//     </div>
//   );
// };

// export default DoctorList;
import { useEffect, useState } from "react";
import { getDoctors } from "../../services/hospitalService";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await getDoctors(); // ✅ no hospitalId param
        setDoctors(data);
      } catch (err) {
        console.error("❌ Failed to fetch doctors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg mt-6">
        ⏳ Loading doctors...
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Doctors</h2>
      {doctors.length > 0 ? (
        <ul className="space-y-2">
          {doctors.map((d) => (
            <li key={d.id} className="border p-3 rounded">
              {d.fullName} – {d.email || "No email"} – {d.specialty || "N/A"}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No doctors found.</p>
      )}
    </div>
  );
};

export default DoctorList;
