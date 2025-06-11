using Domain.Models;

namespace Domain.Services
{
	public interface ICoworkingService
	{
		Task<(List<Coworking> coworkings, string error)> GetAllAsync();
		Task<(Coworking coworking, string error)> GetByIdAsync(Guid id);
		Task<(Guid id, string error)> CreateAsync(string name,string description, string address);
		Task<(bool success, string error)> DeleteAsync(Guid id);
	}
}