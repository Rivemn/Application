using Domain.Models;
using Domain.Repositories;
using Domain.Services;


namespace Application.Services
{
	public class PhotoService : IPhotoService
	{
		private readonly IPhotoRepository _repository;

		public PhotoService(IPhotoRepository repository)
		{
			_repository = repository;
		}

		public Task<List<Photo>> GetByWorkspaceIdAsync(Guid workspaceId)
		{
			return _repository.GetByWorkspaceIdAsync(workspaceId);
		}

		public Task AddAsync(Photo photo)
		{
			return _repository.AddAsync(photo);
		}

		public Task<bool> DeleteAsync(int id)
		{
			return _repository.DeleteAsync(id);
		}
	}
}
