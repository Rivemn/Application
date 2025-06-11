using Domain.Models;


namespace Domain.Repositories
{
	public interface IWorkspaceRepository
	{
		Task<List<Workspace>> GetAllAsync();
		Task<Workspace?> GetByIdAsync(Guid id);
		Task<List<Workspace>> GetByCoworkingIdAsync(Guid coworkingId);
		Task<Guid> CreateAsync(Workspace workspace);
		Task<bool> DeleteAsync(Guid id);
	}
}
