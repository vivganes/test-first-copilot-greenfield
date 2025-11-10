# ApiService

## Properties
- `baseUrl: string` — Base URL for API endpoints.

## Methods
- `post<T>(url: string, body: any): Observable<T>` — Sends POST request to API.
- `get<T>(url: string): Observable<T>` — Sends GET request to API.
- `handleError(error: any): ApiError` — Handles API errors.

## Related Classes
- `UserRegistrationService`: May use this service for HTTP requests.
- `ApiError`: Used to represent API errors.
