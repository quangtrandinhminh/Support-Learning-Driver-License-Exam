using Backend.DB;
using Backend.Repository.CourseRepository;
using Backend.Repository.NewsRepository;
using Backend.Services.Course;
using Backend.Services.News;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// add database
builder.Services.AddDbContext<DrivingLicenseContext>(option =>
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptionsAction: sqlServerOptions =>
        {
            sqlServerOptions.EnableRetryOnFailure(
                maxRetryCount: 5, // Number of retry attempts
                maxRetryDelay: TimeSpan.FromSeconds(30), // Maximum delay between retries
                errorNumbersToAdd: null // List of specific error numbers to retry (optional)
            );
        }
    ));
//Add Cors
builder.Services.AddCors(options =>
    options.AddPolicy("AllowAll", corsPolicyBuilder => 
    {
        corsPolicyBuilder.WithOrigins("*")
            .AllowCredentials()
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    })
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
