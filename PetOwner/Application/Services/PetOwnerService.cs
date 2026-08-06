using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Interfaces;
using Domain.Entities;

namespace Application.Services
{
    public class PetOwnerService
    {
        private readonly IPetOwner _repository;
        private readonly IDogClient _repositoryDog;

        public PetOwnerService(IPetOwner repository, IDogClient repositoryDog)
        {
            _repository = repository;
            _repositoryDog = repositoryDog;
        }

        public async Task Save(PetOwner petOwner)
        {

            var age = DateTime.Today.Year - petOwner.BirthDate.Year;

            var dogExists = await _repositoryDog.DogExists(petOwner.DogId);
            if (!dogExists)
            {
                throw new Exception("Dog don't exists");
            }

            if (dogExists == true )
            {
                throw new Exception("Dog ja foi adotado");
            }

            if (petOwner.Age < 18)
            {
                throw new Exception("You are a minor!");
            }
            else if(age < 18)
            {
                throw new Exception("Birth Date is invalid!");
            }
            else if (petOwner.Salary < 1621)
            {
                throw new Exception("Invalid! Your salary must be greater than 1,621.00");
            }


            await _repository.Save(petOwner);
        }
          
        public async Task<PetOwner?>FindById(Guid Id)
        {
            return await _repository.FindById(Id);
             
        }

        public async Task<IEnumerable<PetOwner>> FindAll()
        {
            return await _repository.FindAll();
        }


        public async Task Delete (Guid id)
        {
            var po = await _repository.FindById(id);

            await _repository.Delete(po);
        }

        public async Task Update(Guid id, PetOwner petOwnerUpdate)
        {
            var po = await _repository.FindById(id);

            po.Name = petOwnerUpdate.Name;
            po.Age = petOwnerUpdate.Age;
            po.Cpf = petOwnerUpdate.Cpf;
            po.BirthDate = petOwnerUpdate.BirthDate;
            po.Salary = petOwnerUpdate.Salary;

            await _repository.Update(po);
        }



        public async Task<List<PetOwnerDogDtoResponse>> FindAllPetOwnerDog()
        {
            var petOwners = await _repository.FindAll();
            var result = new List<PetOwnerDogDtoResponse>();

            foreach(var petOwner in petOwners)
            {
                var dog = await _repositoryDog.GetDogById(petOwner.DogId);

                result.Add(new PetOwnerDogDtoResponse
                {
                    Id = petOwner.Id,
                    Name = petOwner.Name,
                    Age = petOwner.Age,
                    Cpf = petOwner.Cpf,
                    BirthDate = petOwner.BirthDate,
                    Salary = petOwner.Salary,
                    Dog = dog


                });
            }
            return result;
        }
    }
}
