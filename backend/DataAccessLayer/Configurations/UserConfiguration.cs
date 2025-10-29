using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
	public void Configure(EntityTypeBuilder<User> builder)
	{
		builder
			.HasMany(u => u.OrganizedEvents)
			.WithOne(e => e.Organizer)
			.HasForeignKey(e => e.OrganizerId)
			.OnDelete(DeleteBehavior.Restrict);

		builder.Property(u => u.RefreshToken)
			   .HasMaxLength(150)
			   .IsRequired(false);

		builder.Property(u => u.RefreshTokenExpiryTime)
			   .IsRequired(false);
	}
}
