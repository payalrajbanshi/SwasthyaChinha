// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PrescriptionQuickForm = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h3 className="text-lg font-semibold mb-2">Quick Prescription</h3>
//       <button
//         className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
//         onClick={() => navigate("/doctor/prescribe")}
//       >
//         Add New Prescription
//       </button>
//     </div>
//   );
// };

// export default PrescriptionQuickForm;
import React, { useState } from "react";
import { createPrescription } from "../../services/doctorService";

const PrescriptionQuickForm = () => {
  const [patientId, setPatientId] = useState("");
  const [hospitalId, setHospitalId] = useState(""); // Can autofill if always same
  const [medicines, setMedicines] = useState([{ name: "", dosage: "" }]);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleMedicineChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "" }]);
  };

  const removeMedicine = (index) => {
    const updated = medicines.filter((_, i) => i !== index);
    setMedicines(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await createPrescription({
        patientId,
        hospitalId,
        medicines
      });
      setSuccessMsg("✅ Prescription sent successfully!");
      setPatientId("");
      setHospitalId("");
      setMedicines([{ name: "", dosage: "" }]);
    } catch (error) {
      console.error("Error creating prescription:", error);
      alert("❌ Failed to create prescription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="font-semibold mb-3">Quick Prescription</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          placeholder="Hospital ID"
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        {medicines.map((med, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              placeholder="Medicine Name"
              value={med.name}
              onChange={(e) =>
                handleMedicineChange(index, "name", e.target.value)
              }
              className="border p-2 flex-1 rounded"
              required
            />
            <input
              type="text"
              placeholder="Dosage"
              value={med.dosage}
              onChange={(e) =>
                handleMedicineChange(index, "dosage", e.target.value)
              }
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

        <button
          type="button"
          onClick={addMedicine}
          className="text-blue-500 text-sm"
        >
          ➕ Add Medicine
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Sending..." : "Send Prescription"}
        </button>

        {successMsg && (
          <p className="text-green-600 text-sm mt-2">{successMsg}</p>
        )}
      </form>
    </div>
  );
};

export default PrescriptionQuickForm;
