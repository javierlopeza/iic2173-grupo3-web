import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ApiService } from './../api.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  show: boolean = false;
  showError: boolean = false;

  error = null;

  token = {
    value: null,
  };

  constructor(private router: Router, private user: UserService, private api: ApiService) {
  }

  ngOnInit() {
  }

 getNewToken(password) {
    // Validate ID (must be a number)
    this.api.postData({
      "username": "gafigueroa@uc.cl",
      "password": password
    }, '/token', true).then(function(data){
      console.log(data);
      this.token.value = data["token"];
      this.show = true;
      this.showError = false;

    }.bind(this)).catch(function(error){
      this.show = false;
      this.showError = true;
      this.error = error;
    }.bind(this));
  }


}
