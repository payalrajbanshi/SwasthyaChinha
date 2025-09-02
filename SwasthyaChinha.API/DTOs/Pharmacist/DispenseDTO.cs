namespace SwasthyaChinha.API.DTOs.Pharmacist
{
    public class DispenseDTO
    {
        public string PrescriptionId { get; set; }
        public decimal TotalCost { get; set; }
        public string PharmacistId { get; set; }
        public List<MedicineDTO> Medicines { get; set; }
    }
}