import React from "react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";

export default function PatientDashboard() {
  const patientName = "Aashish"; // Replace with actual user data
  const currentMedicines = ["Paracetamol", "Amoxicillin", "Vitamin D"];
  const qrValue = "https://swasthyachinha.com/prescription/123456"; // Replace with actual link

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
      {/* Welcome */}
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        Welcome back, {patientName} 👋
      </h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Current Medicines */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">💊 Current Medicines</h2>
          <ul className="list-disc list-inside text-gray-600">
            {currentMedicines.map((med, idx) => (
              <li key={idx}>{med}</li>
            ))}
          </ul>
        </div>

        {/* QR Code for Prescription */}
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📱 QR Code for Prescription</h2>
          <QRCode value={qrValue} size={150} />
          <p className="text-sm text-gray-500 mt-2">Scan this at the pharmacy</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📃 Quick Links</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/prescriptions"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Prescriptions
          </Link>
        </div>
      </div>

      {/* Recent Prescriptions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🕒 Recent Visits & Prescriptions</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <ul className="text-gray-600 space-y-2">
            <li>📅 2025-07-10 – Dr. Sharma – Antibiotics prescribed</li>
            <li>📅 2025-07-01 – Dr. Mehta – Fever and cough meds</li>
            <li>📅 2025-06-20 – Dr. Singh – Routine checkup</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
