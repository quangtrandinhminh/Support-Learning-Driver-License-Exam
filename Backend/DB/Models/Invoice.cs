using System;
using System.Collections.Generic;

namespace Backend.DB.Models;

public partial class Invoice
{
    public int InvoiceId { get; set; }

    public int StaffId { get; set; }

    public int MemberId { get; set; }

    public string CourseId { get; set; } = null!;

    public DateTime? InvoiceTime { get; set; }

    public decimal? AmountPaid { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Member Member { get; set; } = null!;

    public virtual Staff Staff { get; set; } = null!;
}
