using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class PetOwnerRepository : IPetOwner
    {

        private readonly AppDbContext _AppContext;

        public PetOwnerRepository(AppDbContext appContext)
        {
            _AppContext = appContext;
        }

        public async Task Save(PetOwner petOwner)
        {
            _AppContext.PetOwners.Add(petOwner);
            await _AppContext.SaveChangesAsync();
        }

        public async Task Update (PetOwner petOwner)
        {
            _AppContext.PetOwners.Update(petOwner);
            await _AppContext.SaveChangesAsync();
        }

        public async Task Delete(PetOwner petOwner)
        {
            _AppContext.PetOwners.Remove(petOwner);
            await _AppContext.SaveChangesAsync();
        }

        public async Task<PetOwner?> FindById(Guid id)
        {
            return await _AppContext.PetOwners.FindAsync(id);
        }

        public async Task<IEnumerable<PetOwner>> FindAll()
        {
            return await _AppContext.PetOwners.ToListAsync();
        }

    }
}
