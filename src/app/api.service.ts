import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  private apiRoot = 'https://arqss8.ing.puc.cl/api';
  //private apiRoot = 'http://localhost:3000/api';
  public data: any = {};

  constructor(private _http: Http) { }

  getData(request_path: string, token_required: boolean, token) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        // tslint:disable-next-line:max-line-length
        headers.append('Authorization', token);
      }
      const options = new RequestOptions({ headers: headers, method: 'get' });
      
      const apiURL = `${this.apiRoot}${request_path}`;
      console.log(apiURL, "URL REQUESTED");
      this._http.get(apiURL, options)
        .toPromise()
        .then(res => {
          this.data = res.json();
          resolve(this.data);
        })
        .catch(err => {
          this.data = err.json();
          resolve(this.data);
        });
    });
  }

  postData(request_path, body, token_required, token) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        // tslint:disable-next-line:max-line-length
        headers.append('Authorization', token);
      }
      const options = new RequestOptions({ headers: headers, method: 'post' });
      const apiURL = `${this.apiRoot}${request_path}`;
      console.log(apiURL, "URL REQUESTED");

      this._http.post(apiURL, body, options)
        .toPromise()
        .then(res => {
          this.data = res.json();
          resolve(this.data);
        })
        .catch(err => {
          this.data = err.json();
          resolve(this.data);
        });
    });
  }




}
