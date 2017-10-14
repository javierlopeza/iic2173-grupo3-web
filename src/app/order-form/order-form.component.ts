import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  code = '';
  address = '';

  constructor( private router: Router, private user: UserService) {
  }

  ngOnInit() {
  }

  makeOrder() {
    const username = this.user.getUsername();
    console.log('Product Code:', this.code, 'Address:', this.address, 'Username:', username);
  }
}
