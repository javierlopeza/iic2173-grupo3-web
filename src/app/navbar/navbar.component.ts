import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = '';

  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    this.username = this.user.getUsername();
  }

  Logout() {
    this.user.setUserLogout();
    localStorage.clear();
    this.router.navigate(['']);
  }

}
