import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  address: string = "";
  
  constructor(private router:Router, private api: ApiService) { }

  ngOnInit() {
  }

  makeOrder() {
    //STUB
  }

}
