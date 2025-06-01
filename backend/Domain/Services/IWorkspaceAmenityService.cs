using Domain.Models;

namespace Domain.Services;

public interface IWorkspaceAmenityService
{
	Task<(bool success, string error)> AddAmenityAsync(Guid workspaceId, int amenityId);
	Task RemoveAmenityAsync(Guid workspaceId, int amenityId);
	Task<List<Amenity>> GetAmenitiesByWorkspaceIdAsync(Guid workspaceId);
}