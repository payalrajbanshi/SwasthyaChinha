import React, { useEffect, useState } from "react";
import api from "../../services/api";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients assigned to doctor
    api.get("/doctor/patients").then((res) => setPatients(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Patients</h1>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <ul className="space-y-2">
          {patients.map((p) => (
            <li key={p.Id} className="p-3 bg-white shadow rounded">
              <p className="font-semibold">{p.fullName}</p>
              <p className="text-gray-600">{p.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientsPage;
