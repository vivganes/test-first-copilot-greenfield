# DatabaseSessionManager

**Properties:**
- connection_string: str
- session: DB session object

**Methods:**
- get_session(): Returns DB session
- commit(): Commits transaction
- rollback(): Rolls back transaction

**Related Classes:**
- UserRepository: Uses for DB access
- AddressRepository: Uses for DB access
