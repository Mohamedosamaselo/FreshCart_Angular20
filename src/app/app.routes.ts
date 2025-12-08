import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AuthLayout } from './core/layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayout,
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
    path: 'brands',
    loadComponent: () => import('./features/pages/brand/brand').then((c) => c.Brand),
  },
  {
    path: 'categories',
    loadComponent: () => import('./features/pages/categories/categories').then((c) => c.Categories),
  },
  {
    path: 'products',
    loadComponent: () => import('./features/pages/product/product').then((c) => c.Product),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/pages/home/home').then((c) => c.Home),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/pages/cart/cart').then((c) => c.Cart),
  },

  {
    path: '**',
    loadComponent: () => import('./core/pages/not-found/not-found').then((c) => c.NotFound),
  },
];
