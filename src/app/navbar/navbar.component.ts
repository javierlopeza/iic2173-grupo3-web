import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from '../api.service';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = '';

  constructor(private router: Router, private user: UserService, public api: ApiService ) { }

  ngOnInit() {
    this.username = this.user.getUsername();
  }

  Logout() {
    this.user.setUserLogout();
    localStorage.clear();
    this.router.navigate(['']);
  }

  Disable() {
    this.api.survey = false;
  }

}
