using Domain.Models;
using Domain.Repositories;
using Domain.Services;

namespace Application.Services
{
    public class AviabilityService : IAviabilityService
    {
        private readonly IAviabilityRepository _repository;
        private readonly IWorkspaceRepository _workspaceRepository;

        public AviabilityService(IAviabilityRepository repository, IWorkspaceRepository workspaceRepository)
        {
            _repository = repository;
            _workspaceRepository = workspaceRepository;
        }

        public async Task<(List<Aviability> aviabilities, string error)> GetByWorkspaceIdAsync(Guid workspaceId)
        {
            var aviabilities = await _repository.GetByWorkspaceIdAsync(workspaceId);
            return (aviabilities, string.Empty);
        }

        public async Task<(Guid id, string error)> CreateAsync(Guid workspaceId, int quantity, int capacityOption)
        {
            var workspace = await _workspaceRepository.GetByIdAsync(workspaceId);
            if (workspace == null)
                return (Guid.Empty, "Workspace not found");

            var (aviability, error) = Aviability.Create(workspace, quantity, capacityOption);
            if (!string.IsNullOrEmpty(error))
                return (Guid.Empty, error);

            var id = await _repository.CreateAsync(aviability);
            return (id, string.Empty);
        }

        public async Task<(bool success, string error)> DeleteAsync(Guid id)
        {
            var success = await _repository.DeleteAsync(id);
            if (!success)
                return (false, "Aviability not found");

            return (true, string.Empty);
        }
    }
}
