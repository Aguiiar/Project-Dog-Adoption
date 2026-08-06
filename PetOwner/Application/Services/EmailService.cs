using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Configurations;
using Application.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Application.Services
{
    public class EmailService : IEmail

    {
        private readonly EmailSettings _settings;

        public EmailService(IOptions<EmailSettings> options)
        {
            _settings = options.Value;
        }

        public async Task sendContactEmailAsync(string email, string message)
        {
            var mail = new MimeMessage();

            mail.From.Add(MailboxAddress.Parse(_settings.Email));
            mail.To.Add(MailboxAddress.Parse(_settings.Email));

            mail.Subject = "Contato do Site";

            mail.Body = new TextPart("plain")
            {
                Text = $"""
                E-mail do usuário: { email}

                Mensagem: {message}

                """
            };
            using var sptm = new SmtpClient();
            await sptm.ConnectAsync(_settings.Host, _settings.Port, SecureSocketOptions.StartTls);
            await sptm.AuthenticateAsync(_settings.Email, _settings.Password);

            await sptm.SendAsync(mail);
            await sptm.DisconnectAsync(true);
            }
        }
    }