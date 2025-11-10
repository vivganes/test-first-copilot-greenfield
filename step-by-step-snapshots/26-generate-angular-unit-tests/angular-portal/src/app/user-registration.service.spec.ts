// GH Copilot code - starts
import { TestBed } from '@angular/core/testing';
import { UserRegistrationService } from './user-registration.service';
import { ApiService } from './api.service';
import { of, throwError } from 'rxjs';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['post']);
    TestBed.configureTestingModule({
      providers: [
        UserRegistrationService,
        { provide: ApiService, useValue: apiServiceSpy }
      ]
    });
    service = TestBed.inject(UserRegistrationService);
  });

  it('should call ApiService.post with correct payload for registration', () => {
    const payload = {
      email: 'test.user@example.com',
      password: 'ValidPass1!',
      name: 'Test User',
      phoneNumber: '+12345678901',
      address: null
    };
    apiServiceSpy.post.and.returnValue(of({
      message: 'Please check your email to verify your account',
      userId: 'user-123',
      emailVerified: false,
      status: 'Active',
      role: 'Customer'
    }));
    service.register(payload).subscribe(response => {
      expect(apiServiceSpy.post).toHaveBeenCalledWith('/users/register', payload);
      expect(response.userId).toBe('user-123');
    });
  });

  it('should handle API error response', () => {
    const payload = {
      email: 'test.user@example.com',
      password: 'ValidPass1!',
      name: 'Test User',
      phoneNumber: '+12345678901',
      address: null
    };
    apiServiceSpy.post.and.returnValue(throwError(() => ({ error: { message: 'Email already exists' } })));
    service.register(payload).subscribe({
      error: err => {
        expect(err.error.message).toBe('Email already exists');
      }
    });
  });
});
// GH Copilot code - end
