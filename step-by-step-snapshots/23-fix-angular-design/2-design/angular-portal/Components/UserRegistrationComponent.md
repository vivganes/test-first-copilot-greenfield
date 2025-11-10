# UserRegistrationComponent

## Properties
- `registrationForm: FormGroup` — Reactive form group for user registration fields.
- `isSubmitting: boolean` — Indicates if the form is being submitted.
- `errorMessage: string | null` — Stores error message from API or validation.
- `successMessage: string | null` — Stores success message after registration.

## Methods
- `ngOnInit()` — Initializes the form and sets up validation.
- `onSubmit()` — Handles form submission, calls `UserRegistrationService`.
- `handleSuccess(response: UserRegistrationResponse)` — Processes successful registration.
- `handleError(error: ApiError)` — Processes registration errors.

## Related Classes
- `RegistrationFormComponent`: Used to render and manage the form fields.
- `UserRegistrationService`: Called to perform the registration API request.
- `NotificationService`: Used to display success or error messages.
- `UserRegistrationRequest`: Data model for the registration payload.
- `UserRegistrationResponse`: Data model for the API response.
