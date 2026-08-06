using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DTOs;

namespace Application.Interfaces
{
    public interface IDogClient
    {

        Task<bool> DogExists(Guid DogId);

        Task<DogDto> GetDogById(Guid dogId);

    
    }
}
