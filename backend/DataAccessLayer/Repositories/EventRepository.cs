using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repositories
{
	public class EventRepository : GenericRepository<Event>, IEventRepository
	{
		public EventRepository(AppDbContext ctx) : base(ctx) { }

		public async Task<IEnumerable<Event>> GetAllWithParticipantsAsync()
		{
			return await _dbSet
				.Include(e => e.Participants)
				.ToListAsync();
		}

		public async Task<Event?> GetByIdWithParticipantsAsync(Guid id)
		{
			return await _dbSet
				.Include(e => e.Participants)
				.FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task<IEnumerable<Event>> GetEventsForUserAsync(Guid userId)
		{
			return await _dbSet
				.Include(e => e.Participants)
				.Where(e =>
					e.Participants.Any(p => p.UserId == userId)
				)
				.ToListAsync();
		}
	}
}