import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
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
    MatAnchor
  ]
  ,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  // DI
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly FB = inject(FormBuilder);
  // variables
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    this.getcartId();
  }

  getcartId() {
    let { cartId } = this._activatedRoute.snapshot.params;
  }

  initializeForm(): void {
    this.checkoutForm = this.FB.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]
      ]
    })
  }






}
