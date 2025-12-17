import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/Product/product-service';
import { ProductItem } from '../../../../../shared/components/Ui/product-item/product-item';
import { Iproduct } from '../../../../../shared/interfaces/Iproduct';
import { CartService } from './../../../../../shared/services/Cart/cart-service';

@Component({
  selector: 'app-recent-products',
  imports: [ProductItem],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.scss',
})
export class RecentProducts implements OnInit {
  _productService = inject(ProductService);
  _cartService = inject(CartService);
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
  //============================
  // Calling api here
  //============================
  addtoCart(event: { id: string; done: () => void }): void {
    this._cartService.addproductToCart(event.id).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        event.done(); // stop spinner in child
      },
    });
  }
}
