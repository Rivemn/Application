using DataAccessLayer.Entities;

using System.Linq.Expressions;

namespace DataAccessLayer.Interfaces
{
	public interface IEventRepository : IRepository<Event>
	{
		Task<IEnumerable<Event>> GetAllWithDetailsAsync(Expression<Func<Event, bool>>? filter = null);
		Task<Event?> GetByIdWithDetailsAsync(Guid id);
		Task<IEnumerable<Event>> GetEventsForUserWithDetailsAsync(Guid userId);

		Task<int> GetParticipantCountAsync(Guid eventId);
		Task UpdateEventTagsAsync(Guid eventId, IEnumerable<Guid> newTagIds);
	}
}