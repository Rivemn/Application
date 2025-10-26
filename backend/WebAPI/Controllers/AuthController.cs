using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Dtos;

namespace WebAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;
		public AuthController(IAuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
		{
			var result = await _authService.RegisterAsync(dto);

			if (!result.Succeeded)
				return BadRequest(new { Errors = result.Errors });

			return Ok(result.Response);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login(LoginRequestDto dto)
		{
			var result = await _authService.LoginAsync(dto);

			if (!result.Succeeded)
			{
				return Unauthorized(new { Errors = result.Errors });
			}

			return Ok(result.Response);
		}
		[Authorize]
		[HttpGet("me")]
		public IActionResult Me()
		{
			var email = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
			return Ok(new { Email = email });
		}
	}
}
