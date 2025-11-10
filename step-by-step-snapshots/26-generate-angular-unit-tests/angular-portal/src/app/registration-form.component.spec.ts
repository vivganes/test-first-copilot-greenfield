
// GH Copilot code - starts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegistrationFormComponent } from './registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegistrationService } from './user-registration.service';
import { of, throwError } from 'rxjs';

describe('RegistrationFormComponent', () => {
	let component: RegistrationFormComponent;
	let fixture: ComponentFixture<RegistrationFormComponent>;
	let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

	beforeEach(async () => {
		userRegistrationServiceSpy = jasmine.createSpyObj('UserRegistrationService', ['register']);
		await TestBed.configureTestingModule({
			declarations: [RegistrationFormComponent],
			imports: [ReactiveFormsModule],
			providers: [
				{ provide: UserRegistrationService, useValue: userRegistrationServiceSpy }
			]
		}).compileComponents();
		fixture = TestBed.createComponent(RegistrationFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});



			it('should create the form with required controls, address optional, phoneNumber mandatory', () => {
				expect(component.form.contains('email')).toBeTrue();
				expect(component.form.contains('password')).toBeTrue();
				expect(component.form.contains('name')).toBeTrue();
				expect(component.form.contains('phoneNumber')).toBeTrue();
				// Address is optional
				expect(component.form.contains('address')).toBeTrue();
				const addressGroup = component.form.get('address');
				if (addressGroup) {
					expect(addressGroup.get('line1')).toBeTruthy();
					expect(addressGroup.get('line2')).toBeTruthy();
					expect(addressGroup.get('city')).toBeTruthy();
					expect(addressGroup.get('state')).toBeTruthy();
					expect(addressGroup.get('postalCode')).toBeTruthy();
					expect(addressGroup.get('country')).toBeTruthy();
					expect(addressGroup.get('type')).toBeTruthy();
					expect(addressGroup.get('phoneNumber')).toBeTruthy();
				}
			});

	it('should validate required fields and patterns', () => {
		const email = component.form.get('email');
		email?.setValue('invalid-email');
		expect(email?.valid).toBeFalse();
		email?.setValue('test.user@example.com');
		expect(email?.valid).toBeTrue();

		const password = component.form.get('password');
		password?.setValue('short');
		expect(password?.valid).toBeFalse();
		password?.setValue('ValidPass1!');
		expect(password?.valid).toBeTrue();
	});



			it('should call UserRegistrationService.register with correct payload when address is provided', () => {
				component.form.setValue({
					email: 'test.user@example.com',
					password: 'ValidPass1!',
					name: 'Test User',
					phoneNumber: '+12345678901',
					address: {
						line1: '123 Main St',
						line2: 'Apt 4B',
						city: 'Metropolis',
						state: 'State',
						postalCode: '12345',
						country: 'Country',
						type: 'Billing',
						phoneNumber: '+12345678901'
					}
				});
				userRegistrationServiceSpy.register.and.returnValue(of({
					message: 'Please check your email to verify your account',
					userId: 'user-123',
					emailVerified: false,
					status: 'Active',
					role: 'Customer'
				}));
				component.onSubmit();
				expect(userRegistrationServiceSpy.register).toHaveBeenCalledWith({
					email: 'test.user@example.com',
					password: 'ValidPass1!',
					name: 'Test User',
					phoneNumber: '+12345678901',
					address: {
						line1: '123 Main St',
						line2: 'Apt 4B',
						city: 'Metropolis',
						state: 'State',
						postalCode: '12345',
						country: 'Country',
						type: 'Billing',
						phoneNumber: '+12345678901'
					}
				});
			});

			it('should call UserRegistrationService.register with correct payload when address is omitted', () => {
				component.form.setValue({
					email: 'test.user@example.com',
					password: 'ValidPass1!',
					name: 'Test User',
					phoneNumber: '+12345678901',
					address: null
				});
				userRegistrationServiceSpy.register.and.returnValue(of({
					message: 'Please check your email to verify your account',
					userId: 'user-123',
					emailVerified: false,
					status: 'Active',
					role: 'Customer'
				}));
				component.onSubmit();
				expect(userRegistrationServiceSpy.register).toHaveBeenCalledWith({
					email: 'test.user@example.com',
					password: 'ValidPass1!',
					name: 'Test User',
					phoneNumber: '+12345678901',
					address: null
				});
			});

	it('should show success message on successful registration', fakeAsync(() => {
		userRegistrationServiceSpy.register.and.returnValue(of({
			message: 'Please check your email to verify your account',
			userId: 'user-123',
			emailVerified: false,
			status: 'Active',
			role: 'Customer'
		}));
		component.form.setValue({
			email: 'test.user@example.com',
			password: 'ValidPass1!',
			name: 'Test User',
			phoneNumber: '+12345678901',
			address: {
				line1: '123 Main St',
				city: 'Metropolis',
				state: 'State',
				postalCode: '12345',
				country: 'Country'
			}
		});
		component.onSubmit();
		tick();
		fixture.detectChanges();
		const successEl = fixture.nativeElement.querySelector('.registration-success');
		expect(successEl.textContent).toContain('Please check your email to verify your account');
	}));

	it('should show error message on registration failure', fakeAsync(() => {
		userRegistrationServiceSpy.register.and.returnValue(throwError(() => ({
			error: { message: 'Email already exists' }
		})));
		component.form.setValue({
			email: 'test.user@example.com',
			password: 'ValidPass1!',
			name: 'Test User',
			phoneNumber: '+12345678901',
			address: {
				line1: '123 Main St',
				city: 'Metropolis',
				state: 'State',
				postalCode: '12345',
				country: 'Country'
			}
		});
		component.onSubmit();
		tick();
		fixture.detectChanges();
		const errorEl = fixture.nativeElement.querySelector('.registration-error');
		expect(errorEl.textContent).toContain('Email already exists');
	}));
});
// GH Copilot code - end
