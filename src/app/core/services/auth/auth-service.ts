import { HttpClient } from '@angular/common/http';
import { afterNextRender, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginUser } from '../../interfaces/LoginUser';
import { SignUpUser } from '../../interfaces/SignUpUser_temp';
import { jwtDecode, JwtDecodeOptions } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Api_Base_Url } from '../../../token/token';
import { enviroment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { CustomJwtPayload } from '../../interfaces/CustomJwtPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  _http = inject(HttpClient);

  _platformId = inject(PLATFORM_ID);

  _baseUrl = inject(Api_Base_Url);         // using InjectionToken Idea

  _router = inject(Router);

  _userToken: string | null = null;       // set token with null

  user: BehaviorSubject<any> = new BehaviorSubject(null); // BehaviorSubject to set user state

  env = enviroment.BaseUrl; // get BaseUrl Form Env File

  constructor() {
    // Safely Runs this code after the browser Fininshes initial rendering
    afterNextRender(() => {
      if (isPlatformBrowser(this._platformId)) {
        const savedToken = localStorage.getItem('UserToken'); // get Token
        if (savedToken)
          // if there is set token
          this.setToken(savedToken);
      }
    });
  }

  // ----------------------------
  // LOGIN METHOD
  // ----------------------------
  login(Credentials: LoginUser): Observable<any> {
    return this._http.post(`${this._baseUrl}/auth/signin`, Credentials);
  }

  // ----------------------------
  // SIGNUP METHOD
  // ----------------------------
  signup(Credentials: SignUpUser): Observable<any> {
    return this._http.post<any>(`${this._baseUrl}/auth/signup`, Credentials);
  }

  // ----------------------------
  // SAVE TOKEN + UPDATE USER
  // ----------------------------
  // Set Token in Memory and optionally update User BehaviorSubject
  setToken(Token: string) {
    if (Token !== null) {
      this._userToken = Token; // set Token in memory

      try {
        const data: CustomJwtPayload = jwtDecode(this._userToken); // Decode Token
        this.user.next(data);       // update User of type behaviour Subject  With UpdatedTokenData
      } catch (error) {
        console.log('invalid Token !', error);
        this.user.next(null); // update User With UpdatedTokenData
      }
    }
  }

  // ----------------------------
  // GETtOKEN METHOD
  // ----------------------------
  getToken(): string | null {
    return this._userToken;
  }

  // ----------------------------
  // LOGOUTor signOut
  // ----------------------------
  logout(): void {
    this._userToken = null; // set Token with null
    this.user.next(null); // user logged out // here i will update the stauts of the user
    localStorage.removeItem('UserToken'); // remove token from localStorage
    this._router.navigate(['/auth/']); // then i will navigate him to logout
  }

  // // SaveUser in Local Storage Method
  // saveUser(): void {
  //   this._userToken = JSON.stringify(localStorage.getItem('UserToken'));
  //   const data = jwtDecode(this.token); // decode token
  //   this.user.next(data); // update User
  // }

  isAuthenticated(): boolean {
    // SSR Safety
    if (!isPlatformBrowser(this._platformId)) {
      return false;
    }

    const token = this._userToken;
    const user = this.user;
    // No token or no decoded user → Not authenticated
    if (!token || !user) {
      return false;
    }
    return true;
  }
}
