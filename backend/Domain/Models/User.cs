using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
	public class User
	{
		private User (Guid id, string fullName,string email, DateTime createdAt)
		{
			Id= id;
			FullName= fullName;
			Email= email;
			CreatedAt= createdAt;
		}
		public Guid Id { get;} 

		public string FullName { get;}

		public string Email { get;}

		public DateTime CreatedAt { get;}

		public static User Create(Guid id, string fullName, string email,  DateTime createdAt)
		{
			return new User(id, fullName, email, createdAt);
		}
	}
}
