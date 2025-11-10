// GH Copilot code - starts
import { Component } from '@angular/core';
import { UserRegistrationService } from './user-registration.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form.component';
import { RegistrationSuccessComponent } from './registration-success.component';
import { RegistrationErrorComponent } from './registration-error.component';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationFormComponent,
    RegistrationSuccessComponent,
    RegistrationErrorComponent
  ],
  template: `
    <div data-testid="debug-registration-component">UserRegistrationComponent is rendered</div>
    <app-registration-form
      [form]="registrationForm"
      (submitForm)="onSubmit()"
    ></app-registration-form>
    <app-registration-success *ngIf="success" [message]="successMessage"></app-registration-success>
    <app-registration-error *ngIf="error" [error]="errorMessage"></app-registration-error>
  `,
})
export class UserRegistrationComponent {
  constructor(public userRegistrationService: UserRegistrationService) {}
  registrationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    name: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    address: new FormGroup({
      line1: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      isDefault: new FormControl(false)
    })
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      const formValue = this.registrationForm.value;
      this.userRegistrationService.registerUser(formValue).subscribe({
        next: (response: any) => {
          this.successMessage = 'Please check your email to verify your account';
          this.success = true;
          this.error = false;
          this.errorMessage = '';
        },
        error: (err: any) => {
          this.errorMessage = 'Registration failed!';
          this.error = true;
          this.success = false;
          this.successMessage = '';
        }
      });
    }
  }
  success = false;
  error = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Add logic to handle form submission and service call as per test expectations
}
// GH Copilot code - end
