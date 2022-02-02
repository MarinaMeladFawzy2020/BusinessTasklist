import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
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

  
  
    constructor(private myTaskList: TasklistService ) { }
  
    ngOnInit(): void {
      this.myTaskList.getStaffTaskList().subscribe((Response: any) => {
        this.StaffTaskList = Response.body;
        this.loading = false;
        this.TotalStafList = this.StaffTaskList.length;
        this.getResponse.emit(this.TotalStafList);
        console.log(this.StaffTaskList);
      }); 
      
      
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
        
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
        const worksheet = xlsx.utils.json_to_sheet(this.StaffTaskList);
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
