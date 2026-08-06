

using Domain.Entities;
using Domain.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class DogController : ControllerBase
    {

        private readonly DogService _service;

        public DogController(DogService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Save(Domain.Entities.Dog dog)
        {
            await _service.Save(dog);

            return Ok(new { message = "Saved" });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> FindById(Guid id)
        {
           var dog = await _service.FindById(id);

            if (dog == null) return NotFound();

            return Ok(dog);
        }

        [HttpGet]
        public async Task<IActionResult> FindAll()
        {
            var dog = await _service.FindAll();

            return Ok(dog);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Domain.Entities.Dog dogUpdate)
        {
            await _service.Update(id, dogUpdate);

            return Ok(new { message = "Updated" });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.Delete(id);

            return Ok(new { message = "Deleted" });
        }




        [HttpGet("breed/{breed}")]
        public async Task<IActionResult> FindByBreed(String breed)
        {
            var d = await _service.FindByBreed(breed);

            return Ok(d);
        }
    }
}
