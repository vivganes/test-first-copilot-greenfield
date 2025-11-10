// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { UserRegistrationService } from './user-registration.service';
import { RegistrationFormComponent } from './registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

// Only test successful registration flow

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let registrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

  beforeEach(async () => {
    registrationServiceSpy = jasmine.createSpyObj('UserRegistrationService', ['registerUser']);
    await TestBed.configureTestingModule({
      imports: [UserRegistrationComponent, RegistrationFormComponent, ReactiveFormsModule],
      providers: [
        { provide: UserRegistrationService, useValue: registrationServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit valid form and handle success', () => {
    const validFormValue = {
      email: 'test@example.com',
      password: 'ValidPass123!',
      name: 'Test User',
      phoneNumber: '+1234567890',
      address: {
        line1: '123 Main St',
        city: 'Metropolis',
        state: 'State',
        postalCode: '12345',
        country: 'Country',
        isDefault: false
      }
    };
    component.registrationForm.setValue(validFormValue);
    const response = {
      message: 'Please check your email to verify your account',
      userId: 'user-123',
      emailVerified: false,
      status: 'Active',
      role: 'Customer'
    };
    registrationServiceSpy.registerUser.and.returnValue(of(response));
    component.onSubmit();
  expect(registrationServiceSpy.registerUser).toHaveBeenCalledWith(validFormValue);
  expect(component.successMessage).toBe('Please check your email to verify your account');
  expect(component.errorMessage).toBe('');
  });
  it('should render registration form fields and submit button', () => {
    const compiled = fixture.nativeElement;
  expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="password"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="name"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="phoneNumber"]')).toBeTruthy();
  // Address fields
  expect(compiled.querySelector('input[formControlName="line1"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="city"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="state"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="postalCode"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="country"]')).toBeTruthy();
  expect(compiled.querySelector('input[formControlName="isDefault"]')).toBeTruthy();
  expect(compiled.querySelector('button[type="submit"]')).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.registrationForm.setValue({
      email: '',
      password: '',
      name: '',
      phoneNumber: '',
      address: {
        line1: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: false
      }
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[type="submit"]').disabled).toBeTrue();
  });

  it('should show success message after successful registration', () => {
    component.successMessage = 'Please check your email to verify your account';
    component.success = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.success-message').textContent).toContain('Please check your email to verify your account');
  });

  it('should show error message after failed registration', () => {
    component.errorMessage = 'Registration failed!';
    component.error = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.error-message').textContent).toContain('Registration failed!');
  });
});
// GH Copilot code - end
