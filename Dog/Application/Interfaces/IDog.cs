using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IDog
    {
        Task Save(Dog dog);
        Task Update(Dog dog);
        Task Delete(Dog dog);
        Task<Dog?> FindById(Guid id);
        Task<IEnumerable<Dog>> FindAll();

        Task<IEnumerable<Dog>> FindByBreed(String breed );
    }
}
