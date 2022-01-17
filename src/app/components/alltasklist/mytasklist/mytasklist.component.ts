import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';

@Component({
  selector: 'app-mytasklist',
  templateUrl: './mytasklist.component.html',
  styleUrls: ['./mytasklist.component.css']
})
export class MytasklistComponent implements OnInit { 
[x:string]:any;
loading: boolean = true;
@Output() getResponse = new EventEmitter;  


  constructor(private myTaskList: TasklistService ) { }

  ngOnInit(): void {
    this.myTaskList.getMyTaskList().subscribe((Response: any) => {
      this.TaskList = Response.body;
      this.TotalTaskList = this.TaskList.length;
      this.getResponse.emit(this.TotalTaskList);
      this.loading = false;
     console.log(this.TaskList);
   }); 
  }

  
  getsearchtasklist($event: any) {  
    this.searchtasklist = $event;  
    this.TaskList = this.searchtasklist;
    console.log("searchtasklist");
    console.log(this.searchtasklist);
    
  } 


}
