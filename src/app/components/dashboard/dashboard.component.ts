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
    //breadcrumb
    items = [
      {label: 'Home Page' , routerLink: '/dashboard'}
     ];
    home = {icon: 'pi pi-home', routerLink: '/dashboard'};

  constructor(private http: HttpClient , private primengConfig: PrimeNGConfig) { }
 
  ngOnInit(): void {

    
  }
}

