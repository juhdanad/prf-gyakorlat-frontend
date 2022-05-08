import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Product } from '../product.service';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.css'],
})
export class ProductEditPageComponent implements OnInit {
  product: Partial<Product> = {};

  constructor(route: ActivatedRoute, private readonly router: Router) {
    this.product.id = route.snapshot.params['id'];
  }

  ngOnInit(): void {}
  saveProduct() {
    this.router.navigate(['/']);
  }
}
