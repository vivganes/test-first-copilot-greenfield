// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    // Initialize form group for tests
    component.form = new FormGroup({
      email: new FormControl('', []),
      password: new FormControl('', []),
      name: new FormControl('', []),
      phoneNumber: new FormControl('', []),
      address: new FormGroup({
        line1: new FormControl('', []),
        city: new FormControl('', []),
        state: new FormControl('', []),
        postalCode: new FormControl('', []),
        country: new FormControl('', []),
        isDefault: new FormControl(false)
      })
    });
    fixture.detectChanges();
  });

  it('should build form with required fields and valid data', () => {
    component.buildForm();
    component.form.setValue({
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
    });
    expect(component.form.valid).toBeTrue();
  });

  it('should reset form', () => {
    component.buildForm();
    component.form.setValue({
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
    });
    component.resetForm();
    expect(component.form.pristine).toBeTrue();
  });
 it('should render all form fields', () => {
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
});
  it('should show validation error for invalid email', () => {
    component.form.controls['email'].setValue('invalid-email');
    component.form.controls['email'].markAsTouched();
    component.form.controls['email'].setErrors({ 'email': true });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Invalid email');
  });

  it('should enable submit button when form is valid', () => {
    component.buildForm();
    component.form.setValue({
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
    });
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button[type="submit"]').disabled).toBeFalse();
  });
});
// GH Copilot code - end
