using AutoMapper.Configuration;
using Backend.DB.Models;
using Backend.DTO.CourseDetails;
using Backend.DTO.Members;
using Backend.DTO.Mentor;
using System.Diagnostics;
using Backend.DTO.Lesson;
using Backend.DTO.TeachingSchedule;
using Backend.DTO.Test;
using Backend.DTO.StudentAnswer;

namespace Backend
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            // Course
            CreateMap<DB.Models.Course, DTO.Course.CourseDTO>();
            CreateMap<DTO.Course.CourseDTO, DB.Models.Course>();
            CreateMap<DTO.Course.CourseCreateDTO, DB.Models.Course>();
            CreateMap<DTO.Course.CourseUpdateDTO, DB.Models.Course>();
            
            //CourseDetails
            CreateMap<CourseDetail, CourseDetailsDTO>()
                .ForMember(dto => dto.CourseId, otp => otp.MapFrom(entity => entity.Course.CourseId))
                .ForMember(dto => dto.CourseMonth, otp => otp.MapFrom(entity => entity.Course.CourseMonth))
                .ForMember(dto => dto.LimitStudent, otp => otp.MapFrom(entity => entity.Course.LimitStudent));
            CreateMap<DTO.CourseDetails.CourseDetailsDTO, DB.Models.CourseDetail>();

            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsDTO, DB.Models.News>();
            CreateMap<DTO.News.NewsCreateDTO, DB.Models.News>();
            CreateMap<DTO.News.NewsUpdateDTO, DB.Models.News>();

            //User
            CreateMap<DB.Models.User, DTO.Users.UserDTO>();
            CreateMap<DTO.Users.UserDTO, DB.Models.User>();
            CreateMap<DTO.Users.UserCreateDTO, DB.Models.User>();

            //Member
            CreateMap<Member, MemberDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.FullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone));

            CreateMap<Member, MemberCreateDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.FullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone));

            CreateMap<DTO.Members.MemberDTO, DB.Models.Member>();
            CreateMap<DTO.Members.MemberCreateDTO, DB.Models.Member>();
            CreateMap<DTO.Members.MemberCreateDTO, DB.Models.User>();
            CreateMap<DTO.Course.CourseCreateDTO, DB.Models.Course>();
            
            // News
            CreateMap<DB.Models.News, DTO.News.NewsDTO>();
            CreateMap<DTO.News.NewsCreateDTO, DB.Models.News>();
            CreateMap<DTO.News.NewsUpdateDTO, DB.Models.News>();

            // Mentor
            CreateMap<Mentor, MentorDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.fullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.UserName, opt => opt.MapFrom(entity => entity.User.Username))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone))
                .ForMember(dto => dto.RoleId, opt => opt.MapFrom(entity => entity.User.RoleId))
                .ForMember(dto => dto.CreatedTime, opt => opt.MapFrom(entity => entity.User.CreateTime))
                .ForMember(dto => dto.Status, opt => opt.MapFrom(entity => entity.User.Status));
            CreateMap<DTO.Mentor.MentorCreateDTO, DB.Models.User>();
            CreateMap<DTO.Mentor.MentorCreateDTO, DB.Models.Mentor>();
            CreateMap<DTO.Mentor.MentorUpdateDTO, DB.Models.User>();
            CreateMap<DTO.Mentor.MentorUpdateDTO, DB.Models.Mentor>();

            // Staff
            CreateMap<DB.Models.Staff, DTO.Staff.StaffDTO>()
                .ForMember(dto => dto.UserId, opt => opt.MapFrom(entity => entity.User.UserId))
                .ForMember(dto => dto.fullName, opt => opt.MapFrom(entity => entity.User.FullName))
                .ForMember(dto => dto.Email, opt => opt.MapFrom(entity => entity.User.Email))
                .ForMember(dto => dto.UserName, opt => opt.MapFrom(entity => entity.User.Username))
                .ForMember(dto => dto.Phone, opt => opt.MapFrom(entity => entity.User.Phone))
                .ForMember(dto => dto.RoleId, opt => opt.MapFrom(entity => entity.User.RoleId))
                .ForMember(dto => dto.CreatedTime, opt => opt.MapFrom(entity => entity.User.CreateTime))
                .ForMember(dto => dto.Status, opt => opt.MapFrom(entity => entity.User.Status));
            CreateMap<DTO.Staff.StaffCreateDTO, DB.Models.User>();
            CreateMap<DTO.Staff.StaffCreateDTO, DB.Models.Staff>();
            CreateMap<DTO.Staff.StaffUpdateDTO, DB.Models.User>();
            CreateMap<DTO.Staff.StaffUpdateDTO, DB.Models.Staff>();

            //Student 
            CreateMap<DB.Models.Student, DTO.Student.StudentDTO>();
            CreateMap<DTO.Student.StudentDTO, DB.Models.Student>();

            //Class 
            CreateMap<DB.Models.Class, DTO.Class.ClassDTO>();
            CreateMap<DTO.Class.ClassCreateDTO, DB.Models.Class>();
            CreateMap<DTO.Class.ClassCreatePracticeDTO, DB.Models.Class>();
            CreateMap<DTO.Class.ClassDTO, DB.Models.Class>();
            CreateMap<DTO.Class.ClassMentorDTO, DB.Models.Class>();

            //ClassStudent
            CreateMap<DB.Models.ClassStudent, DTO.ClassStudent.ClassStudentDTO>();
            CreateMap<DTO.ClassStudent.ClassStudentDTO, DB.Models.ClassStudent>();

            //Lesson
            CreateMap<DB.Models.Lesson, DTO.Lesson.LessonDTO>()
                .ForMember(dto => dto.Shift, opt => opt.MapFrom(entity => entity.ClassStudent.Class.Shift))
                .ForMember(dto => dto.IsTheory, opt => opt.MapFrom(entity => entity.ClassStudent.Class.IsTheoryClass))
                .ForMember(dto => dto.MentorId, opt => opt.MapFrom(entity => entity.ClassStudent.Class.MentorId));
            CreateMap<Lesson, TeachingScheduleDTO>()
                .ForMember(dto => dto.CourseId, opt => opt.MapFrom(entity => entity.ClassStudent.Class.CourseId))
                .ForMember(dto => dto.Shift, opt => opt.MapFrom(entity => entity.ClassStudent.Class.Shift))
                .ForMember(dto => dto.IsTheory, opt => opt.MapFrom(entity => entity.ClassStudent.Class.IsTheoryClass));
            CreateMap<Lesson, AttendanceDTO>()
                .ForMember(dto => dto.IsTheory, opt => opt.MapFrom(entity => entity.ClassStudent.Class.IsTheoryClass));
            CreateMap<DTO.Lesson.LessonDTO, DB.Models.Lesson>();
            CreateMap<DTO.Lesson.LessonCreateDTO, DB.Models.Lesson>();
            CreateMap<DTO.Lesson.LessonTheoryCreateDTO, DB.Models.Lesson>();
            CreateMap<DTO.Lesson.LessonTheory, Lesson>();
            CreateMap<DTO.Lesson.LessonUpdateAttendanceDTO, DB.Models.Lesson>();

            // Exam
            CreateMap<DB.Models.Exam, DTO.Exam.ExamDTO>();
            CreateMap<DTO.Exam.ExamCreateDTO, DB.Models.Exam>();

            //Test
            CreateMap<Test, TestDTO>()
                .ForMember(dto => dto.ExamId, opt => opt.MapFrom(entity => entity.Exam.ExamId))
                .ForMember(dto => dto.ExamTime, opt => opt.MapFrom(entity => entity.Exam.ExamTime));
            CreateMap<DTO.Test.TestDTO, DB.Models.Test>();
            CreateMap<DTO.Test.TestCreateDTO, DB.Models.Test>();

            //Question
            CreateMap<DB.Models.Question, DTO.Question.QuestionDTO>();
            CreateMap<DTO.Question.QuestionDTO, DB.Models.Question>();

            //StudentAnswer
            CreateMap<StudentAnswer,StudentAnswerDTO>()
                .ForMember(dto => dto.QuestionId, opt => opt.MapFrom(entity => entity.Question.QuestionId))
                .ForMember(dto => dto.Image, opt => opt.MapFrom(entity => entity.Question.Image));
            CreateMap<DTO.StudentAnswer.StudentAnswerDTO, DB.Models.StudentAnswer>();
        }
    }
}
