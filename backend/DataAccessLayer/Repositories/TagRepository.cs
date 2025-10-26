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
	public class TagRepository : GenericRepository<Tag>, ITagRepository
	{
		public TagRepository(AppDbContext context) : base(context) { }

		public async Task<Tag?> FindByNameAsync(string name)
		{
			string lowerName = name.ToLower();
			return await _dbSet.FirstOrDefaultAsync(t => t.Name.ToLower() == lowerName);
		}

		public async Task<List<Tag>> GetTagsByIdsAsync(IEnumerable<Guid> ids)
		{
			return await _dbSet.Where(t => ids.Contains(t.Id)).ToListAsync();
		}
	}
}
