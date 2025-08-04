// import React from "react";
// import Sidebar from "../../components/dashboard/Sidebar";

// const PrescriptionPage = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 p-6 bg-gray-100">
//         <h1 className="text-2xl font-bold mb-4">Create Prescription</h1>
//         <div className="bg-white shadow rounded-lg p-4">
//           <p>[Prescription Form will go here]</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrescriptionPage;
import React, { useState } from "react";
import { createPrescription } from "../../services/doctorService";
import Sidebar from "../../components/dashboard/Sidebar";

const PrescriptionPage = () => {
  const [patientId, setPatientId] = useState("");
  const [hospitalId, setHospitalId] = useState(""); // Autofill later
  const [medicines, setMedicines] = useState([{ name: "", dosage: "" }]);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState(null);
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
    setQrCode(null);

    try {
      const res = await createPrescription({
        patientId,
        hospitalId,
        medicines,
      });

      // If backend sends QRCode in response, save it
      if (res.qrCode) {
        setQrCode(res.qrCode);
      }

      setSuccessMsg("✅ Prescription created successfully!");
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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Create Prescription</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-3xl">
          {/* Patient ID */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Hospital ID */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Hospital ID</label>
            <input
              type="text"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>

          {/* Medicines */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Medicines</label>
            {medicines.map((med, index) => (
              <div key={index} className="flex gap-2 mb-2">
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            {loading ? "Sending..." : "Send Prescription"}
          </button>

          {/* Success Message */}
          {successMsg && (
            <p className="text-green-600 text-sm mt-2">{successMsg}</p>
          )}
        </form>

        {/* QR Code Display */}
        {qrCode && (
          <div className="mt-6 bg-white p-4 rounded shadow-md max-w-sm">
            <h2 className="font-semibold mb-2">Prescription QR Code</h2>
            <img
              src={`data:image/png;base64,${qrCode}`}
              alt="Prescription QR"
              className="w-40 h-40"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;
