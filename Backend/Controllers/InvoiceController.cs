using Backend.DTO.Invoice;
using Backend.Services.Invoice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet("list")]
        public IActionResult GetAll()
        {
            var result = _invoiceService.GetAllInvoices();
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetInvoiceByStudentId(string studentId)
        {
            var result = await _invoiceService.GetInvoiceByStudentId(studentId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpGet("member/{memberId}")]
        public async Task<IActionResult> GetInvoiceByMemberId(int memberId)
        {
            var result = await _invoiceService.GetInvoiceByMemberId(memberId);
            if (result.IsError)
            {
                return NotFound(new
                {
                    error = result.ErrorMessage
                });
            }

            return Ok(result.Payload);
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateInvoice(InvoiceCreateDTO invoiceCreateDto)
        {
            var result = await _invoiceService.CreateInvoice(invoiceCreateDto);
            if (result.IsError)
            {
                if (result.Payload == -1)
                {
                    return NotFound(new
                    {
                        error = result.ErrorMessage
                    });
                }

                return BadRequest(new 
                {
                    error = result.ErrorMessage
                });
            }

            return Ok("Thêm hóa đơn thành công!");
        }
    }
}
