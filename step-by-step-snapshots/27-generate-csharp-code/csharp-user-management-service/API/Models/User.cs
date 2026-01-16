// GH Copilot code - starts
using System;
using System.Collections.Generic;

namespace API.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public DateTime? LastLogin { get; set; }
        public bool EmailVerified { get; set; }
        public DateTime? EmailVerifiedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public bool Anonymized { get; set; }
        public List<Address> Addresses { get; set; } = new List<Address>();
        public List<string> Roles { get; set; } = new List<string>();
    }
}
// GH Copilot code - end
