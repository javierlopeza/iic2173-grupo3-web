import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { SimpleTimer } from 'ng2-simple-timer';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  address = '';
  cart = [];
  result = null;
  timerId: string;
  start: Boolean = false;

  constructor(private router: Router, public api: ApiService, private st: SimpleTimer) { }

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (!this.cart) {
      this.api.shoppingCart = [];
      this.api.sum = 0;
    }
  }

  makeOrder() {
    if (!this.address.length) return;
    const body = {
      address: this.address,
      cart: this.cart.map(product => ({
        product_id: product.id,
        quantity: product.amount,
        name: product.name,
        price: product.price
      }))
    };
    const token = localStorage.getItem('token');
    console.log(body);
    this.api.postData('/transaction', body, true, token).then(data => {
      data['total_accepted'] = data['accepted'].map(product => (product.price * product.quantity)).reduce((a, b) => a + b, 0);
      this.startTimer();
      this.result = data;
      // Clear shopping cart
      this.api.shoppingCart = [];
      this.api.sum = 0;
      this.cart = [];
    }).catch(error => {
      console.log(error);
    });
  }
  startTimer() {
    this.st.newTimer('survey', 300);
    this.timerId = this.st.subscribe('survey', () => this.callback());
  }

  callback() {

    if (this.start) {
      this.api.survey = true;
      this.st.delTimer('survey');
    } else {
      this.start = true;
    }

  }

}
