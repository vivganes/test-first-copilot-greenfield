# User

## Properties
// GH Copilot code - starts
Id: string
Name: string
Email: string
PasswordHash: string
PhoneNumber: string
Status: string (Active, Inactive, Suspended)
CreatedAt: DateTime
UpdatedAt: DateTime
LastLogin: DateTime?
EmailVerified: bool
EmailVerifiedAt: DateTime?
DeletedAt: DateTime?
Anonymized: bool
Addresses: List<Address>
Roles: List<string>
// GH Copilot code - end

## Methods
// GH Copilot code - starts
VerifyEmail(): void
AddAddress(address: Address): void
AssignRole(role: string): void
// GH Copilot code - end
