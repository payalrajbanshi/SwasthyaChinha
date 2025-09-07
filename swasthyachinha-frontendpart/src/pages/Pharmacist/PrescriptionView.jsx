
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPrescriptionByQR, dispenseMedicine } from "../../services/pharmacistService";
import PrescriptionCard from "../../components/pharmacist/PrescriptionCard";

export default function PrescriptionView() {
  const { qr } = useParams(); // this is QRCodeData from the URL
  const [prescription, setPrescription] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const data = await getPrescriptionByQR(qr, token);
        setPrescription(data);
      } catch {
        setError("Prescription not found");
      }
    };
    fetchPrescription();
  }, [qr, token]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!prescription) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <PrescriptionCard
        prescription={prescription}
        onDispense={
          !prescription.isDispensed
            ? async () => {
                try {
                  await dispenseMedicine(prescription.prescriptionId, token);
                  setPrescription({ ...prescription, isDispensed: true });
                } catch {
                  alert("Failed to dispense");
                }
              }
            : null
        }
      />
    </div>
  );
}
