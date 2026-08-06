using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SQLitePCL;

namespace WebApplication1.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PetOwnerController : ControllerBase
    {

        private readonly PetOwnerService _service;

        public PetOwnerController(PetOwnerService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult>Save (PetOwner petOwner)
        {
            await _service.Save(petOwner);

            return Ok(new { message = "Saved" });
        }


        [HttpGet("{id}")]
        public async Task<IActionResult>FindById(Guid id)
        {
           var po = await _service.FindById(id);

            return Ok(po);
        }

        [HttpGet]
        public async Task<IActionResult> FindAll()
        {
            var po = await _service.FindAll();

            return Ok(po);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>Update(Guid id, PetOwner PetOwnerUpdate)
        {
            await _service.Update(id, PetOwnerUpdate);

            return Ok(new { message = "Updated" });
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult>Delete(Guid id)
        {
            await _service.Delete(id);

            return Ok(new { message = "Deleted" });
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetAllDogs()
        {
            var dogs = await _service.FindAllPetOwnerDog();
            return Ok(dogs);
        }
    }
}
