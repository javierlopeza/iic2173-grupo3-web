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
  product_name = null;
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
    // Validate product name
    if (!/^[A-Za-záéíóúäëïöüàèìòù\-\ \'0-9]{1,}$/.test(this.product_name) === false) {
      return;
    }
    // Request product by name
    this.token = localStorage.getItem('token');
    this.api.getData(`/product/${this.product_name}`, true, this.token)
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


}
