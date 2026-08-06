using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Interfaces
{
    public interface IPetOwner
    {

        Task Save(PetOwner petOwner);
        Task Update(PetOwner petOwner);
        Task Delete(PetOwner petOwner);

        Task<PetOwner?> FindById(Guid id);

        Task<IEnumerable<PetOwner>> FindAll();
    }
}
