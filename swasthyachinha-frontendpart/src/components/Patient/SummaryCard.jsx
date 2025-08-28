// import React from "react";

// export default function SummaryCard({ title, data }) {
//   if (!data) return <div className="bg-white shadow p-4 text-gray-500">{title}: No data</div>;

//   return (
//     <div className="bg-white shadow p-4 rounded-lg">
//       <h2 className="font-semibold">{title}</h2>
//       <p>{data.doctorName || "N/A"}</p>
//       <p>{data.hospitalName || ""}</p>
//       {data.visitDate && <p>{new Date(data.visitDate).toLocaleDateString()}</p>}
//     </div>
//   );
// }
