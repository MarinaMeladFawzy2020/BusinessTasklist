import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  [x:string]:any;

  constructor(private http: HttpClient , private authService : AuthService , private urlAdd: EnvironmentUrlService) {
    this.LoginMode = sessionStorage.getItem("LoginMode") ;
    this.nameuser  = sessionStorage.getItem("username");
    this.LoginMode = sessionStorage.getItem("LoginMode") ,

    this.URL = this.urlAdd.urlAddress ;
  }

  getsumOfTasks():Observable<any> {
    return this.http.get<any>(this.URL+'BusinessApp/api/Process/sumOfTasks?ASSIGNED_USER='+sessionStorage.getItem("username")+'&LoginMode='+sessionStorage.getItem("LoginMode"));
   }

   getprocessesCount():Observable<any> {
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/processesCount?userName='+sessionStorage.getItem("username")+'&loginMode='+sessionStorage.getItem("LoginMode") , {});
   }




}
