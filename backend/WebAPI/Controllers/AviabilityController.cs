using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AviabilityController : ControllerBase
    {
        private readonly IAviabilityService _service;

        public AviabilityController(IAviabilityService service)
        {
            _service = service;
        }

        [HttpGet("workspace/{workspaceId}")]
        public async Task<IActionResult> GetByWorkspaceId(Guid workspaceId)
        {
            var (aviabilities, error) = await _service.GetByWorkspaceIdAsync(workspaceId);
            if (!string.IsNullOrEmpty(error))
                return BadRequest(error);

            if (!aviabilities.Any())
                return NoContent();

            return Ok(aviabilities);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AviabilityRequest request)
        {
            var (id, error) = await _service.CreateAsync(request.WorkspaceId, request.Quantity, request.CapacityOption);
            if (!string.IsNullOrEmpty(error))
                return BadRequest(error);

            return CreatedAtAction(nameof(GetByWorkspaceId), new { workspaceId = request.WorkspaceId }, id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var (success, error) = await _service.DeleteAsync(id);
            if (!success)
                return NotFound(error);

            return NoContent();
        }
    }
}
