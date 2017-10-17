import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from '../user.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  result: any;
  userCredentials = {"username": {}, "password": {}};
  responseData: any
  path: any = 'signin'

  constructor( private router:Router, private user:UserService,
  private api: ApiService) { }

  ngOnInit() {
  }


  Login(event, username, pass) {
    console.log(event);
    
    this.userCredentials.username = username;
    this.userCredentials.password = pass;

    console.log(this.userCredentials, "las credenciales");

    
    
    this.user.setUserLoggedIn();
    this.user.setUsername(username);
    this.api.postData(`/${this.path}`,this.userCredentials, false, "").then((result) => {
      this.responseData = result;
      localStorage.setItem('token', this.responseData.token);
      
    }, (err) => {
      console.log(err);
      
      // Error log
    });

    this.router.navigate(['home']);
    event.preventDefault();
    console.log("user:", username, "pass:", pass);
  }

  Register(event) {
    console.log(event);
    event.preventDefault();
    console.log("hello world");
    this.router.navigate(['register']);
  }
}
