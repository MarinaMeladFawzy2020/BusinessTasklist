import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InstaceslistService } from 'src/app/services/instaceslist.service';

@Component({
  selector: 'app-instanceviewhierarchy',
  templateUrl: './instanceviewhierarchy.component.html',
  styleUrls: ['./instanceviewhierarchy.component.css']
})
export class InstanceviewhierarchyComponent implements OnInit {
[x:string]:any;
loading: boolean = true;
  constructor(private myinstancelist : InstaceslistService   , private router: Router , private sanitizer: DomSanitizer) { 
  }


  ngOnInit(): void {

}

getDataRow(_f:any){
  console.log(_f)
 this.checktype = _f.activity_TYPE;

// ServiceTask  call Api
// TaskApplication call Api

// UserTask 
  if(_f.activity_TYPE == "ServiceTask" || _f.activity_TYPE == "TaskApplication"  ){
  //getActivityAttributes
  this.myinstancelist.getTaskAttributes(_f.activity_INSTANCE_ID).subscribe((Response: any) => {
    this.ActivityAttributes = Response.body;
    this.loading = false;
    console.log(this.ActivityAttributes);
    if( this.ActivityAttributes.length < 1){
      this.WorkItemslength = true;
    }else{
      this.WorkItemslength = false;
    }

});

}

if(_f.activity_TYPE == "UserTask"){

  this.checkURLiFrame = true;
 // http://192.168.0.89:8080/EUBusiness/ExcWorkItem?activity_instance_id=1725477
  this.URLInstance = "/EUBusiness/ExcWorkItem?activity_instance_id="+_f.activity_INSTANCE_ID;
  this.urLNoSpace = this.URLInstance.replace(' ', '%20') ;
  console.log(this.urLNoSpace);
  this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urLNoSpace);
  console.log(this.trustedUrl);


 

}




}

closedata(){
  this.ActivityAttributes = [];
  this.checkURLiFrame = false;

}
}
