namespace SwasthyaChinha.API.DTOs.Hospital
{
    public class HospitalStatsDTO
    {
        public string HospitalName { get; set; }
        public string Address { get; set; }
        public string LogoUrl { get; set; }
        public int TotalDoctors { get; set; }
        public int TotalPatients { get; set; }
        public int TotalPrescriptions { get; set; }
        public decimal TotalExpense { get; set; }
        public int UniquePatients { get; set; }
        public decimal TotalRevenue { get; set; }
        public int TotalPrescriptionsIssued { get; set; }
            public int PrescriptionsVerifiedToday { get; set; }
    public int ActivePrescriptions { get; set; }
    public int QRCodesGeneratedToday { get; set; }
    }
}
