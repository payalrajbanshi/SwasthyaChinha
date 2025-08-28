import React from "react";
import { Link } from "react-router-dom";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 w-full bg-gray-100 p-2 flex justify-around shadow-inner">
      <Link to="/patient/dashboard">Dashboard</Link>
      <Link to="/patient/profile">Profile</Link>
      <Link to="/patient/notifications">Notifications</Link>
    </div>
  );
}
