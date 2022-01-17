import { Component, OnInit } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';

@Component({
  selector: 'app-staffactivityassigneduser',
  templateUrl: './staffactivityassigneduser.component.html',
  styleUrls: ['./staffactivityassigneduser.component.css']
})
export class StaffactivityassigneduserComponent implements OnInit {
[x:string]:any;
constructor(private myTaskList: TasklistService ) { }

  ngOnInit(): void {
  }



  // Get Data From List View
  getDataRow(_dataRow :any){
    this.datastaff = _dataRow;
    console.log(this.datastaff);
    this.myTaskList.WorkItemUsersAsignee(this.datastaff.activity_INSTANCE_ID).subscribe((Response: any) => {
      this.staffActivity = Response.body;
      this.loading = false;
     console.log(this.staffActivity);
   }); 

  }
}
