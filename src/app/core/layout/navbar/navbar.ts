import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { CartService } from '../../../shared/services/Cart/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {

  authService = inject(AuthService);
  cartService = inject(CartService);
  navbarCounter!: number;

  ngOnInit(): void {


    // After any refresh
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartCounter.next(res.numOfCartItems);
        console.log(this.navbarCounter, 'navbarCounter');
      },
    })


  }


  // ====================================
  // LOGOUT METHOD
  // ====================================

  logout() {
    this.authService.logout();
  }
}
