namespace SwasthyaChinha.API.DTOs.Hospital
{
public class UpdateHospitalDTO
{
    public string HospitalName { get; set; }
    public string Address { get; set; }
    public string LogoUrl { get; set; } // optional, if you store in hospital or user
}

}