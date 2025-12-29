import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule
} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { MatFormField, MatLabel, MatError, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Order } from '../../../shared/services/Order/order';
import { finalize, Observable } from 'rxjs';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-checkout',
  imports: [
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAnchor,
    MatProgressSpinner
  ]
  ,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  // DI
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly FB = inject(FormBuilder);
  private readonly orderService = inject(Order);
  // variables
  checkoutForm!: FormGroup;
  cartId !: string;
  isLoading: boolean = false

  ngOnInit(): void {
    this.initializeForm();
    this.getcartId();
  }

  getcartId() {
    this.cartId = this._activatedRoute.snapshot.params['cartId'];
  }

  initializeForm(): void {
    this.isLoading = true;

    this.checkoutForm = this.FB.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]
      ]
    })
    this.isLoading = false;
  }


  // cash Payment
  cashOrder(cartId: string, shippingAddress: object): void {
    this.isLoading = true;
    this.orderService.cashOrder(cartId, shippingAddress)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          // this.isLoading = false;
        },
      })
  }

  // online Payment
  onlineOrder(cartId: string, shippingAddress: object): void {
    this.isLoading = true;

    this.orderService.onlinePayment(cartId, shippingAddress)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url)
          }
          // console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      })
  }


  submit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }
    else {
      // this.cashOrder(this.cartId, this.checkoutForm.value)
      this.onlineOrder(this.cartId, this.checkoutForm.value)
    }

  }







}
