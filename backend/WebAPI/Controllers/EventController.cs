using AutoMapper;
using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
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
		private readonly IMapper _mapper;

		public EventController(IEventService eventService, IMapper mapper)
		{
			_eventService = eventService;
			_mapper = mapper;
		}

		[HttpGet]
		[AllowAnonymous]
		public async Task<IActionResult> GetAll()
		{
			var events = await _eventService.GetAllAsync();
			var dtos = _mapper.Map<IEnumerable<EventDto>>(events);
			return Ok(dtos);
		}

		[HttpGet("{id:guid}")]
		public async Task<IActionResult> Get(Guid id)
		{
			var ev = await _eventService.GetByIdAsync(id);
			if (ev == null) return NotFound();
			return Ok(_mapper.Map<EventDto>(ev));
		}

		[HttpPost]
		public async Task<IActionResult> Create([FromBody] CreateEventDto dto)
		{
			var organizerId = GetCurrentUserId();
			if (organizerId == null)
			{
				return Unauthorized("User ID not found in token."); // 401 Unauthorized
			}

			var result = await _eventService.CreateAsync(dto, organizerId.Value);

			if (!result.Succeeded || result.Data == null)
			{
				// Якщо сервіс повернув помилку (наприклад, валідація DTO провалилася в сервісі)
				return BadRequest(new { Errors = result.Errors }); // 400 Bad Request
			}

			// 201 Created з посиланням на створений ресурс та самим ресурсом
			return CreatedAtAction(nameof(Get), new { id = result.Data.Id }, result.Data);
		}


		[HttpPut("{id:guid}")]
		public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
		{
			var currentUserId = GetCurrentUserId();
			if (currentUserId == null) return Unauthorized(); // 401 Unauthorized

			var result = await _eventService.UpdateAsync(id, dto, currentUserId.Value);

			if (!result.Succeeded)
			{
				return result.ErrorCode switch
				{
					EventErrorCodes.EventNotFound => NotFound(new { Errors = result.Errors }), // 404 Not Found
					EventErrorCodes.Forbidden => Forbid(), // 403 Forbidden
					_ => BadRequest(new { Errors = result.Errors }) // 400 Bad Request
				};
			}

			return NoContent(); // 204 No Content
		}


		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			var currentUserId = GetCurrentUserId();
			if (currentUserId == null) return Unauthorized(); // 401 Unauthorized

			var result = await _eventService.DeleteAsync(id, currentUserId.Value);

			if (!result.Succeeded)
			{
				return result.ErrorCode switch
				{
					EventErrorCodes.EventNotFound => NotFound(new { Errors = result.Errors }), // 404 Not Found
					EventErrorCodes.Forbidden => Forbid(), // 403 Forbidden
					_ => BadRequest(new { Errors = result.Errors }) // 400 Bad Request
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

			var events = await _eventService.GetMyEventsAsync(userId.Value);

			var dtos = _mapper.Map<IEnumerable<EventDto>>(events);
			return Ok(dtos);
		}

		private Guid? GetCurrentUserId()
		{
			var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userIdStr))
			{
				return null;
			}
			return Guid.Parse(userIdStr);
		}
	}
}