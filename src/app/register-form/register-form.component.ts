import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  path: any = 'signup';
  userCredentials = { 'username': null, 'password': null };
  responseData: any;
  username: any;
  password: any;
  success = null;
  msg = '';

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
  }

  RegisterUser() {

    this.userCredentials.username = this.username;
    this.userCredentials.password = this.password;

    if (!/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(this.username)) {
      this.success = false;
      this.msg = 'Por favor ingrese un email válido';
      return;
    }

    if (this.username && this.password) {

      this.api.postData(`/${this.path}`, this.userCredentials, false, '').then((result) => {
        this.responseData = result;
        // console.log(result, 'Server response');

        if (this.responseData.success === false) {
          this.success = false;
          this.msg = 'Ingrese credenciales válidas';
        }
        else {
          this.success = true;
          this.msg = 'Serás redirigido al home para que ingrese a Arquitrán!';
          setTimeout(() => this.router.navigate(['']), 3000);

          event.preventDefault();
        }

      }, (err) => {
        console.log(err);
        this.success = false;
        // Error log
      });

    }
    else {
      this.success = false;
      this.msg = 'Por favor ingrese credenciales';
    }
  }

}
