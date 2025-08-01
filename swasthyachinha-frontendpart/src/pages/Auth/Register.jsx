
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const allowedRoles = ["patient", "pharmacist", "hospitaladmin"];

const Register = () => {
  const { role } = useParams();
  const normalizedRole = role?.toLowerCase();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!allowedRoles.includes(normalizedRole)) {
      setMessage("🚫 Invalid role. Please use a valid registration URL like /register/patient");
      setFormData({});
      return;
    }

    setMessage("");

    const defaultFields = {
      patient: {
        fullName: "",
        dateOfBirth: "",
        gender: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      pharmacist: {
        fullName: "",
        licenseNumber: "",
        pharmacyName: "",
        phoneNumber: "",
        email: "",
        password: "",
      },
      hospitaladmin: {
        hospitalName: "",
        email: "",
        password: "",
      },
    };

    setFormData(defaultFields[normalizedRole]);
  }, [normalizedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await registerUser(normalizedRole, formData);
      setMessage("✅ Registration successful!");
      console.log("Registration response:", res);
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.description ||
        "❌ Registration failed. Please check your inputs.";
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key) =>
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 capitalize">
        {allowedRoles.includes(normalizedRole)
          ? `${normalizedRole} Registration`
          : "Invalid Role"}
      </h2>

      {allowedRoles.includes(normalizedRole) ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) =>
            key === "password" ? (
              <div key={key} className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </div>
              </div>
            ) : (
              <input
                key={key}
                type={key === "dateOfBirth" ? "date" : "text"}
                name={key}
                placeholder={formatLabel(key)}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded"
              />
            )
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      ) : null}

      {message && (
        <div
          className={`mt-4 text-center text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;
