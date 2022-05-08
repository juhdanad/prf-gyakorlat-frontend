import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { map } from 'rxjs';
import { AppComponent } from '../app.component';
import { CartService } from '../cart.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  @ViewChildren('productImage') images!: QueryList<ElementRef>;

  constructor(
    private readonly app: AppComponent,
    private readonly cartService: CartService
  ) {}

  get cart() {
    return this.cartService.cartItems.pipe(map((cart) => Object.values(cart)));
  }

  get total() {
    return this.cartService.cartItems.pipe(
      map((cart) =>
        Object.values(cart).reduce(
          (acc, p) => acc + p.product.price * p.quantity,
          0
        )
      )
    );
  }

  deleteProduct(product: Product) {
    this.cartService.removeFromCart(product);
  }

  buy() {
    this.cartService.clear();
  }

  ngOnInit(): void {}

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
}
