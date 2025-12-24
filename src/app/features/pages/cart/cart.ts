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
  // flags
  isLoading: boolean = false;
  // Depenedency injection
  _cartService = inject(CartService);

  ngOnInit(): void {
    this.getCart();
  }
  // =========================================
  // ========================== getCart Method================
  // =========================================

  getCart(): void {
    this.isLoading = true;
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.isLoading = false;
          // this.cartDetails = res;
          this.dataSource = res.data.products;
          console.log(this.dataSource, 'dataSource');
        }
      },
      error(err) {

        console.log(err);
      },
    });
  }


  removeItem(productId: string) {
    this.isLoading = true;
    this._cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        this.isLoading = false; // update loading status
        this.dataSource = res.data.products; // render Cart after update
      },
      error: (err) => {
        console.log(err);
      },
    })

  }
  // update cart product Quanitiy

  updateCartCount(productId: string, count: number) {
    this.isLoading = true;
    let updatedCount = `${count}`; // chnge count from number to string
    this._cartService.UpdateCartProductQuantity(productId, updatedCount).subscribe({
      next: (response) => {
        console.log(response, 'update');
        this.isLoading = false;
        this.dataSource = response.data.products;

      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);

      },
    })
  }
}


