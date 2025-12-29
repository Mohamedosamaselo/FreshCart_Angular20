import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _http = inject(HttpClient);
  env = enviroment.BaseUrl;

  getProducts(categoryId?: string | null): Observable<any> {
    let Url = categoryId
      ? `${this.env}/products?category[in]=${categoryId}`
      : `${this.env}/products`;
    return this._http.get(Url);
  }

  getProductById(productId: string): Observable<any> {
    return this._http.get(`${this.env}/products/${productId}`);
  }
  
}
