import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  page = 1;
  token: any;
  sum: number = 0;
  

  constructor(private router:Router, private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    // Request products
    this.token = localStorage.getItem('token');
    this.api.getData(`/products?page=${this.page}`, true, this.token)
    .then(data => {      
      if (data[0]) {
        this.products = data;
        this.products.map(product => product.amount = 0);
           
            
      } else {
        this.page--;
        this.getProducts();
      }
    });
  }

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
      console.log(p, "product");

      for (let item of this.api.shoppingCart) {
        
        if (p.id == item.id) {
          item.amount += p.amount;
          product.amount = 0;
          this.sum += +p.price * +p.amount; 
          return;
        }
      }
            
      this.api.shoppingCart.push(p);
      product.amount = 0;
      // + is unary cast operator
      this.sum += +p.price * +p.amount;  
         
      
    }
  }

  add(product) {
    product.amount ++;

  }
  remove(product) {
    if (product.amount > 0) {
      product.amount --;
    }

  }
  checkout() {
    this.router.navigate(['order']);

  }

  emptyCart() {
    this.api.shoppingCart = [];
    this.sum = 0;
  }

}
