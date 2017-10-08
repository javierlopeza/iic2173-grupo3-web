import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {


  constructor( private router: Router, private user: UserService) {
  }

  ngOnInit() {
  }

  makeOrder(product_code, address) {
    const username = this.user.getUsername();
    console.log('Product Code:', product_code, 'Address:', address, 'Username:', username);
  }
}
