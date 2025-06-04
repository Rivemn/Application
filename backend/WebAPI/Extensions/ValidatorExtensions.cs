using FluentValidation;
using FluentValidation.AspNetCore;


namespace WebAPI.Extensions
{
	public static class ValidatorExtensions
	{
		public static IServiceCollection AddFluentValidation(this IServiceCollection services)
		{
			services.AddFluentValidationAutoValidation(); 
			services.AddFluentValidationClientsideAdapters(); 
			services.AddValidatorsFromAssemblyContaining<WorkspaceValidator>();

			return services;
		}
	}
}
