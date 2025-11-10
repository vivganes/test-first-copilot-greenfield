// GH Copilot code - starts
import { TestBed } from '@angular/core/testing';
import { FormValidationService } from './form-validation.service';

describe('FormValidationService', () => {
  let service: FormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormValidationService]
    });
    service = TestBed.inject(FormValidationService);
  });

  it('should validate email format', () => {
    expect(service.isValidEmail('test.user@example.com')).toBeTrue();
    expect(service.isValidEmail('invalid-email')).toBeFalse();
  });

  it('should validate password format', () => {
    expect(service.isValidPassword('ValidPass1!')).toBeTrue();
    expect(service.isValidPassword('short')).toBeFalse();
    expect(service.isValidPassword('nouppercase1!')).toBeFalse();
    expect(service.isValidPassword('NOLOWERCASE1!')).toBeFalse();
    expect(service.isValidPassword('NoSpecialChar1')).toBeFalse();
  });

  it('should validate phone number format', () => {
    expect(service.isValidPhoneNumber('+12345678901')).toBeTrue();
    expect(service.isValidPhoneNumber('12345')).toBeFalse();
  });
});
// GH Copilot code - end
