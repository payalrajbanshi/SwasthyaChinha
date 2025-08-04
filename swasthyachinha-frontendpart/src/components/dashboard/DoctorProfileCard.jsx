import React from "react";

const DoctorProfileCard = ({ doctor }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
      <img
        src={doctor?.profileImageUrl || 
            "https://via.placeholder.com/80?text=Doctor"
        }
        alt="Doctor"
        className="w-16 h-16 rounded-full object-cover border"
      />
      <div>
        <h2 className="text-lg font-semibold">{doctor?.fullName}</h2>
        <p className="text-gray-500">{doctor?.specialty}</p>
        <p className="text-gray-500">{doctor?.hospitalName}</p>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
