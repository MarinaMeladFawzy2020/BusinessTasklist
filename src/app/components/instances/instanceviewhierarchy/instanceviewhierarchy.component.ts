import { Component, OnInit } from '@angular/core';
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
  constructor(private myinstancelist : InstaceslistService   , private router: Router) { 
  }

    
  ngOnInit(): void {

    

}

getDataRow(_f:any){
  console.log(_f)
 this.checktype = _f.activity_TYPE;
  if(_f.activity_TYPE == "UserTask"){

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

}

closedata(){
  this.ActivityAttributes = [];
}
}
