using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BusinessLogicLayer.Mappings;


namespace BusinessLogicLayer
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddBusinessLogicLayer(this IServiceCollection services)
		{

			services.AddScoped<IAuthService, AuthService>();
			services.AddScoped<IEventService, EventService>();

			services.AddScoped<ITagService, TagService>();
			services.AddScoped<IAiAssistantService, AiAssistantService>();

			services.AddAutoMapper(typeof(MappingProfile));

			return services;
		}
	}
}