using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Configurations
{
    public class EmailSettings
    {

        public String Host { get; set; } = string.Empty;

        public int Port { get; set; }

        public String Email { get; set; } = string.Empty;


        public String Password { get; set; } = string.Empty;


    }
}
