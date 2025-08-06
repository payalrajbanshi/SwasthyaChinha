namespace SwasthyaChinha.API.DTOs.Doctor
{
    public class DoctorProfileDTO
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Specialty { get; set; }
        public string HospitalName { get; set; }
        public string HospitalAddress { get; set; }
        public string ProfileImageUrl { get; set; }
        public string SignatureUrl { get; set; }
         public Guid HospitalId { get; set; }
    }
}
