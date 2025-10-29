using BusinessLogicLayer.Dtos.AI;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize] 
	public class AiAssistantController : ControllerBase
	{
		private readonly IAiAssistantService _aiAssistantService;

		private readonly IEventService _eventService;
		private readonly ITagService _tagService;


		public AiAssistantController(
			IAiAssistantService aiAssistantService,
			IEventService eventService,
			ITagService tagService)
		{
			_aiAssistantService = aiAssistantService;
			_eventService = eventService; 
			_tagService = tagService;    
		}


		[HttpPost("ask")]
		public async Task<IActionResult> Ask([FromBody] AiSimpleQueryDto simpleQuery)
		{
			if (string.IsNullOrWhiteSpace(simpleQuery.Question))
			{
				return BadRequest("Question cannot be empty.");
			}


			var userId = GetCurrentUserId();
			if (userId == null)
			{
				return Unauthorized("User ID not found in token.");
			}


			var myEvents = await _eventService.GetMyEventsAsync(userId.Value);

			var publicEvents = await _eventService.GetAllAsync(simpleQuery.TagIds);
			// Отримуємо всі теги
			var allTags = await _tagService.GetAllTagsAsync();


			var allRelevantEvents = myEvents
				.Concat(publicEvents)
				.DistinctBy(e => e.Id) 
				.ToList();


			var fullQuery = new AiQueryDto
			{
				Question = simpleQuery.Question,
				Events = allRelevantEvents,
				Tags = allTags.ToList()
			};

			// 4. Відправляємо в AI сервіс (AiAssistantService залишається без змін)
			var result = await _aiAssistantService.GetAnswerAsync(fullQuery);

			if (!result.Succeeded)
			{
				return StatusCode(500, new { Errors = result.Errors });
			}

			return Ok(result.Data);
		}

		// Допоміжний метод для отримання ID користувача
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
