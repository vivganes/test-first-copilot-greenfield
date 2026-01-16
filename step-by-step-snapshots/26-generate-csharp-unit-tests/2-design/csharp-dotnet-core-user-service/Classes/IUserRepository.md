# IUserRepository

## Methods
- AddUser(user: User): void
- GetUserByEmail(email: string): User
- UpdateUser(user: User): void
- EmailExists(email: string): bool

## Related Classes
- User: Repository manages User entities.
- UserRepository: Implements IUserRepository.
- UnitOfWork: Used for transaction management (optional).
