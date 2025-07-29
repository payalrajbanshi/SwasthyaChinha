import DoctorForm from "../../components/HospitalAdmin/DoctorForm";
import { useNavigate } from "react-router-dom";

const RegisterDoctor = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
      <DoctorForm onSuccess={() => navigate("/dashboard")} />
    </div>
  );
};

export default RegisterDoctor;
