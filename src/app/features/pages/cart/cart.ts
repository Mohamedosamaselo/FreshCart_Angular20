import { CommonModule, CurrencyPipe } from '@angular/common';
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

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinner,
    CurrencyPipe,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  // variables
  cartDetails?: CartResponse;

  dataSource = new MatTableDataSource<product>();//

  isLoading: boolean = false;
  readonly displayedColumns: string[] = ['image', 'product', 'qty', 'price', 'action'];
  // Depenedency injection
  private readonly _cartService = inject(CartService);

  ngOnInit(): void {
    this.getCart();
  }
  // =========================================
  //  getCart Method
  // =========================================

  getCart(): void {
    this.isLoading = true;
    this._cartService
      .getLoggedUserCart()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.updateCartState(res);
        },
        error: this.handleError,
      });
  }

  // =========================================
  //             removeItem Method
  // =========================================
  removeItem(productId: string) {
    this.isLoading = true;
    this._cartService.removeSpecificCartItem(productId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.updateCartState(res);
        },
        error: this.handleError
      });
  }

  // ===========================================
  //         updateCartProductQuanitiy Method
  // ===========================================
  updateCartCount(productId: string, count: number): void {

    this.isLoading = true;

    this._cartService.UpdateCartProductQuantity(productId, String(count))
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => this.updateCartState(res),
        error: this.handleError
      });
  }

  // ===========================================
  //              clearUserCart Method
  // ===========================================
  public clearUserCart(): void {
    this.isLoading = true;
    this._cartService.clearUserCart()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res) =>
          // if (res.message == 'success') this.dataSource = [];
          this.clearCartState(),

        error: this.handleError
      });
  }

  // ===========================================
  //              Helper Methods
  // ===========================================
  private updateCartState(res: CartResponse): void {
    this.cartDetails = res;
    this.dataSource.data = res.data.products;
  }
  private clearCartState(): void {
    this.cartDetails = undefined;
    this.dataSource.data = [];
  }
  private handleError(error: unknown): void {
    console.error('Cart error:', error);
  }

}
