
namespace Domain.Models
{
	public class Workspace
	{
		public Guid Id { get; private set; }
		public string Name { get; private set; }
		public string Description { get; private set; }
		public string AviabilityUnit { get; private set; } // "desks", "rooms", etc.

		private readonly List<Aviability> _aviabilities = new();
		public IReadOnlyCollection<Aviability> Aviabilities => _aviabilities.AsReadOnly();

		public Workspace(Guid id, string name, string description, string aviabilityUnit)
		{
			Id = id;
			Name = name;
			Description = description;
			AviabilityUnit = aviabilityUnit;
		}

		public void AddAviability(Aviability aviability)
		{
			_aviabilities.Add(aviability);
		}
	}

}
