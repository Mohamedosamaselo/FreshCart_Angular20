import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  // Dependency injection
  const authService = inject(AuthService);
  const _router = inject(Router);
  // variables
  const user = authService.user.value; // BehaviorSubject current value

  //check on the  user if  already logged in → redirect
  if (user) {
    _router.navigate(['/home']);
    return false;
  }

  return true; // allow access
};
