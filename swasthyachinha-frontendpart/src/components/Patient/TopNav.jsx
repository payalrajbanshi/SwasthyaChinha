import React from "react";

export default function TopNav({ profile }) {
  return (
    <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg">
      <h1 className="text-xl font-bold">Welcome, {profile?.fullName}</h1>
    </div>
  );
}
