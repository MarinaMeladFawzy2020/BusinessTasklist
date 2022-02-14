import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { TasklistService } from 'src/app/services/tasklist.service';
import { StaffactivityassigneduserComponent } from '../staffactivityassigneduser/staffactivityassigneduser.component';
import { StaffassignandreassignComponent } from '../staffassignandreassign/staffassignandreassign.component';
import { StaffresumetaskComponent } from '../staffresumetask/staffresumetask.component';
import { StaffsuspendComponent } from '../staffsuspend/staffsuspend.component';
import { StafftaskdetailsComponent } from '../stafftaskdetails/stafftaskdetails.component';

@Component({
  selector: 'app-stafftasklist',
  templateUrl: './stafftasklist.component.html',
  styleUrls: ['./stafftasklist.component.css']
})
export class StafftasklistComponent implements OnInit {
  [x:string]:any;
  loading: boolean = true;
  @Output() getResponse = new EventEmitter;  

  @ViewChild('staffreassign') staffreassign!: StaffassignandreassignComponent;
  @ViewChild('staffactivityassigned') staffactivityassigned!: StaffactivityassigneduserComponent;
  @ViewChild('staffsuspend') staffsuspend!: StaffsuspendComponent;
  @ViewChild('staffresume') staffresume!: StaffresumetaskComponent;

  @ViewChild('stafftaskdetails') stafftaskdetails!: StafftaskdetailsComponent;

  
  
    constructor(private myTaskList: TasklistService , private messageService: MessageService  ) { }
  
    ngOnInit(): void {
      this.loading = true;
      this.StaffTaskList = [];
      this.myTaskList.getStaffTaskList().subscribe((Response: any) => {
        this.StaffTaskList = Response.body;
        this.loading = false;
        this.TotalStafList = this.StaffTaskList.length;
        this.getResponse.emit(this.TotalStafList);
        console.log(this.StaffTaskList);
        this.StaffTaskListExport = this.TaskList;

      }); 
      
      

      this.cols = [
        { field: 'work_ITEM_NAME', header: 'work Item' },
        { field: 'assign_DATE', header: 'Assign Date' },
        { field: 'Assignee', header: 'Assignee' },
        { field: 'Assign/Reassign', header: 'Assign/Reassign' },
        { field: 'Suspend/Resume', header: 'Suspend/Resume' },
        { field: 'task_Status', header: 'Status' },
        { field: 'due_DATE', header: 'Due DATE' },
        { field: 'process_NAME', header: 'Process Name' },
      ];
      this._selectedColumns =  this.cols ;

   }


   @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
  }

    
  onChangesearchStaff= (_f:any) => {
    console.log(_f);
        let newArr= this.StaffTaskList.filter((e: { work_ITEM_ID: number;  work_ITEM_NAME: any;  assign_DATE:any
          task_Status: any; version_NO: any; assigned_USER:any ; process_NAME:any ; due_DATE:any}) =>
          e.work_ITEM_ID.toString().includes( _f )|| 
          e.work_ITEM_NAME.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )||
          e.task_Status.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) || 
          e.assign_DATE.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) || 
          e.version_NO.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )|| 
          e.assigned_USER.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )|| 
          ( e.due_DATE !== null  && e.due_DATE.includes( _f) )|| 
          e.process_NAME.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) );
          console.log(newArr);
          this.StaffTaskListExport = newArr;

      if(_f == ''){
        this.StaffTaskListExport = this.StaffTaskList;
      }
      
     }
  
    
    getsearchstafflist($event: any) {  

      console.log($event);
      if($event == "loagingTable"){
        // alert("jj");
        this.loading = true;
      }else{

      this.searchtasklist = $event;  
      this.StaffTaskList = this.searchtasklist;
      console.log("searchStaffTaskList");
      console.log(this.searchtasklist);

      this.TotalTaskList = this.StaffTaskList.length;
      this.StaffTaskListExport = this.searchtasklist;
      this.getResponse.emit(this.TotalTaskList);
      this.loading = false;

      }
    
    
    } 

    staffdataRow(_f:any){
      // console.log(_f);
      this.staffreassign.getDataRow(_f);
    }

    staffActivitydataRow(_f:any){
      // console.log(_f);
      this.staffactivityassigned.getDataRow(_f);
    }

    staffsuspenddataRow(_f:any){
      this.staffsuspend.getDataRow(_f);
    }

    staffresumedataRow(_f:any){
      this.staffresume.getDataRow(_f);
    }

    getMessageResume($event: any) {
      this.searchtasklist = $event;
      // alert("searchtasklist");
   //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Done successfully'});
      console.log(this.searchtasklist);
    }
        
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      this.dataProcesses = document.getElementById('dtStaffTaskList');
     // const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
       // const worksheet = xlsx.utils.json_to_sheet(this.StaffTaskList);
       const worksheet = xlsx.utils.json_to_sheet(this.StaffTaskListExport);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "StaffTaskList");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  //npm install filesaver
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
 FileSaver.saveAs(data, fileName + '_' + formatDate(new Date() ,"dd-MMM-YYYY hh:mm" ,'en-US') + EXCEL_EXTENSION);
}


onClickSend(myTask:any){
  this.stafftaskdetails.viewVersionDetails(myTask);
}

}
