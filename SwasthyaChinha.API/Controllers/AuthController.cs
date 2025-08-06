
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
