
// GH Copilot code - starts
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserRegistrationComponent } from './user-registration.component';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationSuccessComponent } from './registration-success.component';
import { RegistrationErrorComponent } from './registration-error.component';
import { UserRegistrationService } from './user-registration.service';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserRegistrationComponent', () => {
	let component: UserRegistrationComponent;
	let fixture: ComponentFixture<UserRegistrationComponent>;
	let userRegistrationServiceSpy: jasmine.SpyObj<UserRegistrationService>;

	beforeEach(async () => {
		userRegistrationServiceSpy = jasmine.createSpyObj('UserRegistrationService', ['register']);
		await TestBed.configureTestingModule({
			declarations: [
				UserRegistrationComponent,
				RegistrationFormComponent,
				RegistrationSuccessComponent,
				RegistrationErrorComponent
			],
			providers: [
				{ provide: UserRegistrationService, useValue: userRegistrationServiceSpy }
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();
		fixture = TestBed.createComponent(UserRegistrationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should render the registration form', () => {
		const formEl = fixture.nativeElement.querySelector('app-registration-form');
		expect(formEl).toBeTruthy();
	});

	it('should handle successful registration and show success component', fakeAsync(() => {
		const payload = {
			email: 'test.user@example.com',
			password: 'ValidPass1!',
			name: 'Test User',
			phoneNumber: '+12345678901',
			address: {
				line1: '123 Main St',
				city: 'Metropolis',
				state: 'State',
				postalCode: '12345',
				country: 'Country',
				type: 'Billing',
				phoneNumber: '+12345678901'
			}
		};
		userRegistrationServiceSpy.register.and.returnValue(of({
			message: 'Please check your email to verify your account',
			userId: 'user-123',
			emailVerified: false,
			status: 'Active',
			role: 'Customer'
		}));
		component.onRegister(payload);
		tick();
		fixture.detectChanges();
		const successEl = fixture.nativeElement.querySelector('app-registration-success');
		expect(successEl).toBeTruthy();
	}));

	it('should handle registration error and show error component', fakeAsync(() => {
		const payload = {
			email: 'test.user@example.com',
			password: 'ValidPass1!',
			name: 'Test User',
			phoneNumber: '+12345678901',
			address: null
		};
		userRegistrationServiceSpy.register.and.returnValue(throwError(() => ({
			error: { message: 'Email already exists' }
		})));
		component.onRegister(payload);
		tick();
		fixture.detectChanges();
		const errorEl = fixture.nativeElement.querySelector('app-registration-error');
		expect(errorEl).toBeTruthy();
	}));

	it('should pass correct payload from form to service', () => {
		const payload = {
			email: 'test.user@example.com',
			password: 'ValidPass1!',
			name: 'Test User',
			phoneNumber: '+12345678901',
			address: null
		};
		userRegistrationServiceSpy.register.and.returnValue(of({
			message: 'Please check your email to verify your account',
			userId: 'user-123',
			emailVerified: false,
			status: 'Active',
			role: 'Customer'
		}));
		component.onRegister(payload);
		expect(userRegistrationServiceSpy.register).toHaveBeenCalledWith(payload);
	});
});
// GH Copilot code - end
