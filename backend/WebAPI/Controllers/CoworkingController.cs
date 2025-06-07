using Microsoft.AspNetCore.Mvc;
using Domain.Models;
using Domain.Services;
using WebAPI.Contracts;

namespace WebApi.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class CoworkingController : ControllerBase
	{
		private readonly ICoworkingService _coworkingService;

		public CoworkingController(ICoworkingService coworkingService)
		{
			_coworkingService = coworkingService;
		}

		[HttpGet]
		public async Task<ActionResult<List<Coworking>>> GetAll()
		{
			var (coworkings, error) = await _coworkingService.GetAllAsync();
			if (!string.IsNullOrEmpty(error))
				return BadRequest(error);

			return Ok(coworkings);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Coworking>> GetById(Guid id)
		{
			var (coworking, error) = await _coworkingService.GetByIdAsync(id);
			if (!string.IsNullOrEmpty(error))
				return NotFound(error);

			return Ok(coworking);
		}

		[HttpPost]
		public async Task<ActionResult<Guid>> Create([FromBody] CreateCoworkingRequest request)
		{
			var (id, error) = await _coworkingService.CreateAsync(request.Name, request.Address);
			if (!string.IsNullOrEmpty(error))
				return BadRequest(error);

			return CreatedAtAction(nameof(GetById), new { id = id }, id);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult> Delete(Guid id)
		{
			var (success, error) = await _coworkingService.DeleteAsync(id);
			if (!success)
				return NotFound(error);

			return NoContent();
		}
	}
}
