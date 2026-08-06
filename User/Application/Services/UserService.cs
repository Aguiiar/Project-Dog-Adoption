using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Crypto.Generators;
using System.Security.Cryptography;

namespace Application.Services
{
    public class UserService
    {

        private readonly IUser _repository;
        private readonly IToken _token;

        private readonly IEmailService _emailService;

        public UserService(IUser repository, IToken token,IEmailService emailService)
        {
            _repository = repository;
            _token = token;
            _emailService = emailService;
        }

        public async Task SaveUser(UserDtoRequest userDto)
        {

            try
            {

          
            var userExists = await _repository.GetByEmailAsync(userDto.Email);

            if (userExists != null) throw new Exception("E-mail já cadastrado");
           

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

            var user = new User(
                userDto.Name,
                userDto.Email,
                passwordHash);


            await _repository.SaveUser(user);
            }catch(Exception e)
            {
                throw new("Erro"+e);
            }
        }


        public async Task<string> Login(LoginDtoRequest loginDtoRequest)
        {
            var user = await _repository.GetByEmailAsync(loginDtoRequest.Email);

            if (user == null)
            {
                throw new Exception("E-mail ou senha inválidos");
            }
            bool passwordIsValid = BCrypt.Net.BCrypt.Verify(
                loginDtoRequest.Password,
                user.PasswordHash);

            if (!passwordIsValid)
            {
                throw new Exception("E-mail ou senha inválidos");
            }

            var token = _token.GenerateToken(user);
            return token;
        }



        public async Task ForgotPassword(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _repository.GetByEmailAsync(forgotPasswordDto.Email);

            if (user == null)
            {
                return;
            }

            var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));

            user.PasswordResetToken
                 = token;
            user.PasswordResetTokenExpires = DateTime.UtcNow.AddMinutes(30);

            await _repository.UpdateUser(user);

            await _emailService.SendPasswordResetEmail(
                user.Email,
                token);
        }


        public async Task ResetPassword( ResetPasswordDto resetPasswordDto)
        {
            var user = await _repository.GetByPasswordResetTokenAysnc(resetPasswordDto.Token);

            if (user == null)
            {
                throw new Exception("Token inválido");
            }

            if(user.PasswordResetTokenExpires < DateTime.UtcNow)
            {
                throw new Exception("Token expirado");
            }

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(resetPasswordDto.NewPassword);

            user.PasswordResetToken = null;
            user.PasswordResetTokenExpires = null;

            await _repository.UpdateUser(user);
        }
        

        }


    }

