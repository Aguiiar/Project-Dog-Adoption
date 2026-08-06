using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class DogDto
    {
        public Guid Id { get; private set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public DateTime BirthDate { get; set; }

        public string Breed { get; set; }
    }
}
