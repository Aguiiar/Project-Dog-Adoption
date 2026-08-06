using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class LoginDtoRequest
    {
        public String Email { get; set; } = string.Empty;
        public String Password { get; set; } = string.Empty;


    }
}
