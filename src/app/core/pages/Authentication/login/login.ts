import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { ElementSchemaRegistry } from '@angular/compiler';
import { Subscription, timer } from 'rxjs';
import { ILoginUser } from '../../../interfaces/ILoginUser';
import { NgClass } from '@angular/common';
import { ErrorMessage } from '../../../../shared/components/Ui/error-message/error-message';
import { CustomInputComponent } from '../../../../shared/components/Ui/custom-input-component/custom-input-component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, CustomInputComponent, ErrorMessage, CustomInputComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  /////////////////////////////////////// variables
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  LoginData!: ILoginUser; ////////// loginForm.value()
  ApiError!: string;
  userToke!: string;
  subscrprion: Subscription = new Subscription();

  ////////////////////////////////////   Control Flags
  showPassword: boolean = false;
  showRePassword: boolean = false;
  isLoading: boolean = false;
  //////////////////////////////////// Template Reference to actual inputs
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.initializeloginForm();
  }
  ///////////////////////////////////////// initiLize loginForm
  initializeloginForm(): void {
    this.loginForm = this.fb.group({
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
    });
  }
  /////////////////////////  Generic Passwordtoggle method //////////////////////////////
  togglePasswordVisibility(type: 'password' | 'rePassword'): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
      const input = this.passwordInput.nativeElement as HTMLInputElement;
      input.type = this.showPassword ? 'text' : 'password'; // if true make type text else change type to password
    }
  }

  /////////////////////////// getter Method to get FormControls ////////////////////////
  get GetFormControl() {
    return this.loginForm.controls;
  }

  /////////////////////////// submit Method////////////////////////////
  onSubmit(): void {
    this.isLoading = true;

    if (this.loginForm.valid) {
      this.LoginData = this.loginForm.value;
      this.ApiError = ''; // 3l4an lw kan fy error abl keda w ana ktabt email sa7 l mafroud en l error y5tefy 3ala ma l api yrga3ly success
      // Calling Api
      this.subscrprion = this.authService.login(this.LoginData).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message === 'success') {
            timer(2000).subscribe(() => {
              // it will waiting for  2 seconds then it navigate him
              this.router.navigate(['/home']); // if account Succcessfuly Registered we will navigate user to login page
            });

            // this.userToke = res.token
            localStorage.setItem('UserToken', res.token); // set token in localStorage then i will get it again in authService to save the user
          }
        },
        error: (err) => {
          console.log(err.error.message);
          this.ApiError = err.error.message; // store  it then i will display it in the top of the form
          this.isLoading = false;
        },
      });
      this.loginForm.reset();
    } else {
      console.log('Form is inValid');
      this.loginForm.markAllAsTouched();
    }
  }

  //////////////////////////// Cleaning Up///////////////////////////////////
  ngOnDestroy(): void {
    if (this.subscrprion) this.subscrprion.unsubscribe();
  }
}
