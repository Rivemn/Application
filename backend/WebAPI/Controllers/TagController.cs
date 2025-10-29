using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	[Authorize]
	public class TagController : ControllerBase
	{
		private readonly ITagService _tagService;


		public TagController(ITagService tagService)
		{
			_tagService = tagService;
		}


		[HttpGet]
		[AllowAnonymous] 
		public async Task<IActionResult> GetAll()
		{
			var tags = await _tagService.GetAllTagsAsync();

			return Ok(tags);
		}
	}
}
