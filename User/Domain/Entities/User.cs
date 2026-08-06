using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class User
    {

        public Guid Id { get; private set; }

        public String Name { get; set; } = string.Empty;

        public String Email { get; set; } = string.Empty;

        public String PasswordHash {get;set;} = string.Empty;

        public String? PasswordResetToken { get; set; }
        public DateTime? PasswordResetTokenExpires { get; set; }

        public User() { }

        public User(String name, String email, String passwordHash)
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            PasswordHash = passwordHash;
        }


       
    }
}
