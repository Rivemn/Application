using Domain.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Persistence.Entities;

namespace Persistence.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly AppDbContext _context;

		public UserRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<User?> GetByEmailAsync(string email)
		{
			var entity = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
			if (entity == null) return null;

			return User.Create(entity.Id, entity.FullName, entity.Email, entity.CreatedAt);
		}

		public async Task<Guid> CreateAsync(User user)
		{
			var entity = new UserEntity
			{
				Id = user.Id,
				FullName = user.FullName,
				Email = user.Email,
				CreatedAt = user.CreatedAt
			};

			_context.Users.Add(entity);
			await _context.SaveChangesAsync();
			return entity.Id;
		}
	}
}
