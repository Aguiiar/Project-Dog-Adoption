using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Dog
    {
        public Guid Id { get; private set; }

        public  String Name { get; set; }

        public int Age { get; set; }

        public DateTime BirthDate { get; set; }

        public String Breed { get; set; }

        public String Description { get; set; }

        public String ImageUrl { get; set; }

        public Dog(String name, int age, DateTime birthDate, String breed, String description, string imageUrl)
        {
            Id = Guid.NewGuid();
            Name = name;
            Age = age;
            BirthDate = birthDate;
            Breed = breed;
            Description = description;
            ImageUrl = imageUrl;

        }
    }
}
