import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css'],
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar
  ) {}

  get username() {
    return this.userService.currentUser.pipe(
      map((user) => user?.username || '')
    );
  }

  get cartCount() {
    return this.cartService.cartItems.pipe(
      map((cart) => {
        const len = Object.keys(cart).length;
        return len ? String(len) : '';
      })
    );
  }

  ngOnInit(): void {}

  logout() {
    this.userService
      .logout()
      .then(() => this.router.navigate(['/login']))
      .catch((err: Error) => this.snackBar.open(err.message));
  }
}
