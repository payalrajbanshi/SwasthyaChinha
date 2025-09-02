

import React, { useState } from "react";

export default function PrescriptionDetail({ prescription: initialPrescription }) {
  const [prescription, setPrescription] = useState(initialPrescription);
  const [manualId, setManualId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchPrescription = async (id) => {
    if (!id.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/pharmacist/prescription/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Prescription not found");
      const data = await res.json();
      setPrescription(data);
    } catch (err) {
      setError(err.message);
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  if (!prescription && !loading) return <p className="p-4">No prescription selected.</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      {loading && <p className="text-blue-500 mb-2">Loading...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {prescription && (
        <>
          {/* Hospital Info */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl uppercase">
              {prescription.hospitalName || "Unknown Hospital"}
            </h1>
            <p className="text-sm text-gray-600">{prescription.hospitalAddress || "-"}</p>
          </div>

          {/* Patient + Doctor Info */}
          <div className="flex justify-between mb-6">
            <div>
              <p className="font-semibold text-sm">Patient Name</p>
              <p>{prescription.patientName || "Unknown"}</p>
              <p className="font-semibold text-sm mt-2">Age</p>
              <p>{prescription.patientAge || "-"}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">{prescription.doctorName || "Unknown"}, MD</p>
              <p className="text-sm">{prescription.doctorSpecialty || "-"}</p>
            </div>
          </div>

          {/* Diagnosis */}
          {prescription.diagnosis && (
            <div className="mb-6">
              <p className="font-semibold text-sm">Diagnosis</p>
              <p className="italic text-lg">{prescription.diagnosis}</p>
            </div>
          )}

          {/* Medicines */}
          <div className="mb-6 text-lg italic space-y-2">
            {prescription.medicines?.length > 0 ? (
              prescription.medicines.map((m, i) => (
                <p key={i}>
                  {m.name} {m.dosage} – {m.instructions || "as directed"}
                </p>
              ))
            ) : (
              <p>No medicines prescribed.</p>
            )}
          </div>

          {/* Signature + QR */}
          <div className="flex justify-between items-center mt-6">
            <div>
              <p className="italic">{prescription.doctorName || "Unknown"}, MD</p>
              <div className="border-t border-black w-40 mt-1"></div>
              <p className="text-xs">Signature</p>
            </div>
            <div className="flex flex-col items-center">
              {/* ✅ QR image from backend (Base64) */}
              {prescription.qrCode && (
                <img
                  src={`data:image/png;base64,${prescription.qrCode}`}
                  alt="QR Code"
                  className="w-28 h-28"
                />
              )}

              {/* ✅ Prescription ID shown below QR */}
              <p className="text-sm mt-2 text-gray-700">
                Prescription ID:{" "}
                <span className="font-mono">{prescription.qrCodeData}</span>
              </p>

              {/* Manual Entry Fallback */}
              <p className="text-xs text-gray-600 mt-2">Or enter Prescription ID manually:</p>
              <div className="flex gap-1 mt-1">
                <input
                  type="text"
                  placeholder="Prescription ID"
                  value={manualId}
                  onChange={(e) => setManualId(e.target.value)}
                  className="border rounded px-2 py-1 w-36 text-sm text-center"
                />
                <button
                  onClick={() => fetchPrescription(manualId)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
