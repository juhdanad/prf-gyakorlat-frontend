import { Injectable } from '@angular/core';

export interface Product {
  id: string;
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
  constructor() {}
}
