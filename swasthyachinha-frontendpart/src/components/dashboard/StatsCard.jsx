import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold text-blue-700">{value}</p>
    </div>
  );
};

export default StatsCard;
