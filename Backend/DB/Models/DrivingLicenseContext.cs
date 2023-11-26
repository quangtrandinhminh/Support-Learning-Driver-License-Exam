using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB.Models;

public partial class DrivingLicenseContext : DbContext
{
    public DrivingLicenseContext()
    {
    }

    public DrivingLicenseContext(string connectionString)
    {
        this.Database.SetConnectionString(connectionString);
    }

    private string GetConnectionString()
    {
        IConfiguration config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", true, true)
            .Build();
        var strConn = config["ConnectionStrings:AZURE_SQL_CONNECTIONSTRING"];

        return strConn;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer(GetConnectionString());


    public DrivingLicenseContext(DbContextOptions<DrivingLicenseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<ClassStudent> ClassStudents { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseContent> CourseContents { get; set; }

    public virtual DbSet<CourseDetail> CourseDetails { get; set; }

    public virtual DbSet<Curriculum> Curricula { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<FeedBack> FeedBacks { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Invoice> Invoices { get; set; }

    public virtual DbSet<Lesson> Lessons { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<Mentor> Mentors { get; set; }

    public virtual DbSet<News> News { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Staff> Staff { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentAnswer> StudentAnswers { get; set; }

    public virtual DbSet<Test> Tests { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Class>(entity =>
        {
            entity.ToTable("Class");

            entity.Property(e => e.ClassId).HasColumnName("classID");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.DayOfWeek).HasColumnName("dayOfWeek");
            entity.Property(e => e.IsTheoryClass).HasColumnName("isTheoryClass");
            entity.Property(e => e.LimitStudent).HasColumnName("limitStudent");
            entity.Property(e => e.MentorId).HasColumnName("mentorID");
            entity.Property(e => e.Shift).HasColumnName("shift");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Course).WithMany(p => p.Classes)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Class_Course");

            entity.HasOne(d => d.Mentor).WithMany(p => p.Classes)
                .HasForeignKey(d => d.MentorId)
                .HasConstraintName("FK_Class_Mentor");
        });

        modelBuilder.Entity<ClassStudent>(entity =>
        {
            entity.ToTable("ClassStudent");

            entity.Property(e => e.ClassStudentId).HasColumnName("classStudentID");
            entity.Property(e => e.ClassId).HasColumnName("classID");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("studentID");

            entity.HasOne(d => d.Class).WithMany(p => p.ClassStudents)
                .HasForeignKey(d => d.ClassId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassStudent_Class");

            entity.HasOne(d => d.Student).WithMany(p => p.ClassStudents)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ClassStudent_Student");
        });

        modelBuilder.Entity<Course>(entity =>
        {
            entity.ToTable("Course");

            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.CourseFee)
                .HasDefaultValueSql("((22500000.00))")
                .HasColumnType("decimal(11, 2)")
                .HasColumnName("courseFee");
            entity.Property(e => e.CourseMonth).HasColumnName("courseMonth");
            entity.Property(e => e.CourseYear).HasColumnName("courseYear");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("createTime");
            entity.Property(e => e.EndDate)
                .HasColumnType("date")
                .HasColumnName("endDate");
            entity.Property(e => e.LimitStudent).HasColumnName("limitStudent");
            entity.Property(e => e.Name)
                .HasMaxLength(500)
                .HasColumnName("name");
            entity.Property(e => e.NumberOfStudents).HasColumnName("numberOfStudents");
            entity.Property(e => e.PassKm).HasDefaultValueSql("((810))");
            entity.Property(e => e.PassTheoryLs)
                .HasDefaultValueSql("((80.00))")
                .HasColumnType("decimal(5, 2)");
            entity.Property(e => e.StartDate)
                .HasColumnType("date")
                .HasColumnName("startDate");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<CourseContent>(entity =>
        {
            entity.ToTable("CourseContent");

            entity.Property(e => e.CourseContentId).HasColumnName("courseContentId");
            entity.Property(e => e.CourseContent1).HasColumnName("courseContent");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<CourseDetail>(entity =>
        {
            entity.HasKey(e => e.CourseDetailsId);

            entity.Property(e => e.CourseDetailsId).HasColumnName("courseDetailsID");
            entity.Property(e => e.CourseContent)
                .HasMaxLength(500)
                .HasColumnName("courseContent");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.CourseTimeEnd)
                .HasColumnType("datetime")
                .HasColumnName("courseTimeEnd");
            entity.Property(e => e.CourseTimeStart)
                .HasColumnType("datetime")
                .HasColumnName("courseTimeStart");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Course).WithMany(p => p.CourseDetails)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CourseDetails_Course");
        });

        modelBuilder.Entity<Curriculum>(entity =>
        {
            entity.ToTable("Curriculum");

            entity.Property(e => e.CurriculumId).HasColumnName("curriculumID");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreateTime)
                .HasColumnType("date")
                .HasColumnName("createTime");
            entity.Property(e => e.IsTheory).HasColumnName("isTheory");
        });

        modelBuilder.Entity<Exam>(entity =>
        {
            entity.ToTable("Exam");

            entity.Property(e => e.ExamId).HasColumnName("examID");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("createdTime");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.ExamName).HasColumnName("examName");
            entity.Property(e => e.ExamTime)
                .HasColumnType("datetime")
                .HasColumnName("examTime");
            entity.Property(e => e.LimitKeyQuestion).HasColumnName("limitKeyQuestion");
            entity.Property(e => e.LimitQuestion).HasColumnName("limitQuestion");
            entity.Property(e => e.MinimumCorrectAnswer).HasColumnName("minimumCorrectAnswer");
            entity.Property(e => e.StaffId).HasColumnName("staffID");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Course).WithMany(p => p.Exams)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exam_Course");

            entity.HasOne(d => d.Staff).WithMany(p => p.Exams)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exam_Staff");
        });

        modelBuilder.Entity<FeedBack>(entity =>
        {
            entity.ToTable("FeedBack");

            entity.Property(e => e.FeedBackId).HasColumnName("feedBackId");
            entity.Property(e => e.ClassStudentId).HasColumnName("classStudentID");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.FeedBackTime)
                .HasColumnType("date")
                .HasColumnName("feedBackTime");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.ClassStudent).WithMany(p => p.FeedBacks)
                .HasForeignKey(d => d.ClassStudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FeedBack_ClassStudent");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.ToTable("Image");

            entity.Property(e => e.ImageId).HasColumnName("imageID");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("studentID");

            entity.HasOne(d => d.Student).WithMany(p => p.Images)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Image_Student");
        });

        modelBuilder.Entity<Invoice>(entity =>
        {
            entity.ToTable("Invoice");

            entity.Property(e => e.InvoiceId).HasColumnName("invoiceID");
            entity.Property(e => e.AmountInWords)
                .HasMaxLength(255)
                .HasColumnName("amountInWords");
            entity.Property(e => e.AmountPaid)
                .HasDefaultValueSql("((22500000.00))")
                .HasColumnType("decimal(11, 2)")
                .HasColumnName("amountPaid");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.InvoiceTime)
                .HasColumnType("datetime")
                .HasColumnName("invoiceTime");
            entity.Property(e => e.MemberId).HasColumnName("memberID");
            entity.Property(e => e.StaffId).HasColumnName("staffID");

            entity.HasOne(d => d.Course).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Invoice_Course");

            entity.HasOne(d => d.Member).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Invoice_Member");

            entity.HasOne(d => d.Staff).WithMany(p => p.Invoices)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Invoice_Staff");
        });

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.ToTable("Lesson");

            entity.Property(e => e.LessonId).HasColumnName("lessonID");
            entity.Property(e => e.Attendance).HasColumnName("attendance");
            entity.Property(e => e.ClassStudentId).HasColumnName("classStudentID");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.Hours).HasColumnName("hours");
            entity.Property(e => e.IsNight).HasColumnName("isNight");
            entity.Property(e => e.Kilometers).HasColumnName("kilometers");
            entity.Property(e => e.LessonContent)
                .HasMaxLength(500)
                .HasColumnName("lessonContent");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location");

            entity.HasOne(d => d.ClassStudent).WithMany(p => p.Lessons)
                .HasForeignKey(d => d.ClassStudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Lesson_ClassStudent");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.ToTable("Member");

            entity.HasIndex(e => e.IdentityCardNumber, "UC_IdentityCardNumber").IsUnique();

            entity.HasIndex(e => e.UserId, "UC_Member_User").IsUnique();

            entity.Property(e => e.MemberId).HasColumnName("memberID");
            entity.Property(e => e.CardProvidedDate)
                .HasColumnType("date")
                .HasColumnName("cardProvidedDate");
            entity.Property(e => e.CardProvidedLocation)
                .HasMaxLength(255)
                .HasColumnName("cardProvidedLocation");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.Dob)
                .HasColumnType("date")
                .HasColumnName("dob");
            entity.Property(e => e.DrivingLicenseNumber)
                .HasMaxLength(20)
                .HasColumnName("drivingLicenseNumber");
            entity.Property(e => e.DrivingLicenseProvidedDate)
                .HasColumnType("date")
                .HasColumnName("drivingLicenseProvidedDate");
            entity.Property(e => e.DrivingLicenseProvider)
                .HasMaxLength(255)
                .HasColumnName("drivingLicenseProvider");
            entity.Property(e => e.DrivingLicenseTier)
                .HasMaxLength(50)
                .HasColumnName("drivingLicenseTier");
            entity.Property(e => e.DrivingTestTier)
                .HasMaxLength(5)
                .HasColumnName("drivingTestTier");
            entity.Property(e => e.Gender)
                .HasMaxLength(6)
                .HasColumnName("gender");
            entity.Property(e => e.IdentityCardNumber)
                .HasMaxLength(20)
                .HasColumnName("identityCardNumber");
            entity.Property(e => e.IntegratedDrivingLicense).HasColumnName("integratedDrivingLicense");
            entity.Property(e => e.IsPaid).HasColumnName("isPaid");
            entity.Property(e => e.Nation)
                .HasMaxLength(50)
                .HasColumnName("nation");
            entity.Property(e => e.Nationality)
                .HasMaxLength(50)
                .HasColumnName("nationality");
            entity.Property(e => e.Passport)
                .HasMaxLength(20)
                .HasColumnName("passport");
            entity.Property(e => e.RegistrationDate)
                .HasColumnType("date")
                .HasColumnName("registrationDate");
            entity.Property(e => e.RelatedDocument)
                .HasMaxLength(255)
                .HasColumnName("relatedDocument");
            entity.Property(e => e.ResidenceAddress)
                .HasMaxLength(255)
                .HasColumnName("residenceAddress");
            entity.Property(e => e.RevokedDrivingLicense).HasColumnName("revokedDrivingLicense");
            entity.Property(e => e.TemporaryAddress)
                .HasMaxLength(50)
                .HasColumnName("temporaryAddress");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.Course).WithMany(p => p.Members)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK_Member_Course");

            entity.HasOne(d => d.User).WithOne(p => p.Member)
                .HasForeignKey<Member>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Member_User");
        });

        modelBuilder.Entity<Mentor>(entity =>
        {
            entity.ToTable("Mentor");

            entity.HasIndex(e => e.UserId, "UC_Mentor_User").IsUnique();

            entity.Property(e => e.MentorId).HasColumnName("mentorID");
            entity.Property(e => e.CurrentCourse)
                .HasMaxLength(10)
                .HasColumnName("currentCourse");
            entity.Property(e => e.IsTeachingPractice).HasColumnName("isTeachingPractice");
            entity.Property(e => e.IsTeachingTheory).HasColumnName("isTeachingTheory");
            entity.Property(e => e.ResidenceAddress)
                .HasMaxLength(255)
                .HasColumnName("residenceAddress");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.User).WithOne(p => p.Mentor)
                .HasForeignKey<Mentor>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Mentor_User");
        });

        modelBuilder.Entity<News>(entity =>
        {
            entity.Property(e => e.NewsId).HasColumnName("newsID");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("createdTime");
            entity.Property(e => e.Description)
                .HasMaxLength(500)
                .HasColumnName("description");
            entity.Property(e => e.StaffId).HasColumnName("staffID");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(500)
                .HasColumnName("title");

            entity.HasOne(d => d.Staff).WithMany(p => p.News)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_News_Staff");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.ToTable("Question");

            entity.Property(e => e.QuestionId).HasColumnName("questionID");
            entity.Property(e => e.Content).HasColumnName("content");
            entity.Property(e => e.CorrectAnswer).HasColumnName("correctAnswer");
            entity.Property(e => e.Image)
                .IsUnicode(false)
                .HasColumnName("image");
            entity.Property(e => e.KeyQuestion).HasColumnName("keyQuestion");
            entity.Property(e => e.StaffId).HasColumnName("staffID");
            entity.Property(e => e.Status).HasColumnName("status");

            entity.HasOne(d => d.Staff).WithMany(p => p.Questions)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Question_Staff");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("roleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Staff>(entity =>
        {
            entity.HasIndex(e => e.UserId, "UC_Staff_User").IsUnique();

            entity.Property(e => e.StaffId).HasColumnName("staffID");
            entity.Property(e => e.UserId).HasColumnName("userID");

            entity.HasOne(d => d.User).WithOne(p => p.Staff)
                .HasForeignKey<Staff>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Staff_User");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.ToTable("Student");

            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("studentID");
            entity.Property(e => e.CourseId)
                .HasMaxLength(10)
                .HasColumnName("courseID");
            entity.Property(e => e.MemberId).HasColumnName("memberID");
            entity.Property(e => e.Pass).HasColumnName("pass");
            entity.Property(e => e.TotalHour).HasColumnName("totalHour");
            entity.Property(e => e.TotalKm).HasColumnName("totalKm");

            entity.HasOne(d => d.Course).WithMany(p => p.Students)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Student_Course");

            entity.HasOne(d => d.Member).WithMany(p => p.Students)
                .HasForeignKey(d => d.MemberId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Student_Member");
        });

        modelBuilder.Entity<StudentAnswer>(entity =>
        {
            entity.ToTable("StudentAnswer");

            entity.Property(e => e.StudentAnswerId).HasColumnName("studentAnswerID");
            entity.Property(e => e.IsCorrect).HasColumnName("isCorrect");
            entity.Property(e => e.OptionId).HasColumnName("optionID");
            entity.Property(e => e.QuestionId).HasColumnName("questionID");
            entity.Property(e => e.TestId).HasColumnName("testID");

            entity.HasOne(d => d.Question).WithMany(p => p.StudentAnswers)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAnswer_Question");

            entity.HasOne(d => d.Test).WithMany(p => p.StudentAnswers)
                .HasForeignKey(d => d.TestId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_StudentAnswer_Test");
        });

        modelBuilder.Entity<Test>(entity =>
        {
            entity.ToTable("Test");

            entity.Property(e => e.TestId).HasColumnName("testID");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("createTime");
            entity.Property(e => e.ExamId).HasColumnName("examID");
            entity.Property(e => e.Pass).HasColumnName("pass");
            entity.Property(e => e.Score).HasColumnName("score");
            entity.Property(e => e.StudentId)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("studentID");

            entity.HasOne(d => d.Exam).WithMany(p => p.Tests)
                .HasForeignKey(d => d.ExamId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Test_Exam");

            entity.HasOne(d => d.Student).WithMany(p => p.Tests)
                .HasForeignKey(d => d.StudentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Test_Student");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.UserId).HasColumnName("userID");
            entity.Property(e => e.CreateTime)
                .HasColumnType("datetime")
                .HasColumnName("createTime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(50)
                .HasColumnName("fullName");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(10)
                .HasColumnName("phone");
            entity.Property(e => e.RoleId).HasColumnName("roleID");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
