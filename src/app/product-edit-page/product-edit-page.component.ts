import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.css'],
})
export class ProductEditPageComponent implements OnInit {
  product: Partial<Product> = {};

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly productService: ProductService
  ) {
    this.product._id = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.product._id) {
      this.productService.getProduct(this.product._id).subscribe({
        next: (p) => (this.product = p),
        error: (err: Error) => {
          this.snackBar.open(err.message);
        },
      });
    }
  }

  async saveProduct() {
    this.productService.saveProduct(this.product).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: Error) => {
        this.snackBar.open(err.message);
      },
    });
  }
}
