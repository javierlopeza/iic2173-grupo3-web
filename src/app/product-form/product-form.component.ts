import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  token: any;
  categories: any;
  productName: string;
  byId: boolean = true;
  products: any = [];
  categoriesPage = 1;
  product_id = null;
  error_msg = null;
  product = {
    id: null,
    category: {
        id: null,
        context: null,
        area: null,
        group: null
    },
    name: null,
    price: null,
    success: false
  };

  constructor(private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
  }

  searchProduct() {
    // Validate ID (must be a number)
    if (/^\d+$/.test(this.product_id) === false) {
      return;
    }
    // Request product by ID
    this.token = localStorage.getItem('token');
    this.api.getData(`/product/${this.product_id}`, true, this.token)
    .then(data => {
      if (data['success']) {
        this.product.id = data['id'];
        this.product.category = data['category'];
        this.product.name = data['name'];
        this.product.price = data['price'];
        this.product.success = true;
        this.error_msg = false;
      } else {
        this.product.success = false;
        this.error_msg = true;
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
          this.categoriesPage ++;
          // this.getCategories();
          this.getProduct();  // Now all categories are in the first page
        } else {
          console.log('Retrieved all categories');
          // console.log(this.drugsCategories);
          this.getProduct();
        }
      });
  }


  getProduct() {
    // Request products
    this.token = localStorage.getItem('token');
    this.api.getData(`product?name=${this.productName}`, true, this.token)
      .then(data => {

        this.products = data['result'];
        console.log(this.products);
        
      });
  }

  searchById() {
    this.byId = true;
  }

  searchByName() {
    this.byId = false;
  }

}
