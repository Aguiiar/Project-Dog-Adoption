using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PetOwner
    {
        public Guid Id { get; private set; }
        public required String Name { get; set; }

        public required int Age { get; set; }

        public required String Cpf { get; set; }

        public DateTime BirthDate { get; set; }

        public required Double Salary {get;set;}

        public Guid DogId { get; set; }

        public PetOwner()
        {
        }

        public PetOwner( string name, int age, string cpf, DateTime birthDate, double salary, Guid dogId)
        {
            Id = Guid.NewGuid();
            Name = name;
            Age = age;
            Cpf = cpf;
            BirthDate = birthDate;
            Salary = salary;
            DogId = dogId;
        }
    }
}
