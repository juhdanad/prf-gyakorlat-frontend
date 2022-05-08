import { Injectable } from '@angular/core';
import { Product } from './product.service';

export interface Order {
  id: string;
  username: string;
  products: { name: string; quantity: number; subtotal: number }[];
  total: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() {}
}
