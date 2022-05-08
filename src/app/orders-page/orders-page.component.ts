import { Component, OnInit } from '@angular/core';
import { Order } from '../order.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css'],
})
export class OrdersPageComponent implements OnInit {
  orders: Order[] = [
    {
      username: 'juhdanad',
      date: new Date(),
      id: 'as23df',
      products: [
        { name: 'szürke festék', quantity: 3, subtotal: 1200 },
        { name: 'fehér festék', quantity: 4, subtotal: 300 },
      ],
      total: 2400,
    },
    {
      username: 'juhdanad',
      date: new Date(),
      id: 'as23df',
      products: [
        { name: 'szürke festék', quantity: 3, subtotal: 1200 },
        { name: 'fehér festék', quantity: 4, subtotal: 300 },
      ],
      total: 2400,
    },
    {
      username: 'juhdanad',
      date: new Date(),
      id: 'as23df',
      products: [
        { name: 'szürke festék', quantity: 3, subtotal: 1200 },
        { name: 'fehér festék', quantity: 4, subtotal: 300 },
      ],
      total: 2400,
    },
    {
      username: 'juhdanad',
      date: new Date(),
      id: 'as23df',
      products: [
        { name: 'szürke festék', quantity: 3, subtotal: 1200 },
        { name: 'fehér festék', quantity: 4, subtotal: 300 },
      ],
      total: 2400,
    },
  ];

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {}

  get isAdmin() {
    return this.userService.isAdmin;
  }
}
