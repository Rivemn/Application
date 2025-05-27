using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
	public static class ServiceExtensions
	{
		public static IServiceCollection AddDataAccessDependencies(this IServiceCollection services,
			IConfiguration configuration)
		{
			return services
				.AddDbContext(configuration.GetConnectionString("NpgSqlConnection"));
		}

		private static IServiceCollection AddDbContext(this IServiceCollection services, string? connectionString)
		{
			return services.AddDbContext<AppDbContext>(options =>
				options.UseNpgsql(connectionString));
		}
	}
}

