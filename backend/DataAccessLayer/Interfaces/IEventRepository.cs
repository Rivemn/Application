using DataAccessLayer.Entities;

namespace DataAccessLayer.Interfaces
{

	public interface IEventRepository : IRepository<Event>
	{
		Task<IEnumerable<Event>> GetAllWithParticipantsAsync();
		Task<Event?> GetByIdWithParticipantsAsync(Guid id);

		Task<IEnumerable<Event>> GetEventsForUserAsync(Guid userId);
	}
}