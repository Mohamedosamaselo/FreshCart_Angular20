import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access
  }

  //if  User not authenticated, redirect to login
  router.navigate(['/auth/']); //user will navigate  to login
  return false; // Deny access
};

// ====================================
// EXPLANATION
// ====================================

/*
HOW IT WORKS:

1. User tries to access protected route (e.g., /home)
2. Guard checks: authService.isAuthenticated()
   ↓
3a. If TRUE (token exists & valid):
    → Allow access ✅

3b. If FALSE (no token or expired):
    → Redirect to /auth/ 🔒[ login ]
    → Save attempted URL in queryParams
    → User can be redirected back after login

AUTHSERVICE.ISAUTHENTICATED() CHECKS:
- Token exists in memory
- Token is valid (not expired)
- User signal has data

USAGE IN ROUTES:
{
  path: 'home',
  component: HomeComponent,
  canActivate: [authGuard] // ← Protected route
}
*/
