﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Persistence.Entities;


namespace Persistence.Configurations
{
	public class UserConfiguration : IEntityTypeConfiguration<UserEntity>
	{
		public void Configure(EntityTypeBuilder<UserEntity> builder)
		{
			builder.ToTable("Users");
			builder.HasKey(u => u.Id);
			builder.Property(u => u.FullName).IsRequired().HasMaxLength(200);
			builder.Property(u => u.Email).IsRequired().HasMaxLength(150);
		}
	}
}
