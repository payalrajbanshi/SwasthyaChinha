// import React from "react";

// export default function MedicineList({ medicines }) {
//   return (
//     <div className="space-y-2">
//       {medicines.map((med, idx) => (
//         <div key={idx} className="p-2 border rounded flex justify-between">
//           <div>
//             <p className="font-semibold">{med.name}</p>
//             <p className="text-sm text-gray-600">
//               {med.dosage} - {med.timing} - {med.duration}
//             </p>
//           </div>
//           <p className="text-sm font-medium">{med.notes}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
import React from "react";

export default function MedicineList({ medicines }) {
  if (!medicines || medicines.length === 0) return <p>No medicines listed.</p>;

  return (
    <ul className="list-disc pl-5">
      {medicines.map((m, idx) => (
        <li key={idx}>{m.name} - {m.dosage} - ${m.price}</li>
      ))}
    </ul>
  );
}

