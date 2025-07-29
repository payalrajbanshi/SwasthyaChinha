namespace SwasthyaChinha.API.DTOs.Auth
{
    public class AuthResponseDTO
    {
        public string Token { get; set; }
        public Guid UserId { get; set; }
        public string Role { get; set; }
       
    }
}