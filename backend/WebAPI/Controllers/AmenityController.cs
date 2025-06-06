using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AmenityController : ControllerBase
    {
        private readonly IAmenityService _service;

        public AmenityController(IAmenityService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var (amenities, error) = await _service.GetAllAsync();
            if (!string.IsNullOrEmpty(error)) return StatusCode(500, error);
            if (amenities == null || !amenities.Any()) return NoContent();
            return Ok(amenities);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var (amenity, error) = await _service.GetByIdAsync(id);
            if (!string.IsNullOrEmpty(error)) return NotFound(error);
            return Ok(amenity);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AmenityRequest request)
        {
            var (id, error) = await _service.CreateAsync(request.Name);
            if (!string.IsNullOrEmpty(error)) return BadRequest(error);
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var (success, error) = await _service.DeleteAsync(id);
            if (!success) return NotFound(error);
            return NoContent();
        }
    }
}
