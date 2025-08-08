using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using SwasthyaChinha.API.DTOs.Patient;
using System.Security.Claims;
using SwasthyaChinha.API.Services.Interfaces;
namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "Patient")]
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _patientService.GetProfileAsync(userId);
            return Ok(profile);
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            await _patientService.UpdatePatientProfileAsync(userId, dto);
            return NoContent();
        }

        [HttpGet("prescriptions")]
        public async Task<IActionResult> GetPrescriptions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
            return Ok(prescriptions);
        }

        [HttpGet("expenses")]
        public async Task<IActionResult> GetExpenses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var expenses = await _patientService.GetExpensesAsync(userId);
            return Ok(expenses);
        }
        // In PatientsController.cs
        // [HttpGet("search")]
        // public async Task<IActionResult> SearchPatients(string query)
        // {
        //     if (string.IsNullOrWhiteSpace(query))
        //         return BadRequest("Search query is required");

        //     var patients = await _context.Users
        //         .Where(u => u.Role == "Patient" &&
        //                    (u.FullName.Contains(query) ||
        //                     u.Email.Contains(query) ||
        //                     u.PhoneNumber.Contains(query)))
        //         .Select(u => new
        //         {
        //             id = u.Id,        // GUID
        //             name = u.FullName,
        //             email = u.Email,
        //             phone = u.PhoneNumber
        //         })
        //         .Take(10) // limit results
        //         .ToListAsync();

        //     return Ok(patients);
        // }
[HttpGet("search")]
public async Task<IActionResult> SearchPatients(string query)
{
    if (string.IsNullOrWhiteSpace(query))
        return BadRequest("Search query is required");

    var patients = await _patientService.SearchPatientsAsync(query);
    return Ok(patients);
}

    }
}
