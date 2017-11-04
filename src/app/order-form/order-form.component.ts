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
  token :any;
  products: any = [];
  page = 1;    
  drugsCategories: any = [];
  hide: boolean = true;

  constructor( private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
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


  getProducts() {
    // Request products
    this.token = localStorage.getItem('token');
    this.api.getData(`/products?page=${this.page}`, true, this.token)
    .then(data => {      
      if (data[0]) {
        this.products = data;
        this.products.map(product => product.amount = 0);
        this.products = this.products
          .filter(product => !this.drugsCategories.includes(product.category));
           
            
      } else {
        this.page--;
        this.getProducts();
      }
    });
  }

  getCategories() {
    // Request categories
    let categories = []
    let page = 1;
    let categoriesLeft = true;
    this.token = localStorage.getItem('token');
    
    this.api.getDataCustom(`categories`, true, this.token)
    .then(data => {      
      
      this.drugsCategories = data;
      this.drugsCategories = this.drugsCategories
        .filter( product => product.context == "MEDICAMENTOS")
        .map(product => product.id);

        return this.drugsCategories;
      
    }).then(x => this.getProducts());

    
  }
  //}

  nextPage() {
    this.page++;
    this.getProducts();
    
  }

  previousPage() {
    if(this.page > 1) {
      this.page--;
      this.getProducts();
    }   
    
  }
  addProductToCart(product) {
    if (product.amount > 0) {

      // this makes a copy of the object, otherwise if we add product i'll be a reference
      let p = JSON.parse(JSON.stringify(product));
      

      for (let item of this.api.shoppingCart) {
        
        if (p.id == item.id) {
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
         
      
    }
  }

  add(product) {
    product.amount ++;
    this.hide = true;

  }
  remove(product) {
    if (product.amount > 0) {
      product.amount --;
    }

  }
  checkout() {
    if (this.api.shoppingCart.length > 0) {
      this.router.navigate(['checkout']);
    }
    else {
      this.hide = false;
    }

  }

  emptyCart() {
    this.api.shoppingCart = [];
    this.api.sum = 0;
  }

}
