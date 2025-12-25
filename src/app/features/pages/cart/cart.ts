import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart-service';
import { CartData, CartResponse } from '../../../shared/interfaces/CartResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { product } from '../../../shared/interfaces/product';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatInputModule, MatIconModule, MatButtonModule, MatTableModule, CurrencyPipe, MatProgressSpinner],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  // variables
  cartDetails!: CartResponse;
  dataSource!: product[];
  displayedColumns: string[] = ['image', 'product', 'qty', 'price', 'action'];
  updatedTotalCartPrice !: number;
  // flags
  isLoading: boolean = false;
  // Depenedency injection
  _cartService = inject(CartService);

  ngOnInit(): void {
    this.getCart();
  }
  // =========================================
  //  getCart Method
  // =========================================

  getCart(): void {
    this.isLoading = true;
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.isLoading = false;
          this.cartDetails = res;
          // console.log(this.cartDetails, "cartDetials ");
          this.dataSource = res.data.products;
          // console.log(this.dataSource, 'dataSource');
          // this.updatedTotalCartPrice = this.cartDetails.data.totalCartPrice;

        }
      },
      error(err) {

        console.log(err);
      },
    });
  }


  // =========================================
  //  removeItem Method
  // =========================================
  removeItem(productId: string) {
    this.isLoading = true;
    this._cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        this.isLoading = false; // update loading status
        this.dataSource = res.data.products; // update the dataSource
        this.cartDetails = res;  // update the cartDetails
      },
      error: (err) => {
        console.log(err);
      },
    })

  }


  // ===========================================
  // updateCartProductQuanitiy Method
  // ===========================================
  updateCartCount(productId: string, count: number): void {
    this.isLoading = true;
    let updatedCount = `${count}`; // chnge count from number to string
    this._cartService.UpdateCartProductQuantity(productId, updatedCount).subscribe({
      next: (response) => {
        // console.log(response, 'update');
        this.isLoading = false;
        this.dataSource = response.data.products;
        this.cartDetails = response;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

      },
    })
  }

  // ===========================================
  // clearUserCart Method
  // ===========================================
  public clearUserCart(): void {
    this.isLoading = true;
    this._cartService.clearUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        // console.log(res, 'clear ');
        if (res.message == 'success')
          this.dataSource = [];
      },
      error: (err) => {
        console.log(err);
      },

    })
  }

}


