using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;

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
		private IQueryable<Event> GetEventsWithDetailsQuery()
		{
			return _dbSet
				.Include(e => e.Organizer)
				.Include(e => e.EventTags)
					.ThenInclude(et => et.Tag);
		}

		public async Task<IEnumerable<Event>> GetAllWithDetailsAsync(Expression<Func<Event, bool>>? filter = null)
		{
			var query = GetEventsWithDetailsQuery();
			if (filter != null)
			{
				query = query.Where(filter);
			}
			return await query.ToListAsync();
		}
		public async Task<Event?> GetByIdWithDetailsAsync(Guid id)
		{

			return await GetEventsWithDetailsQuery()
				.Include(e => e.Participants)
				.FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task<Event?> GetByIdWithParticipantsAsync(Guid id)
		{
			return await _dbSet
				.Include(e => e.Participants)
				.Include(e => e.Organizer)
				.FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task<IEnumerable<Event>> GetEventsForUserWithDetailsAsync(Guid userId)
		{
			return await GetEventsWithDetailsQuery()
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
		public async Task UpdateEventTagsAsync(Guid eventId, IEnumerable<Guid> newTagIds)
		{
			var eventToUpdate = await _dbSet
				.Include(e => e.EventTags)
				.FirstOrDefaultAsync(e => e.Id == eventId);

			if (eventToUpdate == null) return;

			var currentTagIds = eventToUpdate.EventTags.Select(et => et.TagId).ToList();
			var tagIdsToAdd = newTagIds.Except(currentTagIds).ToList();
			var tagsToRemove = eventToUpdate.EventTags.Where(et => !newTagIds.Contains(et.TagId)).ToList();

			_context.Set<EventTag>().RemoveRange(tagsToRemove);

			foreach (var tagId in tagIdsToAdd)
			{
				eventToUpdate.EventTags.Add(new EventTag { EventId = eventId, TagId = tagId });
			}
		}
	}
}
