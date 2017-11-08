import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  transactions: any = [];
  page = 1;
  token: any;

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.token = localStorage.getItem('token');
    this.api.getData(`/history?page=${this.page}`, true, this.token)
    .then(data => {
      if (data[0]) {
        this.transactions = data;
      } else {
        this.page--;
      }
    });
  }

  nextPage() {
    this.page++;
    this.getHistory();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getHistory();
    }
  }

}
