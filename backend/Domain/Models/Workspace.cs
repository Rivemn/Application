namespace Domain.Models;

public class Workspace
{
	public Guid Id { get; private set; }
	public string Name { get; private set; }
	public string Description { get; private set; }
	public string AviabilityUnit { get; private set; }



	private Workspace(Guid id, string name, string description, string aviabilityUnit)
	{
		Id = id;
		Name = name;
		Description = description;
		AviabilityUnit = aviabilityUnit;
	}

	public static (Workspace? workspace, string error) Create(Guid id, string name, string description, string aviabilityUnit)
	{
		if (string.IsNullOrWhiteSpace(name))
			return (null, "Name cannot be empty");

		if (string.IsNullOrWhiteSpace(aviabilityUnit))
			return (null, "AviabilityUnit cannot be empty");

		var workspace = new Workspace(id, name.Trim(), description?.Trim() ?? "", aviabilityUnit.Trim());
		return (workspace, string.Empty);
	}
}
