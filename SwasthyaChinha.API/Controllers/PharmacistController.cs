
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SwasthyaChinha.API.DTOs.Pharmacist;
using SwasthyaChinha.API.Services.Interfaces;

namespace SwasthyaChinha.API.Controllers
{
    
[Authorize(Roles = "pharmacist")]
[ApiController]
[Route("api/[controller]")]
public class PharmacistController : ControllerBase
{
    private readonly IPharmacistService _pharmacistService;
    private readonly IPrescriptionService _prescriptionService;

    public PharmacistController(IPrescriptionService prescriptionService, IPharmacistService pharmacistService)
    {
        _prescriptionService = prescriptionService;
        _pharmacistService = pharmacistService;
    }

    [HttpGet("prescription/{qrCode}")]
    public async Task<IActionResult> GetPrescriptionByQRCode(string qrCode)
    {
        var prescription = await _prescriptionService.GetByQRCodeAsync(qrCode);
        if (prescription == null) return NotFound("Prescription not found");
        return Ok(prescription);
    }

    [HttpPost("dispense")]
    public async Task<IActionResult> DispenseMedicine([FromBody] DispenseDTO dto)
    {
        bool result = await _prescriptionService.MarkAsDispensedAsync(dto.PrescriptionId, dto.Medicines);
        if (!result) return BadRequest("Failed to mark prescription as dispensed");
        return Ok(new { Success = true, Message = "Prescription marked as dispensed." });
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
        if (userIdClaim == null) return Unauthorized();
        var pharmacist = await _pharmacistService.GetProfileAsync(Guid.Parse(userIdClaim));
        if (pharmacist == null) return NotFound();
        return Ok(pharmacist);
    }
}


}

