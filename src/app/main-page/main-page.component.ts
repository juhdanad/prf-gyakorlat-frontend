import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AppComponent } from '../app.component';
import { CartService } from '../cart.service';
import { Product, ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('productImage') images!: QueryList<ElementRef>;

  products: Product[] = [];

  inputs: Partial<Record<string, string>> = {};

  constructor(
    private readonly app: AppComponent,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {}

  get isAdmin() {
    return this.userService.isAdmin;
  }

  cartNumber(id: string) {
    return this.cartService.cartItems.pipe(
      map((cart) => cart[id]?.quantity || 0)
    );
  }

  get hasCartContent() {
    return this.cartService.cartItems.pipe(
      map((cart) => Object.keys(cart).length > 0)
    );
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe({
      next: (list) => (this.products = list),
      error: (err: Error) => {
        this.snackBar.open(err.message);
      },
    });
  }

  ngAfterViewInit(): void {
    this.images.changes.subscribe(() => this.onImagesChange());
    this.onImagesChange();
  }

  onImagesChange() {
    this.app.modifyElementsToCover(
      this,
      this.images.toArray().map((i) => i.nativeElement)
    );
  }

  ngOnDestroy(): void {
    this.app.modifyElementsToCover(this, null);
  }

  toCart(product: Product) {
    try {
      const quantity = parseInt(this.inputs[product._id] || '');
      if (quantity > 0) {
        this.cartService.addToCart(product, quantity);
      } else {
        throw new Error('Adja meg a mennyis??get!');
      }
    } catch (e: any) {
      this.snackBar.open(e.message);
    }
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product._id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error: Error) => {
        this.snackBar.open(error.message);
      },
    });
  }
}
