using AutoMapper;
using Backend.DTO.Staff;
using Backend.Repository.StaffRepository;
using Backend.Repository.UserRepository;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services.Staff
{
    public class StaffService : IStaffService
    {
        private readonly IStaffRepository _staffRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public StaffService(IStaffRepository staffRepository, IUserRepository userRepository, IMapper mapper)
        {
            _staffRepository = staffRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public ServiceResult<ICollection<StaffDTO>> GetStaffList()
        {
            var result = new ServiceResult<ICollection<StaffDTO>>();
            try
            {
                var staffs = _staffRepository.GetAll()
                    .Include(s => s.User)
                    .ToList();

                if (!staffs.Any())
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy nhân viên!";
                    return result;
                }

                result.Payload = _mapper.Map<ICollection<StaffDTO>>(staffs);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<StaffDTO>> GetStaffById(int id)
        {
            var result = new ServiceResult<StaffDTO>();
            try
            {
                var staff = await _staffRepository.GetAll()
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.StaffId == id && s.UserId == s.User.UserId);

                if (staff == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy nhân viên!";
                    return result;
                }

                result.Payload = _mapper.Map<StaffDTO>(staff);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<StaffDTO>> GetStaffByUserId(int userId)
        {
            var result = new ServiceResult<StaffDTO>();
            try
            {
                var user = await _userRepository.GetAll()
                    .FirstOrDefaultAsync(u => u.UserId == userId && u.RoleId == 2);

                if (user == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy nhân viên!";
                    return result;
                }

                var staff = await _staffRepository.GetAll()
                    .Include(s => s.User)
                    .FirstOrDefaultAsync(s => s.UserId == user.UserId);

                if (staff == null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Không tìm thấy nhân viên!";
                    return result;
                }

                result.Payload = _mapper.Map<StaffDTO>(staff);
            }
            catch (Exception e)
            {
                result.IsError = true;
                result.ErrorMessage = e.Message;
            }
            return result;
        }

        public async Task<ServiceResult<int>> CreateStaff(StaffCreateDTO staffCreateDto)
        {
            var result = new ServiceResult<int>();
            try
            {
                var user = _userRepository.GetAll();

                var username = await user.FirstOrDefaultAsync(u => u.Username == staffCreateDto.Username);
                if (username != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Tên đăng nhập đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }


                var email = await user.FirstOrDefaultAsync(u => u.Email == staffCreateDto.Email);
                if (email != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Email đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }



                var phone = await user.FirstOrDefaultAsync(u => u.Phone == staffCreateDto.Phone);
                if (phone != null)
                {
                    result.IsError = true;
                    result.ErrorMessage = "Số điện thoại đã tồn tại!";
                    result.Payload = -2;
                    return result;
                }


                var staff = _mapper.Map<DB.Models.User>(staffCreateDto);
                staff.RoleId = 2;
                staff.CreateTime = DateTime.Now;
                staff.Status = true;

                staff = await _userRepository.AddAsync(staff);
                if (staff != null)
                {
                    var newStaff = new DB.Models.Staff()
                    {
                        UserId = staff.UserId,
                    };

                    await _staffRepository.CreateAsync(newStaff);
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
