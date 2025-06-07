using Domain.Repositories;
using Domain.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Repositories;

namespace Persistence
{
	public static class ServiceExtensions
	{
		public static IServiceCollection AddDataAccessDependencies(
			this IServiceCollection services,
			IConfiguration configuration)
		{
			services
				.AddAppDbContext(configuration)
				.AddRepositories();

			return services;
		}

		private static IServiceCollection AddAppDbContext(
			this IServiceCollection services,
			IConfiguration configuration)
		{
			var connectionString = configuration.GetConnectionString("NpgSqlConnection");

			services.AddDbContext<AppDbContext>(options =>
				options.UseNpgsql(connectionString));

			return services;
		}

		private static IServiceCollection AddRepositories(this IServiceCollection services)
		{
			services.AddScoped<ICoworkingRepository, CoworkingRepository>();
			services.AddScoped<IWorkspaceRepository, WorkspaceRepository>();
			services.AddScoped<IPhotoRepository, PhotoRepository>();
			services.AddScoped<IAmenityRepository, AmenityRepository>();
            services.AddScoped<IAviabilityRepository, AviabilityRepository>();
            services.AddScoped<IWorkspaceAmenityRepository, WorkspaceAmenityRepository>();
            services.AddScoped<IBookingRepository, BookingRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			return services;
		}
	}
}
