using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IUser
    {

        Task SaveUser(User user );

        Task <User?> GetByEmailAsync(string email);

        Task UpdateUser(User user);

        Task<User?> GetByPasswordResetTokenAysnc(String token);



    }
}
