namespace Domain.Services;

public interface IWorkspaceAmenityService
{
    Task AddAmenityAsync(Guid workspaceId, int amenityId);
    Task RemoveAmenityAsync(Guid workspaceId, int amenityId);
    Task<List<int>> GetAmenitiesForWorkspaceAsync(Guid workspaceId);
}