using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
	public void Configure(EntityTypeBuilder<Event> builder)
	{
		builder.HasKey(e => e.Id);


		builder.Property(e => e.Title)
			.IsRequired()
			.HasMaxLength(200); 

		builder.Property(e => e.Description)
			.IsRequired(false); 

		builder.Property(e => e.Start)
			.IsRequired();

		builder.Property(e => e.End)
			.IsRequired(false); 

		builder.Property(e => e.Location)
			.IsRequired()
			.HasMaxLength(300);

		builder.Property(e => e.Capacity)
			.IsRequired(false); 

		builder.Property(e => e.IsPublic)
			.IsRequired();

		builder.Property(e => e.OrganizerId)
			.IsRequired();


		builder.HasOne(e => e.Organizer)
			.WithMany(u => u.OrganizedEvents) 
			.HasForeignKey(e => e.OrganizerId)
			.OnDelete(DeleteBehavior.Restrict); 
	}
}
