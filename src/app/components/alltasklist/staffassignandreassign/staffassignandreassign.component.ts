import { Component, OnInit } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';
declare var bootbox :any ;

@Component({
  selector: 'app-staffassignandreassign',
  templateUrl: './staffassignandreassign.component.html',
  styleUrls: ['./staffassignandreassign.component.css']
})
export class StaffassignandreassignComponent implements OnInit {
[x:string]:any;
ACT_INST_ID:any = "-1";
MANAGER:any =  "-1" ; 
currentBU:any = "-1";
currentUser:any = "-1" ; 

// selectedcustomers=[
//   {"activity_INSTANCE_ID": 258112665,"assign_DATE": "04/07/2021","user_NAME": "AhmedAmin"}
// ]

FilterUserList: any[] = [
  {name: 'All', value: 'ALL'}, 
  {name: 'Activity Performers', value: 'Activity'},
  {name: 'Managed Users', value: 'Managed'}, 
  {name: 'Inhertied Organizations Users', value: 'Organizations'},
  {name: 'Inhertied Application Roles Users', value: 'Roles'}
];

  selectRow(AddMem:any){
  //  console.log(AddMem);
    console.log(this.selectedcustomers);
  }
  
  constructor(private myTaskList: TasklistService) {}

  ngOnInit(): void {

    this.selectedFilterUserList = this.FilterUserList[0];
   // console.log(this.selectedFilterUserList);
  }

    
  // Get Data From List View
  getDataRow(_dataRow :any){
    this.datastaff = _dataRow;
    console.log(this.datastaff);
   
       this.objAssign = {
    "ACT_INST_ID" : this.ACT_INST_ID  ,
    "MANAGER" : this.MANAGER  ,
    "currentBU" : this.currentBU  ,
    "currentUser" : this.currentUser  
  }
  this.onChangeFilter('ALL');
  // this.getUsersToAsignee(this.objAssign);
    this.getstaffActivity();

  }
  onChangeFilter(p:any){
    this.typeFilter = p;
    console.log(this.typeFilter);
    console.log(this.datastaff.show_TASK_PERFORMERS);
    console.log(this.datastaff.activity_INSTANCE_ID );
    console.log(this.datastaff.show_MANAGED );
    console.log(sessionStorage.getItem("BusinessUnit") );
    console.log(this.datastaff.show_INHERTIED_ROLE );
    console.log(sessionStorage.getItem("username"));
    //--------------------- All -------------
    if(this.typeFilter == 'ALL'){
      if(this.datastaff.show_TASK_PERFORMERS == 1 ){
        this.ACT_INST_ID = this.datastaff.activity_INSTANCE_ID ; 
      }
      
      if(this.datastaff.show_MANAGED == 1 && sessionStorage.getItem("BusinessUnit") !== ""){
        this.MANAGER = sessionStorage.getItem("username") ; 
      }

      if(this.datastaff.show_INHERITED_ORG == 1 && sessionStorage.getItem("BusinessUnit") !== ""){
        this.currentBU = sessionStorage.getItem("BusinessUnit") ; 
      }

      if(this.datastaff.show_INHERTIED_ROLE == 1 ){
       // alert(this.datastaff.show_INHERTIED_ROLE);
        this.currentUser = sessionStorage.getItem("username") ; 
      }

  
    }
    //--------------------- Activity -------------
    
    if(this.typeFilter == 'Activity' && this.datastaff.show_TASK_PERFORMERS == 1 ){
      this.ACT_INST_ID = this.datastaff.activity_INSTANCE_ID ;
      this.MANAGER = "-1";
      this.currentBU = "-1";
      this.currentUser = "-1"
    }

    //--------------------- Managed -------------

    if(this.typeFilter == 'Managed' && this.datastaff.show_MANAGED == 1 && sessionStorage.getItem("BusinessUnit") !== ""){
      this.ACT_INST_ID = "-1";
      this.MANAGER =  sessionStorage.getItem("username") ; 
      this.currentBU = "-1";
      this.currentUser = "-1"

    }

   //--------------------- Organizations -------------

    if(this.typeFilter == 'Organizations' && this.datastaff.show_INHERITED_ORG == 1 && sessionStorage.getItem("BusinessUnit") !== ""){
      this.ACT_INST_ID = "-1";
      this.MANAGER =  "-1" ; 
      this.currentBU = sessionStorage.getItem("BusinessUnit");
      this.currentUser = "-1"
    }

    //--------------------- Roles -------------

    if(this.typeFilter == 'Roles' && this.datastaff.show_INHERTIED_ROLE == 1 ){
      this.ACT_INST_ID = "-1";
      this.MANAGER =  "-1" ; 
      this.currentBU = "-1";
      this.currentUser = sessionStorage.getItem("username") ; 
    }

    this.objAssign = {
      "ACT_INST_ID" : this.ACT_INST_ID  ,
      "MANAGER" : this.MANAGER  ,
      "currentBU" : this.currentBU  ,
      "currentUser" : this.currentUser  
    }
    this.getUsersToAsignee(this.objAssign);

  }
  

  getUsersToAsignee(f:any){
  this.myTaskList.UsersToAsignee(f).subscribe((Response: any) => {
    this.UsersToAsignee = Response.body;
    this.loading = false;
   console.log(this.UsersToAsignee);
 }); 
}



getstaffActivity(){
  this.myTaskList.WorkItemUsersAsignee(this.datastaff.activity_INSTANCE_ID).subscribe((Response: any) => {
    this.selectedcustomers = Response.body;
   console.log(this.selectedcustomers);
 }); 
}

submitassign(){
  console.log(this.selectedcustomers);
  this.myTaskList.AssignWorkItem(this.selectedcustomers , this.datastaff ).subscribe((Response: any) => {
   console.log( Response.body);
   if(Response.code == 1 ){
    bootbox.alert({
      title: "<span style='font-weight: 400; font-size: 16px;'>"+"  Success"+"</span>  </i>",
      message: "<span style='font-weight: 400; font-size: 16px;'>"+"  Success "+"</span>  </i>",
      callback: function(){ 
        window.location.reload();
      }
  });
  }

   
 }); 

  

}


 reset(_f:any){
   this.getstaffActivity();
   this.selectedFilterUserList = this.FilterUserList[0];
   }


}
