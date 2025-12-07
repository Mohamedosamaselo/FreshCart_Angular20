import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AuthService } from '../../../services/auth/auth-service';
import { ISignUpUser } from '../../../interfaces/ISignUpUser_temp';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessage } from "../../../../shared/components/Ui/error-message/error-message";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, ErrorMessage],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit, OnDestroy {

  /////////////////////////////////////// variables
  registerForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  RegisterData!: ISignUpUser; ////////// registerForm.value()
  ApiError!: string;
  userToke!: string;
  subscrprion !: Subscription;

  ////////////////////////////////////   Control Flags
  showPassword: boolean = false;
  showRePassword: boolean = false;
  isLoading: boolean = false;
  //////////////////////////////////// Template Reference to actual inputs
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('rePasswordInput') rePasswordInput!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
    this.initializeRegisterForm();
  }
  ///////////////////////////////////////// initiLize RegisterForm//////////////////////////////////////////////
  initializeRegisterForm(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/
            ),
          ],
        ],
        rePassword: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/), // Egyptian phone pattern
          ],
        ],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }
  ////////////////////////////////////////  Generic Passwordtoggle method/////////////////////////////////////

  togglePasswordVisibility(type: 'password' | 'rePassword'): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
      const input = this.passwordInput.nativeElement as HTMLInputElement;
      input.type = this.showPassword ? 'text' : 'password'; // if true make type text else change type to password
    }
    else {
      this.showRePassword = !this.showRePassword;
      const input = this.rePasswordInput.nativeElement as HTMLInputElement;
      input.type = this.showRePassword ? 'text' : 'password'; // if true make type text else change type to password
    }
  }

  ////////////////////////////////////////// repassword Custom Validation
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword)
      // if it doesnot contian password and rePassword
      return null;

    return password.value === rePassword.value ? null : { passwordMismatch: true };
  }

  /////////////////////////////////////////// getter Method to get FormControls
  get GetFormControl() {
    return this.registerForm.controls;
  }

  ////////////////////////////////////////////// submit Method
  onSubmit(): void {

    this.isLoading = true;

    if (this.registerForm.valid) {
      this.RegisterData = this.registerForm.value;
      this.ApiError = ''; // 3l4an lw kan fy error abl keda w ana ktabt email sa7 l mafroud en l error y5tefy 3ala ma l api yrga3ly success
      // Calling Api
      this.subscrprion = this.authService.signup(this.RegisterData).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') // if account Succcessfuly Registered we will navigate user to login page
          {
            this.router.navigate(['/auth'])
            this.userToke = res.token
            // console.log(this.userToke);

          }
        },
        error: (err) => {
          console.log(err.error.message);
          this.ApiError = err.error.message;
          this.isLoading = false;
        }
      })
      this.registerForm.reset();
    }
    else {
      console.log('Form is inValid');
      this.registerForm.markAllAsTouched();
    }
  }



  // Cleaning Up
  ngOnDestroy(): void {
    this.subscrprion.unsubscribe();
  }
}
