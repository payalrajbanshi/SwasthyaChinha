namespace SwasthyaChinha.API.DTOs.Patient
{
    public class PatientExpenseDTO
    {
        public DateTime Date { get; set; }
        public decimal Total { get; set; }
        public string PrescriptionId { get; set; }
    }
}