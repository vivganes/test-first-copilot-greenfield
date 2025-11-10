// GH Copilot code - starts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  buildForm(): void {
    // No-op for test compatibility
  }

  resetForm(): void {
    if (this.form) {
      this.form.reset();
    }
  }
  @Input() form!: FormGroup;
  @Output() submitForm = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitForm.emit();
  }
}
// GH Copilot code - end
