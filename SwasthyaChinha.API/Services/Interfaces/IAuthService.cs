// using SwasthyaChinha.API.Models.Auth;
// using SwasthyaChinha.API.DTOs;

// namespace SwasthyaChinha.API.Services.Interfaces
// {
//     // public interface IAuthService
//     // {
//     //     Task<AuthResponseDTO> LoginAsync(LoginDTO loginDto);
//     //     Task<AuthResponseDTO> RegisterAsync(RegisterDTO registerDto);
//     // }
//     public interface IAuthService
// {
//     Task<string> LoginAsync(LoginDto loginDto);
//     Task RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto);
//     Task RegisterDoctorAsync(RegisterDoctorDto dto);
//     Task RegisterPatientAsync(RegisterPatientDto dto);
//     Task RegisterPharmacistAsync(RegisterPharmacistDto dto);
// }

// }
using SwasthyaChinha.API.Models.Auth;
using SwasthyaChinha.API.DTOs;


namespace SwasthyaChinha.API.Services.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<AuthResponseDto> RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto);
        Task<AuthResponseDto> RegisterDoctorAsync(RegisterDoctorDto dto);
        Task<AuthResponseDto> RegisterPatientAsync(RegisterPatientDto dto);
        Task<AuthResponseDto> RegisterPharmacistAsync(RegisterPharmacistDto dto);
    }
}

