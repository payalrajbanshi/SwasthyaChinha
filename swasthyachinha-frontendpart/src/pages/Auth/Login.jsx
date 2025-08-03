
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login } from "../../services/auth";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setMessage("");

//     console.log("🔐 Logging in with:", formData);

//     try {
//       const data = await login(formData);
//       console.log("✅ Login successful:", data);

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       localStorage.setItem("userId", data.userId);

//          if (data.role.toLowerCase() === "hospitaladmin" && data.hospitalId) {
//         // Assuming backend returns hospitalId or fallback to userId if missing
//         localStorage.setItem("hospitalId", data.userId);
//       }

//       setMessage("✅ Login successful");

//       // Delay navigation so user sees success message
//       setTimeout(() => {
//         setLoading(false);
//         switch (data.role.toLowerCase()) {
//           case "patient":
//             navigate("/patient/dashboard");
//             break;
//           case "doctor":
//             navigate("/doctor/dashboard");
//             break;
//           case "pharmacist":
//             navigate("/pharmacist/dashboard");
//             break;
//           case "hospitaladmin":
//             navigate("/hospital/dashboard");
//             break;
//           default:
//             navigate("/");
//         }
//       }, 1200);
//     } catch (err) {
//       console.error("Login Failed:", err);
//       setError(err.response?.data?.message || "❌ Login failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

//         <input
//           type="text"
//           name="emailOrPhone"
//           placeholder="Email or Phone"
//           value={formData.emailOrPhone}
//           onChange={handleChange}
//           required
//           className="w-full p-2 mb-4 border rounded"
//         />

//         <div className="relative mb-4">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//           />
//           <div
//             className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
//           </div>
//         </div>

//         {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
//         {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full ${
//             loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
//           } text-white py-2 rounded`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await loginUser(formData);
      console.log("✅ Login successful:", data);

      // Store token, role, hospitalId
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.hospitalId) {
        localStorage.setItem("hospitalId", data.hospitalId);
      } else {
        localStorage.removeItem("hospitalId");
      }

      setMessage("✅ Login successful");

      // Redirect based on role
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
      console.error("Login Failed:", err);
      setError(err.response?.data?.message || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone"
          value={formData.emailOrPhone}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="relative mb-4">
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

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {message && <p className="text-green-600 mb-4 text-center">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
