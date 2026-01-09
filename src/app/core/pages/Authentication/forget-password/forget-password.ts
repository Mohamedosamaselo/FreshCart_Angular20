import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { CustomInputComponent } from '../../../../shared/components/Ui/custom-input-component/custom-input-component';
import { NgPlural } from '@angular/common';
import { MatStep, MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth/auth-service';
import { pipe, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-password',
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerComponent,
    ReactiveFormsModule,
    CustomInputComponent,
    NgPlural,
  ],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword implements OnInit {
  // DI
  private FB = inject(FormBuilder);
  private authService = inject(AuthService);
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  // variables
  step = signal<1 | 2 | 3>(1);
  loading = signal(false);

  ngOnInit(): void {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

  // ================================
  //             Forms
  // ================================

  verifyemailForm = this.FB.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifycodeForm = this.FB.nonNullable.group({
    resetCode: new FormControl('', [Validators.required]),
  });

  resetPasswordForm = this.FB.nonNullable.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required]),
  });

  // =====================
  // Step Actions
  // =====================



  // =============================================
  // ===================== first Step
  // =============================================
  public sendEmail(stepper: MatStepper): void {
    // check on form Validation
    if (this.verifyemailForm.invalid) return;

    this.loading.set(true);
    this.spinner.show();
    const email = this.verifyemailForm.value!;

    if (email) {
      this.authService
        .forgetPassword(email)
        .pipe(
          finalize(() => {
            this.spinner.hide();
            this.loading.set(false);
          })
        )
        .subscribe({
          next: (res) => {
            this.toastr.success(res.message, 'Hello !');
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // =============================================
  // ===================== second Step
  // =============================================
  public sendOtpCode(stepper: MatStepper): void {
    if (this.verifycodeForm.invalid) return;

    this.loading.set(true);
    this.spinner.show();

    const resetcode = this.verifycodeForm.value; // save optCode

    if (resetcode) {
      this.authService
        .verifyResetCode(resetcode)
        .pipe(
          finalize(() => {
            this.spinner.hide();
            this.loading.set(false);
          })
        )
        .subscribe({
          next: (res) => {
            // toaster
            this.toastr.success(res.status, ' Hello ');

            // After Success i will get the email of user  that has been registed
            this.resetPasswordForm.patchValue({
              email: this.verifyemailForm.get('email')?.value,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // =============================================
  // ===================== third Step
  // =============================================
  public sendNewPassword(): void {
    if (this.resetPasswordForm.invalid) return;

    this.loading.set(true);
    this.spinner.show();

    // const email = this.resetPasswordForm?.value?.email!;
    // const newPassword = this.resetPasswordForm?.value?.newPassword!;

    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        // save Token
        const token = res.token;
        this.authService.setToken(token);
        // navigate to home
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
