using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using BusinessLogicLayer.Mappings;
using WebAPI.Validators;

namespace WebAPI.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection AddApiLayer(this IServiceCollection services, IConfiguration configuration)
		{
			services.AddHttpClient();

			services.AddControllers();

			services.AddFluentValidationAutoValidation();

			services.AddValidatorsFromAssemblyContaining<RegisterRequestValidator>();

			services.AddJwtAuthentication(configuration);

			return services;
		}


		private static void AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
		{
			var jwtSection = configuration.GetSection("Jwt");
			var key = Encoding.UTF8.GetBytes(jwtSection["Key"]
				?? throw new InvalidOperationException("JWT Key not configured."));

			services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = jwtSection["Issuer"],
					ValidAudience = jwtSection["Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(key),
					ClockSkew = TimeSpan.Zero
				};
			});

			services.AddAuthorization();
		}
	}
}
