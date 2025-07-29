// using Microsoft.AspNetCore.Identity;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.Extensions.Configuration;
// using Microsoft.IdentityModel.Tokens;
// using SwasthyaChinha.API.Models.Auth;
// using SwasthyaChinha.API.Models;
// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using System.Threading.Tasks;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class AuthController : ControllerBase
//     {
//         private readonly UserManager<ApplicationUser> _userManager;
//         private readonly SignInManager<ApplicationUser> _signInManager;
//         private readonly IConfiguration _configuration;

//         public AuthController(
//             UserManager<ApplicationUser> userManager,
//             SignInManager<ApplicationUser> signInManager,
//             IConfiguration configuration)
//         {
//             _userManager = userManager;
//             _signInManager = signInManager;
//             _configuration = configuration;
//         }

//         [HttpPost("register")]
//         public async Task<IActionResult> Register(RegisterDTO model)
//         {
//             var userExists = await _userManager.FindByEmailAsync(model.Email);
//             if (userExists != null)
//                 return BadRequest("User already exists!");

//             var user = new ApplicationUser
//             {
//                 Email = model.Email,
//                 UserName = model.Email,
//                 FullName = model.FullName,
//                 Role = model.Role,
//                 HospitalId = model.HospitalId
//             };

//             var result = await _userManager.CreateAsync(user, model.Password);

//             if (!result.Succeeded)
//                 return BadRequest(result.Errors);

//             // Assign Role (optional: add roles to IdentityRole store)
//             await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, model.Role));

//             //return Ok("User created successfully!");
//             // Generate token just like in login
// var authClaims = new[]
// {
//     new Claim(ClaimTypes.Name, user.UserName),
//     new Claim(ClaimTypes.NameIdentifier, user.Id),
//     new Claim(ClaimTypes.Role, model.Role)
// };

// var jwtSettings = _configuration.GetSection("Jwt");
// var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

// var token = new JwtSecurityToken(
//     issuer: jwtSettings["Issuer"],
//     audience: jwtSettings["Audience"],
//     expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),
//     claims: authClaims,
//     signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
// );

// // ✅ Return token, role, and userId to frontend
// return Ok(new
// {
//     token = new JwtSecurityTokenHandler().WriteToken(token),
//     role = model.Role,
//     userId = user.Id
// });

//         }

//         [HttpPost("login")]
//         public async Task<IActionResult> Login(LoginDTO model)
//         {
//                 if (!ModelState.IsValid)
//         return BadRequest(ModelState);
//             var user = await _userManager.FindByEmailAsync(model.Email);
//             if (user == null)
//                 return Unauthorized("Invalid credentials");

//             var result = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);
//             if (!result.Succeeded)
//                 return Unauthorized("Invalid credentials");

//             var authClaims = new[]
//             {
//                 new Claim(ClaimTypes.Name, user.UserName),
//                 new Claim(ClaimTypes.NameIdentifier, user.Id),
//                 new Claim(ClaimTypes.Role, user.Role)
//             };

//             var jwtSettings = _configuration.GetSection("Jwt");
//             var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));

//             var token = new JwtSecurityToken(
//                 issuer: jwtSettings["Issuer"],
//                 audience: jwtSettings["Audience"],
//                 expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["DurationInMinutes"])),
//                 claims: authClaims,
//                 signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
//             );

//             return Ok(new
//             {
//                 token = new JwtSecurityTokenHandler().WriteToken(token),
//                 expiration = token.ValidTo
//             });
//         }
//     }
// }
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.Models.Auth;
using SwasthyaChinha.API.Services.Interfaces;
using System.Threading.Tasks;

namespace SwasthyaChinha.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            try
            {
                var response = await _authService.LoginAsync(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }

        [HttpPost("register/hospitaladmin")]
        public async Task<IActionResult> RegisterHospitalAdmin([FromBody] RegisterHospitalAdminDto model)
        {
            try
            {
                var response = await _authService.RegisterHospitalAdminAsync(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // [HttpPost("register/doctor")]
        // public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctorDto model)
        // {
        //     try
        //     {
        //         var response = await _authService.RegisterDoctorAsync(model);
        //         return Ok(response);
        //     }
        //     catch (Exception ex)
        //     {
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

        [HttpPost("register/patient")]
        public async Task<IActionResult> RegisterPatient([FromBody] RegisterPatientDto model)
        {
            try
            {
                var response = await _authService.RegisterPatientAsync(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("register/pharmacist")]
        public async Task<IActionResult> RegisterPharmacist([FromBody] RegisterPharmacistDto model)
        {
            try
            {
                var response = await _authService.RegisterPharmacistAsync(model);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
