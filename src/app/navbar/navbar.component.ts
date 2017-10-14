import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  pagesStatus: any;


  

  constructor() { }

  ngOnInit() {
    //console.log(this.pagesStatus, "este es el status que llega");
  }

}
