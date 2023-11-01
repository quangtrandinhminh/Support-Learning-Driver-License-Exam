using Backend.DTO.Class;

namespace Backend.Services.Class
{
    public interface IClassService
    {
        public ICollection<ClassDTO> GetAllCllass();
    }
}
