using Backend.DB;
using Backend.DB.Models;
using Backend.Repository.ClassRepository;
using Backend.Repository.UserRepository;
using Backend.Repository.CourseRepository;
using Backend.Repository.NewsRepository;
using Backend.Services.Course;
using Backend.Services.News;
using Microsoft.EntityFrameworkCore;
using Backend.Services.User;
using Backend.Repository.MemberRepository;
using Backend.Services.Member;
using Backend.Repository.CourseDetailsRepository;
using Backend.Repository.ExamRepository;
using Backend.Repository.FeedbackRepository;
using Backend.Repository.LessonRepository;
using Backend.Repository.MentorRepository;
using Backend.Repository.QuestionRepository;
using Backend.Repository.StaffRepository;
using Backend.Repository.StudentAnswerRepository;
using Backend.Repository.TeachingScheduleRepository;
using Backend.Repository.TestRepository;
using Backend.Services.CourseDetails;
using Backend.Services.Mentor;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ICourseDetailsRepository, CourseDetailsRepository>();
builder.Services.AddScoped<ICourseDetailsService, CourseDetailsService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<IMentorRepository, MentorRepository>();
builder.Services.AddScoped<IMentorService, MentorService>();
builder.Services.AddScoped<IStaffRepository, StaffRepository>();
/*builder.Services.AddScoped<IStaffService, StaffService>();*/
builder.Services.AddScoped<ITeachingScheduleRepository, TeachingScheduleRepository>();
/*builder.Services.AddScoped<ITeachingScheduleService, TeachingScheduleService>();*/
builder.Services.AddScoped<IClassRepository, ClassRepository>();
/*builder.Services.AddScoped<IClassService, ClassService>();*/
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
/*builder.Services.AddScoped<ILessonService, LessonService>();*/
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
/*builder.Services.AddScoped<IFeedbackService, FeedbackService>();*/
builder.Services.AddScoped<IExamRepository, ExamRepository>();
/*builder.Services.AddScoped<IExamService, ExamService>();*/
builder.Services.AddScoped<ITestRepository, TestRepository>();
/*builder.Services.AddScoped<ITestService, TestService>();*/
builder.Services.AddScoped<IStudentAnswerRepository, StudentAnswerRepository>();
/*builder.Services.AddScoped<IStudentAnswerService, IStudentAnswerService>();*/
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
/*builder.Services.AddScoped<IQuestionService, QuestionService>();*/

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add database
builder.Services.AddDbContext<DrivingLicenseContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        sqlServerOptions => sqlServerOptions.EnableRetryOnFailure(
            maxRetryCount: 5, // Number of retry attempts
            maxRetryDelay: TimeSpan.FromSeconds(30), // Maximum delay between retries
            errorNumbersToAdd: null // List of specific error numbers to retry (optional)
        )
    ), ServiceLifetime.Transient);

// Add Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", corsPolicyBuilder =>
    {
        corsPolicyBuilder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
