using Domain.Models;


namespace Domain.Repositories
{
    public interface IAviabilityRepository
    {
        Task<List<Aviability>> GetByWorkspaceIdAsync(Guid workspaceId);
        Task<Guid> CreateAsync(Aviability aviability);
        Task<bool> DeleteAsync(Guid id);
		Task<bool> DecreaseQuantityAsync(Guid id);
		Task<bool> IncreaseQuantityAsync(Guid id);
	}
}
