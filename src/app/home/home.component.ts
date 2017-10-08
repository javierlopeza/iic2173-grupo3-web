import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: any;

  constructor(private user: UserService) {
    this.username = this.user.getUsername();
  }

  ngOnInit() {
    console.log('Logged user:', this.username);
  }

}
