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

  constructor(private myinstancelist : InstaceslistService   , private router: Router) { 
  }

    
  ngOnInit(): void {

    

}

getDataRow(_f:any){
  console.log(_f)
  
 
  this.myinstancelist.getActivityWorkItems(_f.activity_INSTANCE_ID).subscribe((Response: any) => {
    this.ActivityWorkItems = Response.body;
    console.log(this.ActivityWorkItems);
    if( this.ActivityWorkItems.length < 1){
      this.WorkItemslength = true;
    }else{
      this.WorkItemslength = false;

    }

});
}

closedata(){
  this.ActivityWorkItems = [];
}
}
