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

  LoginUser(e) {
    e.preventDefault();
    console.log(e);
    let username = e.target.elements[0].value;
    let password = e.target.elements[1].value;
    console.log(username, password);    
    this.user.setUserLoggedIn();
    this.user.setUsername(username);
    this.router.navigate(['home']);
    return false;
    
 

  }

  RegisterUser(){
    this.router.navigate(['register'])
    return false;
  }

}
