import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesslistService {
  [x:string]:any;

//  public urlAddress: string = environment.urlAddress;
//  URL : string = "https://192.168.0.9:8083/"; 

  //  if username = 'root' then pass in prameter username ='INTI_ALL'
  // else 
  // passusername and 
  //    loginmode if production pass in loginmode null value
  //    loginmode if testingpass in loginmode 'UNDER_TESTING'
  

  constructor(private http: HttpClient , private authService : AuthService , private urlAdd: EnvironmentUrlService) {
    this.LoginMode = sessionStorage.getItem("LoginMode") ;
    this.nameuser  = this.checkPermission();
    this.URL = this.urlAdd.urlAddress ;
  }
  
   getAllProcesses(PageNo:any , Size:any):Observable<any> {
     if(this.LoginMode == 1){
      this.LoginModenew = "UNDER_TESTING"
     }else{
      this.LoginModenew = " "
     }
    this.obj = {
      "LoginMode":this.LoginModenew ,
      "UserName":this.nameuser 
     }
     console.log(this.obj);
     return this.http.post<any>(this.URL+'BusinessApp/api/Process/getAllProcesses?PageNo='+PageNo+'&Size='+Size , this.obj);
    }

    getAllProcessVersions(ProcessId:any):Observable<any> {
      this.obj = {
        "LoginMode":this.LoginMode ,
        "UserName":this.nameuser ,
        "ProcessId":ProcessId
       }
      return this.http.post<any>(this.URL+'BusinessApp/api/Process/getAllProcessVersions' , this.obj);
     }
    

     
    checkPermission(){
      const s = this.authService.checkAuth("ExcProcessDefinition.createAll");
      // debugger;
      console.log("per");
      console.log(s);
      if(s == true){
        return "INTI_ALL" ;
      }else{
        return sessionStorage.getItem("username");
      }
    }
   

}
