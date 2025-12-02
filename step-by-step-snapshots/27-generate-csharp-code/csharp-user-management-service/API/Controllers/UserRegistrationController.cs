// GH Copilot code - starts
using Microsoft.AspNetCore.Mvc;
using API.Models;
using API.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("api/v1/users")]
    public class UserRegistrationController : ControllerBase
    {
        private readonly IUserRegistrationService _service;

        public UserRegistrationController(IUserRegistrationService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserRegistrationRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var response = _service.RegisterUser(request);
            return StatusCode(201, response);
        }
    }
}
// GH Copilot code - end
