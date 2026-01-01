import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, delay, Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth/auth-service';
import { LoginUser } from '../../../interfaces/LoginUser';
import { ErrorMessage } from '../../../../shared/components/Ui/error-message/error-message';
import { CustomInputComponent } from '../../../../shared/components/Ui/custom-input-component/custom-input-component';
import { NgxSpinnerComponent, NgxSpinnerService } from "ngx-spinner";

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
  imports: [ReactiveFormsModule,
    NgClass,
    CustomInputComponent,
    ErrorMessage,
    NgxSpinnerComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  // Dependency Injection
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private spinner = inject(NgxSpinnerService);

  // Form
  loginForm!: FormGroup;

  // variables
  private subscription: Subscription = new Subscription();
  // State with Signals
  isLoading = signal(false);
  apiError = signal<string>('');
  showPassword = signal(false);

  // ====================================
  // LIFECYCLE
  // ====================================

  ngOnInit(): void {
    this.initializeForm();

    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
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

    this.subscription.unsubscribe();  // unsubscribe the request then i will subscribe to it

    // Call API
    this.subscription = this.authService
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
