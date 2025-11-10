// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationErrorComponent } from './registration-error.component';

describe('RegistrationErrorComponent', () => {
  let component: RegistrationErrorComponent;
  let fixture: ComponentFixture<RegistrationErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationErrorComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RegistrationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display error message', () => {
    component.error = 'Registration failed!';
    expect(component.error).toBe('Registration failed!');
  });
  it('should render error message in template', () => {
    component.error = 'Registration failed!';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Registration failed!');
  });
});
// GH Copilot code - end
