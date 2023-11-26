using Backend.DB.Models;

namespace Backend.Repository.InvoiceRepository
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly DrivingLicenseContext _context;

        public InvoiceRepository(DrivingLicenseContext context)
        {
            _context = context;
        }

        public IQueryable<Invoice>? GetAll()
        {
            try
            {
                return _context.Invoices.AsQueryable();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<Invoice?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Invoices.FindAsync(id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public async Task<bool> AddAsync(Invoice? invoice)
        {
            try
            {
                await _context.Invoices.AddAsync(invoice);
                var result = await _context.SaveChangesAsync() > 0 ? true : false;
                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
