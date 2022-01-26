import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class InstaceslistService {
[x:string]:any;

constructor(private http: HttpClient, private authService: AuthService , private urlAdd: EnvironmentUrlService)  {
  this.LoginMode = sessionStorage.getItem("LoginMode") ;
 // this.nameuser  = this.authService.checkPermission("ExcProcessDefinition.createAll")
  this.nameuser  = "root";
  this.URL = this.urlAdd.urlAddress ;

}

 getProcessTracking():Observable<any> {
  this.obj = {
    "LoginMode":sessionStorage.getItem("LoginMode") ,
    "UserName":this.nameuser 
   }
  return this.http.post<any>(this.URL+'BusinessApp/api/Process/ProcessTracking', this.obj);
 }

 
 getProcessInstance(_processID:any , PageNo:any , Size:any):Observable<any> {
  this.obj = {
    "LoginMode":sessionStorage.getItem("LoginMode") ,
    "UserName":this.nameuser ,
    "ProcessId": _processID,
   }
   console.log( this.obj );
  return this.http.post<any>(this.URL+'BusinessApp/api/Process/ProcessInstance?PageNo='+PageNo+'&Size='+Size , this.obj ); //1448
 }

 
 getHireachyInstance(PROCESSINSTANCEID:any ):Observable<any> {
  return this.http.get<any>(this.URL+'BusinessApp/api/Process/HireachyInstance?PROCESS_INSTANCE_ID='+PROCESSINSTANCEID); //258130756
 }

 getActivityInstForTracking(PROCESSINSTANCEID:any ):Observable<any> {
  return this.http.get<any>(this.URL+'BusinessApp/api/Process/ActivityInstForTracking?PROCESS_INSTANCE_ID='+PROCESSINSTANCEID); //258130756
 }

 getActivityWorkItems(ACTINSTID:any ):Observable<any> {
  return this.http.get<any>(this.URL+'BusinessApp/api/Process/ActivityWorkItems?ACT_INST_ID='+ACTINSTID); //258117550
 }


 TerminateTask(f:any):Observable<any> {  
  this.obj =    {
    "P_PROC_INST_ID": f,
    "UserName":  "",
    "resumeDate": "" ,
    "typeFlag": ""
  }
  console.log(this.obj);
  return this.http.post<any>(this.URL+'BusinessApp/api/Process/TerminateTask' , this.obj);
 }

}