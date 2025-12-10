import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, delay } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginUser } from '../../../interfaces/LoginUser';
import { ErrorMessage } from '../../../../shared/components/Ui/error-message/error-message';
import { CustomInputComponent } from '../../../../shared/components/Ui/custom-input-component/custom-input-component';

// ====================================
// CONSTANTS
// ====================================

const Validation_Patterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
} as const;

const Field_Constraints = {
  password: { min: 6 },
} as const;

const Navigation_Delay = 500; // 2 seconds

// ====================================
// LOGIN COMPONENT
// ====================================

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, CustomInputComponent, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  // Dependency Injection
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  platformId = inject(PLATFORM_ID);
  // Form
  loginForm!: FormGroup;
  // State with Signals
  isLoading = signal(false);
  apiError = signal<string>('');
  showPassword = signal(false);

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
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.pattern(Validation_Patterns.email)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(Field_Constraints.password.min),
          Validators.pattern(Validation_Patterns.password),
        ],
      ],
    });
  }

  // ====================================
  // FORM CONTROLS GETTER
  // ====================================

  get formControls() {
    return this.loginForm.controls;
  }
  // ====================================
  // PASSWORD VISIBILITY TOGGLE
  // ====================================

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  // ====================================
  // FORM SUBMISSION
  // ====================================

  onSubmit(): void {
    // Validate form before submissionform
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Start loading state
    this.isLoading.set(true);
    this.apiError.set('');

    const credentials: LoginUser = this.loginForm.value;

    // Call API
    this.authService
      .login(credentials)
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
      // Token is already handled by AuthService
      this.loginForm.reset();

      localStorage.setItem('UserToken', response.token);
      // 🔥 CRITICAL MISSING STEP (updates BehaviorSubject immediately)
      this.authService.setToken(response.token);

      // Navigate after delay for better UX
      this.navigateToHome();
    }
  }
  private handleError(error: any): void {
    const errorMessage = error?.error?.message || 'Login failed. Please try again.';
    this.apiError.set(errorMessage);
    console.error('Login error:', errorMessage);
  }

  // ====================================
  // NAVIGATION
  // ====================================

  private navigateToHome(): void {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, Navigation_Delay);
  }
}
