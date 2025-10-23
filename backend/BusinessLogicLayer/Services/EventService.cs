using AutoMapper;
using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;


namespace BusinessLogicLayer.Services
{
	public class EventService : IEventService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper; 


		public EventService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper; 
		}


		public async Task<Result<EventDto>> CreateAsync(CreateEventDto dto, Guid organizerId)
		{
			var entity = _mapper.Map<Event>(dto);
			entity.OrganizerId = organizerId;

			await _unitOfWork.Repository<Event>().AddAsync(entity);
			await _unitOfWork.CompleteAsync();


			var createdDto = _mapper.Map<EventDto>(entity);

			return Result.Success(createdDto);
		}

		public async Task<Result> DeleteAsync(Guid id, Guid currentUserId)
		{
			var repo = _unitOfWork.Repository<Event>();
			var ev = await repo.GetByIdAsync(id); 

			if (ev == null)
			{
				// Подія не знайдена
				return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);
			}

			// Перевірка прав: чи є поточний користувач організатором
			if (ev.OrganizerId != currentUserId)
			{
				// Немає прав на видалення
				return Result.Failure("You are not authorized to delete this event.", EventErrorCodes.Forbidden);
			}

			repo.Remove(ev);
			await _unitOfWork.CompleteAsync();
			return Result.Success(); // Успішне видалення
		}


		public async Task<IEnumerable<EventDto>> GetAllAsync()
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			var events = await repo.GetAllWithParticipantsAsync(); 
																  
			return _mapper.Map<IEnumerable<EventDto>>(events);
		}

		public async Task<EventDto?> GetByIdAsync(Guid id)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			var ev = await repo.GetByIdWithParticipantsAsync(id); 
			if (ev == null) return null;

			return _mapper.Map<EventDto>(ev);
		}

		public async Task<Result> UpdateAsync(Guid id, UpdateEventDto dto, Guid currentUserId)
		{
			var repo = _unitOfWork.Repository<Event>();
			// Отримуємо сутність Event для оновлення
			var entity = await repo.GetByIdAsync(id);

			if (entity == null)
			{
				// Подія не знайдена
				return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);
			}

			// Перевірка прав: чи є поточний користувач організатором
			if (entity.OrganizerId != currentUserId)
			{
				// Немає прав на оновлення
				return Result.Failure("You are not authorized to update this event.", EventErrorCodes.Forbidden);
			}

			_mapper.Map(dto, entity); // Оновлюємо властивості сутності з DTO
			repo.Update(entity); // Позначаємо сутність як змінену
			await _unitOfWork.CompleteAsync();

			return Result.Success(); // Успішне оновлення
		}

		public async Task<IEnumerable<EventDto>> GetMyEventsAsync(Guid userId)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			var events = await repo.GetEventsForUserAsync(userId); 

			return _mapper.Map<IEnumerable<EventDto>>(events);
		}


		public async Task<Result> JoinEventAsync(Guid eventId, Guid userId)
		{
			var eventRepo = (IEventRepository)_unitOfWork.Repository<Event>();
			var participantRepo = _unitOfWork.Repository<EventParticipant>();

			var eventToJoin = await eventRepo.GetByIdWithParticipantsAsync(eventId);
			if (eventToJoin == null)
			{

				return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);
			}

			if (eventToJoin.Capacity.HasValue &&
				eventToJoin.Participants.Count >= eventToJoin.Capacity.Value)
			{

				return Result.Failure("Event is full.", EventErrorCodes.EventFull);
			}

			var existingParticipation = await participantRepo.FindAsync(
				ep => ep.EventId == eventId && ep.UserId == userId
			);

			if (existingParticipation.Any())
			{

				return Result.Failure("You have already joined this event.", EventErrorCodes.AlreadyJoined);
			}

			var participation = new EventParticipant
			{
				EventId = eventId,
				UserId = userId
			};

			await participantRepo.AddAsync(participation);
			await _unitOfWork.CompleteAsync();

			return Result.Success();
		}


		public async Task<Result> LeaveEventAsync(Guid eventId, Guid userId)
		{
			var participantRepo = _unitOfWork.Repository<EventParticipant>();

			var participation = await participantRepo.FindAsync(
				ep => ep.EventId == eventId && ep.UserId == userId
			);

			var participationToRemove = participation.FirstOrDefault();

			if (participationToRemove == null)
			{

				return Result.Failure("You are not participating in this event.", EventErrorCodes.NotParticipant);
			}

			participantRepo.Remove(participationToRemove);
			await _unitOfWork.CompleteAsync();

			return Result.Success();
		}
	}
}