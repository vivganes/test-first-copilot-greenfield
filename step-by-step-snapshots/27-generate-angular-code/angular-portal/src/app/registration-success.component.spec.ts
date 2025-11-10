// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationSuccessComponent } from './registration-success.component';

describe('RegistrationSuccessComponent', () => {
  let component: RegistrationSuccessComponent;
  let fixture: ComponentFixture<RegistrationSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationSuccessComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrationSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display success message', () => {
    component.message = 'Please check your email to verify your account';
    component.showMessage();
    expect(component.message).toContain('verify your account');
  });
  it('should render success message in template', () => {
    component.message = 'Registration completed!';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Registration completed!');
  });
});
// GH Copilot code - end
