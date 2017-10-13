import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
  
})
export class CategoriesComponent implements OnInit {
  public data:any;

  constructor(private api: ApiService) { 
    
  }

  ngOnInit() {
    this.get_categories();
    
  }

  get_categories() {
    this.api.getData('categorias').then(res => {
      this.data = res;
      console.log(this.data);
    }, (err) => {
      console.log(err);
      
    });

  }

}
