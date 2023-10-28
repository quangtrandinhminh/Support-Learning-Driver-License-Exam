using Backend.DTO.Mentor;
using Backend.DTO.Staff;

namespace Backend.Services.Staff
{
    public interface IStaffService
    {
        ServiceResult<ICollection<StaffDTO>> GetStaffList();

        Task<ServiceResult<StaffDTO>> GetStaffById(int id);
    }
}
