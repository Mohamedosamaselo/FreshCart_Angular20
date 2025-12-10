import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/Product/product-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from '../../../shared/interfaces/Iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  // Variables
  productDetails: Iproduct = {} as Iproduct;

  // Dependency injection
  ProductService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.getProductId();
  }
  // productId : object = {} ;

  //========================
  // Calling Api to get ProductDetails
  //========================
  getProductDetails(id: string) {
    this.ProductService.getProductDetails(id).subscribe({
      next: (Response) => {
        // console.log(Response, 'productDetailsResponse');
        this.productDetails = Response;
      },
      error: (err) => {
        // console.log(err, ' erorrrrrrrrr');
      },
    });
  }

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
    console.log(id, 'productId ');
    this.getProductDetails(id);
  }
}
