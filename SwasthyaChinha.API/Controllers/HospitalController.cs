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
    [Route("api/hospital")]
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
        [Authorize(Roles = "hospitaladmin")]
        [HttpPost("register-doctor")]
        public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctorDTO dto)
        // {
        //     await _hospitalService.RegisterDoctorAsync(dto);
        //     return Ok("Doctor registered successfully.");
        // }
      {
    if (!ModelState.IsValid)
        return BadRequest(ModelState);  // ✅ This validates the request before continuing

     await _hospitalService.RegisterDoctorAsync(dto); // Make sure _authService is injected

    // if (!response.IsSuccess)
    //     return BadRequest(response);    // Optional: send detailed message to frontend

    return Ok(new { message = "Doctor Registered successfully."});
}



        // ✅ 4. Hospital Stats (Authorized)
        [Authorize(Roles = "hospitaladmin")]
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats([FromQuery] string hospitalId)
        {
            var stats = await _hospitalService.GetOverallStatsAsync(hospitalId);
            return Ok(stats);
        }

        // ✅ 5. List All Doctors (Authorized)
        [Authorize(Roles = "hospitaladmin")]
        [HttpGet("doctors")]
        public async Task<IActionResult> GetDoctors()
        {
            var doctors = await _hospitalService.GetAllDoctorsAsync();
            return Ok(doctors);
        }

        // ✅ 6. List All Patients (Authorized)
        [Authorize(Roles = "hospitaladmin")]
        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _hospitalService.GetAllPatientsAsync();
            return Ok(patients);
        }
    }
}
