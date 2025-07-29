namespace SwasthyaChinha.API.DTOs.Hospital
{
    public class RegisterDoctorDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Specialty { get; set; }
        public string HospitalId { get; set; }
        public string Password { get; set; }
    }
}