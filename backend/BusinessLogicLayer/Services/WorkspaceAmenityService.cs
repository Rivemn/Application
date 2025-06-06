using Domain.Models;
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

	public async Task<(bool success, string error)> AddAmenityAsync(Guid workspaceId, int amenityId)
	{
		var (workspaceAmenity, error) = WorkspaceAmenity.Create(workspaceId, amenityId);
		if (!string.IsNullOrEmpty(error))
			return (false, error);

		await _repository.AddAsync(workspaceId, amenityId);
		return (true, string.Empty);
	}

	public async Task RemoveAmenityAsync(Guid workspaceId, int amenityId)
    {
        await _repository.RemoveAsync(workspaceId, amenityId);
    }

    public async Task<List<Amenity>> GetAmenitiesByWorkspaceIdAsync(Guid workspaceId)
    {
        return await _repository.GetAmenitiesByWorkspaceIdAsync(workspaceId);
    }
}
