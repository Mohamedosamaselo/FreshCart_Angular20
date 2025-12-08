import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ISignUpResponse } from '../../interfaces/ISignUpResponse';
import { ILoginUser } from '../../interfaces/ILoginUser';
import { ISignUpUser } from '../../interfaces/ISignUpUser_temp';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Api_Base_Url } from '../../../token/token';
import { enviroment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _http = inject(HttpClient);
  token!: string;
  user: BehaviorSubject<any> = new BehaviorSubject(null);
  env = enviroment.BaseUrl;
  _platformId = inject(PLATFORM_ID);
  _baseUrl = inject(Api_Base_Url); // using InjectionToken Idea

  constructor() {
    // get token from localStorage in runtime
    if (isPlatformBrowser(this._platformId)) {
      if (localStorage.getItem('UserToken')) this.saveUser();
    }
  }
  ////////////////////SignUp Method
  signup(UserData: ISignUpUser): Observable<any> {
    return this._http.post<any>(`${this._baseUrl}/auth/signup`, UserData);
  }
  ////////////////////Login Method
  login(UserData: ILoginUser): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/signin`, UserData);
  }

  ////////////////////SaveUser in Local Storage Method
  saveUser(): void {
    this.token = JSON.stringify(localStorage.getItem('UserToken'));

    const data = jwtDecode(this.token); // decode token

    this.user.next(data); // update User
  }
}
