using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class ContactRequestDto
    {
        public String Email { get; set; } = string.Empty;

        public String Message { get; set; } = string.Empty;
    }
}
