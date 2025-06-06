using Application.Services;
using Domain.Services;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Contracts;


namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class BookingController : ControllerBase
	{
		private readonly IBookingService _service;
		private readonly IUserService _userService;

		public BookingController(IBookingService service, IUserService userService)
		{
			_service = service;
			_userService = userService;
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] BookingRequest request)
		{
			var (id, error) = await _service.CreateAsync(
				request.FullName,
				request.Email,
				request.WorkspaceId,
				request.Start,
				request.End,
				request.AvailabilityId
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
		[HttpGet("user/by-email")]
		public async Task<IActionResult> GetByUserEmail(string email)
		{
			if (string.IsNullOrWhiteSpace(email))
				return BadRequest("Email is required");

			var bookings = await _userService.GetBookingsByEmailAsync(email);
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
}