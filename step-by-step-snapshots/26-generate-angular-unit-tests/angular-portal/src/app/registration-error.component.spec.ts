
// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationErrorComponent } from './registration-error.component';

describe('RegistrationErrorComponent', () => {
	let component: RegistrationErrorComponent;
	let fixture: ComponentFixture<RegistrationErrorComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegistrationErrorComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(RegistrationErrorComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should render error message', () => {
		component.message = 'Email already exists';
		fixture.detectChanges();
		const errorEl = fixture.nativeElement.querySelector('.registration-error');
		expect(errorEl.textContent).toContain('Email already exists');
	});

	it('should handle empty error message gracefully', () => {
		component.message = '';
		fixture.detectChanges();
		const errorEl = fixture.nativeElement.querySelector('.registration-error');
		expect(errorEl.textContent).toBe('');
	});
});
// GH Copilot code - end
