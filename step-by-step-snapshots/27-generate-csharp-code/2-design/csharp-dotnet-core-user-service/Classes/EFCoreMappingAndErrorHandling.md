// GH Copilot code - starts
# EF Core Entity Mapping and Error Handling Strategy

## EF Core Entity Mapping
- Define entity configurations for User, Address, UserRole, EmailVerificationToken, etc.
- Use Fluent API or Data Annotations to ensure domain models map correctly to database schema.
- Document any differences between domain and database models.
// GH Copilot code - starts
- Ensure all properties required by API and database schema are mapped (including role, email verification, etc.)
// GH Copilot code - end

## Error Handling Strategy
- All API endpoints should return a standardized ErrorResponse object for errors.
- Categorize errors: validation, business logic, infrastructure.
- Use middleware for consistent error handling and response formatting.
- Document error codes and response formats in API spec.
// GH Copilot code - starts
- ErrorResponse must match API spec and E2E test expectations
// GH Copilot code - end
// GH Copilot code - end
