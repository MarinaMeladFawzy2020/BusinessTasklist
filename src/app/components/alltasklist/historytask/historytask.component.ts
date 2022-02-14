import { Component, OnInit } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';

@Component({
  selector: 'app-historytask',
  templateUrl: './historytask.component.html',
  styleUrls: ['./historytask.component.css']
})
export class HistorytaskComponent implements OnInit {
[x:string]:any;
loading = true;

  constructor(private myTaskList: TasklistService) { }

  ngOnInit(): void {
  }


  viewVersionDetails(_dataRow:any){
    this.userhistory = [];
    this.loading = true;
     this.dataRow = _dataRow;
     this.activity_INSTANCE_ID = this.dataRow.activity_INSTANCE_ID
     console.log(_dataRow);
     this.myTaskList.ActivityHistory(this.dataRow.activity_INSTANCE_ID).subscribe((Response: any) => {
      this.userhistory = Response.body;
      this.loading = false;
     console.log(this.userhistory);
   }); 
    
   }
}
