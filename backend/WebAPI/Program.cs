using DataAccessLayer;
using BusinessLogicLayer;
using WebAPI.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAngularDev", policy =>
	{
		policy.WithOrigins("http://localhost:4200")
			  .AllowAnyHeader()
			  .AllowAnyMethod();
	});
});

if (builder.Environment.IsDevelopment())
{
	builder.Services.AddSwaggerDocumentation();
}

builder.Services.AddBusinessLogicLayer();

builder.Services.AddDataAccess(builder.Configuration);

builder.Services.AddApiLayer(builder.Configuration);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwaggerDocumentation();
}

if (app.Environment.IsDevelopment())
{
	app.UseCors("AllowAngularDev");
}

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();