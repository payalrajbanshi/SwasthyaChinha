using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Models.Auth;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SwasthyaChinha.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email == loginDto.EmailOrPhone ||
                    u.PhoneNumber == loginDto.EmailOrPhone);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            var response = new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString()
            };

            // ✅ If HospitalAdmin, also return HospitalId
            if (user.Role == "HospitalAdmin" && user.HospitalId.HasValue)
            {
                response.HospitalId = user.HospitalId.Value;
            }

            return response;
        }

        public async Task<AuthResponseDto> RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto)
        {
            // 1. Check if email already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (existingUser != null)
                throw new Exception("Email is already registered.");

            // 2. Create Hospital
            var hospital = new Hospital
            {
                Name = dto.HospitalName,
                Address = dto.Address // Make sure dto has Address property
            };
            _context.Hospitals.Add(hospital);
            await _context.SaveChangesAsync(); // Save to get hospital.Id
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "HospitalAdmin",
                HospitalName = dto.HospitalName,
                PhoneNumber = dto.PhoneNumber,
                HospitalId = hospital.Id,
                Address = dto.Address
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString(),
                HospitalId = hospital.Id
            };
        }

        public async Task<AuthResponseDto> RegisterDoctorAsync(RegisterDoctorDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                LicenseNumber = dto.LicenseNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Doctor",
                Specialty = dto.Specialty,
                HospitalId = dto.HospitalId // ✅ Link to hospital
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString()
            };
        }

        public async Task<AuthResponseDto> RegisterPatientAsync(RegisterPatientDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Patient",
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            // ✅ Create Patient row
            var patient = new Patient
            {
                FullName = user.FullName,
                Gender = user.Gender,
                PhoneNumber = user.PhoneNumber,
                Address = "N/A",
                UserId = user.Id
            };

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();


            return new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString()
            };
        }

        public async Task<AuthResponseDto> RegisterPharmacistAsync(RegisterPharmacistDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                LicenseNumber = dto.LicenseNumber,
                PharmacyName = dto.PharmacyName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Pharmacist"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString()
            };
        }

        // private string GenerateJwtToken(User user)
        // {
        //     var claims = new[]
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //         new Claim(ClaimTypes.Email, user.Email),
        //         new Claim(ClaimTypes.Role, user.Role.ToLower())
        //     };

        //     var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //     var token = new JwtSecurityToken(
        //         _config["Jwt:Issuer"],
        //         _config["Jwt:Audience"],
        //         claims,
        //         expires: DateTime.Now.AddDays(7),
        //         signingCredentials: creds
        //     );

        //     return new JwtSecurityTokenHandler().WriteToken(token);
        // }
        private string GenerateJwtToken(User user)
{
    // Start with common claims
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Email, user.Email),
        new Claim(ClaimTypes.Role, user.Role.ToLower()) // ensures small p for pharmacist
    };

    // Add ID claim based on role
    if (user.Role == "Pharmacist")
    {
        // Pharmacist dashboard expects "id"
        claims.Add(new Claim("id", user.Id.ToString()));
    }
    else
    {
        // Other dashboards use standard NameIdentifier
        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
    }

    // JWT key and signing credentials
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    // Create token
    var token = new JwtSecurityToken(
        issuer: _config["Jwt:Issuer"],
        audience: _config["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddDays(7),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}





    }
}
