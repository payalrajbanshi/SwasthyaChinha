using SwasthyaChinha.API.DTOs.Doctor;

namespace SwasthyaChinha.API.DTOs.Patient
{
    public class PatientPrescriptionDTO
    {
        public string PrescriptionId { get; set; }
        public string DoctorName { get; set; }
        public string HospitalName { get; set; }
        public DateTime DateIssued { get; set; }
        public List<MedicineDTO> Medicines { get; set; }
        public decimal TotalCost { get; set; }
    }
    //  public class MedicineDTO
    // {
    //     public string Name { get; set; }
    //     public string Dosage { get; set; }
    //     public decimal Price { get; set; }
    // }
}