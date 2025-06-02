using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class BookingConfiguration : IEntityTypeConfiguration<BookingEntity>
	{
		public void Configure(EntityTypeBuilder<BookingEntity> builder)
		{
			builder.HasKey(b => b.Id);

			builder.Property(b => b.Status)
				.IsRequired()
				.HasMaxLength(50);

			builder.HasOne(b => b.User)
				.WithMany(u => u.Bookings)
				.HasForeignKey(b => b.UserId);

			builder.HasOne(b => b.Workspace)
				.WithMany() 
				.HasForeignKey(b => b.WorkspaceId);

			builder.HasOne(b => b.Aviability)
				.WithMany(a => a.Bookings)
				.HasForeignKey(b => b.AviabilityId);
		}
	}
}
