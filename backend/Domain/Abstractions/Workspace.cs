using Domain.Enums;
using Domain.Models;


namespace Domain.Abstractions
{
	public abstract class Workspace
	{
		protected Workspace(Guid id, string name, DateTime createdAt)
		{
			Id = id;
			Name = name;
			CreatedAt = createdAt;
			Amenities = new List<Amenity>();
		}

		public Guid Id { get; }
		public string Name { get; }
		public DateTime CreatedAt { get; }
		public List<Amenity> Amenities { get; }

		public abstract WorkspaceKind Kind { get; }
	}

}
