# AddressRepository

## Properties
- DbContext: DatabaseContext

## Methods
- Add(Address address): void
- GetByUserId(Guid userId): Address

## Related Classes
- IAddressRepository: AddressRepository implements this interface.
- Address: AddressRepository manages Address entities.
- DatabaseContext: Used for database operations.
