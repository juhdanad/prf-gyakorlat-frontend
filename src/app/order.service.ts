import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

export interface Order {
  _id: string;
  username: string;
  products: { name: string; quantity: number; subtotal: number }[];
  total: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}

  getOrders() {
    return this.http.get<Order[]>('/api/orders').pipe(
      catchError((err) => {
        throw new Error(
          err.error.error || err.message || 'Hiba a rendelések lekérése során!'
        );
      })
    );
  }
}
