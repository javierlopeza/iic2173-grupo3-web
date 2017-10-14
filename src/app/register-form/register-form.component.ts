import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }

  RegisterUser(event, name, user, email, pass) {

    console.log("name", name, "user", user, "email", email, "pass", pass);
    
    this.router.navigate(['home']);
    event.preventDefault();
   
    
  }
}
