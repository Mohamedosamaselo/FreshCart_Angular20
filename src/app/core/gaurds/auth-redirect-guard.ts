import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user.value; // BehaviorSubject current value

  if (user) {
    // user already logged in → redirect
    router.navigate(['/home']);
    return false;
  }

  return true; // allow access
};
