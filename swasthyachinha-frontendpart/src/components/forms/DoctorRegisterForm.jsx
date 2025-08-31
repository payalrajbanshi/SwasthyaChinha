import React, { useState } from "react";
import api from "../../services/api";

const DoctorRegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    password: "",
  });

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // ✅ HospitalId from localStorage (set after login/register of HospitalAdmin)
  const hospitalId = localStorage.getItem("hospitalId");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("You must be logged in to register a doctor.");
      if (!hospitalId) throw new Error("Hospital ID not found. Please log in as Hospital Admin.");

      await api.post(
        "/hospital/register-doctor",
        {
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          specialty: formData.specialty,
          password: formData.password,
          hospitalId: hospitalId, // ✅ Sent automatically
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("✅ Doctor registered successfully.");
      setError(null);

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        specialty: "",
        password: "",
      });

      if (onSuccess) onSuccess(); // Refresh list if provided
    } catch (err) {
      setError(err.response?.data?.message || err.message || "❌ Registration failed");
      setSuccess(null);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Register New Doctor</h2>
      {success && <div className="text-green-600 mb-2">{success}</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          onChange={handleChange}
          value={formData.fullName}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="phoneNumber"
          onChange={handleChange}
          value={formData.phoneNumber}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="specialty"
          onChange={handleChange}
          value={formData.specialty}
          placeholder="Specialty"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ HospitalId is hidden but sent automatically */}
        <input type="hidden" name="hospitalId" value={hospitalId || ""} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorRegisterForm;
