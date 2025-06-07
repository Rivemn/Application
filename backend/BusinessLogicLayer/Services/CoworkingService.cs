using Domain.Models;
using Domain.Repositories;
using Domain.Services;

namespace Application.Services
{
	public class CoworkingService : ICoworkingService
	{
		private readonly ICoworkingRepository _repository;

		public CoworkingService(ICoworkingRepository repository)
		{
			_repository = repository;
		}

		public async Task<(List<Coworking> coworkings, string error)> GetAllAsync()
		{
			var coworkings = await _repository.GetAllAsync();
			return (coworkings, string.Empty);
		}

		public async Task<(Coworking coworking, string error)> GetByIdAsync(Guid id)
		{
			var coworking = await _repository.GetByIdAsync(id);
			if (coworking == null)
				return (null, "Coworking not found");

			return (coworking, string.Empty);
		}

		public async Task<(Guid id, string error)> CreateAsync(string name, string address)
		{
			var (coworking, error) = Coworking.Create(Guid.NewGuid(), name, address);
			if (!string.IsNullOrEmpty(error))
				return (Guid.Empty, error);

			var id = await _repository.CreateAsync(coworking);
			return (id, string.Empty);
		}

		public async Task<(bool success, string error)> DeleteAsync(Guid id)
		{
			var success = await _repository.DeleteAsync(id);
			if (!success)
				return (false, "Coworking not found");

			return (true, string.Empty);
		}
	}
}