namespace SwasthyaChinha.API.Models
{
    public class PrescriptionItem
    {
        public int Id { get; set; }
        public int PrescriptionId { get; set; }
          public Prescription Prescription { get; set; } // navigation property
        public string MedicineName { get; set; }
        public string Dosage { get; set; }
        public decimal Cost { get; set; }
    }
}
