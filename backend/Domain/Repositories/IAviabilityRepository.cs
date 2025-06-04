using Domain.Models;


namespace Domain.Repositories
{
    public interface IAviabilityRepository
    {
        Task<List<Availability>> GetByWorkspaceIdAsync(Guid workspaceId);
        Task<Guid> CreateAsync(Availability aviability);
        Task<bool> DeleteAsync(Guid id);
		Task<bool> DecreaseQuantityAsync(Guid id);
		Task<bool> IncreaseQuantityAsync(Guid id);
	}
}
