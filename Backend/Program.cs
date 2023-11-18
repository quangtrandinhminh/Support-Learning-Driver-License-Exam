using Backend.DB;
using Backend.DB.Models;
using Backend.Repository.ClassRepository;
using Backend.Repository.ClassStudentRepository;
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
using Backend.Repository.LessonRepository;
using Backend.Repository.MentorRepository;
using Backend.Repository.QuestionRepository;
using Backend.Repository.StaffRepository;
using Backend.Repository.StudentAnswerRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.TestRepository;
using Backend.Services.CourseDetails;
using Backend.Services.Mentor;
using Backend.Services.Staff;
using Backend.Services.Student;
using Backend.Services.Class;
using Backend.Services.ClassStudent;
using Backend.Services.Exam;
using Backend.Services.Lesson;
using Backend.Services.Test;
using Backend.Services.Question;
using Backend.Services.StudentAnswer;
using Backend.Repository.CourseContentRepository;
using Backend.Services.CourseContent;
using Backend.Repository.CurriculumRepository;
using Backend.Services.Curriculum;

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
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IClassRepository, ClassRepository>();
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<IClassStudentRepository, ClassStudentRepository>();
builder.Services.AddScoped<IClassStudentService, ClassStudentService>();
builder.Services.AddScoped<ILessonRepository, LessonRepository>();
builder.Services.AddScoped<ILessonService, LessonService>();
/*builder.Services.AddScoped<IFeedbackService, FeedbackService>();*/
builder.Services.AddScoped<IExamRepository, ExamRepository>();
builder.Services.AddScoped<IExamService, ExamService>();
builder.Services.AddScoped<ITestRepository, TestRepository>();
builder.Services.AddScoped<ITestService, TestService>();
/*builder.Services.AddScoped<ITestService, TestService>();*/
builder.Services.AddScoped<IStudentAnswerRepository, StudentAnswerRepository>();
/*builder.Services.AddScoped<IStudentAnswerService, IStudentAnswerService>();*/
builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
builder.Services.AddScoped<IQuestionService, QuestionService>();
builder.Services.AddScoped<IStudentAnswerRepository, StudentAnswerRepository>();
builder.Services.AddScoped<IStudentAnswerService, StudentAnswerService>();
builder.Services.AddScoped<ICourseContentRepository, CourseContentRepository>();
builder.Services.AddScoped<ICourseContentService, CourseContentService>();
builder.Services.AddScoped<ICurriculumRepository, CurriculumRepository>();
builder.Services.AddScoped<ICurriculumService, CurriculumService>();


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

var app = builder.Build();

/* DONT CHANGE THIS LINE*/
// doi nua thi toi cho ban ra khoi nhom day
//  Add Cors
app.UseCors(builder => {
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
}
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
