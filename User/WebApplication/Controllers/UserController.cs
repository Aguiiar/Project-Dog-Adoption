using Application.DTOs;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly UserService _service;

        public UserController(UserService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult>SaveUser(UserDtoRequest request)
        {
            try
            {
                await _service.SaveUser(request);
                return Ok(new { message = "Usuário cadastrado com sucesso!" });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult>Login(LoginDtoRequest loginDtoRequest)
        {
            try
            {

                var token = await _service.Login(loginDtoRequest);
             

                return Ok(new
                {
                    token = token
                });
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Authorize]
        [HttpGet("logado")]
        public IActionResult Logado()
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var nome = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(new
            {
                id,
                nome,
                email
            });
        }



        [HttpPost("sendEmailLinkResetPassword")]
        public async Task<IActionResult>ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            try
            {
                await _service.ForgotPassword(forgotPasswordDto);
                return Ok(new { message = "Se o e-mail existir, enviaremos um link para redefinir a senha" });
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
        {
            try
            {
                await _service.ResetPassword(resetPasswordDto);

                return Ok(new
                {
                    message = "Senha alterada com sucesso!"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            }
        }



    }

