namespace Domain.Models
{
    public class Amenity
    {
        public int Id { get; private set; }
        public string Name { get; private set; }

        private Amenity(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public static (Amenity? amenity, string error) Create(int id, string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return (null, "Name cannot be empty");

            var amenity = new Amenity(id, name.Trim());
            return (amenity, string.Empty);
        }

        public List<WorkspaceAmenity> WorkspaceAmenities { get; } = new();
    }
}
