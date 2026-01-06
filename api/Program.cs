using Amazon.S3;
using BoatAdminApi.Data;
using BoatAdminApi.Repositories;
using BoatAdminApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ----------------------------
// Controllers
// ----------------------------
builder.Services.AddControllers();

// ----------------------------
// EF Core
// ----------------------------
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ----------------------------
// AWS S3
// ----------------------------
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();

// ----------------------------
// Dependency Injection
// ----------------------------
builder.Services.AddScoped<IBoatRepository, BoatRepository>();
builder.Services.AddScoped<IBoatService, BoatService>();

builder.Services.AddScoped<IStorageRepository, S3StorageRepository>();
builder.Services.AddScoped<IBoatPhotoRepository, BoatPhotoRepository>();
builder.Services.AddScoped<IBoatPhotoService, BoatPhotoService>();
// Boat video services
builder.Services.AddScoped<IBoatVideoRepository, BoatVideoRepository>();
builder.Services.AddScoped<IBoatVideoService, BoatVideoService>();

builder.Services.AddScoped<IVehicleLookupRepository, VehicleLookupRepository>();
builder.Services.AddScoped<IVehicleLookupService, VehicleLookupService>();

builder.Services.AddScoped<ICityRepository, CityRepository>();
builder.Services.AddScoped<ICityService, CityService>();


// ----------------------------
// CORS (Frontend uploads)
// ----------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// ----------------------------
// Swagger
// ----------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ----------------------------
// Middleware
// ----------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
