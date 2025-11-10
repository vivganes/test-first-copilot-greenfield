// GH Copilot code - starts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInputComponent } from './address-input.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

describe('AddressInputComponent', () => {
  let component: AddressInputComponent;
  let fixture: ComponentFixture<AddressInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressInputComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AddressInputComponent);
    component = fixture.componentInstance;
    component.addressForm = new FormGroup({
      line1: new FormControl(''),
      line2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      postalCode: new FormControl(''),
      country: new FormControl(''),
      type: new FormControl('Billing'),
      phoneNumber: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should render all address fields', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="line1"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="line2"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="city"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="state"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="postalCode"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="country"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="phoneNumber"]')).toBeTruthy();
  });

  it('should default address type to Billing', () => {
    expect(component.addressForm.get('type')?.value).toBe('Billing');
  });

  it('should emit address value on change', () => {
    spyOn(component.addressChange, 'emit');
    component.addressForm.setValue({
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Metropolis',
      state: 'State',
      postalCode: '12345',
      country: 'Country',
      type: 'Billing',
      phoneNumber: '+12345678901'
    });
    component.onAddressChange();
    expect(component.addressChange.emit).toHaveBeenCalledWith({
      line1: '123 Main St',
      line2: 'Apt 4B',
      city: 'Metropolis',
      state: 'State',
      postalCode: '12345',
      country: 'Country',
      type: 'Billing',
      phoneNumber: '+12345678901'
    });
  });
});
// GH Copilot code - end
