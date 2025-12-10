import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { SignUpUser } from '../../../interfaces/SignUpUser_temp';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { ErrorMessage } from '../../../../shared/components/Ui/error-message/error-message';
// ====================================
// CONSTANTS
// ====================================

const VALIDATION_PATTERNS = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
  egyptianPhone: /^01[0125][0-9]{8}$/,
} as const;

const FIELD_CONSTRAINTS = {
  name: { min: 3, max: 50 },
  password: { min: 6 },
} as const;

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, ErrorMessage],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  // Dependency Injection
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  // Form
  registerForm!: FormGroup;
  // State with Signals
  isLoading = signal(false);
  apiError = signal<string>('');
  showPassword = signal(false);
  showRePassword = signal(false);
  // ====================================
  // LIFECYCLE
  // ====================================

  ngOnInit(): void {
    this.initializeForm();
  }
  // ====================================
  // FORM INITIALIZATION
  // ====================================

  private initializeForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(FIELD_CONSTRAINTS.name.min),
            Validators.maxLength(FIELD_CONSTRAINTS.name.max),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.pattern(VALIDATION_PATTERNS.email)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(FIELD_CONSTRAINTS.password.min),
            Validators.pattern(VALIDATION_PATTERNS.password),
          ],
        ],
        rePassword: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.egyptianPhone)]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // ===================================
  // CUSTOM VALIDATION
  // ===================================
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) {
      return null;
    }
    return password.value === rePassword.value ? null : { passwordMismatch: true };
  }

  // ====================================
  // FORM CONTROLS GETTER
  // ====================================

  get formControls() {
    return this.registerForm.controls;
  }

  // ====================================
  // PASSWORD VISIBILITY TOGGLE
  // ====================================

  togglePasswordVisibility(field: 'password' | 'rePassword'): void {
    if (field === 'password') {
      this.showPassword.update((value) => !value);
    } else {
      this.showRePassword.update((value) => !value);
    }
  }
  // ====================================
  // FORM SUBMISSION
  // ====================================

  onSubmit(): void {
    // validate form before Submission
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    // start loading State
    this.isLoading.set(true);
    this.apiError.set('');

    const userData: SignUpUser = this.registerForm.value;

    // call APi
    this.authService
      .signup(userData)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error) => this.handleError(error),
      });
  }

  // ====================================
  // RESPONSE HANDLERS
  // ====================================

  private handleSuccess(response: any): void {
    if (response.message === 'success') {
      this.registerForm.reset();
      this.router.navigate(['/auth']);
    }
  }

  private handleError(error: any): void {
    const errorMessage = error?.error?.message || 'Registeration failed  , please try again ';
    this.apiError.set(errorMessage);
    console.error('Registration error:', errorMessage);
  }
}
