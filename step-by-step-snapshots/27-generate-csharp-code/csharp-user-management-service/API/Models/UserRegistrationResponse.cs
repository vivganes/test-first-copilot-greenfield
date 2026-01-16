// GH Copilot code - starts
namespace API.Models
{
    using System.Text.Json.Serialization;
    public class UserRegistrationResponse
    {
        [JsonPropertyName("message")]
        public string Message { get; set; }
        [JsonPropertyName("userId")]
        public string UserId { get; set; }
        [JsonPropertyName("emailVerified")]
        public bool EmailVerified { get; set; }
        [JsonPropertyName("status")]
        public string Status { get; set; }
        [JsonPropertyName("role")]
        public string Role { get; set; }
    }
}
// GH Copilot code - end
