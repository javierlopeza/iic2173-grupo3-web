import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  private apiRoot = 'https://arqss8.ing.puc.cl/api';
  // private apiRoot = 'http://localhost:3000/api';
  public data: any = {};
  shoppingCart: any = [];
  sum: number = 0;

  constructor(private _http: Http, private user: UserService, private router: Router) {

  }

  getDataCustom(request_path: string, token_required: boolean, token) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        headers.append('Authorization', token);
      }
      const options = new RequestOptions({ headers: headers, method: 'get' });

      const apiURL = `http://arqss17.ing.puc.cl:3000/${request_path}`;
      console.log('GET request to', apiURL);
      this._http.get(apiURL, options)
        .toPromise()
        .then(res => {
          this.data = res.json();
          resolve(this.data);
        })
        .catch(err => {
          // Unauthorized? -> Logout
          if (err.status === 401) {
            this.user.setUserLogout();
            localStorage.clear();
            this.router.navigate(['']);
            return;
          }
          this.data = err.json();
          resolve(this.data);
        });
    });
  }

  getData(request_path: string, token_required: boolean, token) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        headers.append('Authorization', token);
      }
      const options = new RequestOptions({ headers: headers, method: 'get' });

      const apiURL = `${this.apiRoot}${request_path}`;
      console.log('GET request to', apiURL);
      this._http.get(apiURL, options)
        .toPromise()
        .then(res => {
          this.data = res.json();
          resolve(this.data);
        })
        .catch(err => {
          // Unauthorized? -> Logout
          if (err.status === 401) {
            this.user.setUserLogout();
            localStorage.clear();
            this.router.navigate(['']);
            return;
          }
          this.data = err.json();
          resolve(this.data);
        });
    });
  }

  postData(request_path, body, token_required, token) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        headers.append('Authorization', token);
      }
      const options = new RequestOptions({ headers: headers, method: 'post' });
      const apiURL = `${this.apiRoot}${request_path}`;
      console.log('POST request to', apiURL);

      this._http.post(apiURL, body, options)
        .toPromise()
        .then(res => {
          this.data = res.json();
          resolve(this.data);
        })
        .catch(err => {
          // Unauthorized? -> Logout
          if (err.status === 401) {
            this.user.setUserLogout();
            localStorage.clear();
            this.router.navigate(['']);
            return;
          }
          this.data = err.json();
          resolve(this.data);
        });
    });
  }




}
