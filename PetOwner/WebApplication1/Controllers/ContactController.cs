using Application.Dtos;
using Application.Interfaces;
using Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{

    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {

        private readonly IEmail _emailService;

        public ContactController(IEmail emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> Send(ContactRequestDto request)
        {
            await _emailService.sendContactEmailAsync(request.Email, request.Message);

            return Ok(new
            {
                message = "Mensagem enviada com sucesso."
            });
        } 

    }
}
