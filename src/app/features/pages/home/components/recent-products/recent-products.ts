import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/Product/product-service';
import { Product } from '../../../product/product';
import { ProductItem } from '../../../../../shared/components/Ui/product-item/product-item';
import { Iproduct } from '../../../../../shared/interfaces/Iproduct';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItem],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.scss',
})
export class RecentProducts implements OnInit {
  _productService = inject(ProductService);
  products!: Iproduct[];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
