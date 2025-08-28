export default function PrescriptionCard({ prescription, onDispense }) {
  return (
    <div className="border p-4 rounded shadow bg-white mb-4">
      <h2 className="font-bold">Prescription Details</h2>
      <p>Patient: {prescription.patientName}</p>
      <p>Doctor: {prescription.doctorName}</p>
      <p>Hospital: {prescription.hospitalName}</p>

      <h3 className="mt-2 font-semibold">Medicines</h3>
      <ul className="list-disc pl-5">
        {prescription.medicines.map((m, i) => (
          <li key={i}>
            {m.name} - {m.dosage} - Rs.{m.price}
          </li>
        ))}
      </ul>

      <p className="mt-2">
        Status: {prescription.isDispensed ? "✅ Dispensed" : "⏳ Pending"}
      </p>

      {!prescription.isDispensed && onDispense && (
        <button
          onClick={onDispense}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Mark as Dispensed
        </button>
      )}
    </div>
  );
}
