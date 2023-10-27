using Backend.DB.Models;

namespace Backend.Repository.StaffRepository
{
    public interface IStaffRepository
    {
        IQueryable<Staff>? GetAll();

        Task<Staff?> GetByIdAsync(int id);

        Task<Staff?> CreateAsync(Staff Staff);

        Task<Staff?> UpdateAsync(Staff Staff);
    }
}
