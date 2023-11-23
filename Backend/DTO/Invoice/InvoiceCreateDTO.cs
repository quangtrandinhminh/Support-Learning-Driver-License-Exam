namespace Backend.DTO.Invoice
{
    public class InvoiceCreateDTO
    {
        public int StaffId { get; set; }

        public int MemberId { get; set; }

        public decimal AmountPaid { get; set; }
    }
}
