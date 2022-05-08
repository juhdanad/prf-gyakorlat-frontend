import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { Product } from './product.service';

export type Cart = Record<
  string,
  {
    product: Product;
    quantity: number;
  }
>;

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /** Maps product IDs to quantities */
  items: Cart;

  private cartItemsSubject;

  get cartItems() {
    return this.cartItemsSubject.asObservable();
  }

  constructor(private readonly http: HttpClient) {
    let items = {};
    try {
      items = JSON.parse(localStorage.getItem('cartcontent') || '{}');
    } catch (e) {}
    this.items = items;
    this.cartItemsSubject = new BehaviorSubject<Cart>(items);
  }

  addToCart(product: Product, quantity: number) {
    const item = this.items[product._id];
    if (item) {
      const newQuantity = item.quantity + quantity;
      if (newQuantity > product.quantityLeft) {
        throw new Error('Nincs elég a termékből raktáron!');
      }
      item.quantity += quantity;
    } else {
      if (quantity > product.quantityLeft) {
        throw new Error('Nincs elég a termékből raktáron!');
      }
      this.items[product._id] = { product: product, quantity: quantity };
    }
    this.onItemsChange();
  }

  removeFromCart(product: Product) {
    delete this.items[product._id];
    this.onItemsChange();
  }

  clear() {
    this.items = {};
    this.onItemsChange();
  }

  onItemsChange() {
    localStorage.setItem('cartcontent', JSON.stringify(this.items));
    this.cartItemsSubject.next(this.items);
  }

  buyAll() {
    return this.http
      .post<{ message: string }>('/api/shop', {
        orders: Object.values(this.items).map((o) => ({
          _id: o.product._id,
          quantity: o.quantity,
        })),
      })
      .pipe(tap(() => this.clear()))
      .pipe(
        catchError((err) => {
          throw new Error(
            err.error.error || err.message || 'Hiba a termékek lekérése során!'
          );
        })
      );
  }
}
