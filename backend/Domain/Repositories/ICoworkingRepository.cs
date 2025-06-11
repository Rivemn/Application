using Domain.Models;

namespace Domain.Repositories
{
	public interface ICoworkingRepository
	{
		Task<List<Coworking>> GetAllAsync();
		Task<Coworking?> GetByIdAsync(Guid id);
		Task<Guid> CreateAsync(Coworking coworking);
		Task<bool> DeleteAsync(Guid id);
	}
}
