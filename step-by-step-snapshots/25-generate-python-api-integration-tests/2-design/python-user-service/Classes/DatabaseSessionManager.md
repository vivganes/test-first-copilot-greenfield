# DatabaseSessionManager

**Properties:**
- connection_string: str
- session: DB session object
- pool: ConnectionPool

**Methods:**
- get_session(): Returns DB session (session-per-request)
- commit(): Commits transaction
- rollback(): Rolls back transaction
- cleanup(): Cleans up session/resources on error or after request

**Session Lifecycle:**
- Session is created at request start, closed at end
- Connection pooling is used for scalability
- Handles transaction isolation and error scenarios

**Related Classes:**
- UserRepository: Uses for DB access
- AddressRepository: Uses for DB access
