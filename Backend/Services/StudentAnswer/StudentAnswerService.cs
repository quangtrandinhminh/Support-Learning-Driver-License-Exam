﻿using AutoMapper;
using Backend.DTO.Lesson;
using Backend.DTO.StudentAnswer;
using Backend.DTO.Test;
using Backend.Repository.QuestionRepository;
using Backend.Repository.StudentAnswerRepository;
using Backend.Repository.StudentRepository;
using Backend.Repository.TestRepository;
using Backend.Services.Question;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Services.StudentAnswer
{
    public class StudentAnswerService : IStudentAnswerService
    {
        private readonly IStudentAnswerRepository _studentAnswerRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly ITestRepository _testRepository;
        private readonly IStudentRepository _studentRepository;
        private IMapper _mapper;

        public StudentAnswerService(IStudentAnswerRepository studentAnswerRepository,
            IMapper mapper, IQuestionRepository questionRepository,
            ITestRepository testRepository, IStudentRepository studentRepository)
        {
            _studentAnswerRepository = studentAnswerRepository;
            _questionRepository = questionRepository;
            _testRepository = testRepository;
            _studentRepository = studentRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<StudentAnswerDTO>> GetAllStudentAnswer()
        {
            var result = new ServiceResult<ICollection<StudentAnswerDTO>>();
            try
            {
                var studentAnswers = _studentAnswerRepository.GetAll().
                    Include(x => x.Question);

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
                    Include(x => x.Question).
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
                                Where(p => p.KeyQuestion == false).Take(32).ToList();
                        var questionss = _questionRepository.GetAll().
                            Where(p => p.KeyQuestion == true).Take(3).ToList();
                        var selectQuestion = questions.Concat(questionss).ToList();
                        selectQuestion = selectQuestion.OrderBy(q => Guid.NewGuid()).ToList();
                        foreach (var question in selectQuestion)
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

        public async Task<ServiceResult<ResultDTO>> CheckUserAnswer(
                ICollection<string> UserAnswer)
        {
            var result = new ServiceResult<ResultDTO>();
            try
            {
                int i = 0;
                short contt = 0;
                int e = 0;
                string studentId = UserAnswer.Count > 0 ? UserAnswer.ElementAt(UserAnswer.Count - 1) : null;
                var studentQuestions = _studentAnswerRepository.GetAll()
                    .Include(p => p.Test)
                    .Where(p => p.Test.StudentId.Equals(studentId)).ToList();
                if (studentQuestions != null)
                {
                    foreach (var studentquestion in studentQuestions)
                    {
                        var question = _questionRepository.GetAll()
                            .Where(y => y.QuestionId == studentquestion.QuestionId).FirstOrDefault();
                        studentquestion.OptionId = byte.Parse(UserAnswer.ElementAt(i));
                        if (question.CorrectAnswer.Equals(int.Parse(UserAnswer.ElementAt(i))))
                        {
                            contt++;
                            studentquestion.IsCorrect = true;
                        }
                        else if (question.KeyQuestion == true)
                        {
                            e++;
                            studentquestion.IsCorrect = false;
                        }
                        else
                        {
                            studentquestion.IsCorrect = false;
                        }
                        i++;
                        await _studentAnswerRepository.UpdateAsync(studentquestion);
                    }
                }
                var test = _testRepository.GetAll()
                    .Where(p => p.StudentId.Equals(studentId)).SingleOrDefault();
                if (test != null) 
                {
                    test.Score = contt;
                    var resultt = new ResultDTO();
                    resultt.NumberOfCorrectAnswer = contt;
                    resultt.NumberOfWrongKeyQuestion = e;
                    if (contt >= 32)
                    {
                        if (e == 0)
                        {
                            test.Pass = true;
                            await _testRepository.UpdateAsync(test);
                            resultt.result = "Pass";
                            result.IsError = false;
                            result.Payload = resultt;
                            return result;
                        }
                        else
                        {
                            test.Pass = false;
                            await _testRepository.UpdateAsync(test);
                            resultt.result = "Not Pass";
                            result.IsError = false;
                            result.Payload = resultt;
                            return result;
                        }
                    }
                    else
                    {
                        test.Pass = false;
                        await _testRepository.UpdateAsync(test);
                        resultt.result = "Not Pass";
                        result.IsError = false;
                        result.Payload = resultt;
                        return result;
                    }
                }  
            }
            catch (Exception l)
            {
                result.IsError = true;
                result.ErrorMessage = l.Message;
            }
            return result;
        }
    }
}
