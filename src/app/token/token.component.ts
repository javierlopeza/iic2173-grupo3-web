import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  token = '';
  newToken = '';
  copied = false;

  constructor(private router: Router, public api: ApiService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.api.getData('/token', true, this.token).then((response) => {
        this.newToken = response['token'];
    });
  }

  copy() {
    this.copied = true;
  }

}
