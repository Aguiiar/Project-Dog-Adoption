using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;

namespace Domain.Services
{
    public class DogService
    {

        private readonly IDog _repository;

        public DogService(IDog repository)
        {
            _repository = repository;
        }


        public async Task Save(Dog dog)
        {
            await _repository.Save(dog);
        }

        public async Task<Dog?>FindById(Guid id)
        {
            return await _repository.FindById(id);
        }


        public async Task<IEnumerable<Dog>> FindAll()
        {
            return await _repository.FindAll();
        }

        public async Task Update (Guid id, Dog dogUpdate)
        {
            var dog = await _repository.FindById(id);

            dog.Name = dogUpdate.Name;
            dog.Age = dogUpdate.Age;
            dog.BirthDate = dogUpdate.BirthDate;
            dog.Breed = dogUpdate.Breed;
            dog.Description = dogUpdate.Description;
            dog.ImageUrl = dogUpdate.ImageUrl;

            await _repository.Update(dog);
        }

        public async Task Delete(Guid id)
        {
            var dog = await _repository.FindById(id);

            await _repository.Delete(dog);
        }


        public async Task<IEnumerable<Dog>> FindByBreed(String breed)
        {
            return await _repository.FindByBreed(breed);
        }
    }
}
