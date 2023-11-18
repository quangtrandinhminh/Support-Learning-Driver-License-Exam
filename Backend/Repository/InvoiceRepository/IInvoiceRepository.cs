namespace Backend.Repository.InvoiceRepository
{
    public interface IInvoiceRepository
    {
        IQueryable<DB.Models.Invoice>? GetAll();

        Task<DB.Models.Invoice?> GetByIdAsync(int id);

        Task<bool> AddAsync(DB.Models.Invoice? invoice);
    }
}
