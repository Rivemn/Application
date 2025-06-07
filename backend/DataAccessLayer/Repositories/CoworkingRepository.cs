using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Entities;

namespace Persistence.Repositories
{
	public class CoworkingRepository : ICoworkingRepository
	{
		private readonly AppDbContext _context;

		public CoworkingRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<Coworking>> GetAllAsync()
		{
			var entities = await _context.Coworkings
				.Include(c => c.Workspaces)
				.ThenInclude(w => w.Availabilities)
				.AsNoTracking()
				.ToListAsync();

			var coworkings = entities
				.Select(e => Coworking.Create(e.Id, e.Name, e.Address).coworking)
				.Where(c => c != null)
				.ToList();

			return coworkings!;
		}

		public async Task<Coworking?> GetByIdAsync(Guid id)
		{
			var entity = await _context.Coworkings
				.Include(c => c.Workspaces)
				.ThenInclude(w => w.Availabilities)
				.AsNoTracking()
				.FirstOrDefaultAsync(c => c.Id == id);

			if (entity == null)
				return null;

			return Coworking.Create(entity.Id, entity.Name, entity.Address).coworking;
		}

		public async Task<Guid> CreateAsync(Coworking coworking)
		{
			var entity = new CoworkingEntity
			{
				Id = coworking.Id,
				Name = coworking.Name,
				Address = coworking.Address
			};

			await _context.Coworkings.AddAsync(entity);
			await _context.SaveChangesAsync();
			return entity.Id;
		}

		public async Task<bool> DeleteAsync(Guid id)
		{
			var entity = await _context.Coworkings.FindAsync(id);
			if (entity == null)
				return false;

			_context.Coworkings.Remove(entity);
			await _context.SaveChangesAsync();
			return true;
		}
	}
}