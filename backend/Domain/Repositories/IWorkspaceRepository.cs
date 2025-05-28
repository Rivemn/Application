using Domain.Models;


namespace Domain.Repositories
{
	public interface IWorkspaceRepository
	{
		Task<List<Workspace>> GetAllAsync();
		Task<Workspace?> GetByIdAsync(Guid id);
		Task<Guid> CreateAsync(Workspace workspace);
		Task<bool> DeleteAsync(Guid id);
	}
}
