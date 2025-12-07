import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _http = inject(HttpClient);

  getCategories(): Observable<any> {
    return this._http.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

}
