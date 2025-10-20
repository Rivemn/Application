using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer.Interfaces
{
	public interface IEventService
	{
		Task<IEnumerable<Event>> GetAllAsync();
		Task<Event?> GetByIdAsync(Guid id);
		Task<Event> CreateAsync(Event ev);
		Task UpdateAsync(Event ev);
		Task DeleteAsync(Guid id);

		Task JoinEventAsync(Guid eventId, Guid userId);
		Task LeaveEventAsync(Guid eventId, Guid userId);

		Task<IEnumerable<Event>> GetMyEventsAsync(Guid userId);
	}
}
