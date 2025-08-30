// import React from "react";

// export default function Navbar() {
//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
//           <span>🩺</span> SwasthyaChinha
//         </div>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex gap-6 text-gray-700 text-sm font-medium">
//           <a href="#" className="hover:text-blue-600">Home</a>
//           <a href="#features" className="hover:text-blue-600">Features</a>
//           <a href="#roles" className="hover:text-blue-600">Users</a>
//           <a href="#contact" className="hover:text-blue-600">Contact</a>
//           <a href="/login" className="text-blue-600 hover:underline">Login</a>
//           <a href="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Register</a>
//         </nav>
//       </div>
//     </header>
//   );
// }
// import React, { useState } from "react";
// console.log("Navbar component loaded");
// import { Link } from "react-router-dom";
// import PrescriptionIcon from "../assets/prescription.png"; // Your custom logo

// export default function Navbar() {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [registerOpen, setRegisterOpen] = useState(false);

//   return (
//     <header className="sticky top-0 bg-white shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-green-800 flex items-center gap-2">
//           <img
//             src={PrescriptionIcon}
//             alt="SwasthyaChinha Logo"
//             className="w-6 h-6 object-contain"
//           />
//           SwasthyaChinha
//         </Link>

//         {/* Nav Links */}
//         <nav className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
//           <a href="#home" className="hover:text-green-700">Home</a>
//           <a href="#about" className="hover:text-green-700">About</a>
//           <a href="#features" className="hover:text-green-700">Features</a>
//           <a href="#contact" className="hover:text-green-700">Contact</a>

//           {/* Login Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setLoginOpen(true)}
//             onMouseLeave={() => setLoginOpen(false)}
//           >
//             <button className="flex items-center gap-1 hover:text-green-700">
//               Login <span className="text-sm">▼</span>
//             </button>
//             {loginOpen && (
//               <div className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1">
//                 <Link to="/login?role=patient" className="block hover:text-green-600 py-1">Patient</Link>
//                 <Link to="/login?role=doctor" className="block hover:text-green-600 py-1">Doctor</Link>
//                 <Link to="/login?role=pharmacy" className="block hover:text-green-600 py-1">Pharmacy</Link>
//                 <Link to="/login?role=hospital" className="block hover:text-green-600 py-1">Hospital</Link>
//               </div>
//             )}
//           </div>

//           {/* Register Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setRegisterOpen(true)}
//             onMouseLeave={() => setRegisterOpen(false)}
//           >
//             <button className="flex items-center gap-1 hover:text-green-700">
//               Register <span className="text-sm">▼</span>
//             </button>
//             {registerOpen && (
//               <div className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1">
//                 <Link to="/register/patient" className="block hover:text-green-600 py-1">Patient</Link>
//                 <Link to="/register/pharmacist" className="block hover:text-green-600 py-1">Pharmacy</Link>
//                 <Link to="/register/hospitaladmin" className="block hover:text-green-600 py-1">Hospital</Link>
//               </div>
//             )}
//           </div>

//           {/* CTA Button */}
//           <Link
//             to="/register"
//             className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Get Started
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import PrescriptionIcon from "../assets/prescription.png"; // Your custom logo

// console.log("Navbar component loaded");

// export default function Navbar() {
//   const [loginOpen, setLoginOpen] = useState(false);
//   const [registerOpen, setRegisterOpen] = useState(false);

//   return (
//     <header className="sticky top-0 bg-white shadow-sm z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-green-800 flex items-center gap-2">
//           <img
//             src={PrescriptionIcon}
//             alt="SwasthyaChinha Logo"
//             className="w-6 h-6 object-contain"
//           />
//           SwasthyaChinha
//         </Link>

//         {/* Nav Links */}
//         <nav className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
//           <a href="#home" className="hover:text-green-700">Home</a>
//           <a href="#about" className="hover:text-green-700">About</a>
//           <a href="#features" className="hover:text-green-700">Features</a>
//           <a href="#contact" className="hover:text-green-700">Contact</a>

//           {/* Login Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setLoginOpen(true)}
//             onMouseLeave={() => setLoginOpen(false)}
//           >
//             <button className="flex items-center gap-1 hover:text-green-700">
//               Login <span className="text-sm">▼</span>
//             </button>
//             {loginOpen && (
//               <div className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1">
//                 <Link to="/login?role=patient" className="block hover:text-green-600 py-1">Patient</Link>
//                 <Link to="/login?role=doctor" className="block hover:text-green-600 py-1">Doctor</Link>
//                 <Link to="/login?role=pharmacy" className="block hover:text-green-600 py-1">Pharmacy</Link>
//                 <Link to="/login?role=hospital" className="block hover:text-green-600 py-1">Hospital</Link>
//               </div>
//             )}
//           </div>

//           {/* Register Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setRegisterOpen(true)}
//             onMouseLeave={() => setRegisterOpen(false)}
//           >
//             <button className="flex items-center gap-1 hover:text-green-700">
//               Register <span className="text-sm">▼</span>
//             </button>
//             {registerOpen && (
//               <div className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1">
//                 <Link to="/register/patient" className="block hover:text-green-600 py-1">Patient</Link>
//                 <Link to="/register/pharmacist" className="block hover:text-green-600 py-1">Pharmacy</Link>
//                 <Link to="/register/hospitaladmin" className="block hover:text-green-600 py-1">Hospital</Link>
//               </div>
//             )}
//           </div>

//           {/* CTA Button */}
//           <Link
//             to="/register"
//             className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Get Started
//           </Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrescriptionIcon from "../assets/prescription.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-green-800">
          <img src={PrescriptionIcon} alt="Logo" className="w-6 h-6 object-contain" />
          SwasthyaChinha
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-800 font-medium">
          <a href="#home" className="hover:text-green-700 transition">Home</a>
          <a href="#about" className="hover:text-green-700 transition">About</a>
          <a href="#features" className="hover:text-green-700 transition">Features</a>
          <a href="#contact" className="hover:text-green-700 transition">Contact</a>

          {/* Login Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setLoginOpen(true)}
              onMouseLeave={() => setLoginOpen(false)}
              className="flex items-center gap-1 hover:text-green-700 transition"
            >
              Login <span className="text-sm">▼</span>
            </button>
            {loginOpen && (
              <div
                onMouseEnter={() => setLoginOpen(true)}
                onMouseLeave={() => setLoginOpen(false)}
                className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1 min-w-[120px]"
              >
                <Link to="/login?role=patient" className="block py-1 hover:text-green-600">Patient</Link>
                <Link to="/login?role=doctor" className="block py-1 hover:text-green-600">Doctor</Link>
                <Link to="/login?role=pharmacy" className="block py-1 hover:text-green-600">Pharmacy</Link>
                <Link to="/login?role=hospital" className="block py-1 hover:text-green-600">Hospital</Link>
              </div>
            )}
          </div>

          {/* Register Dropdown */}
          <div className="relative">
            <button
              onMouseEnter={() => setRegisterOpen(true)}
              onMouseLeave={() => setRegisterOpen(false)}
              className="flex items-center gap-1 hover:text-green-700 transition"
            >
              Register <span className="text-sm">▼</span>
            </button>
            {registerOpen && (
              <div
                onMouseEnter={() => setRegisterOpen(true)}
                onMouseLeave={() => setRegisterOpen(false)}
                className="absolute top-full left-0 bg-white border rounded shadow-lg py-2 px-4 mt-1 min-w-[120px]"
              >
                <Link to="/register/patient" className="block py-1 hover:text-green-600">Patient</Link>
                <Link to="/register/pharmacist" className="block py-1 hover:text-green-600">Pharmacy</Link>
                <Link to="/register/hospitaladmin" className="block py-1 hover:text-green-600">Hospital</Link>
              </div>
            )}
          </div>

          {/* CTA */}
          {/* <Link
            to="/register"
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Get Started
          </Link> */}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="focus:outline-none text-green-800 text-2xl"
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-green-50 px-4 pb-4 space-y-2">
          <a href="#home" className="block py-2 text-gray-800 hover:text-green-700 transition">Home</a>
          <a href="#about" className="block py-2 text-gray-800 hover:text-green-700 transition">About</a>
          <a href="#features" className="block py-2 text-gray-800 hover:text-green-700 transition">Features</a>
          <a href="#contact" className="block py-2 text-gray-800 hover:text-green-700 transition">Contact</a>

          {/* Login */}
          <div>
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="w-full text-left py-2 flex justify-between items-center hover:text-green-700 transition"
            >
              Login <span className="text-sm">{loginOpen ? "▲" : "▼"}</span>
            </button>
            {loginOpen && (
              <div className="pl-4">
                <Link to="/login?role=patient" className="block py-1 hover:text-green-600">Patient</Link>
                <Link to="/login?role=doctor" className="block py-1 hover:text-green-600">Doctor</Link>
                <Link to="/login?role=pharmacy" className="block py-1 hover:text-green-600">Pharmacy</Link>
                <Link to="/login?role=hospital" className="block py-1 hover:text-green-600">Hospital</Link>
              </div>
            )}
          </div>

          {/* Register */}
          <div>
            <button
              onClick={() => setRegisterOpen(!registerOpen)}
              className="w-full text-left py-2 flex justify-between items-center hover:text-green-700 transition"
            >
              Register <span className="text-sm">{registerOpen ? "▲" : "▼"}</span>
            </button>
            {registerOpen && (
              <div className="pl-4">
                <Link to="/register/patient" className="block py-1 hover:text-green-600">Patient</Link>
                <Link to="/register/pharmacist" className="block py-1 hover:text-green-600">Pharmacy</Link>
                <Link to="/register/hospitaladmin" className="block py-1 hover:text-green-600">Hospital</Link>
              </div>
            )}
          </div>

          {/* CTA */}
          <Link
            to="/register"
            className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
