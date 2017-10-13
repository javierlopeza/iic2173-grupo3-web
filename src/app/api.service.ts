import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  private apiRoot = 'http://arqss17.ing.puc.cl:3000';
  public data: any = {};

  constructor( private _http: Http ) { }

  getData(request_path: string) {
    let promise = new Promise((resolve, reject) => {
      //let headers = new Headers();
      //headers.append("token", localStorage.getItem("token"));
    let apiURL = `${this.apiRoot}/${request_path}`;
    this._http.get(apiURL) //include headers
      .toPromise()
      .then(
        res => { // Success
          this.data = res.json();
          resolve(this.data);

        }
      );
    });
    return promise;
  }

  postData(credentials, request_path) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // if (request_path == "tokens") { or whatever login endpoint
      //   headers.append("Content-Type", "application/json");
      // }
      // else {
      //   headers.append("token", localStorage.getItem("token"));
      // }
      this._http.post(this.apiRoot + request_path, credentials, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


}
