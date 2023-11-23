namespace Backend.DTO.Invoice
{
    public class InvoiceDTO
    {
        public int InvoiceId { get; set; }

        public int StaffId { get; set; }

        public string StaffName { get; set; }

        public int MemberId { get; set; }

        public string MemberName { get; set; }

        public string CourseId { get; set; }

        public DateTime InvoiceTime { get; set; }

        public decimal AmountPaid { get; set; }
    }
}
