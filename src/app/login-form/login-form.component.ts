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
  userCredentials = { 'username': null, 'password': null };
  responseData: any;
  path: any = 'signin';
  password: any;
  username: any;
  success: any = null;
  msg = '';

  constructor(private router: Router, private user: UserService,
    private api: ApiService) { }

  ngOnInit() {

    if (localStorage.getItem('token')) {
      this.router.navigate(['home']);
    }

  }


  Login() {
    this.userCredentials.username = this.username;
    this.userCredentials.password = this.password;

    if (this.username && this.password) {
      this.api.postData(`/${this.path}`, this.userCredentials, false, '').then(
        (result) => {
          this.responseData = result;
          if (this.responseData.success === false) {
            this.success = false;
            this.msg = 'Credenciales inválidas, intente nuevamente';
          } else {
            this.user.setUserLoggedIn();
            this.user.setUsername(this.username);
            localStorage.setItem('token', this.responseData.token);
            this.router.navigate(['home']);
            this.success = true;
          }
        }, (err) => {
          console.log(err);
          this.success = false;
          // Error log
        });
    } else {
      this.success = false;
      this.msg = 'Por favor ingrese credenciales';
    }
  }

  Register() {
    this.router.navigate(['register']);
  }
}
