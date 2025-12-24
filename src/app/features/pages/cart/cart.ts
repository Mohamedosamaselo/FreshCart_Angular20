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
  dataSource = new MatTableDataSource<CartData>();
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
          // console.log(this.dataSource, 'dataSource');
        }
      },
      error(err) {

        console.log(err);
      },
    });
  }

  increment(item: product) {
    item.quantity++;
  }

  decrement(item: product) {
    if (item.quantity > 1) {
      item.quantity--;
    }
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

  // getTotalPrice(): any {
  //   0;
  // }
}


