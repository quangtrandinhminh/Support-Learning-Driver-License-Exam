using Backend.DTO.Invoice;

namespace Backend.Services.Invoice
{
    public interface IInvoiceService
    {
        ServiceResult<ICollection<InvoiceDTO>> GetAllInvoices();

        Task<ServiceResult<InvoiceDTO>> GetInvoiceByStudentId(string studentId);

        Task<ServiceResult<ICollection<InvoiceDTO>>> GetInvoiceByMemberId(int memberId);

        Task<ServiceResult<int>> CreateInvoice(InvoiceCreateDTO invoiceCreateDTO);
    }
}
