using Application;
using DateSpaceWebAPI.Extensions;
using Infrastructure;
using Microsoft.EntityFrameworkCore;
using Persistence;
using WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAll", policy =>
	{
		policy.AllowAnyOrigin()
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});


builder.Services.AddApplicationDependencies();

builder.Services.AddDataAccessDependencies(builder.Configuration);

builder.Services.AddInfrastructureServices();

builder.Services.AddControllers();

builder.Services.AddFluentValidation();

if (builder.Environment.IsDevelopment())
{
	builder.Services.AddSwaggerDocumentation();
}

var app = builder.Build();


using (var scope = app.Services.CreateScope())
{
	var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
	dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
	app.UseSwaggerDocumentation();

}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
