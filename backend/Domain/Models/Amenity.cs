namespace Domain.Models
{
	public class Amenity
	{
		private Amenity(int id, string name)
		{
			Id = id;
			Name = name;
		}

		public int Id { get; }

		public string Name { get; } = string.Empty;

		public List<WorkspaceAmenity> WorkspaceAmenities { get; } = new();

		public static Amenity Create(int id, string name)
		{
			return new Amenity(id, name);
		}
	}
}
