import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: any;
  public active: any = { home: "ui icon button item active",
  product: "item", order: "item",categories: "item", products: "item"};

  constructor(private user: UserService) {
    this.username = this.user.getUsername();
  }

  ngOnInit() {
    console.log('Logged user:', this.username);
  }

}
