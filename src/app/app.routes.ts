import { Routes } from '@angular/router';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';
import { authGuard } from './core/gaurds/auth-gaurd-guard';
import { authRedirectGuard } from './core/gaurds/auth-redirect-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
    canActivate: [authRedirectGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./core/pages/Authentication/login/login').then((c) => c.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/pages/Authentication/register/register').then((c) => c.Register),
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./core/pages/Authentication/forget-password/forget-password').then(
            (c) => c.ForgetPassword
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./core/pages/Authentication/login/login').then((c) => c.Login),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./features/pages/home/home').then((c) => c.Home),
  },
  {
    path: 'brands',
    canActivate: [authGuard],
    loadComponent: () => import('./features/pages/brand/brand').then((c) => c.Brand),
  },
  {
    path: 'categories',
    canActivate: [authGuard],
    loadComponent: () => import('./features/pages/categories/categories').then((c) => c.Categories),
  },

  {
    path: 'productsDetails/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/product-details/product-details').then((c) => c.ProductDetails),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./features/pages/cart/cart').then((c) => c.Cart),
  },
  {
    path: 'ckeckOut/:cartId',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/checkout/checkout').then((c) => c.Checkout),
  },
  {
    path: 'allorders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/pages/allorders/allorders').then((c) => c.Allorders),
  },






  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found/not-found').then((c) => c.NotFound),
  },
];
