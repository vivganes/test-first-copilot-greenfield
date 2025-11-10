
// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationSuccessComponent } from './registration-success.component';

describe('RegistrationSuccessComponent', () => {
	let component: RegistrationSuccessComponent;
	let fixture: ComponentFixture<RegistrationSuccessComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RegistrationSuccessComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(RegistrationSuccessComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should render success message', () => {
		component.message = 'Please check your email to verify your account';
		fixture.detectChanges();
		const successEl = fixture.nativeElement.querySelector('.registration-success');
		expect(successEl.textContent).toContain('Please check your email to verify your account');
	});

	it('should handle empty success message gracefully', () => {
		component.message = '';
		fixture.detectChanges();
		const successEl = fixture.nativeElement.querySelector('.registration-success');
		expect(successEl.textContent).toBe('');
	});
});
// GH Copilot code - end
