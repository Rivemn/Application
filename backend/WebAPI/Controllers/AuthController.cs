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
			return Ok(result);
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
		{
			var result = await _authService.LoginAsync(dto);
			return Ok(result);
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
