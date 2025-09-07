

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Patient;
using System.Security.Claims;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    [Authorize(Roles = "patient,Patient")] // lowercase to match JWT role
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        // Get logged-in patient's profile
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            try
            {
                var profile = await _patientService.GetProfileAsync(userId);
                return Ok(profile);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Update logged-in patient's profile
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProfile(UpdatePatientDTO dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            try
            {
                await _patientService.UpdatePatientProfileAsync(userId, dto);
                return NoContent();
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Get prescriptions for logged-in patient
        [HttpGet("prescriptions")]
        public async Task<IActionResult> GetPrescriptions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            try
            {
                var prescriptions = await _patientService.GetPrescriptionsAsync(userId);
                return Ok(prescriptions);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("not found", StringComparison.OrdinalIgnoreCase))
                    return NotFound(new { message = ex.Message });

                return StatusCode(500, $"Server error: {ex.Message}");
            }
        }

        // Get last visit for logged-in patient
        // [HttpGet("last-visit")]
        // public async Task<IActionResult> GetLastVisit()
        // {
        //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //     try
        //     {
        //         var lastVisit = await _patientService.GetLastVisitAsync(userId);
        //         if (lastVisit == null)
        //             return NotFound(new { message = "No visits found for this patient." });

        //         return Ok(lastVisit);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Server error: {ex.Message}");
        //     }
        // }

        // Get last prescription for logged-in patient
        // [HttpGet("last-prescription")]
        // public async Task<IActionResult> GetLastPrescription()
        // {
        //     var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //     try
        //     {
        //         var lastPrescription = await _patientService.GetLastPrescriptionAsync(userId);
        //         if (lastPrescription == null)
        //             return NotFound(new { message = "No prescriptions found for this patient." });

        //         return Ok(lastPrescription);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"Server error: {ex.Message}");
        //     }
        // }
    }
}
