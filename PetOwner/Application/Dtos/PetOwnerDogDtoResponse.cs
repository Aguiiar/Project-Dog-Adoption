using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class PetOwnerDogDtoResponse
    {
        public Guid Id { get;  set; }
        public required String Name { get; set; }

        public required int Age { get; set; }

        public required String Cpf { get; set; }

        public DateTime BirthDate { get; set; }

        public required Double Salary { get; set; }

        public DogDto Dog { get; set; }
    }
}
