using Domain.Models;

namespace Domain.Services
{
    public interface IAviabilityService
    {
        Task<(List<Aviability> aviabilities, string error)> GetByWorkspaceIdAsync(Guid workspaceId);
        Task<(Guid id, string error)> CreateAsync(Guid workspaceId, int capacity, int capacityOption);
        Task<(bool success, string error)> DeleteAsync(Guid id);
    }
}
