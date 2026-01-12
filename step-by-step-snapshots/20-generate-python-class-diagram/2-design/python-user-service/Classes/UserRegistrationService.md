# UserRegistrationService

**Properties:**
- user_repo: UserRepository
- address_repo: AddressRepository
- password_hasher: PasswordHasher
- email_service: EmailService
- validation_service: ValidationService

**Methods:**
- register_user(user_dto: UserDTO): Registers a new user

**Related Classes:**
- UserRepository: Persists user
- AddressRepository: Persists address
- PasswordHasher: Hashes password
- EmailService: Sends confirmation
- ValidationService: Validates input
- UserDTO: Input data
