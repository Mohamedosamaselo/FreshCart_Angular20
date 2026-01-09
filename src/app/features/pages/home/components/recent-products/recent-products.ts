import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../../shared/services/Product/product-service';
import { ProductItem } from '../../../../../shared/components/Ui/product-item/product-item';
import { product } from '../../../../../shared/interfaces/product';
import { CartService } from './../../../../../shared/services/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "../../../../../shared/Pipes/filter-pipe";

@UntilDestroy()
@Component({
  selector: 'app-recent-products',
  imports: [ProductItem, FormsModule, FilterPipe],
  templateUrl: './recent-products.html',
  styleUrl: './recent-products.scss',
})
export class RecentProducts implements OnInit {
  // Dependency injection
  _productService = inject(ProductService);
  _cartService = inject(CartService);
  toastr = inject(ToastrService);
  // products: product[] = [];
  products = signal<product[]>([]);

  // searchText: string = "";
  searchText = signal('');






  ngOnInit(): void {
    this.getProducts();
  }

  // Compute Filtered List
  filteredProducts = computed(() => {
    const text = this.searchText().toLowerCase().trim();

    const items = this.products();

    if (!items)
      return items;

    return items.filter(item => item.title?.toLowerCase().includes(text))
  })



  getProducts(): void {
    this._productService
      .getProducts()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.products.set(res.data);
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
