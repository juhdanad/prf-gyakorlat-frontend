import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  quantityLeft: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('/api/products').pipe(
      catchError((err) => {
        throw new Error(
          err.error.error || err.message || 'Hiba a termékek lekérése során!'
        );
      })
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`/api/products/${id}`).pipe(
      catchError((err) => {
        throw new Error(
          err.error.error || err.message || 'Hiba a termék lekérése során!'
        );
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<unknown>(`/api/products/${id}`).pipe(
      catchError((err) => {
        throw new Error(
          err.error.error || err.message || 'Hiba a termék törlése során!'
        );
      })
    );
  }

  saveProduct(product: Partial<Product>) {
    if (product._id) {
      return this.http
        .put<unknown>(`/api/products/${product._id}`, product)
        .pipe(
          catchError((err) => {
            throw new Error(
              err.error.error || err.message || 'Hiba a termék mentése során!'
            );
          })
        );
    } else {
      return this.http.post<unknown>('/api/products', product).pipe(
        catchError((err) => {
          throw new Error(
            err.error.error || err.message || 'Hiba a termék módosítása során!'
          );
        })
      );
    }
  }
}
