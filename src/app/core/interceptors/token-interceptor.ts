import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // execute this code inside client side
  if (isPlatformBrowser(platformId)) {
    const tokenn = localStorage.getItem('UserToken')

    if (tokenn) {
      req = req.clone({
        setHeaders: {
          token: tokenn
        }
      })
    }
  }

  return next(req);
};
