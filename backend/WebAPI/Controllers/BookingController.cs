using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
	private readonly IBookingService _service;

	public BookingController(IBookingService service)
	{
		_service = service;
	}

	[HttpPost]
	public async Task<IActionResult> Create([FromBody] BookingRequest request)
	{
		var (id, error) = await _service.CreateAsync(
			request.fullName,
			request.email,
			request.workspaceId,
			request.start,
			request.end,
			request.quantity,
			request.capacityOptionId
		);

		if (!string.IsNullOrEmpty(error))
			return BadRequest(error);

		return CreatedAtAction(nameof(GetById), new { id }, id);
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetById(Guid id)
	{
		var (booking, error) = await _service.GetByIdAsync(id);
		if (!string.IsNullOrEmpty(error))
			return NotFound(error);

		return Ok(booking);
	}

	[HttpGet("user/{userId}")]
	public async Task<IActionResult> GetByUser(Guid userId)
	{
		var bookings = await _service.GetByUserAsync(userId);
		return Ok(bookings);
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
