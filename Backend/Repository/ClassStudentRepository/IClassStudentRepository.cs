using Backend.DB.Models;  

namespace Backend.Repository.ClassStudentRepository
{
    public interface IClassStudentRepository
    {
        IQueryable<DB.Models.ClassStudent>? GetAll();

        Task<DB.Models.ClassStudent?> CreateAsync(Backend.DB.Models.ClassStudent classStudent);
    }
}
