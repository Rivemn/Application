using AutoMapper;
using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Auth;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace BusinessLogicLayer.Services
{
	public class AuthService : IAuthService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IConfiguration _config;
		private readonly IMapper _mapper;

		public AuthService(IUnitOfWork unitOfWork, IConfiguration config, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_config = config;
			_mapper = mapper;
		}

		public async Task<Result<AuthResponseDto>> RegisterAsync(RegisterRequestDto request)
		{
			var userRepo = (IUserRepository)_unitOfWork.Repository<User>();
			var existing = await userRepo.GetByEmailAsync(request.Email);
			if (existing != null)
				return Result.Failure<AuthResponseDto>("User already exists.");

			var user = new User
			{
				Email = request.Email,
				FullName = request.FullName,
				PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
			};
			await userRepo.AddAsync(user);

			var accessToken = GenerateAccessToken(user);
			var refreshToken = GenerateRefreshToken();

			user.RefreshToken = refreshToken;
			user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

			await _unitOfWork.CompleteAsync();

			return Result.Success(new AuthResponseDto // Використовуємо Result.Success
			{
				AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
				ExpiresAt = accessToken.ValidTo,
				Email = user.Email,
				RefreshToken = refreshToken
			});
		}

		public async Task<Result<AuthResponseDto>> LoginAsync(LoginRequestDto request)
		{
			var userRepo = (IUserRepository)_unitOfWork.Repository<User>();
			var user = await userRepo.GetByEmailAsync(request.Email);

			if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
			{
				return Result.Failure<AuthResponseDto>("Invalid credentials", "INVALID_CREDENTIALS");
			}

			var accessToken = GenerateAccessToken(user);
			var refreshToken = GenerateRefreshToken();

			user.RefreshToken = refreshToken;
			user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

			userRepo.Update(user);
			await _unitOfWork.CompleteAsync();

			return Result.Success(new AuthResponseDto
			{
				AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
				ExpiresAt = accessToken.ValidTo,
				Email = user.Email,
				RefreshToken = refreshToken
			});
		}

		public async Task<Result<AuthResponseDto>> RefreshTokenAsync(RefreshTokenRequestDto request, string email)
		{
			var userRepo = (IUserRepository)_unitOfWork.Repository<User>();

			// 1. Знаходимо користувача по email
			var user = await userRepo.GetByEmailAsync(email);
			if (user == null)
			{
				return Result.Failure<AuthResponseDto>("User not found.");
			}

			// 2. Перевіряємо рефреш-токен
			if (user.RefreshToken != request.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
			{
				user.RefreshToken = null;
				userRepo.Update(user);
				await _unitOfWork.CompleteAsync();

				return Result.Failure<AuthResponseDto>("Invalid or expired refresh token.");
			}

			// 3. Генеруємо нову пару токенів
			var newAccessToken = GenerateAccessToken(user);
			var newRefreshToken = GenerateRefreshToken();

			user.RefreshToken = newRefreshToken;
			user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
			userRepo.Update(user);
			await _unitOfWork.CompleteAsync();

			// 4. Повертаємо успішний результат
			return Result.Success(new AuthResponseDto
			{
				AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
				ExpiresAt = newAccessToken.ValidTo,
				Email = user.Email,
				RefreshToken = newRefreshToken
			});
		}


		private JwtSecurityToken GenerateAccessToken(User user)
		{
			var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured"));
			var claims = new List<Claim>
            {
				new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim(JwtRegisteredClaimNames.Email, user.Email),
				new Claim("fullName", user.FullName ?? "")
            };

			var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			return new JwtSecurityToken(
				issuer: _config["Jwt:Issuer"],
				audience: _config["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:LifetimeMinutes"] ?? "60")),
				signingCredentials: creds
			);
		}

		// Метод GenerateRefreshToken
		private string GenerateRefreshToken()
		{
			var randomNumber = new byte[64];
			using var rng = RandomNumberGenerator.Create();
			rng.GetBytes(randomNumber);
			return Convert.ToBase64String(randomNumber);
		}
	}
}