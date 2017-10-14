import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  code = '';
  public active: any = { home: "ui icon button item", product: "item active",
   order: "item",categories: "item", products: "item"};

  constructor(private router: Router, private user: UserService) {
  }

  ngOnInit() {
  }

  searchProduct() {
    const username = this.user.getUsername();
    console.log('Product Code:', this.code, 'Username:', username);
  }

}
