import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';

declare var bootbox:any;
@Component({
  selector: 'app-searchtasklist',
  templateUrl: './searchtasklist.component.html',
  styleUrls: ['./searchtasklist.component.css']
})
export class SearchtasklistComponent implements OnInit {
[x:string]:any;
@Input() userTask! :any ;
@Output() getResponse = new EventEmitter;  

selectedItems: any ;
selectedmoreComponents:any;

selectedTaskStatus: any = 'Started';
    
TaskStatus: any[] =  ['Started' ,'Under Processing' , 'Finished' ,'Closed' , 'Terminated' , 'Time Out' , 'Suspended' ]

  constructor(private myTaskList: TasklistService ) {}

  ngOnInit(): void {
    this.moreComponents = [
      {name: 'WorkItemId' , code:'1'},
      {name: 'ProcessName', code:'2'},
      {name: 'DueDate' , code:'3'},
      {name: 'DueDays', code:'4'},
      {name: 'ActivityInstanceId', code:'5'},
      {name: 'TaskStatus', code:'6'},
      {name: 'ProcessInstanceId', code:'7'},
      {name: 'WorkItemName', code:'8'},
      {name: 'ParentProcessInstId', code:'9'},
      {name: 'ProcessId', code:'10'},
      {name: 'AssignDate', code:'11'}
  ];

  this.selectedmoreComponents =[
    {name: 'WorkItemId' , code:'1'},
    {name: 'ProcessId' , code:'10'},
    {name: 'ProcessName', code:'2'},
    {name: 'DueDate' , code:'3'},
    {name: 'AssignDate', code: '11'},
    {name: 'TaskStatus', code:'6'},


]


  //   this.selectedItems =[
  //     {name: 'item 1', code: 'item1'},
  //     {name: 'item 2', code: 'item 2'}
  // ]

    this.items = [
      {name: 'item 1', code: 'item1'},
      {name: 'item 2', code: 'item 2'},
      {name: 'item 3', code: 'item 3'}
  ];


  }



  searchtask(_f:any){
    console.log("search");
    console.log(this.userTask);
    console.log(_f);

     if(_f.due_DATE == null){
      _f.due_DATE == "";
    }else{
      _f.due_DATE = formatDate(_f.due_DATE , 'dd/MM/yyyy' , 'en');
    }

    if(_f.assign_DATE == null){
      _f.assign_DATE == "";
    }else{
      _f.assign_DATE = formatDate(_f.assign_DATE , 'dd/MM/yyyy' , 'en');
    }

    // _f.work_ITEM_STATUS = _f.work_ITEM_STATUS.name
    console.log(_f);
    this.Datasearch(_f);

  }


  reset(_f:any){
    _f.resetForm({
      "work_ITEM_STATUS": 'Started'
    });
    console.log(_f.value);
    this.Datasearch(_f.value);

   }


   Datasearch(_f:any){
    this.myTaskList.SearchTaskList(_f , this.userTask).subscribe((Response: any) => {
      this.SearchTaskList = Response.body;
      console.log(this.SearchTaskList);
      console.log(this.SearchTaskList.length);
      this.getResponse.emit(this.SearchTaskList);

      // if(this.SearchTaskList.length == 0){
      //   bootbox.alert("No Data Found");
      // }
      

    }); 
   }
}




  // reset(_f:any){
  //   _f.resetForm({
  //     "LAST_MODIFIED_BY": sessionStorage.getItem("username") ,
  //     "PARENT_ROLE_ID": this.PARENT_ROLE_ID
  //   }); 
  //  }