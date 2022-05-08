import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  destroyed = new Subject<null>();

  username = '';
  password = '';

  constructor(
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUser
      .pipe(takeUntil(this.destroyed))
      .subscribe((user) => this.redirect(user));
  }

  ngOnDestroy(): void {
    this.destroyed.next(null);
  }

  login() {
    this.userService
      .login(this.username, this.password)
      .then((user) => this.redirect(user))
      .catch((err: Error) => this.snackBar.open(err.message));
  }

  private redirect(user: User | null) {
    if (user) {
      this.router.navigate(['/']);
    }
  }
}
