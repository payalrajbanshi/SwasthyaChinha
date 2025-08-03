
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { registerUser } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const allowedRoles = ["patient", "pharmacist", "hospitaladmin"];

// const Register = () => {
//   const { role } = useParams();
//   const normalizedRole = role?.toLowerCase();

//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (!allowedRoles.includes(normalizedRole)) {
//       setMessage("🚫 Invalid role. Please use a valid registration URL like /register/patient");
//       setFormData({});
//       return;
//     }

//     setMessage("");

//     const defaultFields = {
//       patient: {
//         fullName: "",
//         dateOfBirth: "",
//         gender: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       },
//       pharmacist: {
//         fullName: "",
//         licenseNumber: "",
//         pharmacyName: "",
//         phoneNumber: "",
//         email: "",
//         password: "",
//       },
//       hospitaladmin: {
//         hospitalName: "",
//         email: "",
//         password: "",
//       },
//     };

//     setFormData(defaultFields[normalizedRole]);
//   }, [normalizedRole]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await registerUser(normalizedRole, formData);
//       setMessage("✅ Registration successful!");
//       console.log("Registration response:", res);
//     } catch (err) {
//       console.error("Registration error:", err);
//       const errorMsg =
//         err.response?.data?.message ||
//         err.response?.data?.errors?.[0]?.description ||
//         "❌ Registration failed. Please check your inputs.";
//       setMessage(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatLabel = (key) =>
//     key
//       .replace(/([A-Z])/g, " $1")
//       .replace(/^./, (str) => str.toUpperCase());

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
//       <h2 className="text-2xl font-semibold mb-4 capitalize">
//         {allowedRoles.includes(normalizedRole)
//           ? `${normalizedRole} Registration`
//           : "Invalid Role"}
//       </h2>

//       {allowedRoles.includes(normalizedRole) ? (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((key) =>
//             key === "password" ? (
//               <div key={key} className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 />
//                 <div
//                   className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//                 </div>
//               </div>
//             ) : (
//               <input
//                 key={key}
//                 type={key === "dateOfBirth" ? "date" : "text"}
//                 name={key}
//                 placeholder={formatLabel(key)}
//                 value={formData[key]}
//                 onChange={handleChange}
//                 required
//                 className="w-full border p-2 rounded"
//               />
//             )
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       ) : null}

//       {message && (
//         <div
//           className={`mt-4 text-center text-sm ${
//             message.includes("success") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;
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
    addres: "",
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
          <input
      name="fullName"
      placeholder="Your Full Name"
      onChange={handleChange}
      value={formData.fullName}
      className="w-full border p-2 mb-4 rounded"
      required
    />
          <input
            name="hospitalName"
            placeholder="Hospital Name"
            onChange={handleChange}
            value={formData.hospitalName}
            className="w-full border p-2 mb-4 rounded"
            required
          />
           <input
      name="phoneNumber"
      placeholder="Phone Number"
      onChange={handleChange}
      value={formData.phoneNumber}
      className="w-full border p-2 mb-4 rounded"
    />
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
