using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Event;
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

		Task<Result<EventDto>> CreateAsync(CreateEventDto dto, Guid organizerId);
		Task<Result> DeleteAsync(Guid id, Guid currentUserId);
		Task<IEnumerable<EventDto>> GetAllAsync(List<Guid>? tagIds = null);
		Task<EventDto?> GetByIdAsync(Guid id);
		Task<Result> UpdateAsync(Guid id, UpdateEventDto dto, Guid currentUserId); 
		Task<Result> JoinEventAsync(Guid eventId, Guid userId);
		Task<Result> LeaveEventAsync(Guid eventId, Guid userId);
		Task<IEnumerable<EventDto>> GetMyEventsAsync(Guid userId);
	}
}
