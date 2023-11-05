using Backend.DTO.Members;
using Backend.DTO.Test;
using System.Threading.Tasks;

namespace Backend.Services.Test
{
    public interface ITestService
    {
        ServiceResult<ICollection<TestDTO>> GetAllTest();
        Task<ServiceResult<TestDTO>> GetTestByStudentId(string studentId);
        Task<ServiceResult<int>> CreateTest(TestCreateDTO testCreateDTO);
        Task<ServiceResult<int>> CheckPassTest(string studentID);
    }
}
