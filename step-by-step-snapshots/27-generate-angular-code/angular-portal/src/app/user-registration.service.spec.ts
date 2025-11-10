// GH Copilot code - starts
import { TestBed } from '@angular/core/testing';
import { UserRegistrationService } from './user-registration.service';
import { ApiService } from './api.service';
import { of } from 'rxjs';

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

  it('should call API and return response for valid registration', (done) => {
    const request = {
      email: 'test@example.com',
      password: 'ValidPass123!',
      name: 'Test User',
      address: '123 Main St',
      phone: '+1234567890'
    };
    const apiResponse = {
      message: 'Please check your email to verify your account',
      userId: 'user-123',
      emailVerified: false,
      status: 'Active',
      role: 'Customer'
    };
    apiServiceSpy.post.and.returnValue(of(apiResponse));
  service.registerUser(request).subscribe((response: any) => {
      expect(apiServiceSpy.post).toHaveBeenCalledWith('/api/v1/users/register', request);
      expect(response).toEqual(apiResponse);
      done();
    });
  });
});
// GH Copilot code - end
