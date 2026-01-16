// GH Copilot code - starts
namespace API.Models
{
    using System.Text.Json.Serialization;
    public class Address
    {
        [JsonPropertyName("type")]
        public string? Type { get; set; }
        [JsonPropertyName("line1")]
        public string? Line1 { get; set; }
        [JsonPropertyName("line2")]
        public string? Line2 { get; set; }
        [JsonPropertyName("city")]
        public string? City { get; set; }
        [JsonPropertyName("state")]
        public string? State { get; set; }
        [JsonPropertyName("postalCode")]
        public string? PostalCode { get; set; }
        [JsonPropertyName("country")]
        public string? Country { get; set; }
        [JsonPropertyName("isDefault")]
        public bool? IsDefault { get; set; }
        [JsonPropertyName("phoneNumber")]
        public string? PhoneNumber { get; set; }
    }
}
// GH Copilot code - end
