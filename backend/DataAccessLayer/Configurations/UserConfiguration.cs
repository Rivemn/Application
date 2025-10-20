using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		// Связь "Один-ко-многим": User (Organizer) -> Event
		    builder
			.HasMany(u => u.OrganizedEvents)
			.WithOne(e => e.Organizer)
			.HasForeignKey(e => e.OrganizerId)
			.OnDelete(DeleteBehavior.Restrict); // Запрещаем удаление пользователя, если у него есть события
	}
}
