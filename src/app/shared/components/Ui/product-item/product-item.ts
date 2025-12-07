import { Component, Input, input } from '@angular/core';
import { Iproduct } from '../../../interfaces/Iproduct';
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  @Input() ProductInput!: Iproduct;


}
