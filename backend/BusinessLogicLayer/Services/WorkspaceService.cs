using Domain.Models;
using Domain.Repositories;
using Domain.Services;

namespace Application.Services
{
	public class WorkspaceService : IWorkspaceService
	{
		private readonly IWorkspaceRepository _repository;

		public WorkspaceService(IWorkspaceRepository repository)
		{
			_repository = repository;
		}

		public async Task<(List<Workspace> workspaces, string error)> GetAllAsync()
		{
			var workspaces = await _repository.GetAllAsync();
			return (workspaces, string.Empty);
		}

		public async Task<(Workspace workspace, string error)> GetByIdAsync(Guid id)
		{
			var workspace = await _repository.GetByIdAsync(id);
			if (workspace == null)
				return (null, "Workspace not found");

			return (workspace, string.Empty);
		}

		public async Task<(Guid id, string error)> CreateAsync(string name, string description, string aviabilityUnit, Guid? coworkingId)
		{
			var (workspace, error) = Workspace.Create(Guid.NewGuid(), name, description, aviabilityUnit, coworkingId);
			if (!string.IsNullOrEmpty(error))
				return (Guid.Empty, error);

			var id = await _repository.CreateAsync(workspace);
			return (id, string.Empty);
		}

		public async Task<(bool success, string error)> DeleteAsync(Guid id)
		{
			var success = await _repository.DeleteAsync(id);
			if (!success)
				return (false, "Workspace not found");

			return (true, string.Empty);
		}
	}
}