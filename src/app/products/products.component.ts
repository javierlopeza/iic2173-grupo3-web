import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  page = 1;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    // Request products
    this.api.getData(`/products?page=${this.page}`, true)
    .then(data => {
      if (data[0]) {
        this.products = data;
      } else {
        this.page = 1;
        this.getProducts();
      }
    });
  }

  nextPage() {
    this.page++;
    this.getProducts();
  }

}
