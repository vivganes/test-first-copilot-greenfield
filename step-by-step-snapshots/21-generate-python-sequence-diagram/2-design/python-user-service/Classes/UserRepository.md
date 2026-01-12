# UserRepository

**Properties:**
- db_session: DatabaseSessionManager

**Methods:**
- add_user(user: User): Adds a new user
- get_user_by_email(email: str): Retrieves user by email
- user_exists(email: str): Checks if user exists

**Related Classes:**
- User: Entity managed
- DatabaseSessionManager: Manages DB connection
