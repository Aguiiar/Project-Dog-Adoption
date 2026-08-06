using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Application.DTOs;
using Application.Interfaces;

namespace Infrastructure.Http
{
    public class DogClient : IDogClient
    {

        private readonly HttpClient _httpClient;

        public DogClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<bool> DogExists(Guid DogId)
        {
            var response = await _httpClient.GetAsync($"api/dog/{DogId}");
            return response.IsSuccessStatusCode;
        }

        public async Task<DogDto> GetDogById(Guid dogId)
        {

            try
            {
                var response = await _httpClient.GetAsync($"api/dog/{dogId}");
                if (!response.IsSuccessStatusCode) return null;
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var dog = await response.Content.ReadFromJsonAsync<DogDto>(options);
                return dog;
            }catch(Exception ex)
            {
                Console.WriteLine($"Errror");
                return null;
            }
        }


    }
}
