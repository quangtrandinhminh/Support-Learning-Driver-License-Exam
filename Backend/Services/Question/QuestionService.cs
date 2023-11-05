using AutoMapper;
using Backend.DTO.Question;
using Backend.Repository.QuestionRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;
using System.Collections.Generic;

namespace Backend.Services.Question
{
    public class QuestionService : IQuestionService
    {
        private readonly IQuestionRepository _questionRepository;
        private readonly IMapper _mapper;

        public QuestionService(IQuestionRepository questionRepository,
            IMapper mapper) 
        { 
            _questionRepository = questionRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<QuestionDTO>> GetAllQuestion()
        {
            var result = new ServiceResult<ICollection<QuestionDTO>>();
            try
            {
                var questions = _questionRepository.GetAll();

                if (!questions.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy câu hỏi!";
                }

                result.Payload = _mapper.Map<ICollection<QuestionDTO>>(questions);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }
    }
}
