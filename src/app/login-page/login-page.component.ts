import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    this.http
      .post<{ username: string; type: string }>('/api/login', {
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => console.log(res),
        error: (err) =>
          this.snackBar.open(err.error.error || err.message || 'Hiba!'),
      });
  }
}
