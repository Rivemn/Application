using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Configurations;

public class EventParticipantConfiguration : IEntityTypeConfiguration<EventParticipant>
{
	public void Configure(EntityTypeBuilder<EventParticipant> builder)
	{

		builder
			.HasKey(ep => new { ep.UserId, ep.EventId });

		// 2. Связь с User
		builder
			.HasOne(ep => ep.User)
			.WithMany(u => u.EventParticipations)
			.HasForeignKey(ep => ep.UserId)
			.OnDelete(DeleteBehavior.Cascade); 


		builder
			.HasOne(ep => ep.Event)
			.WithMany(e => e.Participants)
			.HasForeignKey(ep => ep.EventId)
			.OnDelete(DeleteBehavior.Cascade); 
	}
}