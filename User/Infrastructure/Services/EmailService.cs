using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services

{

    public class EmailService : IEmailService

    {

        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendPasswordResetEmail(string email, string token)
        {
            var smtpClient = new SmtpClient(
                _configuration["Email:Smtp"],
                Convert.ToInt32(_configuration["Email:Port"]))
            {
                Credentials = new NetworkCredential(
                    _configuration["Email:Username"],
                    _configuration["Email:Password"]


           ),
                EnableSsl = true
            };

            var resetLink = $"http://localhost:3000/resetPassword?token={token}";

            var message = new MailMessage
            {
                From = new MailAddress(_configuration["Email:Username"]!),
                Subject = "Recuperação de senha",
                Body = $"Clique o link para redefinir sua senha: \n\n{resetLink}",
                IsBodyHtml = false
            };
            message.To.Add(email);

            await smtpClient.SendMailAsync(message);
        }
    }
}
