// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhoneInputComponent } from './phone-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

describe('PhoneInputComponent', () => {
  let component: PhoneInputComponent;
  let fixture: ComponentFixture<PhoneInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneInputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(PhoneInputComponent);
    component = fixture.componentInstance;
    component.phoneControl = new FormControl('');
    fixture.detectChanges();
  });

  it('should render phone input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="phoneNumber"]')).toBeTruthy();
  });

  it('should validate phone number format', () => {
    component.phoneControl.setValue('invalid-phone');
    expect(component.phoneControl.valid).toBeFalse();
    component.phoneControl.setValue('+12345678901');
    expect(component.phoneControl.valid).toBeTrue();
  });

  it('should emit phone number on change', () => {
    spyOn(component.phoneChange, 'emit');
    component.phoneControl.setValue('+12345678901');
    component.onPhoneChange();
    expect(component.phoneChange.emit).toHaveBeenCalledWith('+12345678901');
  });
});
// GH Copilot code - end
