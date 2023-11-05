using AutoMapper;
using Backend.DTO.StudentAnswer;
using Backend.DTO.Test;
using Backend.Repository.QuestionRepository;
using Backend.Repository.StudentAnswerRepository;
using Backend.Repository.TestRepository;
using Backend.Services.Question;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Services.StudentAnswer
{
    public class StudentAnswerService : IStudentAnswerService
    {
        private readonly IStudentAnswerRepository _studentAnswerRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly ITestRepository _testRepository;
        private IMapper _mapper;

        public StudentAnswerService(IStudentAnswerRepository studentAnswerRepository,
            IMapper mapper, IQuestionRepository questionRepository,
            ITestRepository testRepository)
        {
            _studentAnswerRepository = studentAnswerRepository;
            _questionRepository = questionRepository;
            _testRepository = testRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<StudentAnswerDTO>> GetAllStudentAnswer()
        {
            var result = new ServiceResult<ICollection<StudentAnswerDTO>>();
            try
            {
                var studentAnswers = _studentAnswerRepository.GetAll();

                if (!studentAnswers.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài thi!";
                }

                result.Payload = _mapper.Map<ICollection<StudentAnswerDTO>>(studentAnswers);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public ServiceResult<ICollection<StudentAnswerDTO>> 
            GetAllStudentAnswerByStudentID(string studentID)
        {
            var result = new ServiceResult<ICollection<StudentAnswerDTO>>();
            try
            {
                var studentAnswers = _studentAnswerRepository.GetAll().
                    Include(x => x.Test).
                    Where(x => x.Test.StudentId.Equals(studentID)).ToList();

                if (!studentAnswers.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy bài thi!";
                }

                result.Payload = _mapper.Map<ICollection<StudentAnswerDTO>>(studentAnswers);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateRandomQuestion(string studentID)
        {
            var result = new ServiceResult<int>();
            try
            {
                var studentAnswers = _studentAnswerRepository.GetAll().
                    Include(x => x.Test).
                    Where(x => x.Test.StudentId.Equals(studentID)).FirstOrDefault();
                var test = _testRepository.GetAll().Where(p => p.StudentId.Equals(studentID)).FirstOrDefault();
                if (test != null)
                {
                    if (studentAnswers == null)
                    {
                        var questions = _questionRepository.GetAll().
                                OrderBy(q => Guid.NewGuid()).Take(35).ToList();
                        foreach (var question in questions)
                        {
                            var studentAnswer = new DB.Models.StudentAnswer();
                            studentAnswer.TestId = test.TestId;
                            studentAnswer.QuestionId = question.QuestionId;

                            await _studentAnswerRepository.CreateAsync(studentAnswer);
                        }
                    }
                    else
                    {
                        result.IsError = true;
                        result.Payload = -1;
                        result.ErrorMessage = "Đã có câu hỏi bài thi của thí sinh này!";
                    }
                }
                else
                {
                    result.IsError = true;
                    result.Payload = -2;
                    result.ErrorMessage = "Bài thi của thí sinh này không tồn tại";
                }
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
