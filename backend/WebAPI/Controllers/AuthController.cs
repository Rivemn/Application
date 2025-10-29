using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Auth;
using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
		{

			var result = await _authService.RegisterAsync(dto);

			if (!result.Succeeded)
			{
				return BadRequest(new
				{
					succeeded = false,
					errors = result.Errors
				});
			}


			SetRefreshTokenCookie(result.Data.RefreshToken);

			return Ok(new
			{
				succeeded = true,
				response = new
				{
					result.Data.AccessToken,
					result.Data.ExpiresAt,
					result.Data.Email,
					result.Data.RefreshToken
				},
				errors = Array.Empty<string>(),
				errorCode = (string?)null
			});

		}

		[HttpPost("login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login(LoginRequestDto dto)
		{
			var result = await _authService.LoginAsync(dto);

			if (!result.Succeeded)
			{
				return Unauthorized(new
				{
					succeeded = false,
					errors = result.Errors
				});
			}


			SetRefreshTokenCookie(result.Data.RefreshToken);

			return Ok(new
			{
				succeeded = true,
				response = new
				{
					result.Data.AccessToken,
					result.Data.ExpiresAt,
					result.Data.Email,
					result.Data.RefreshToken
				},
				errors = Array.Empty<string>(),
				errorCode = (string?)null
			});

		}

		[HttpPost("refresh")]
		[AllowAnonymous]
		public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestDto request)
		{
			var email = User.FindFirst(ClaimTypes.Email)?.Value;

			if (string.IsNullOrEmpty(email))
				email = Request.Headers["X-User-Email"].ToString();

			if (string.IsNullOrEmpty(request.RefreshToken))
				request.RefreshToken = Request.Cookies["refreshToken"];

			if (string.IsNullOrEmpty(request.RefreshToken))
			{
				return BadRequest(new
				{
					succeeded = false,
					errors = new[] { "Refresh token is missing." }
				});
			}

			var result = await _authService.RefreshTokenAsync(request, email);
			if (!result.Succeeded)
			{
				return Unauthorized(new
				{
					succeeded = false,
					errors = result.Errors
				});
			}

			SetRefreshTokenCookie(result.Data.RefreshToken);

			return Ok(new
			{
				succeeded = true,
				response = new
				{
					result.Data.AccessToken,
					result.Data.ExpiresAt,
					result.Data.Email,
					result.Data.RefreshToken
				},
				errors = Array.Empty<string>(),
				errorCode = (string?)null
			});

		}
		[Authorize]
		[HttpGet("me")]
		public IActionResult Me()
		{
			var email = User.FindFirst(ClaimTypes.Email)?.Value;
			return Ok(new { Email = email });
		}

		private void SetRefreshTokenCookie(string refreshToken)
		{
			var cookieOptions = new CookieOptions
			{
				HttpOnly = true, 
				Secure = true,   
				SameSite = SameSiteMode.None, 
				Expires = DateTime.UtcNow.AddDays(7)
			};

			Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
		}
	}
}