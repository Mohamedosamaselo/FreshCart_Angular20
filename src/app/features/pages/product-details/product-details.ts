import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/Product/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../../shared/interfaces/Iproduct';
import { CurrencyPipe, NgIf } from '@angular/common';
import {} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, MatProgressSpinner, NgIf, CarouselModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  // Variables
  productDetails: Iproduct | null = {} as Iproduct;
  // Dependency injection
  ProductService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);

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

  getProductDetails(id: string) {
    this.ProductService.getProductDetails(id).subscribe({
      next: (Response) => {
        // console.log(Response, 'productDetailsResponse');
        this.productDetails = Response.data;
        console.log(this.productDetails, 'productDetailssssss object ');
      },
      error: (err) => {
        console.log(err, ' erorrrrrrrrr');
      },
    });
  }

  //==================================
  // Add Product
  //=================================
  addProduct() {}

  //========================
  // HELPER METHODS
  //========================

  private getProductId() {
    //  this.activatedRoute.paramMap.subscribe( {
    //  next : (res : any ) => {
    //   this.productId = res.params.id
    //  }
    // })

    let { id }: any = this.activatedRoute.snapshot.params;
    // console.log(id, 'productId ');
    this.getProductDetails(id);
  }
}
