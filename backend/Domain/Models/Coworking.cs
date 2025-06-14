﻿namespace Domain.Models
{
	public class Coworking
	{
		public Guid Id { get; private set; }
		public string Name { get; private set; }
		public string Description { get; private set; }
		public string Address { get; private set; }

		private Coworking(Guid id, string name,string description, string address)
		{
			Id = id;
			Name = name;
			Description = description;
			Address = address;
		}

		public static (Coworking? coworking, string error) Create(Guid id, string name, string description, string address)
		{
			if (string.IsNullOrWhiteSpace(name))
				return (null, "Name cannot be empty");

			if (string.IsNullOrWhiteSpace(address))
				return (null, "Address cannot be empty");

			var coworking = new Coworking(id, name.Trim(), description.Trim(), address.Trim());
			return (coworking, string.Empty);
		}
	}
}