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
  private token = localStorage.getItem('UserToken');
  private baseUrl = enviroment.BaseUrl;

  // =========================
  // GetHeaders method
  // =========================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      token: this.token || '',
    });
  }

  // =========================
  // GetLoggedUserCart
  // =========================
  public getLoggedUserCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart`, {
      headers: this.getHeaders(),
    });
  }

  // =========================
  // AddProductToCart
  // =========================
  public addproductToCart(productId: string | null): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/cart`,
      { productId },
      {
        headers: this.getHeaders(),
      }
    );
  }
  // =========================
  // UpdateCartProductQuantity
  // =========================
  public UpdateCartProductQuantity(productId: string, count: string): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/cart/${productId}`,
      { count },
      { headers: this.getHeaders() }
    );
  }
  //==========================
  // RemoveSpecificCartItem
  //==========================
  public removeSpecificCartItem(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${productId}`, {
      headers: this.getHeaders(),
    });
  }

  //==========================
  // ClearUserCart
  //==========================
  public clearUserCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart`, {
      headers: this.getHeaders(),
    });
  }
}
