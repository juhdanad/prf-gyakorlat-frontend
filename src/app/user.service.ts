import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, ReplaySubject } from 'rxjs';
import { CartService } from './cart.service';

export interface User {
  username: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly user = new ReplaySubject<User | null>(1);

  constructor(
    private readonly http: HttpClient,
    private readonly cartService: CartService
  ) {
    firstValueFrom(this.http.get<User | null>('/api/currentUser'))
      .then((user) => this.user.next(user || null))
      .catch(() => {});
  }

  get currentUser(): Observable<User | null> {
    return this.user.asObservable();
  }

  get isAdmin() {
    return this.user.pipe(map((u) => u?.type === 'admin'));
  }

  async login(username: string, password: string) {
    try {
      const user = await firstValueFrom(
        this.http.post<User>('/api/login', {
          username: username,
          password: password,
        })
      );
      this.user.next(user);
      return user;
    } catch (err: any) {
      throw new Error(err.error.error || err.message || 'Hiba!');
    }
  }

  async logout() {
    try {
      const user = await firstValueFrom(
        this.http.post<User>('/api/logout', {})
      );
      this.cartService.clear();
      this.user.next(null);
      return user;
    } catch (err: any) {
      throw new Error(err.error.error || err.message || 'Hiba!');
    }
  }
}
