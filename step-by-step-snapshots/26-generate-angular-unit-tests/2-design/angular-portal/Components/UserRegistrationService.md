# UserRegistrationService

## Properties
- `apiUrl: string` — Endpoint URL for registration API.

## Methods
- `registerUser(request: UserRegistrationRequest): Observable<UserRegistrationResponse>` — Sends registration data to backend API.
- `handleApiError(error: any): ApiError` — Processes API errors and returns a structured error.

## Related Classes
- `UserRegistrationComponent`: Calls this service to register user.
- `UserRegistrationRequest`: Payload for registration API.
- `UserRegistrationResponse`: Response from registration API.
- `ApiService`: May be used for generic HTTP requests.
