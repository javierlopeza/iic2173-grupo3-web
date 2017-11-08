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
  byId = false;
  products: any = [];
  productsName: any = [];
  activeSearchByName: boolean = false;
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
      this.error_msg = true;
      this.activeSearchByName = false;
      return;
    }
    // Request product by ID
    this.token = localStorage.getItem('token');
    this.api.getData(`/product/${this.product_id}`, true, this.token)
    .then(data => {
      if (data["success"] == false) {
        this.error_msg = true;
        this.activeSearchByName = false;
      } else {
        this.activeSearchByName = true;
        this.error_msg = false;
      }
      
      
      
      this.productsName = [];
      this.productsName.push(data);

      
    })
    .catch((err) => {
      this.error_msg = true;
      this.activeSearchByName = false;
    });
  }

  getCategories() {
    // Request categories
    this.token = localStorage.getItem('token');

    this.api.getData(`/categories?page=${this.categoriesPage}`, true, this.token)
      .then(data => {
        const dataArray: any = data;
        if (dataArray.length) {
          this.categoriesPage ++;
          // this.getCategories();
          this.getProduct();  // Now all categories are in the first page
        } else {
          //console.log('Retrieved all categories');
          // console.log(this.drugsCategories);
          this.getProduct();
        }
      });
  }


  getProduct() {
    // Request products
    //console.log(this.productName, "nombre buscado");
    this.token = localStorage.getItem('token');
    this.api.getData(`/product?name=${this.productName}`, true, this.token)
      .then(data => {
        this.error_msg = false;
        const products: any = data;
        if (products == 0) {
          //console.log(products, "prodcs");
          this.error_msg = true;
          this.activeSearchByName = false;
        } else {
          this.activeSearchByName = true;
        }
        this.productsName = [];

        products.map((product) => {
          this.productsName.push(product);
        });


      }).catch( (err) => {
        this.activeSearchByName = false;
        this.error_msg = true;
      });
  }

  searchById() {
    this.byId = true;
  }

  searchByName() {
    this.byId = false;
  }

}
