using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
	public class UserRepository : GenericRepository<User>, IUserRepository
	{
		public UserRepository(AppDbContext ctx) : base(ctx) { }

		public Task<User?> GetByEmailAsync(string email)
		{
			return _dbSet.FirstOrDefaultAsync(u => u.Email == email);
		}
	}
}
