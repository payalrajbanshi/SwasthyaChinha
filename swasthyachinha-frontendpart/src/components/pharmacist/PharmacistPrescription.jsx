import React, { useState } from "react";
import QRScanner from "./QRScanner";
import PrescriptionCard from "./PrescriptionCard";
import pharmacistService from "../../services/pharmacistService";

export default function PharmacistPrescription() {
  const [manualId, setManualId] = useState("");
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrescription = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await pharmacistService.getPrescriptionById(id, token);
      setPrescription(res);
    } catch (err) {
      setError(err.message || "Failed to fetch prescription");
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async () => {
    if (!prescription) return;
    try {
      const token = localStorage.getItem("token");
      await pharmacistService.markAsDispensed(prescription.prescriptionId, token);
      setPrescription({ ...prescription, isDispensed: true });
    } catch (err) {
      alert(err.message || "Failed to mark as dispensed");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Prescription ID"
          value={manualId}
          onChange={(e) => setManualId(e.target.value)}
          className="border px-2 py-1 mr-2 rounded"
        />
        <button
          onClick={() => fetchPrescription(manualId)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Fetch
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {prescription && (
        <PrescriptionCard prescription={prescription} onDispense={handleDispense} />
      )}

      <QRScanner onScan={(data) => fetchPrescription(data)} />
    </div>
  );
}
