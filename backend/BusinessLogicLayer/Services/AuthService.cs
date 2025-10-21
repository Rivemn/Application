using AutoMapper;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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

		// (ИЗМЕНЕНО) Метод теперь возвращает AuthResultDto
		public async Task<AuthResultDto> RegisterAsync(RegisterRequestDto request)
		{
			var userRepo = (IUserRepository)_unitOfWork.Repository<User>();

			var existing = await userRepo.GetByEmailAsync(request.Email);
			if (existing != null)
			{
				// БЫЛО: throw new InvalidOperationException("User already exists.");
				// СТАЛО: Возвращаем результат с ошибкой
				return AuthResultDto.Failure("User with this email already exists.");
			}

			var user = new User
			{
				Id = Guid.NewGuid(),
				Email = request.Email,
				FullName = request.FullName,
				PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
			};

			await userRepo.AddAsync(user);
			await _unitOfWork.CompleteAsync();

			var token = GenerateToken(user);
			var response = new AuthResponseDto
			{
				Token = token,
				ExpiresAt = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["Jwt:LifetimeMinutes"])),
				Email = user.Email
			};

			// Возвращаем успешный результат, обернутый в AuthResultDto
			return AuthResultDto.Success(response);
		}

		public async Task<AuthResultDto> LoginAsync(LoginRequestDto request)
		{
			var userRepo = (IUserRepository)_unitOfWork.Repository<User>();
			var user = await userRepo.GetByEmailAsync(request.Email);

			if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
			{
				return AuthResultDto.Failure("Invalid credentials");
			}

			var token = GenerateToken(user);
			var response = new AuthResponseDto
			{
				Token = token,
				ExpiresAt = DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["Jwt:LifetimeMinutes"])),
				Email = user.Email
			};

			return AuthResultDto.Success(response);
		}

		private string GenerateToken(User user)
		{
			var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);
			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
				new Claim(JwtRegisteredClaimNames.Email, user.Email),
				new Claim("fullName", user.FullName ?? "")
			};

			var creds = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				issuer: _config["Jwt:Issuer"],
				audience: _config["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(Convert.ToInt32(_config["Jwt:LifetimeMinutes"])),
				signingCredentials: creds
			);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}