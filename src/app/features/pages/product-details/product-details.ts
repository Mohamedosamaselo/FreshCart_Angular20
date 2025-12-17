import { Component, EventEmitter, inject, OnInit, Output, output } from '@angular/core';
import { ProductService } from '../../../shared/services/Product/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../../shared/interfaces/Iproduct';
import { CurrencyPipe, NgIf } from '@angular/common';
import {} from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItem } from '../../../shared/components/Ui/product-item/product-item';
import { CartService } from '../../../shared/services/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, MatProgressSpinner, CarouselModule, ProductItem],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  // Variables
  productDetails: Iproduct = {} as Iproduct;
  relatedProducts: Iproduct[] = [];
  apiError!: string;
  isloading: boolean = false;

  // Dependency injection
  ProductService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  CartService = inject(CartService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getProductId();
  }
  //owlCarsoul configurations
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-chevron-left text-xl"></i>',
      '<i class="fa-solid fa-chevron-right text-xl"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  //==================================
  // Calling Api to get ProductDetails
  //=================================
  getDetails(id: string) {
    this.ProductService.getProductById(id).subscribe({
      next: (Response) => {
        this.productDetails = Response.data;

        if (this.productDetails != null) this.getRelatedProducts(this.productDetails.category._id);
      },
      error: (err) => {
        console.log(err, ' erorrrrrrrrr');
        this.apiError = err.error.message;
      },
    });
  }

  // ==================================
  // get Related Products
  // =================================
  getRelatedProducts(CategoryId: string) {
    this.ProductService.getProducts(CategoryId).subscribe({
      next: (res) => {
        console.log(res, 'related Products ');
        this.relatedProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  //========================
  // HELPER METHODS
  //========================
  // get it from pamars then get Details of product
  private getProductId() {
    // way 01
    this.activatedRoute.paramMap.subscribe({
      next: (res: any) => {
        console.log(res.params.id);
        let id: any = res.params.id;
        this.getDetails(id);
        console.log(id, 'iddddddd');
      },
    });

    // way 02 // but this way takethe id only one time only but i want to update and recall function of getDetails
    // let { id }: any = this.activatedRoute.snapshot.params;
    // this.getDetails(id);
  }
  //========================
  // handel AddToCart
  //========================
  addProductToCart(id: string) {
    this.isloading = true;

    this.CartService.addproductToCart(id).subscribe({
      next: (res) => {
        this.isloading = false;
        this.toastr.success(res.message, 'Hello ');
        // console.log(res);
      },
      error: (err) => {
        this.isloading = false;
        console.log(err);
      },
    });
  }
}
