using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MeetingRoomBooking.Core.Models
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
		public Guid Id { get;} = Guid.NewGuid();

		public string FullName { get;} = string.Empty;

		public string Email { get;} = string.Empty;

		public DateTime CreatedAt { get;} = DateTime.UtcNow;

		public static User Create(Guid id, string fullName, string email,  DateTime createdAt)
		{
			return new User(id, fullName, email, createdAt);
		}

	}
}
