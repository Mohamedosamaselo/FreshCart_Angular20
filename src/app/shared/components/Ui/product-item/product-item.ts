import { Component, Input, input } from '@angular/core';
import { Iproduct } from '../../../interfaces/Iproduct';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  @Input() ProductInput!: Iproduct;
}
