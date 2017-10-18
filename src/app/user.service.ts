import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  private username;

  constructor() { 
    this.isUserLoggedIn = false;
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
    

  }

  setUserLogout() {
    this.isUserLoggedIn = false;
  }

  getUserLoggedIn(){
    return this.isUserLoggedIn;
  }

  setUsername(username){
    this.username = username;
  }

  getUsername(){
    return this.username;
  }

}
