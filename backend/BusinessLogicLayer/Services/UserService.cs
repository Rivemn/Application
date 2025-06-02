using Domain.Repositories;
using Domain.Services;
using Domain.Models;

namespace Application.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;

		public UserService(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		public async Task<Guid> GetOrCreateUserAsync(string fullName,string email)
		{
			var existingUser = await _userRepository.GetByEmailAsync(email);
			if (existingUser != null)
				return existingUser.Id;

			var newUser = User.Create(Guid.NewGuid(), email, email, DateTime.UtcNow);
			return await _userRepository.CreateAsync(newUser);
		}
	}
}
