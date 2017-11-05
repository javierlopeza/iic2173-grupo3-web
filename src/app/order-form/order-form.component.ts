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
  token: any;
  products: any = [];
  page = 1;
  categoriesPage = 1;
  drugsCategories: any = [];
  hide = true;

  constructor(private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      this.api.shoppingCart = [];
      this.api.sum = 0;
    }
    this.getCategories();
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
    this.token = localStorage.getItem('token');
    this.api.postData(`/transaction`, body, true, this.token)
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

  getCategories() {
    // Request categories
    this.token = localStorage.getItem('token');

    this.api.getData(`/categories?page=${this.categoriesPage}`, true, this.token)
      .then(data => {
        let dataArray: any = data;
        if (dataArray.length) {
          dataArray = dataArray.filter(category => category.context === 'MEDICAMENTOS').map(category => category.id);
          this.drugsCategories = this.drugsCategories.concat(dataArray);
          this.categoriesPage ++;
          // this.getCategories();
          this.getProducts();  // Now all categories are in the first page
        } else {
          console.log('Retrieved all categories');
          // console.log(this.drugsCategories);
          this.getProducts();
        }
      });
  }

  getProducts() {
    // Request products
    this.token = localStorage.getItem('token');
    this.api.getData(`/products?page=${this.page}`, true, this.token)
      .then(data => {
        if (data[0]) {
          this.products = data;
          this.products.map(product => product.amount = 0);
          this.products = this.products.filter(product => !this.drugsCategories.includes(product.category));
        } else {
          this.page--;
        }
      });
  }

  nextPage() {
    this.page++;
    this.getProducts();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getProducts();
    }
  }
  addProductToCart(product) {
    if (product.amount > 0) {
      // this makes a copy of the object, otherwise if we add product i'll be a reference
      const p = JSON.parse(JSON.stringify(product));

      for (const item of this.api.shoppingCart) {
        if (p.id === item.id) {
          item.amount += p.amount;
          product.amount = 0;
          this.api.sum += +p.price * +p.amount;
          return;
        }
      }

      this.api.shoppingCart.push(p);
      product.amount = 0;
      // + is unary cast operator
      this.api.sum += +p.price * +p.amount;      
      localStorage.setItem('cart', JSON.stringify(this.api.shoppingCart));
      
      
    }
  }

  add(product) {
    product.amount++;
    this.hide = true;
  }
  remove(product) {
    if (product.amount > 0) {
      product.amount--;
    }
  }

  checkout() {
    if (this.api.shoppingCart.length > 0) {
      this.router.navigate(['checkout']);
    } else {
      this.hide = false;
    }
  }

  emptyCart() {
    this.api.shoppingCart = [];
    this.api.sum = 0;
  }

}
