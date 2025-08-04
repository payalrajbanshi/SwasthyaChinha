import React from "react";

const PatientsTable = ({ patients }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">My Patients</h3>
      <table className="min-w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th className="p-2">Patient ID</th>
            <th className="p-2">Last Visit</th>
          </tr>
        </thead>
        <tbody>
          {patients?.map((p, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2">{p.fullName}</td>
              <td className="p-2">{p.patientId}</td>
              <td className="p-2">{p.lastVisitDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientsTable;
