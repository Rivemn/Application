using Domain.Models;

namespace Domain.Services
{
	public interface IPhotoService
	{
		Task<List<Photo>> GetByWorkspaceIdAsync(Guid workspaceId);
		Task AddAsync(Photo photo);
		Task<bool> DeleteAsync(int id);
	}
}
