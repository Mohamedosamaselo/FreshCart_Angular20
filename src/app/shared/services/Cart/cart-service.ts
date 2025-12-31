import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // DependencyInjection
  private http = inject(HttpClient);
  // variables
  private baseUrl = enviroment.BaseUrl;


  // private token: string = JSON.stringify(localStorage.getItem('UserToken')); // change token object to string

  // =========================
  // GetToken method
  // =========================
  private getToken(): string | null {
    return localStorage.getItem('UserToken');
  }


  // =========================
  // GetHeaders method
  // =========================
  private getHeaders(): HttpHeaders {
    const token = this.getToken();  // change token to object
    return new HttpHeaders(
      token ? { token } : {} // only send header if exists
    );
  }

  // =========================
  // GetLoggedUserCart
  // =========================
  // public getLoggedUserCart(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/cart`, {
  //     headers: this.getHeaders(),
  //   });
  // }

  /// here i will set headers with token by using TokenInterceptor
  public getLoggedUserCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart`);
  }




  // =========================
  // AddProductToCart
  // =========================
  // public addproductToCart(productId: string): Observable<any> {
  //   return this.http.post(
  //     `${this.baseUrl}/cart`,
  //     { productId },
  //     {
  //       headers: this.getHeaders(),
  //     }
  //   );
  // }

  /// here i will set headers with token by using TokenInterceptor
  public addproductToCart(productId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart`,
      { productId },

    );
  }

  // =========================
  // UpdateCartProductQuantity
  // =========================
  // public UpdateCartProductQuantity(productId: string, count: string): Observable<any> {
  //   return this.http.put(
  //     `${this.baseUrl}/cart/${productId}`,
  //     { count },
  //     { headers: this.getHeaders() }
  //   );
  // }

  /// here i will set headers with token by using TokenInterceptor
  public UpdateCartProductQuantity(productId: string, count: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/cart/${productId}`,
      { count },

    );
  }


  //==========================
  // RemoveSpecificCartItem
  //==========================
  // public removeSpecificCartItem(productId: string): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/cart/${productId}`, {
  //     headers: this.getHeaders(),
  //   });
  // }

  /// here i will set headers with token by using TokenInterceptor
  public removeSpecificCartItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${productId}`);
  }



  //==========================
  // ClearUserCart
  //==========================
  // public clearUserCart(): Observable<any> {
  //   return this.http.delete(`${this.baseUrl}/cart`, {
  //     headers: this.getHeaders(),
  //   });
  // }

  /// here i will set headers with token by using TokenInterceptor
  public clearUserCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart`);
  }



}
