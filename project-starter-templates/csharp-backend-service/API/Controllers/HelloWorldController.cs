using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]

public class Controller : ControllerBase
{
    [HttpGet("hello")]
    public IActionResult HelloWorld() {
        return Ok("Hello world");
    }
    
}
