using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Event;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;


namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class EventController : ControllerBase
	{
		private readonly IEventService _eventService;


		public EventController(IEventService eventService)
		{
			_eventService = eventService;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll([FromQuery] List<Guid>? tagIds = null) 
		{
	
			var dtos = await _eventService.GetAllAsync(tagIds); 
			return Ok(dtos);
		}

		[HttpGet("{id:guid}")]
		[AllowAnonymous] 
		public async Task<IActionResult> Get(Guid id)
		{

			var dto = await _eventService.GetByIdAsync(id);
			if (dto == null) return NotFound();
			return Ok(dto);
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] CreateEventDto dto) 
		{
			var organizerId = GetCurrentUserId();
			if (organizerId == null) return Unauthorized("User ID not found in token.");

			var result = await _eventService.CreateAsync(dto, organizerId.Value);

			if (!result.Succeeded || result.Data == null)
			{
				if (result.Errors.Any(e => e.Contains("exist") || e.Contains("tags") || e.Contains("length")))
				{
					return BadRequest(new { Errors = result.Errors }); 
				}
				return BadRequest(new { Errors = result.Errors });
			}

			return CreatedAtAction(nameof(Get), new { id = result.Data.Id }, result.Data);
		}


		[HttpPut("{id:guid}")]
		public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
		{
			var currentUserId = GetCurrentUserId();
			if (currentUserId == null) return Unauthorized();

			var result = await _eventService.UpdateAsync(id, dto, currentUserId.Value);

			if (!result.Succeeded)
			{
				if (result.Errors.Any(e => e.Contains("exist") || e.Contains("tags") || e.Contains("length")))
				{
					return BadRequest(new { Errors = result.Errors }); 
				}
				return result.ErrorCode switch
				{
					EventErrorCodes.EventNotFound => NotFound(new { Errors = result.Errors }),
					EventErrorCodes.Forbidden => Forbid(),
					_ => BadRequest(new { Errors = result.Errors })
				};
			}

			return NoContent();
		}

		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			var currentUserId = GetCurrentUserId();
			if (currentUserId == null) return Unauthorized();


			var result = await _eventService.DeleteAsync(id, currentUserId.Value);

			if (!result.Succeeded)
			{
				return result.ErrorCode switch
				{
					EventErrorCodes.EventNotFound => NotFound(new { Errors = result.Errors }),
					EventErrorCodes.Forbidden => Forbid(),
					_ => BadRequest(new { Errors = result.Errors })
				};
			}

			return NoContent();
		}

		[HttpPost("{id:guid}/join")]
		public async Task<IActionResult> JoinEvent(Guid id)
		{
			var userId = GetCurrentUserId();
			if (userId == null) return Unauthorized();

			var result = await _eventService.JoinEventAsync(id, userId.Value);

			if (!result.Succeeded)
			{
				return result.ErrorCode switch
				{
					EventErrorCodes.EventNotFound => NotFound(new { Errors = result.Errors }),
					EventErrorCodes.EventFull => Conflict(new { Errors = result.Errors }),
					EventErrorCodes.AlreadyJoined => Conflict(new { Errors = result.Errors }),
					_ => BadRequest(new { Errors = result.Errors })
				};
			}

			return Ok(new { message = "Successfully joined event." });
		}


		[HttpDelete("{id:guid}/leave")]
		public async Task<IActionResult> LeaveEvent(Guid id)
		{
			var userId = GetCurrentUserId();
			if (userId == null) return Unauthorized();

			var result = await _eventService.LeaveEventAsync(id, userId.Value);

			if (!result.Succeeded)
			{
				return result.ErrorCode switch
				{
					EventErrorCodes.NotParticipant => NotFound(new { Errors = result.Errors }),
					_ => BadRequest(new { Errors = result.Errors })
				};
			}

			return NoContent();
		}

		[HttpGet("my-events")]
		public async Task<IActionResult> GetMyEvents()
		{
			var userId = GetCurrentUserId();
			if (userId == null)
			{
				return Unauthorized();
			}


			var dtos = await _eventService.GetMyEventsAsync(userId.Value);
			return Ok(dtos);
		}


		private Guid? GetCurrentUserId()
		{
			var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);

			if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
			{
				return null;
			}
			return userId;
		}
	}
}
