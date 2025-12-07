import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _http = inject(HttpClient);
  env = enviroment.BaseUrl;


  getAllProducts(): Observable<any> {
    return this._http.get(`${this.env}/products`);
  }


}
