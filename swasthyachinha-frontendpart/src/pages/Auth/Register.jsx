import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { registerUser } from "../../services/auth";

const Register = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // role from URL (patient, doctor, hospitaladmin, pharmacist)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    specialty: "",
    licenseNumber: "",
    hospitalName: "",
    gender: "",
    dateOfBirth: "",
    pharmacyName: ""
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await registerUser(role, formData);
      console.log("✅ Registration successful:", data);

      // Store token, role, hospitalId (if HospitalAdmin)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.hospitalId) {
        localStorage.setItem("hospitalId", data.hospitalId);
      } else {
        console.warn("⚠️ No hospitalId returned from backend");
        localStorage.removeItem("hospitalId");
      }

      setMessage("✅ Registration successful");

      // Redirect after small delay
      setTimeout(() => {
        switch (data.role.toLowerCase()) {
          case "patient":
            navigate("/patient/dashboard");
            break;
          case "doctor":
            navigate("/doctor/dashboard");
            break;
          case "pharmacist":
            navigate("/pharmacist/dashboard");
            break;
          case "hospitaladmin":
            navigate("/hospital/dashboard");
            break;
          default:
            navigate("/");
        }
      }, 800);
    } catch (err) {
      console.error("Registration Failed:", err);
      setError(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Register as {role}
        </h2>

        {/* Dynamic Fields */}
        {role === "hospitaladmin" && (
          <>
          {/* <input
      name="fullName"
      placeholder="Your Full Name"
      onChange={handleChange}
      value={formData.fullName}
      className="w-full border p-2 mb-4 rounded"
      required
    /> */}
          <input
            name="hospitalName"
            placeholder="Hospital Name"
            onChange={handleChange}
            value={formData.hospitalName}
            className="w-full border p-2 mb-4 rounded"
            required
          />
           {/* <input
      name="phoneNumber"
      placeholder="Phone Number"
      onChange={handleChange}
      value={formData.phoneNumber}
      className="w-full border p-2 mb-4 rounded"
    /> */}
    <input
      name="address"
      placeholder="Address"
      onChange={handleChange}
      value={formData.address}
      className="w-full border p-2 mb-4 rounded"
    />
          </>
        )}

        {role === "doctor" && (
          <>
            <input
              name="specialty"
              placeholder="Specialty"
              onChange={handleChange}
              value={formData.specialty}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            <input
              name="licenseNumber"
              placeholder="License Number"
              onChange={handleChange}
              value={formData.licenseNumber}
              className="w-full border p-2 mb-4 rounded"
              required
            />
          </>
        )}

        {role === "patient" && (
          <>
            <input
              name="gender"
              placeholder="Gender"
              onChange={handleChange}
              value={formData.gender}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              onChange={handleChange}
              value={formData.dateOfBirth}
              className="w-full border p-2 mb-4 rounded"
              required
            />
          </>
        )}

        {role === "pharmacist" && (
          <>
            <input
              name="pharmacyName"
              placeholder="Pharmacy Name"
              onChange={handleChange}
              value={formData.pharmacyName}
              className="w-full border p-2 mb-4 rounded"
              required
            />
            <input
              name="licenseNumber"
              placeholder="License Number"
              onChange={handleChange}
              value={formData.licenseNumber}
              className="w-full border p-2 mb-4 rounded"
              required
            />
          </>
        )}

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          value={formData.fullName}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          value={formData.phoneNumber}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full border p-2 mb-4 rounded"
          required
        />

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
