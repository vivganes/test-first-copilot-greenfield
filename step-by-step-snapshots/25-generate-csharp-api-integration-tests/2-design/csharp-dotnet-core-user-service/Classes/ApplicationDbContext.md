# ApplicationDbContext

## Properties
- Users: DbSet<User>
- Addresses: DbSet<Address>

## Methods
- SaveChanges(): int

## Related Classes
- User: Entity set in context.
- Address: Entity set in context.
- UserRepository: Uses ApplicationDbContext for persistence.
- UnitOfWork: Uses ApplicationDbContext for transaction management.
