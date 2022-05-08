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
import { Product } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('productImage') images!: QueryList<ElementRef>;

  products: Product[] = [
    {
      id: 'a',
      name: 'Falfesték 1',
      description: 'Ez egy szép szürke falfesték.',
      imageURL: '/assets/images/paintbucket.svg',
      price: 300,
      quantityLeft: 4,
    },
    {
      id: 'b',
      name: 'Falfesték 1',
      description: 'Ez egy szép szürke falfesték.',
      imageURL: '/assets/images/paintbucket.svg',
      price: 300,
      quantityLeft: 4,
    },
    {
      id: 'c',
      name: 'Falfesték 1',
      description: 'Ez egy szép szürke falfesték.',
      imageURL: '/assets/images/paintbucket.svg',
      price: 300,
      quantityLeft: 4,
    },
    {
      id: 'd',
      name: 'Falfesték 1',
      description: 'Ez egy szép szürke falfesték.',
      imageURL: '/assets/images/paintbucket.svg',
      price: 300,
      quantityLeft: 4,
    },
  ];

  inputs: Partial<Record<string, string>> = {};

  constructor(
    private readonly app: AppComponent,
    private readonly cartService: CartService,
    private readonly snackBar: MatSnackBar,
    private readonly userService: UserService
  ) {}

  get isAdmin() {
    return this.userService.isAdmin;
  }

  cartNumber(id: string) {
    return this.cartService.cartItems.pipe(
      map((cart) => cart[id]?.quantity || 0)
    );
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

  toCart(product: Product) {
    try {
      const quantity = parseInt(this.inputs[product.id] || '');
      if (quantity > 0) {
        this.cartService.addToCart(product, quantity);
      } else {
        throw new Error('Adja meg a mennyiséget!');
      }
    } catch (e: any) {
      this.snackBar.open(e.message);
    }
  }
}
