
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

namespace WebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class WorkspaceController : ControllerBase
	{
		private readonly IWorkspaceService _service;

		public WorkspaceController(IWorkspaceService service)
		{
			_service = service;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var (workspaces, error) = await _service.GetAllAsync();

			if (!string.IsNullOrEmpty(error))
				return StatusCode(500, error);

			if (workspaces == null || !workspaces.Any())
				return NoContent(); 

			return Ok(workspaces);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(Guid id)
		{
			var (workspace, error) = await _service.GetByIdAsync(id);

			if (!string.IsNullOrEmpty(error))
				return NotFound(error);

			return Ok(workspace);
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] WorkspaceRequest request)
		{
			var (id, error) = await _service.CreateAsync(
				request.Name,
				request.Description,
				request.AvailabilityUnit,
				request.coworkingId);

			if (!string.IsNullOrEmpty(error))
				return BadRequest(error);

			return CreatedAtAction(nameof(GetById), new { id }, id);
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
