# useApi

**Description:**
Custom hook for making API requests and managing loading/error state.

## Properties (State)
- `loading`: Boolean
- `error`: Error message
- `data`: Response data

## Methods
- `request(config)`: Makes API request
- `reset()`: Resets state

## Related Classes
- **RegistrationService**: Uses this hook
- **RegistrationForm**: Indirectly uses for API calls