using Domain.Models;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

[ApiController]
[Route("api/workspaces/{workspaceId}/amenities")]
public class WorkspaceAmenityController : ControllerBase
{
    private readonly IWorkspaceAmenityService _service;


	public WorkspaceAmenityController(IWorkspaceAmenityService service)
    {
        _service = service;

	}

	[HttpPost("{amenityId}")]
	public async Task<IActionResult> Add(Guid workspaceId, int amenityId)
	{
		var (workspaceAmenity, error) = WorkspaceAmenity.Create(workspaceId, amenityId);
		if (!string.IsNullOrEmpty(error))
			return BadRequest(new { error });

		await _service.AddAmenityAsync(workspaceId, amenityId);
		return Ok();
	}


	[HttpDelete("{amenityId}")]
    public async Task<IActionResult> Remove(Guid workspaceId, int amenityId)
    {
        await _service.RemoveAmenityAsync(workspaceId, amenityId);
        return NoContent();
    }

	[HttpGet]
	public async Task<IActionResult> Get(Guid workspaceId)
	{
		var amenities = await _service.GetAmenitiesByWorkspaceIdAsync(workspaceId);


		return Ok(amenities);
	}

}
