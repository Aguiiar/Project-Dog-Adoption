using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class DogRepository : IDog
    {
        private readonly AppDbContext _appContext;

        public DogRepository(AppDbContext appContext)
        {
            _appContext = appContext;
        }

        public async Task Save(Dog dog)
        {
            _appContext.Dogs.Add(dog);
            await _appContext.SaveChangesAsync();
        }

        public async Task<Dog?> FindById(Guid id)
        {
            return await _appContext.Dogs.FindAsync(id);
        }

        public async Task<IEnumerable<Dog>> FindAll()
        {
            return await _appContext.Dogs.ToListAsync();
        }

        public async Task Update(Dog dog)
        {
            _appContext.Dogs.Update(dog);
            await _appContext.SaveChangesAsync();
        }

        public async Task Delete (Dog dog)
        {
            _appContext.Dogs.Remove(dog);
            await _appContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Dog>> FindByBreed(string breed)
        {
            return await _appContext.Dogs.Where(dog => dog.Breed.Contains(breed)).ToListAsync();
        }
    }
}
