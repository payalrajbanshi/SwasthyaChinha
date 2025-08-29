using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SwasthyaChinha.API.Models
{
    public class Prescription
    {
        public int Id { get; set; }
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid HospitalId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? QRCode { get; set; }
        // NEW: the short string you search by (e.g., "PRESC-123")
        [NotMapped]
    public string? QRCodeData { get; set; }
        public decimal? TotalCost { get; set; }
        public bool IsDispensed { get; set; } = false; // ✅ New property
        public string? Diagnosis { get; set; }

        public ICollection<PrescriptionItem>? Items { get; set; } = new List<PrescriptionItem>();
         // ✅ Add missing navigation properties
        public User? Doctor { get; set; }
        public Hospital? Hospital { get; set; }
        public Patient? Patient { get; set; }
    }
}
