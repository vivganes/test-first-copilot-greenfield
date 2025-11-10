// GH Copilot code - starts
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-success',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="success-message" data-testid="registration-success">{{ message }}</div>`,
  styles: [`.success-message { color: #388e3c; font-weight: bold; margin: 1rem 0; }`]
})
// ...existing code...
export class RegistrationSuccessComponent {
  @Input() message: string = '';
  showMessage() {
    this.message = 'Please check your email to verify your account';
  }
}
// GH Copilot code - end
