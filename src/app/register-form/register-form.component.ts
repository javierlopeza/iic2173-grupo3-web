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

  RegisterUser(e) {

    this.router.navigate(['home']);
    return false;
    
  }
}
