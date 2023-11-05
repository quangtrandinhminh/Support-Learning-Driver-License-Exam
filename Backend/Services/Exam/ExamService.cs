using AutoMapper;
using Backend.DTO.Exam;
using Backend.Repository.CourseRepository;
using Backend.Repository.ExamRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Exam
{
    public class ExamService : IExamService
    {
        private readonly IExamRepository _examRepository;
        private readonly ICourseRepository _courseRepository;
        private readonly IMapper _mapper;

        public ExamService(IExamRepository examRepository, ICourseRepository courseRepository,IMapper mapper)
        {
            _examRepository = examRepository;
            _courseRepository = courseRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<ExamDTO>> GetAll(){
            var result = new ServiceResult<ICollection<ExamDTO>>();
            try
            {
                var exams = _examRepository.GetAll();
                if(!exams.Any()) throw new Exception("Không tìm thấy kì thi!");

                result.Payload = _mapper.Map<ICollection<ExamDTO>>(exams);
            }
            catch(Exception ex)
            {
                result.IsError = true;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<ServiceResult<ExamDTO>> GetById(int id)
        {
            var result = new ServiceResult<ExamDTO>();
            try
            {
                var exam = await _examRepository.GetByIdAsync(id);
                if(exam == null) throw new Exception("Không tìm thấy kì thi!");

                result.Payload = _mapper.Map<ExamDTO>(exam);
            }
            catch(Exception ex)
            {
                result.IsError = true;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> Create(ExamCreateDTO examDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var course = await _courseRepository.GetByIdAsync(examDTO.CourseId);
                if (course == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy khóa học!";
                }

                var exam = await _examRepository.GetAll().Where(e => e.CourseId == examDTO.CourseId)
                    .OrderByDescending(e => e.ExamTime).FirstOrDefaultAsync();
                if (exam != null)
                {
                    var newExam = _mapper.Map<Backend.DB.Models.Exam>(examDTO);
                    if (newExam.ExamTime < exam.ExamTime )
                    {
                        newExam.CreatedTime = DateTime.Now;
                        await _examRepository.CreateAsync(newExam);
                    }
                    else
                    {
                        throw new Exception("Thời gian kì thi phải lớn hơn" + exam.ExamTime.ToString());
                    }
                }
                
                await _examRepository.CreateAsync(_mapper.Map<Backend.DB.Models.Exam>(examDTO));
            }
            catch(Exception ex)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> Update(ExamDTO examDTO)
        {
            var result = new ServiceResult<int>();
            try
            {
                var exam = await _examRepository.GetByIdAsync(examDTO.ExamId);
                if (exam == null) {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy kì thi!";
                };

                var newExam = _mapper.Map(examDTO, exam);
                await _examRepository.UpdateAsync(exam);
            }
            catch (Exception ex)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public async Task<ServiceResult<int>> ChangeStatus(int id)
        {
            var result = new ServiceResult<int>();
            try
            {
                var exam = await _examRepository.GetByIdAsync(id);
                if (exam == null)
                {
                    result.IsError = true;
                    result.Payload = -1;
                    result.ErrorMessage = "Không tìm thấy kì thi!";
                    return result;
                }

                exam.Status = !exam.Status;
                await _examRepository.UpdateAsync(exam);
            }
            catch (Exception ex)
            {
                result.IsError = true;
                result.Payload = 0;
                result.ErrorMessage = ex.Message;
            }

            return result;
        }
    }
}
