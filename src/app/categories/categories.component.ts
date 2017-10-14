import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
  
})
export class CategoriesComponent implements OnInit {
  public data: any;
  public categories: any;

  constructor(private api: ApiService) { 
    
  }

  ngOnInit() {
    this.get_categories();
    
  }

  get_categories() {
    this.api.getData('categorias', true).then(res => {
      this.data = res;
      this.categories = this.data.map( x => [x.context, x.area, x.group] );
      
      console.log(this.data);
    }, (err) => {
      console.log(err);
      
    });

  }

}