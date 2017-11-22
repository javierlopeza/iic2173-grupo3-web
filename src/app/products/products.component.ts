import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  page = 1;
  token: any;

  constructor(private router: Router, private api: ApiService) { }

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

}
