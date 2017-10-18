import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  page = 1;
  token: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    // Request products
    this.token = localStorage.getItem('token');
    this.api.getData(`/categories?page=${this.page}`, true, this.token)
    .then(data => {
      if (data[0]) {
        this.categories = data;
      } else {
        this.page = 1;
        this.getCategories();
      }
    });
  }

  nextPage() {
    this.page++;
    this.getCategories();
  }

}
