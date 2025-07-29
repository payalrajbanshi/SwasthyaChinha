namespace SwasthyaChinha.API.DTOs.Hospital
{
    public class DoctorStatsDTO
    {
        public string DoctorId { get; set; }
        public string DoctorName { get; set; }
        public int PrescriptionCount { get; set; }
        public decimal TotalPrescriptionCost { get; set; }
    }
}