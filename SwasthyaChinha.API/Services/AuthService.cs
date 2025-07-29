// using SwasthyaChinha.API.Models.Auth;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Services.Interfaces;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using SwasthyaChinha.API.Data; // Correct context

// using BCrypt.Net;
// namespace SwasthyaChinha.API.Services
// {
//     public class AuthService : IAuthService
//     {
//         private readonly ApplicationDbContext _context;
//         private readonly IConfiguration _config;

//         public AuthService(ApplicationDbContext context, IConfiguration config)
//         {
//             _context = context;
//             _config = config;
//         }

//         public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto)
//         {
//             var userExists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
//             if (userExists) throw new Exception("User already exists");

//             var user = new ApplicationUser
//             {
//                 Id = Guid.NewGuid().ToString(),
//                 Email = dto.Email,
//                 FullName = dto.FullName,
//                 Role = dto.Role,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDTO
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 UserId = user.Id
//             };
//         }

//         public async Task<AuthResponseDTO> LoginAsync(LoginDTO dto)
//         {
//             var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
//             if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
//                 throw new Exception("Invalid credentials");

//             return new AuthResponseDTO
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 UserId = user.Id
//             };
//         }

//         private string GenerateJwtToken(ApplicationUser user)
//         {
//             var claims = new[]
//             {
//             new Claim(ClaimTypes.NameIdentifier, user.Id),
//             new Claim(ClaimTypes.Email, user.Email),
//             new Claim(ClaimTypes.Role, user.Role)
//         };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 _config["Jwt:Issuer"],
//                 _config["Jwt:Audience"],
//                 claims,
//                 expires: DateTime.Now.AddDays(7),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }



// public class AuthService : IAuthService
// {
//     private readonly ApplicationDbContext _context;
//     private readonly IJwtTokenGenerator _jwt;

//     public AuthService(ApplicationDbContext context, IJwtTokenGenerator jwt)
//     {
//         _context = context;
//         _jwt = jwt;
//     }

//     public async Task<string> LoginAsync(LoginDto loginDto)
//     {
//         var user = await _context.Users
//             .FirstOrDefaultAsync(u => (u.Email == loginDto.EmailOrPhone || u.PhoneNumber == loginDto.EmailOrPhone));

//         if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
//             throw new Exception("Invalid credentials");

//         return _jwt.GenerateToken(user);
//     }

//     public async Task RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto)
//     {
//         var user = new User
//         {
//             FullName = dto.HospitalName,
//             Email = dto.Email,
//             PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//             Role = "HospitalAdmin",
//             HospitalName = dto.HospitalName
//         };
//         _context.Users.Add(user);
//         await _context.SaveChangesAsync();
//     }

//     public async Task RegisterDoctorAsync(RegisterDoctorDto dto)
//     {
//         var user = new User
//         {
//             FullName = dto.FullName,
//             Email = dto.Email,
//             LicenseNumber = dto.LicenseNumber,
//             PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//             Role = "Doctor"
//         };
//         _context.Users.Add(user);
//         await _context.SaveChangesAsync();
//     }

//     public async Task RegisterPatientAsync(RegisterPatientDto dto)
//     {
//         var user = new User
//         {
//             FullName = dto.FullName,
//             Email = dto.Email,
//             PhoneNumber = dto.PhoneNumber,
//             PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//             Role = "Patient",
//             Gender = dto.Gender,
//             DateOfBirth = dto.DateOfBirth
//         };
//         _context.Users.Add(user);
//         await _context.SaveChangesAsync();
//     }

//     public async Task RegisterPharmacistAsync(RegisterPharmacistDto dto)
//     {
//         var user = new User
//         {
//             FullName = dto.FullName,
//             Email = dto.Email,
//             PhoneNumber = dto.PhoneNumber,
//             LicenseNumber = dto.LicenseNumber,
//             PharmacyName = dto.PharmacyName,
//             PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//             Role = "Pharmacist"
//         };
//         _context.Users.Add(user);
//         await _context.SaveChangesAsync();
//     }
// }
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Models.Auth;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using SwasthyaChinha.API.DTOs;


// namespace SwasthyaChinha.API.Services
// {
//     public class AuthService : IAuthService
//     {
//         private readonly ApplicationDbContext _context;
//         private readonly IConfiguration _config;

//         public AuthService(ApplicationDbContext context, IConfiguration config)
//         {
//             _context = context;
//             _config = config;
//         }

//         public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
//         {
//             var user = await _context.Users
//                 .FirstOrDefaultAsync(u => u.Email == loginDto.EmailOrPhone || u.PhoneNumber == loginDto.EmailOrPhone);

//             if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
//                 throw new Exception("Invalid credentials");

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email=user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.HospitalName,
//                 Email = dto.Email,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "HospitalAdmin",
//                 HospitalName = dto.HospitalName
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterDoctorAsync(RegisterDoctorDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 LicenseNumber = dto.LicenseNumber,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Doctor"
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterPatientAsync(RegisterPatientDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 PhoneNumber = dto.PhoneNumber,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Patient",
//                 Gender = dto.Gender,
//                 DateOfBirth = dto.DateOfBirth
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterPharmacistAsync(RegisterPharmacistDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 PhoneNumber = dto.PhoneNumber,
//                 LicenseNumber = dto.LicenseNumber,
//                 PharmacyName = dto.PharmacyName,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Pharmacist"
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         private string GenerateJwtToken(User user)
//         {
//             var claims = new[]
//             {
//                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
//                 new Claim(ClaimTypes.Email, user.Email),
//                 new Claim(ClaimTypes.Role, user.Role)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 _config["Jwt:Issuer"],
//                 _config["Jwt:Audience"],
//                 claims,
//                 expires: DateTime.Now.AddDays(7),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using SwasthyaChinha.API.Data;
// using SwasthyaChinha.API.Models;
// using SwasthyaChinha.API.Models.Auth;
// using SwasthyaChinha.API.Services.Interfaces;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using SwasthyaChinha.API.DTOs;

// namespace SwasthyaChinha.API.Services
// {
//     public class AuthService : IAuthService
//     {
//         private readonly ApplicationDbContext _context;
//         private readonly IConfiguration _config;

//         public AuthService(ApplicationDbContext context, IConfiguration config)
//         {
//             _context = context;
//             _config = config;
//         }

//         public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
//         {
//             var user = await _context.Users
//                 .FirstOrDefaultAsync(u => u.Email == loginDto.EmailOrPhone || u.PhoneNumber == loginDto.EmailOrPhone);

//             if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
//                 throw new Exception("Invalid credentials");

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.HospitalName,
//                 Email = dto.Email,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "HospitalAdmin",
//                 HospitalName = dto.HospitalName
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterDoctorAsync(RegisterDoctorDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 LicenseNumber = dto.LicenseNumber,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Doctor"
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             // Add to Doctors table
//             var doctor = new User
//             {
//                 Id = user.Id,
//                 FullName = user.FullName,
//                 Email = user.Email,
//                 LicenseNumber = user.LicenseNumber
//             };

//             _context.Users.Add(doctor);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterPatientAsync(RegisterPatientDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 PhoneNumber = dto.PhoneNumber,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Patient",
//                 Gender = dto.Gender,
//                 DateOfBirth = dto.DateOfBirth
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             // Add to Patients table
//             var patient = new Patient
//             {
//                 Id = user.Id,
//                 FullName = user.FullName,
//                 Gender = user.Gender,
//                 PhoneNumber = user.PhoneNumber,
//                 Address = "" // Optional: update to use dto.Address if needed
//             };

//             _context.Patients.Add(patient);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         public async Task<AuthResponseDto> RegisterPharmacistAsync(RegisterPharmacistDto dto)
//         {
//             var user = new User
//             {
//                 FullName = dto.FullName,
//                 Email = dto.Email,
//                 PhoneNumber = dto.PhoneNumber,
//                 LicenseNumber = dto.LicenseNumber,
//                 PharmacyName = dto.PharmacyName,
//                 PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
//                 Role = "Pharmacist"
//             };

//             _context.Users.Add(user);
//             await _context.SaveChangesAsync();

//             // Add to Pharmacists table
//             var pharmacist = new User
//             {
//                 Id = user.Id,
//                 FullName = user.FullName,
//                 Email = user.Email,
//                 PhoneNumber = user.PhoneNumber,
//                 PharmacyName = user.PharmacyName
//             };

//             _context.Users.Add(pharmacist);
//             await _context.SaveChangesAsync();

//             return new AuthResponseDto
//             {
//                 Token = GenerateJwtToken(user),
//                 Role = user.Role,
//                 Email = user.Email,
//                 UserId = user.Id.ToString()
//             };
//         }

//         private string GenerateJwtToken(User user)
//         {
//             var claims = new[]
//             {
//                 new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
//                 new Claim(ClaimTypes.Email, user.Email),
//                 new Claim(ClaimTypes.Role, user.Role)
//             };

//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

//             var token = new JwtSecurityToken(
//                 _config["Jwt:Issuer"],
//                 _config["Jwt:Audience"],
//                 claims,
//                 expires: DateTime.Now.AddDays(7),
//                 signingCredentials: creds
//             );

//             return new JwtSecurityTokenHandler().WriteToken(token);
//         }
//     }
// }
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Models.Auth;
using SwasthyaChinha.API.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SwasthyaChinha.API.DTOs;

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
                .FirstOrDefaultAsync(u => u.Email == loginDto.EmailOrPhone || u.PhoneNumber == loginDto.EmailOrPhone);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");
                var token = GenerateJwtToken(user);
            var response= new AuthResponseDto
            {
                Token = GenerateJwtToken(user),
                Role = user.Role,
                Email = user.Email,
                UserId = user.Id.ToString()
            };
             //  Add this: if the user is a HospitalAdmin, fetch their hospitalId
    if (user.Role == "HospitalAdmin" && user.HospitalId.HasValue)
    {
        // var hospital = await _context.Hospitals.FirstOrDefaultAsync(h => h.AdminId == user.Id);
        // if (hospital != null)
        {
            response.HospitalId = user.HospitalId.Value;
        }
    }

    return response;
        }

        public async Task<AuthResponseDto> RegisterHospitalAdminAsync(RegisterHospitalAdminDto dto)
        {
            var user = new User
            {
                FullName = dto.HospitalName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "HospitalAdmin",
                HospitalName = dto.HospitalName
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

        public async Task<AuthResponseDto> RegisterDoctorAsync(RegisterDoctorDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                LicenseNumber = dto.LicenseNumber,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Doctor"
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

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
