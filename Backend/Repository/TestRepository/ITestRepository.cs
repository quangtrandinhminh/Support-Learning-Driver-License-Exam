using Backend.DB.Models;

namespace Backend.Repository.TestRepository
{
    public interface ITestRepository
    {
        IQueryable<Test>? GetAll();

        Task<Test?> GetByIdAsync(int id);

        Task<Test?> CreateAsync(Test Test);

        Task<Test?> UpdateAsync(Test Test);
    }
}
