using AutoMapper;
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
			var organizerIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);

			if (string.IsNullOrEmpty(organizerIdStr))
			{
				return Unauthorized("User ID not found in token.");
			}

			var organizerId = Guid.Parse(organizerIdStr);

			var entity = _mapper.Map<Event>(dto);

			entity.OrganizerId = organizerId;


			var created = await _eventService.CreateAsync(entity);

			return CreatedAtAction(nameof(Get), new { id = created.Id }, _mapper.Map<EventDto>(created));
		}
		[HttpPut("{id:guid}")]
		public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
		{
			var entity = await _eventService.GetByIdAsync(id);
			if (entity == null)
			{
				return NotFound();
			}

			_mapper.Map(dto, entity);

			await _eventService.UpdateAsync(entity);
			return NoContent();
		}
		[HttpDelete("{id:guid}")]
		public async Task<IActionResult> Delete(Guid id)
		{
			await _eventService.DeleteAsync(id);
			return NoContent();
		}
		[HttpPost("{id:guid}/join")] 
		public async Task<IActionResult> JoinEvent(Guid id)
		{
			var userId = GetCurrentUserId();
			if (userId == null) return Unauthorized();

			try
			{
				await _eventService.JoinEventAsync(id, userId.Value);

				return Ok(new { message = "Successfully joined event." });
			}
			catch (KeyNotFoundException ex)
			{
				return NotFound(new { error = ex.Message });
			}
			catch (InvalidOperationException ex)
			{
				return BadRequest(new { error = ex.Message });
			}
		}

		[HttpDelete("{id:guid}/leave")]
		public async Task<IActionResult> LeaveEvent(Guid id)
		{
			var userId = GetCurrentUserId();
			if (userId == null) return Unauthorized();

			try
			{
				await _eventService.LeaveEventAsync(id, userId.Value);
				return NoContent();
			}
			catch (KeyNotFoundException ex)
			{
				return NotFound(new { error = ex.Message });
			}
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