import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { product } from '../../../interfaces/product';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink, MatProgressSpinner],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  @Input() ProductInput!: product;
  @Output() fireAddToCart: EventEmitter<{ id: string; done: () => void }> = new EventEmitter();
  isLoading: boolean = false;

  // Emit id to parent  by this method
  handelAddToCart(id: string) {
    this.isLoading = true;
    this.fireAddToCart.emit({
      id,
      done: () => (this.isLoading = false),
    });
  }
}
