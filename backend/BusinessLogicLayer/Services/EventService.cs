using AutoMapper;
using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Event;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;
using System.Linq.Expressions;


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
			// 1. Валідація кількості тегів
			if (dto.TagNames.Count > 5)
				return Result.Failure<EventDto>("An event cannot have more than 5 tags.");

			// 2. Отримуємо або створюємо теги
			var tagIdsResult = await GetOrCreateTagsAsync(dto.TagNames);
			if (!tagIdsResult.Succeeded) // Перевіряємо, чи вдалося отримати/створити теги
			{
				// Передаємо помилку з GetOrCreateTagsAsync
				return Result.Failure<EventDto>(tagIdsResult.Errors);
			}

			// 3. Створюємо сутність Event
			var entity = _mapper.Map<Event>(dto); // AutoMapper візьме поля Title, Description тощо
			entity.OrganizerId = organizerId;
			// Призначаємо ID тегів до зв'язків
			entity.EventTags = tagIdsResult.Data!.Select(tagId => new EventTag { TagId = tagId }).ToList();

			// 4. Зберігаємо подію
			await _unitOfWork.Repository<Event>().AddAsync(entity);
			await _unitOfWork.CompleteAsync(); // Зберігаємо подію та *можливо* нові зв'язки EventTag

			// 5. Перезавантажуємо та повертаємо DTO (з тегами)
			var createdEventWithDetails = await ((IEventRepository)_unitOfWork.Repository<Event>()).GetByIdWithDetailsAsync(entity.Id);
			if (createdEventWithDetails == null)
			{
				// Це малоймовірно, але обробляємо
				return Result.Failure<EventDto>("Failed to retrieve created event details.");
			}
			var createdDto = _mapper.Map<EventDto>(createdEventWithDetails);
			return Result.Success(createdDto);
		}

		// DeleteAsync залишається як було (з Result)
		public async Task<Result> DeleteAsync(Guid id, Guid currentUserId)
		{
			var repo = _unitOfWork.Repository<Event>();
			var ev = await repo.GetByIdAsync(id);
			if (ev == null) return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);
			if (ev.OrganizerId != currentUserId) return Result.Failure("You are not authorized to delete this event.", EventErrorCodes.Forbidden);
			repo.Remove(ev);
			await _unitOfWork.CompleteAsync();
			return Result.Success();
		}

		// --- ОНОВЛЕНО: Сигнатура відповідає інтерфейсу ---
		public async Task<IEnumerable<EventDto>> GetAllAsync(List<Guid>? tagIds = null)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();

			// Фільтр: тільки публічні + опціонально за тегами
			Expression<Func<Event, bool>> filter = e => e.IsPublic;

			if (tagIds != null && tagIds.Any())
			{
				// Комбінуємо фільтри (подія публічна І має всі вказані теги)
				filter = e => e.IsPublic && tagIds.All(reqTagId => e.EventTags.Any(et => et.TagId == reqTagId));
			}

			var events = await repo.GetAllWithDetailsAsync(filter); // Викликаємо метод з деталями
			return _mapper.Map<IEnumerable<EventDto>>(events);
		}

		// --- ОНОВЛЕНО: Сигнатура відповідає інтерфейсу ---
		public async Task<EventDto?> GetByIdAsync(Guid id)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			var ev = await repo.GetByIdWithDetailsAsync(id); // Викликаємо метод з деталями
			if (ev == null) return null;
			return _mapper.Map<EventDto>(ev);
		}


		public async Task<Result> UpdateAsync(Guid id, UpdateEventDto dto, Guid currentUserId)
		{
			// 1. Валідація кількості тегів
			if (dto.TagNames.Count > 5) return Result.Failure("An event cannot have more than 5 tags.");

			var eventRepo = (IEventRepository)_unitOfWork.Repository<Event>();
			// Отримуємо сутність Event для оновлення (без тегів спочатку)
			// Використовуємо GetByIdAsync з GenericRepository, бо Include(EventTags) не потрібен тут
			var entity = await _unitOfWork.Repository<Event>().GetByIdAsync(id);

			if (entity == null) return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);
			if (entity.OrganizerId != currentUserId) return Result.Failure("You are not authorized to update this event.", EventErrorCodes.Forbidden);

			// 2. Отримуємо або створюємо теги
			var tagIdsResult = await GetOrCreateTagsAsync(dto.TagNames);
			if (!tagIdsResult.Succeeded)
			{
				return Result.Failure(tagIdsResult.Errors); // Передаємо помилку
			}

			// 3. Оновлюємо властивості сутності з DTO (крім тегів)
			_mapper.Map(dto, entity);

			// 4. Оновлюємо зв'язки тегів
			// Цей метод тепер знаходиться в EventRepository
			await eventRepo.UpdateEventTagsAsync(id, tagIdsResult.Data!);

			_unitOfWork.Repository<Event>().Update(entity); // Позначаємо як змінену
			await _unitOfWork.CompleteAsync(); // Зберігаємо зміни сутності ТА зміни зв'язків EventTag

			return Result.Success();
		}
		private async Task<Result<List<Guid>>> GetOrCreateTagsAsync(List<string> tagNames)
		{
			var tagRepo = (ITagRepository)_unitOfWork.Repository<Tag>();
			var tagIds = new List<Guid>();
			// Очищення та отримання унікальних імен без урахування регістру
			var uniqueNames = tagNames
								.Select(name => name.Trim())
								.Where(name => !string.IsNullOrWhiteSpace(name))
								.Distinct(StringComparer.OrdinalIgnoreCase)
								.ToList();

			if (uniqueNames.Count > 5) // Додаткова перевірка після очищення
			{
				return Result.Failure<List<Guid>>("An event cannot have more than 5 tags.");
			}

			foreach (var name in uniqueNames)
			{
				if (name.Length > 50) // Перевірка довжини
				{
					return Result.Failure<List<Guid>>($"Tag name '{name}' exceeds the maximum length of 50 characters.");
				}

				var existingTag = await tagRepo.FindByNameAsync(name); // Пошук без урахування регістру
				if (existingTag != null)
				{
					tagIds.Add(existingTag.Id);
				}
				else
				{
					// Створюємо новий тег
					var newTag = new Tag { Name = name }; // Можна зберігати оригінальний регістр
					await tagRepo.AddAsync(newTag);
					// ВАЖЛИВО: Зберігаємо зміни *тут*, щоб отримати ID нового тегу
					// Це викличе окремий SaveChanges для кожного нового тегу.
					// Для оптимізації можна спочатку додати всі нові теги,
					// а потім викликати SaveChanges один раз.
					await _unitOfWork.CompleteAsync();
					tagIds.Add(newTag.Id);
				}
			}
			return Result.Success(tagIds);
		}

		public async Task<IEnumerable<EventDto>> GetMyEventsAsync(Guid userId)
		{
			var repo = (IEventRepository)_unitOfWork.Repository<Event>();
			var events = await repo.GetEventsForUserWithDetailsAsync(userId); 
			return _mapper.Map<IEnumerable<EventDto>>(events);
		}

		public async Task<Result> JoinEventAsync(Guid eventId, Guid userId)
		{
			var eventRepo = (IEventRepository)_unitOfWork.Repository<Event>();
			var participantRepo = _unitOfWork.Repository<EventParticipant>();


			var eventToJoin = await eventRepo.GetByIdWithDetailsAsync(eventId);

			if (eventToJoin == null) return Result.Failure("Event not found.", EventErrorCodes.EventNotFound);


			if (eventToJoin.Capacity.HasValue && eventToJoin.Participants.Count >= eventToJoin.Capacity.Value) return Result.Failure("Event is full.", EventErrorCodes.EventFull);

			var existingParticipation = await participantRepo.FindAsync(ep => ep.EventId == eventId && ep.UserId == userId);
			if (existingParticipation.Any()) return Result.Failure("You have already joined this event.", EventErrorCodes.AlreadyJoined);

			var participation = new EventParticipant { EventId = eventId, UserId = userId };
			await participantRepo.AddAsync(participation);
			await _unitOfWork.CompleteAsync();
			return Result.Success();
		}


		public async Task<Result> LeaveEventAsync(Guid eventId, Guid userId)
		{
			var participantRepo = _unitOfWork.Repository<EventParticipant>();
			var participation = await participantRepo.FindAsync(ep => ep.EventId == eventId && ep.UserId == userId);
			var participationToRemove = participation.FirstOrDefault();
			if (participationToRemove == null) return Result.Failure("You are not participating in this event.", EventErrorCodes.NotParticipant);
			participantRepo.Remove(participationToRemove);
			await _unitOfWork.CompleteAsync();
			return Result.Success();
		}
	}
}
