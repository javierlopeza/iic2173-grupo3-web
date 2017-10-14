import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  private apiRoot = 'https://arqss8.ing.puc.cl/api';
  public data: any = {};

  constructor(private _http: Http) { }

  getData(request_path: string, token_required: boolean) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      if (token_required) {
        // tslint:disable-next-line:max-line-length
        headers.append('Authorization', 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwiX2lkIjoiNTllMjViZDcxMTM2OGI0YzA1ZjkzYjA2Iiwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwidXNlcm5hbWUiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJwYXRoc1RvU2NvcGVzIjp7fSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6dHJ1ZX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJfX3YiOjAsInBhc3N3b3JkIjoiJDJhJDEwJHEwWi9nTVNrVkc3YmdCZTNvTjBzaXVocjhBZnNkMThYOUtqNi4yeEZFT1ZDTm9teVE5TG8uIiwidXNlcm5hbWUiOiJ1c3VhcmlvQGFycXVpdHJhbi5jbCIsIl9pZCI6IjU5ZTI1YmQ3MTEzNjhiNGMwNWY5M2IwNiJ9LCIkaW5pdCI6dHJ1ZSwiaWF0IjoxNTA4MDA2OTkyfQ.bCNKN2K5bNzG9Nd2M_ROQdnWgyha7pbujWLiobPuD1s');
      }
      const options = new RequestOptions({ headers: headers, method: 'get' });
      const apiURL = `${this.apiRoot}${request_path}`;
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

  postData(credentials, request_path) {
    return new Promise((resolve, reject) => {
      const headers = new Headers();
      // if (request_path == "tokens") { or whatever login endpoint
      //   headers.append("Content-Type", "application/json");
      // }
      // else {
      //   headers.append("token", localStorage.getItem("token"));
      // }
      const options = new RequestOptions({ headers: headers, method: 'post' });
      const apiURL = `${this.apiRoot}${request_path}`;
      this._http.post(apiURL, credentials, options)
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
