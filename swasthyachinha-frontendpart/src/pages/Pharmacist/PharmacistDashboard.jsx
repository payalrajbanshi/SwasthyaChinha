import React from "react";

export default function PharmacistDashboard() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        👋 Welcome, Pharmacist!
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-2">✅ Prescriptions Verified Today</h2>
          <p className="text-3xl font-bold text-gray-700">14</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold text-green-800 mb-2">📦 Medicines Dispensed</h2>
          <p className="text-3xl font-bold text-gray-700">27</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🔍 Scan QR
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            📄 Verify Prescription
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            💊 Dispense Medicine
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            ☎️ Contact Support
          </button>
        </div>
      </div>

      {/* Recent Prescriptions Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🕒 Recent Prescriptions</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>John Doe - Paracetamol 500mg - Verified ✔️</li>
          <li>Jane Smith - Amoxicillin 250mg - Dispensed 📦</li>
          <li>Raj Sharma - Ibuprofen 400mg - Pending ❌</li>
        </ul>
      </div>
    </main>
  );
}
