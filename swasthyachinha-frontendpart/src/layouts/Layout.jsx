// // src/layouts/Layout.jsx
// import { Outlet, NavLink } from "react-router-dom";
// import { Home, UserPlus, FileText, Users, Settings } from "lucide-react";

// export default function Layout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg p-4 space-y-6">
//         <h1 className="text-2xl font-bold mb-8">🏥 SwasthyaChinha</h1>
//         <nav className="space-y-2">
//           <NavLink to="/hospital-dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
//             <Home className="w-5 h-5" /> Dashboard
//           </NavLink>
//           <NavLink to="/hospital-dashboard/doctors" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
//             <UserPlus className="w-5 h-5" /> Doctors
//           </NavLink>
//           <NavLink to="/hospital-dashboard/prescriptions" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
//             <FileText className="w-5 h-5" /> Prescriptions Audit
//           </NavLink>
//           <NavLink to="/hospital-dashboard/patients" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
//             <Users className="w-5 h-5" /> Patients
//           </NavLink>
//           <NavLink to="/hospital-dashboard/settings" className="flex items-center gap-2 p-2 rounded hover:bg-gray-200">
//             <Settings className="w-5 h-5" /> Settings
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
// src/components/Layout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { Home, UserPlus, FileText, Users, Settings } from "lucide-react";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4 space-y-6">
        <h1 className="text-2xl font-bold mb-8">🏥 SwasthyaChinha</h1>
        <nav className="space-y-2">
          <NavLink
            to="/hospital/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <Home className="w-5 h-5" /> Dashboard
          </NavLink>
          <NavLink
            to="/hospital/register-doctor"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <UserPlus className="w-5 h-5" /> Doctors
          </NavLink>
          <NavLink
            to="/hospital/prescriptions"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <FileText className="w-5 h-5" /> Prescriptions Audit
          </NavLink>
          <NavLink
            to="/hospital/patients"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <Users className="w-5 h-5" /> Patients
          </NavLink>
          <NavLink
            to="/hospital/settings"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-200"
          >
            <Settings className="w-5 h-5" /> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
