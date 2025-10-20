using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccessLayer.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
	public void Configure(EntityTypeBuilder<Event> builder)
	{
		// Здесь можно добавлять конфигурации для самой сущности Event,
		// например, индексы или ограничения.
		// Связи с этой сущностью настраиваются в других конфигурациях.
	}
}
