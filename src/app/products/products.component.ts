import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public data:any;
  public products:any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.get_products();
  }

  get_products() {

    this.api.getData('productos', true).then(res => {
      this.data = res;
      console.log(this.data);
      this.products = this.data.map( x => x.name);
      console.log("products", this.products);
    }, (err) => {
      console.log(err);
      
    });

    

  }

}
