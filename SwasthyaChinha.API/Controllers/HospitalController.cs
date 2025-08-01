// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;
// using SwasthyaChinha.API.Services.Interfaces;
// using SwasthyaChinha.API.DTOs.Hospital;

// namespace SwasthyaChinha.API.Controllers
// {
//     [Authorize(Roles = "HospitalAdmin")]
//     [ApiController]
//     [Route("api/[controller]")]
//     public class HospitalController : ControllerBase
//     {
//         private readonly IHospitalService _hospitalService;

//         public HospitalController(IHospitalService hospitalService)
//         {
//             _hospitalService = hospitalService;
//         }

//         [HttpPost("register-doctor")]
//         public async Task<IActionResult> RegisterDoctor(RegisterDoctorDTO dto)
//         {
//             //var result = await _hospitalService.RegisterDoctorAsync(dto);
//             await _hospitalService.RegisterDoctorAsync(dto);

//             //     if (!result.Success)
//             //         return BadRequest(result.Message);
//             //     return Ok(result);
//         return Ok("Doctor registered successfully.");
//          }

//             [HttpGet("stats")]
//         public async Task<IActionResult> GetStats([FromQuery] string hospitalId)
//         {
//             var stats = await _hospitalService.GetOverallStatsAsync(hospitalId);
//             return Ok(stats);
//         }

//         [HttpGet("doctors")]
//         public async Task<IActionResult> GetDoctors()
//         {
//             var doctors = await _hospitalService.GetAllDoctorsAsync();
//             return Ok(doctors);
//         }

//         [HttpGet("patients")]
//         public async Task<IActionResult> GetPatients()
//         {
//             var patients = await _hospitalService.GetAllPatientsAsync();
//             return Ok(patients);
//         }
//     }
// }

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SwasthyaChinha.API.Data;
using SwasthyaChinha.API.Models;
using SwasthyaChinha.API.Services.Interfaces;
using SwasthyaChinha.API.DTOs.Hospital;
using SwasthyaChinha.API.DTOs.Auth;


namespace SwasthyaChinha.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHospitalService _hospitalService;

        public HospitalController(ApplicationDbContext context, IHospitalService hospitalService)
        {
            _context = context;
            _hospitalService = hospitalService;
        }

        // ✅ 1. Create Hospital (Public, for initial setup)
        [HttpPost("create")]
        public async Task<IActionResult> CreateHospital([FromBody] CreateHospitalDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
                var hospital = new Hospital
    {
        Name = dto.Name,
        Address = dto.Address
    };


            await _context.Hospitals.AddAsync(hospital);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Hospital created successfully.",
                hospitalId = hospital.Id
            });
        }

        // ✅ 2. View All Hospitals (Optional public utility)
        [HttpGet("all")]
        public async Task<IActionResult> GetHospitals()
        {
            var hospitals = await _context.Hospitals.ToListAsync();
            return Ok(hospitals);
        }

        // ✅ 3. Register Doctor (Authorized only for HospitalAdmin)
        [Authorize(Roles = "HospitalAdmin")]
        [HttpPost("register-doctor")]
        public async Task<IActionResult> RegisterDoctor(RegisterDoctorDTO dto)
        {
            await _hospitalService.RegisterDoctorAsync(dto);
            return Ok("Doctor registered successfully.");
        }
      



        // ✅ 4. Hospital Stats (Authorized)
        [Authorize(Roles = "HospitalAdmin")]
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats([FromQuery] string hospitalId)
        {
            var stats = await _hospitalService.GetOverallStatsAsync(hospitalId);
            return Ok(stats);
        }

        // ✅ 5. List All Doctors (Authorized)
        [Authorize(Roles = "HospitalAdmin")]
        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _hospitalService.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        // ✅ 6. List All Patients (Authorized)
        [Authorize(Roles = "HospitalAdmin")]
        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _hospitalService.GetAllPatientsAsync();
            return Ok(patients);
        }
    }
}
