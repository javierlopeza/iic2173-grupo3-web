import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  product_id = '';
  address = '';
  success = null;
  msg = '';

  constructor( private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
  }

  makeOrder() {
    // Validate product_id (must be a number)
    if (/^\d+$/.test(this.product_id) === false) {
      return;
    }
    // Request product by ID
    const body = {
      product_id: this.product_id,
      address: this.address
    };
    this.api.postData(`/transaction`, body, true)
    .then(data => {
      if (data['success']) {
        this.success = true;
        this.msg = 'La compra se ha realizado con éxito.';
      } else {
        this.success = false;
        this.msg = data['msg'];
      }
    });
  }
}
