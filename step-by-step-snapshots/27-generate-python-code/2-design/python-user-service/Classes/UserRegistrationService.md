# UserRegistrationService

**Properties:**
- user_repo: UserRepository
- address_repo: AddressRepository
- password_hasher: PasswordHasher
- email_service: EmailService
- validation_service: ValidationService
- verification_service: EmailVerificationService
- db_session_manager: DatabaseSessionManager

**Methods:**
- register_user(user_dto: UserDTO): Registers a new user (with transaction management)
    - Begins DB transaction
    - Creates User, Address, UserRole
    - Generates email verification token
    - Sends verification email
    - Commits transaction if all succeed
    - Rolls back transaction on failure
    - Handles email service failure gracefully (user created, email not sent)
- rollback_on_failure(): Rolls back transaction and cleans up orphaned data

**Related Classes:**
- UserRepository: Persists user
- AddressRepository: Persists address
- PasswordHasher: Hashes password
- EmailService: Sends confirmation
- ValidationService: Validates input
- UserDTO: Input data
- EmailVerificationService: Manages verification tokens/emails
- DatabaseSessionManager: Manages DB transactions
