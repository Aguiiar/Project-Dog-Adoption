using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUser

    {
        private readonly AppDbContext _appContext;

        public UserRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }

        public async Task SaveUser(User user)
        {
            await _appContext.Users.AddAsync(user);

            await _appContext.SaveChangesAsync();

        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _appContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task UpdateUser(User user)
        {
            _appContext.Users.Update(user);
            await _appContext.SaveChangesAsync();
        }

        public async Task<User?> GetByPasswordResetTokenAysnc(string token)
        {
            return await _appContext.Users.FirstOrDefaultAsync(x => x.PasswordResetToken == token);
        }
    }
}
