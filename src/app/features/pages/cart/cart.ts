import { CommonModule, CurrencyPipe, NgPlural } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../shared/services/Cart/cart-service';
import { CartResponse } from '../../../shared/interfaces/CartResponse';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { product } from '../../../shared/interfaces/product';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerComponent } from 'ngx-spinner';

@UntilDestroy()
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
    CurrencyPipe,
    RouterLink,
    NgxSpinnerComponent
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})


export class Cart implements OnInit {
  // variables
  cartDetails?: CartResponse;
  dataSource = new MatTableDataSource<product>();
  isLoading = false;

  readonly displayedColumns: string[] = ['image', 'product', 'qty', 'price', 'action'];

  private readonly cartService = inject(CartService);


  ngOnInit(): void {
    this.getCart();

  }

  // =========================================
  //              getCart
  // =========================================
  getCart(): void {
    this.isLoading = true;

    this.cartService.getLoggedUserCart()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: res => this.updateCartState(res),
        error: this.handleError,
      });
  }

  // =========================================
  //              removeItem
  // =========================================
  removeItem(productId: string): void {
    this.isLoading = true;

    this.cartService.removeSpecificCartItem(productId)
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res) => {
          this.updateCartState(res),
            console.log(res);

        },
        error: this.handleError
      });
  }

  // =========================================
  //         updateCartCount
  // =========================================
  updateCartCount(productId: string, count: number): void {
    this.isLoading = true;

    this.cartService.UpdateCartProductQuantity(productId, String(count))
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: res => this.updateCartState(res),
        error: this.handleError
      });
  }

  // =========================================
  //              clearUserCart
  // =========================================
  clearUserCart(): void {
    this.isLoading = true;

    this.cartService.clearUserCart()
      .pipe(
        untilDestroyed(this),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: () => this.clearCartState(),
        error: this.handleError
      });
  }

  // =========================================
  //              Helpers
  // =========================================
  private updateCartState(res: CartResponse): void {
    this.cartDetails = res;
    this.dataSource.data = res.data.products;
    this.cartService.cartCounter.next(res.numOfCartItems); // update Counter Numer of cartIcon to Displayed
    // console.log(res, 'numOfCartItem');

  }

  private clearCartState(): void {
    this.cartDetails = undefined;
    this.dataSource.data = [];
    this.cartService.cartCounter.next(0); // update Counter Numer of cartIcon to Displayed

  }

  private handleError(error: unknown): void {
    console.error('Cart error:', error);
  }
}
