namespace Domain.Models;

public class Workspace
{
	public Guid Id { get; private set; }
	public string Name { get; private set; }
	public string Description { get; private set; }
	public string AvailabilityUnit { get; private set; }



	private Workspace(Guid id, string name, string description, string availabilityUnit)
	{
		Id = id;
		Name = name;
		Description = description;
		AvailabilityUnit = availabilityUnit;
	}

	public static (Workspace? workspace, string error) Create(Guid id, string name, string description, string availabilityUnit)
	{
		if (string.IsNullOrWhiteSpace(name))
			return (null, "Name cannot be empty");

		if (string.IsNullOrWhiteSpace(availabilityUnit))
			return (null, "AvailabilityUnit cannot be empty");

		var workspace = new Workspace(id, name.Trim(), description?.Trim() ?? "", availabilityUnit.Trim());
		return (workspace, string.Empty);
	}
}
