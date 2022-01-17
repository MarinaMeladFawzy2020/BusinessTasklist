import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Testdata } from 'src/app/interfaces/testdata';
import {Observable} from 'rxjs';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x:string]:any;
  columns!: any[];
  
  // users!: User;
  cols: any[] = [];
  first: any = 0;
  rows : any = 2;
  last:any = 2;
  totalRecords!: any;

  constructor(private http: HttpClient , private primengConfig: PrimeNGConfig) { }
 
  ngOnInit(): void {

    

  //   this.users = [
  //     { id: '2', name: 'tom',email:'tom@gmail.com' },
  //     { id: '3', name: 'john',email:'john@gmail.com' },
  //     { id: '1', name: 'kiran',email:'kiran@gmail.com' },
  //     { id: '4', name: 'Frank',email:'frank@gmail.com' },

  // ];
    this.cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'Name' },
        { field: 'email', header: 'Email' },
    ];


 
  this.loading = true;
  this.primengConfig.ripple = true;
  

  this.http.get('assets/data.json').subscribe((Response) => {
 //   console.log(Response);
    this.users = Response;
    this.datasource = Response;
    this.totalRecords = this.users.length;

    });
        this.loading = true;
        this.primengConfig.ripple = true;
  }

  loadCustomers(event: LazyLoadEvent) {  
  //  console.log(event);
    this.first = event.first
    this.loading = true;

    //imitate db connection over a network
    setTimeout(() => {
        if (this.datasource) {
           this.users = this.datasource.slice(event.first, (this.first + event.rows));
            this.loading = false;
        }
    }, 1000);
}

  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
}

}


export interface User {
  id: any;
  name: any;
  email: any;
}