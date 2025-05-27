using DateSpaceWebAPI.Extensions;
using Persistence;
using Application;

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
builder.Services.AddApplicationDependencies(builder.Configuration);

builder.Services.AddDataAccessDependencies(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddSwaggerDocumentation();

var app = builder.Build();

app.UseSwaggerDocumentation();

app.UseHttpsRedirection();
app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
