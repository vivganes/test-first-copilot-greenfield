// GH Copilot code - starts
namespace API.Models
{
    using System.Text.Json.Serialization;
    public class UserRegistrationRequest
    {
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("password")]
        public string? Password { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string? PhoneNumber { get; set; }
        [JsonPropertyName("address")]
        public Address? Address { get; set; }
        [JsonPropertyName("role")]
        public string? Role { get; set; } = "Customer";
    }
}
// GH Copilot code - end
