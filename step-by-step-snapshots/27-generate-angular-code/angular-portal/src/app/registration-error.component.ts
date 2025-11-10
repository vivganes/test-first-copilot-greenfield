// GH Copilot code - starts
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-error',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="error-message">{{ error }}</div>`,
  styles: [`.error-message { color: #d32f2f; font-weight: bold; margin: 1rem 0; }`]
})
// ...existing code...
export class RegistrationErrorComponent {
  @Input() error: string = '';
  showError() {
    this.error = 'Registration failed!';
  }
}
// GH Copilot code - end
