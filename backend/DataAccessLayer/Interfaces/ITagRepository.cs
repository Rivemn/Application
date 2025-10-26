using DataAccessLayer.Entities;


namespace DataAccessLayer.Interfaces
{
	public interface ITagRepository : IRepository<Tag>
	{
		Task<Tag?> FindByNameAsync(string name);
		Task<List<Tag>> GetTagsByIdsAsync(IEnumerable<Guid> ids);
	}
}
