using System.Collections.Generic;

namespace SwasthyaChinha.API.DTOs.Pharmacist
{
    public class PrescriptionDTO
    {
        public string Id { get; set; }
        public string PatientName { get; set; }
        public string DoctorName { get; set; }
        public string Diagnosis { get; set; }
        public List<MedicineDTO> Medicines { get; set; }
        public string QRCode { get; set; }       // base64 image
        public string QRCodeData { get; set; }   // raw fallback QRID
    }

    public class MedicineDTO
    {
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Instructions { get; set; }
    }
}
