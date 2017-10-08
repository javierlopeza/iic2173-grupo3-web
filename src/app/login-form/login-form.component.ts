import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor( private router:Router, private user:UserService) { }

  ngOnInit() {
  }


  Login(event, username, pass) {
    console.log(event);
    let user = username;
    let password = pass;
    this.user.setUserLoggedIn();
    this.user.setUsername(user);
    this.router.navigate(['home']);
    event.preventDefault();
    console.log("user:", user, "pass:", pass);
  }

  Register(event) {
    console.log(event);
    event.preventDefault();
    console.log("hello world");
    this.router.navigate(['register']);
  }
}
