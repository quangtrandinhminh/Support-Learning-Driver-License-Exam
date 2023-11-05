using Backend.DTO.Test;

namespace Backend.Services.Test
{
    public interface ITestService
    {
        ServiceResult<ICollection<TestDTO>> GetAllTest();
        Task<ServiceResult<int>> CreateTest(TestCreateDTO testCreateDTO);
    }
}
