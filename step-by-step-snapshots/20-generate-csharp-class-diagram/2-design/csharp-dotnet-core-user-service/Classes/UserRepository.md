# UserRepository

## Properties
- DbContext: ApplicationDbContext

## Methods
- AddUser(user: User): void
- GetUserByEmail(email: string): User
- UpdateUser(user: User): void
- EmailExists(email: string): bool

## Related Classes
- IUserRepository: UserRepository implements this interface.
- ApplicationDbContext: Used for database operations.
- User: Entity managed by repository.
