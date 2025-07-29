namespace SwasthyaChinha.API.DTOs.Hospital
{
    public class PatientStatsDTO
    {
        public string PatientId { get; set; }
        public string PatientName { get; set; }
        public int TotalVisits { get; set; }
        public decimal TotalExpense { get; set; }
    }
}