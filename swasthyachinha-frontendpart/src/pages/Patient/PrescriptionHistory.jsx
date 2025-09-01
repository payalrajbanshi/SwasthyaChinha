
import React from "react";
import { Link } from "react-router-dom";

export default function PrescriptionCard({ prescription }) {
  return (
    <div className="border rounded-lg p-4 shadow mb-4 bg-white">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{prescription.doctorName}, MD</p>
          <p className="text-sm text-gray-500">{prescription.doctorSpecialty}</p>
          <p className="text-xs text-gray-400">
            {new Date(prescription.dateIssued).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/patient/prescription/${prescription.prescriptionId}`}
          className="text-green-600 underline"
        >
          View
        </Link>
      </div>
      <div className="mt-2 text-sm italic text-gray-700">
        {prescription.medicines?.slice(0, 2).map((m, i) => (
          <p key={i}>{m.name} {m.dosage}</p>
        ))}
        {prescription.medicines?.length > 2 && <p>...more</p>}
      </div>
    </div>
  );
}
