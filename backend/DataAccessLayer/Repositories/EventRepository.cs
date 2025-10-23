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
				.Include(e => e.Organizer)
				.ToListAsync();
		}

		public async Task<Event?> GetByIdWithParticipantsAsync(Guid id)
		{
			return await _dbSet
				.Include(e => e.Participants)
				.Include(e => e.Organizer)
				.FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task<IEnumerable<Event>> GetEventsForUserAsync(Guid userId)
		{
			return await _dbSet
				.Include(e => e.Organizer)
				.Where(e =>
					e.Participants.Any(p => p.UserId == userId) || e.OrganizerId == userId
				)
				.ToListAsync();
		}

		public async Task<int> GetParticipantCountAsync(Guid eventId)
		{
			return await _context.Set<EventParticipant>()
								 .CountAsync(p => p.EventId == eventId);
		}
	}
}
