using AutoMapper;
using BusinessLogicLayer.Common;
using BusinessLogicLayer.Dtos.Event;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interfaces;


namespace BusinessLogicLayer.Services
{
	public class TagService : ITagService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public TagService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<IEnumerable<TagDto>> GetAllTagsAsync()
		{
			var tags = await _unitOfWork.Repository<Tag>().GetAllAsync();
			return _mapper.Map<IEnumerable<TagDto>>(tags);
		}

		public async Task<Result<TagDto>> CreateTagAsync(string name)
		{

			if (string.IsNullOrWhiteSpace(name) || name.Length > 50)
			{
				return Result.Failure<TagDto>("Tag name is invalid.");
			}

			var tagRepo = (ITagRepository)_unitOfWork.Repository<Tag>();


			var existingTag = await tagRepo.FindByNameAsync(name);
			if (existingTag != null)
			{
				return Result.Failure<TagDto>("Tag with this name already exists.", "TAG_ALREADY_EXISTS");
			}

			var newTag = new Tag { Name = name.Trim() };

			await tagRepo.AddAsync(newTag);

			await _unitOfWork.CompleteAsync();

			return Result.Success(_mapper.Map<TagDto>(newTag));
		}
	}
}
