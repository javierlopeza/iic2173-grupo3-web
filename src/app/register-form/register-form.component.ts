import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  path: any = 'signup';
  userCredentials = {"username": {}, "password": {}};
  responseData: any;

  constructor( private router:Router, private api: ApiService) { }

  ngOnInit() {
  }

  RegisterUser(event, user, pass) {

    this.userCredentials.username = user;
    this.userCredentials.password = pass;

    this.api.postData(`/${this.path}`,this.userCredentials, false, "").then((result) => {
      this.responseData = result;
      console.log(result, "Server response");
           
    }, (err) => {
      console.log(err);
      
      // Error log
    });
    
    this.router.navigate(['']);
    event.preventDefault();
   
    
  }
}
