using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Backend.DB.Models;

public partial class DrivingLicenseContext : DbContext
{
    public DrivingLicenseContext()
    {
    }

    public DrivingLicenseContext(DbContextOptions<DrivingLicenseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Class> Classes { get; set; }

    public virtual DbSet<ClassStudent> ClassStudents { get; set; }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<CourseDetail> CourseDetails { get; set; }

    public virtual DbSet<Exam> Exams { get; set; }

    public virtual DbSet<Image> Images { get; set; }

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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(local);uid=sa;pwd=12345;database=DrivingLicense;TrustServerCertificate=True");

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
            entity.Property(e => e.Comment).HasColumnName("comment");
            entity.Property(e => e.FeedbackCreatedTime)
                .HasColumnType("datetime")
                .HasColumnName("feedbackCreatedTime");
            entity.Property(e => e.Rating).HasColumnName("rating");
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
            entity.Property(e => e.StartDate)
                .HasColumnType("date")
                .HasColumnName("startDate");
            entity.Property(e => e.Status).HasColumnName("status");
        });

        modelBuilder.Entity<CourseDetail>(entity =>
        {
            entity.HasKey(e => e.CourseDetailsId);

            entity.Property(e => e.CourseDetailsId).HasColumnName("courseDetailsID");
            entity.Property(e => e.CourseContent).HasColumnName("courseContent");
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
            entity.Property(e => e.LimitKeyQuestion).HasColumnName("limitKeyQuestion");
            entity.Property(e => e.LimitQuestion).HasColumnName("limitQuestion");
            entity.Property(e => e.MinimumCorrectAnswer).HasColumnName("minimumCorrectAnswer");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.StaffId).HasColumnName("staffID");

            entity.HasOne(d => d.Course).WithMany(p => p.Exams)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exam_Course");

            entity.HasOne(d => d.Staff).WithMany(p => p.Exams)
                .HasForeignKey(d => d.StaffId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Exam_Staff");
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

        modelBuilder.Entity<Lesson>(entity =>
        {
            entity.ToTable("Lesson");

            entity.Property(e => e.LessonId).HasColumnName("lessonID");
            entity.Property(e => e.Attendance).HasColumnName("attendance");
            entity.Property(e => e.ClassStudentId).HasColumnName("classStudentID");
            entity.Property(e => e.EndTime)
                .HasColumnType("datetime")
                .HasColumnName("endTime");
            entity.Property(e => e.Hours).HasColumnName("hours");
            entity.Property(e => e.Kilometers).HasColumnName("kilometers");
            entity.Property(e => e.Location)
                .HasMaxLength(500)
                .HasColumnName("location");
            entity.Property(e => e.StartTime)
                .HasColumnType("datetime")
                .HasColumnName("startTime");
            entity.Property(e => e.Title)
                .HasMaxLength(500)
                .HasColumnName("title");

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

            entity.HasMany(d => d.Tests).WithMany(p => p.Questions)
                .UsingEntity<Dictionary<string, object>>(
                    "TestQuestion",
                    r => r.HasOne<Test>().WithMany()
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_TestQuestion_Test"),
                    l => l.HasOne<Question>().WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_TestQuestion_Question"),
                    j =>
                    {
                        j.HasKey("QuestionId", "TestId");
                        j.ToTable("TestQuestion");
                        j.IndexerProperty<int>("QuestionId").HasColumnName("questionID");
                        j.IndexerProperty<int>("TestId").HasColumnName("testID");
                    });
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
            entity.Property(e => e.TestId).HasColumnName("testID");

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
