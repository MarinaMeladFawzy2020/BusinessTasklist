import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})

export class TasklistService {
  [x:string]:any;
 // URL : string = "https://192.168.0.9:8083/"; 

  constructor(private http: HttpClient, private authService: AuthService ,  private urlAdd: EnvironmentUrlService) {
    this.LoginMode = sessionStorage.getItem("LoginMode") ; 
    console.log(this.LoginMode);
    // this.nameuser = sessionStorage.getItem("LoginMode");   
    this.nameuser = this.checkPermission() ; 
    this.URL = this.urlAdd.urlAddress ;


  }

   getMyTaskList():Observable<any> {
    this.obj = {
      "LoginMode":sessionStorage.getItem("LoginMode") ,
      "UserName":this.nameuser ,
     }
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/MyTaskList' , this.obj);
   }

   getStaffTaskList():Observable<any> {
    this.obj = {
      "LoginMode":sessionStorage.getItem("LoginMode") ,
      "UserName":this.nameuser ,
     }
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/StaffTaskList' , this.obj);
   }

   SearchTaskList(obj:any , StaffTask:any):Observable<any> {
    //  console.log(obj);
   this.objSeach = {
      "LoginMode": sessionStorage.getItem("LoginMode"),
      "StaffTask": StaffTask,
      "UserName": this.nameuser,
      "exc_WORK_ITEM": obj 
    }
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/SearchTaskList' , this.objSeach);
   }

   WorkItemUsersAsignee(activity_INSTANCE_ID:any):Observable<any> {
    return this.http.get<any>(this.URL+'BusinessApp/api/Process/WorkItemUsersAsignee?ACT_INST_ID='+activity_INSTANCE_ID);
   }

   UsersToAsignee(f:any):Observable<any> {
     console.log(f);
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/UsersToAsignee' , f);
   }

   AssignWorkItem(f:any , datastaff:any ):Observable<any> {  
   this.obj =  {
    "LoginMode": sessionStorage.getItem("LoginMode"),
    "currentUser": this.nameuser,
    "P_Activity_INST_ID": datastaff.activity_INSTANCE_ID ,
    "P_PROC_INST_ID": datastaff.process_INSTANCE_ID,
    "P_WORK_ITEM_ID": datastaff.work_ITEM_ID ,
    "assignedUser": f
  }
  
  console.log(this.obj );
   return this.http.post<any>(this.URL+'BusinessApp/api/Process/AssignWorkItem' , this.obj);
  }

  SuspendTask(f:any):Observable<any> {  
    if(f.Filter.value == 0){
      this.resumeDate = "";
    }
    if(f.Filter.value == 1){
      this.resumeDate = formatDate(f.ResumeDate , 'dd/MM/YYYY HH:MM' ,'en');
    }
    this.obj =    {
      "P_PROC_INST_ID": f.P_PROC_INST_ID,
      "UserName":  this.nameuser,
      "resumeDate": this.resumeDate ,
      "typeFlag": f.Filter.value
    }
    console.log(this.obj);
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/SuspendTask' , this.obj);
   }


   ResumeTask(f:any):Observable<any> {  
    if(f.Filter.value == 0){
      this.resumeDate = "";
    }
    if(f.Filter.value == 1){
      this.resumeDate = formatDate(f.ResumeDate , 'dd/MM/YYYY HH:MM' ,'en');
    }
    this.obj =    {
      "P_PROC_INST_ID": f.P_PROC_INST_ID,
      "UserName":  this.nameuser,
      "resumeDate": this.resumeDate ,
      "typeFlag": f.Filter.value
    }
    console.log(this.obj);
    return this.http.post<any>(this.URL+'BusinessApp/api/Process/ResumeTask' , this.obj);
   }


   checkPermission(){
    const s = this.authService.checkAuth("ExcProcessDefinition.createAll");
    // debugger;
    console.log("per");
    console.log(s);
    if(s == true){
      return "VIEWALL" ;
    }else{
      return sessionStorage.getItem("username");
    }
  }

   
}
