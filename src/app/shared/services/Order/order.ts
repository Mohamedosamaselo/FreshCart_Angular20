import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../environments/environment.prod';
import { ShippingAddress } from './../../interfaces/shipping-address';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Order {
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
  // cashOrder  method
  // =========================

  cashOrder(cartId: string, ShippingAddress: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/${cartId}`,
      { ShippingAddress },
      {
        headers: this.getHeaders()
      })
  }

  // =========================
  // getAllOrders  method
  // =========================
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/`)
  }


  // =========================
  // getUserOrders  method
  // =========================
  getUserOrder(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${userId}`)
  }

  // =========================
  // onlinePayment  method
  // =========================
  onlinePayment(cartId: string, ShippingAddress: object): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { ShippingAddress },
      {
        headers: this.getHeaders()
      })
  }
}
