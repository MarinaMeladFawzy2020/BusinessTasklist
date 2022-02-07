import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { TasklistService } from 'src/app/services/tasklist.service';
import { StaffactivityassigneduserComponent } from '../staffactivityassigneduser/staffactivityassigneduser.component';
import { StaffassignandreassignComponent } from '../staffassignandreassign/staffassignandreassign.component';
import { StaffresumetaskComponent } from '../staffresumetask/staffresumetask.component';
import { StaffsuspendComponent } from '../staffsuspend/staffsuspend.component';

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

  
  
    constructor(private myTaskList: TasklistService , private messageService: MessageService  ) { }
  
    ngOnInit(): void {
      this.myTaskList.getStaffTaskList().subscribe((Response: any) => {
        this.StaffTaskList = Response.body;
        this.loading = false;
        this.TotalStafList = this.StaffTaskList.length;
        this.getResponse.emit(this.TotalStafList);
        console.log(this.StaffTaskList);
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

    
  
  
    
    getsearchstafflist($event: any) {  
      this.searchtasklist = $event;  
      this.StaffTaskList = this.searchtasklist;
      console.log("searchStaffTaskList");
      console.log(this.searchtasklist);
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
      const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
       // const worksheet = xlsx.utils.json_to_sheet(this.StaffTaskList);
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

}
