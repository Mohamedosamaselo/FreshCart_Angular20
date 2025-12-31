import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../../shared/services/Product/product-service';
import { ProductItem } from '../../../../../shared/components/Ui/product-item/product-item';
import { product } from '../../../../../shared/interfaces/product';
import { CartService } from './../../../../../shared/services/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { FormsModule, ɵInternalFormsSharedModule } from "@angular/forms";
import { FilterPipe } from "../../../../../shared/Pipes/filter-pipe";

@UntilDestroy()
@Component({
  selector: 'app-recent-products',
  imports: [ProductItem, ɵInternalFormsSharedModule, FormsModule, FilterPipe],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.scss',
})
export class RecentProducts implements OnInit {
  // Dependency injection
  _productService = inject(ProductService);
  _cartService = inject(CartService);
  products!: product[];
  toastr = inject(ToastrService);
  searchText: string = "";


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this._productService
      .getProducts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.products = res.data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => { },
      });
  }

  //============================
  // Calling api here
  //============================
  addtoCart(event: { id: string; done: () => void }): void {
    this._cartService
      .addproductToCart(event.id)
      .pipe(
        untilDestroyed(this),
        finalize(() => event.done())
      )
      .subscribe({
        next: (value) => {
          this.toastr.success(value.message, 'Hello !');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }


}
