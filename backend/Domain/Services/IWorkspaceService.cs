using Domain.Models;


namespace Domain.Services
{
	public interface IWorkspaceService
	{
		Task<(List<Workspace> workspaces, string error)> GetAllAsync();
		Task<(Workspace workspace, string error)> GetByIdAsync(Guid id);
		Task<(Guid id, string error)> CreateAsync(string name, string description, string aviabilityUnit, Guid? coworkingId);
		Task<(bool success, string error)> DeleteAsync(Guid id);
	}
}
