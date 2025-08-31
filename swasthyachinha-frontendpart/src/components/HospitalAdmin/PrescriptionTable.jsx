// const PrescriptionTable = ({ prescriptions }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
//       <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-green-100 text-green-900">
//               <th className="py-2 px-4">Date</th>
//               <th className="py-2 px-4">Doctor</th>
//               <th className="py-2 px-4">Patient</th>
//               <th className="py-2 px-4">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {prescriptions.length > 0 ? (
//               prescriptions.map((p, idx) => (
//                 <tr key={idx} className="border-b hover:bg-green-50">
//                   <td className="py-2 px-4">{new Date(p.date).toLocaleDateString()}</td>
//                   <td className="py-2 px-4">{p.doctor}</td>
//                   <td className="py-2 px-4">{p.patient}</td>
//                   <td className="py-2 px-4">
//                     <span className={`px-3 py-1 rounded-full text-sm ${
//                       p.status === "Active" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
//                     }`}>
//                       {p.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr><td colSpan="4" className="py-4 text-center text-gray-500">No prescriptions found.</td></tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionTable;
const formatDate = (d) => {
  if (!d) return "-";
  const date = new Date(d);
  return Number.isNaN(date.getTime()) ? "-" : date.toLocaleDateString();
};

const PrescriptionTable = ({ prescriptions = [] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Prescriptions</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-900">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Doctor</th>
              <th className="py-3 px-4">Patient</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.length > 0 ? (
              prescriptions.map((p, idx) => (
                <tr key={p.id || idx} className="border-b hover:bg-green-50 transition">
                  <td className="py-3 px-4">{formatDate(p.date || p.createdAt)}</td>
                  <td className="py-3 px-4">{p.doctor || p.doctorName || "-"}</td>
                  <td className="py-3 px-4">{p.patient || p.patientName || "-"}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        (p.status || "").toLowerCase() === "active"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {p.status || "-"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No prescriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionTable;
