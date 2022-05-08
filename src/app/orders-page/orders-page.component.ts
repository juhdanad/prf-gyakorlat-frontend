import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order, OrderService } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (list) => (this.orders = list),
      error: (err: Error) => {
        this.snackBar.open(err.message);
      },
    });
  }

  get isAdmin() {
    return this.userService.isAdmin;
  }

  dateToString(date: Date | string) {
    date = new Date(date);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${date.getFullYear()}. ${
      date.getMonth() + 1
    }. ${date.getDate()}. ${date.getHours()}:${minutes}`;
  }
}
