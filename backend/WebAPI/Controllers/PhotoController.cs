using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PhotoController : ControllerBase
	{
		private readonly IPhotoService _service;

		public PhotoController(IPhotoService service)
		{
			_service = service;
		}

		[HttpGet("workspace/{workspaceId}")]
		public async Task<IActionResult> GetByWorkspace(Guid workspaceId)
		{
			var photos = await _service.GetByWorkspaceIdAsync(workspaceId);
			return Ok(photos);
		}
		[HttpGet("coworking/{coworkingId}")]
		public async Task<IActionResult> GetByCoworking(Guid coworkingId)
		{
			var photos = await _service.GetByCoworkingIdAsync(coworkingId);
			return Ok(photos);
		}

		[HttpPost]
		public async Task<IActionResult> Add([FromBody] PhotoRequest request)
		{
			var (photo, error) = Photo.Create(0, request.Url, request.WorkspaceId, request.CoworkingId);
			if (photo == null)
				return BadRequest(error);

			await _service.AddAsync(photo);
			return Ok();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var result = await _service.DeleteAsync(id);
			if (!result) return NotFound();

			return NoContent();
		}
	}
}
