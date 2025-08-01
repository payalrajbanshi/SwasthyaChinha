import { useState } from "react";
import { registerDoctor } from "../../api/hospital";

const DoctorForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialty: "",
    hospitalId: "",
    password: "",
  });

  const hospitalId = localStorage.getItem("hospitalId");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorData = { ...form, hospitalId: localStorage.getItem("hospitalId"),

     };

    try {
      await registerDoctor(doctorData);
      alert("✅ Doctor registered successfully!");
      if (onSuccess) onSuccess();
    } catch (error) {
      alert("❌ Error registering doctor");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow w-full max-w-xl"
    >
      <h2 className="text-xl font-bold mb-4">Register New Doctor</h2>

      {[
        { name: "fullName", label: "Full Name" },
        { name: "email", label: "Email" },
        { name: "phoneNumber", label: "Phone Number" },
        { name: "specialty", label: "Specialty" },
        { name: "password", label: "Password", type: "password" },
      ].map(({ name, label, type = "text" }) => (
        <div key={name} className="mb-4">
          <label className="block mb-1 font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Register Doctor
      </button>
    </form>
  );
};

export default DoctorForm;
