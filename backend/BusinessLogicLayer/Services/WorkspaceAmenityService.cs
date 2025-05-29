using Domain.Repositories;
using Domain.Services;

namespace Application.Services;

public class WorkspaceAmenityService : IWorkspaceAmenityService
{
    private readonly IWorkspaceAmenityRepository _repository;

    public WorkspaceAmenityService(IWorkspaceAmenityRepository repository)
    {
        _repository = repository;
    }

    public async Task AddAmenityAsync(Guid workspaceId, int amenityId)
    {
        await _repository.AddAsync(workspaceId, amenityId);
    }

    public async Task RemoveAmenityAsync(Guid workspaceId, int amenityId)
    {
        await _repository.RemoveAsync(workspaceId, amenityId);
    }

    public async Task<List<int>> GetAmenitiesForWorkspaceAsync(Guid workspaceId)
    {
        return await _repository.GetAmenityIdsByWorkspaceIdAsync(workspaceId);
    }
}
