using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;


namespace BusinessLogicLayer.Services
{
	public class EventService : IEventService
	{

		private readonly IUnitOfWork _unitOfWork;

		public EventService(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}

		public async Task<Event> CreateAsync(Event ev)
		{
			await _unitOfWork.Repository<Event>().AddAsync(ev);
			await _unitOfWork.CompleteAsync();
			return ev;
		}

		public async Task DeleteAsync(Guid id)
		{
			var repo = _unitOfWork.Repository<Event>();

			var ev = await repo.GetByIdAsync(id);
			if (ev != null)
			{
				repo.Remove(ev);
				await _unitOfWork.CompleteAsync();
			}
		}

		public Task<IEnumerable<Event>> GetAllAsync()
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			return repo.GetAllWithParticipantsAsync();
		}

		public Task<Event?> GetByIdAsync(Guid id)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			return repo.GetByIdWithParticipantsAsync(id);
		}


		public async Task UpdateAsync(Event ev)
		{
			_unitOfWork.Repository<Event>().Update(ev);
			await _unitOfWork.CompleteAsync();
		}
		public async Task JoinEventAsync(Guid eventId, Guid userId)
		{
			var eventRepo = (IEventRepository)_unitOfWork.Repository<Event>();
			var participantRepo = _unitOfWork.Repository<EventParticipant>();

			var eventToJoin = await eventRepo.GetByIdWithParticipantsAsync(eventId);
			if (eventToJoin == null)
			{
				throw new KeyNotFoundException("Event not found.");
			}

			if (eventToJoin.Capacity.HasValue &&
				eventToJoin.Participants.Count >= eventToJoin.Capacity.Value)
			{
				throw new InvalidOperationException("Event is full.");
			}

			var existingParticipation = await participantRepo.FindAsync(
				ep => ep.EventId == eventId && ep.UserId == userId
			);

			if (existingParticipation.Any())
			{
				throw new InvalidOperationException("You have already joined this event.");
			}

			var participation = new EventParticipant
			{
				EventId = eventId,
				UserId = userId
			};

			await participantRepo.AddAsync(participation);
			await _unitOfWork.CompleteAsync();
		}

		public async Task LeaveEventAsync(Guid eventId, Guid userId)
		{
			var participantRepo = _unitOfWork.Repository<EventParticipant>();

			var participation = await participantRepo.FindAsync(
				ep => ep.EventId == eventId && ep.UserId == userId
			);

			var participationToRemove = participation.FirstOrDefault();

			if (participationToRemove == null)
			{
				throw new KeyNotFoundException("You are not participating in this event.");
			}

			participantRepo.Remove(participationToRemove);
			await _unitOfWork.CompleteAsync();
		}
	}
}