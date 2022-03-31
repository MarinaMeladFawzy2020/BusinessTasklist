import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  [x:string]:any;

  constructor(private http: HttpClient , private authService : AuthService , private urlAdd: EnvironmentUrlService) {
    this.LoginMode = sessionStorage.getItem("LoginMode") ;
    this.nameuser  = sessionStorage.getItem("username");
    this.LoginMode = sessionStorage.getItem("LoginMode") ,

    this.URL = this.urlAdd.urlAddress ;
  }


    
  getAllReports(_Module_Id:any):Observable<any> {
  return this.http.get<any>(this.URL+'BusinessApp/api/Reports/ModuleReports?Module_Id='+_Module_Id);
 }

  getReports(_ReportId:any ):Observable<any> {
      //  console.log(this.URL+'BusinessApp/api/Reports/getReports?ReportId='+_ReportId);
    return this.http.get<any>(this.URL+'BusinessApp/api/Reports/getReports?ReportId='+_ReportId);
   }

   getLookups(_LookupId:any):Observable<any> {
    return this.http.get<any>(this.URL+'PD/api/Lookups/Objects?Lookup_Id='+_LookupId);
   }

   searchInstance(_dataSearch:any , _ReportURL:any , _ReportId:any):Observable<any> {
     console.log(this.URL+_ReportURL+"?reportID="+_ReportId);
    return this.http.post<any>(this.URL+_ReportURL+"?reportID="+_ReportId , _dataSearch);
   }

}

