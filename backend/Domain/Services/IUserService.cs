namespace Domain.Services
{
	public interface IUserService
	{
		Task<Guid> GetOrCreateUserAsync(string fullName, string email);
	}
}
