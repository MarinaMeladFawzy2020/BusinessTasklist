import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { TasklistService } from 'src/app/services/tasklist.service';
import { HistorytaskComponent } from '../historytask/historytask.component';
import { UsertaskdetailsComponent } from '../usertaskdetails/usertaskdetails.component';




@Component({
  selector: 'app-mytasklist',
  templateUrl: './mytasklist.component.html',
  styleUrls: ['./mytasklist.component.css']
})
export class MytasklistComponent implements OnInit {
  [x: string]: any;
  loading: boolean = true;
  @Output() getResponse = new EventEmitter;
 
  @ViewChild('usertaskdetails') usertaskdetails!: UsertaskdetailsComponent;
  @ViewChild('historytask') historytask!: HistorytaskComponent;
  
  constructor(private myTaskList: TasklistService) { }

  ngOnInit(): void {
    this.loading = true;
    this.TaskList = [];
    this.myTaskList.getMyTaskList().subscribe((Response: any) => {
      this.TaskList = Response.body;
      this.TotalTaskList = this.TaskList.length;
      this.getResponse.emit(this.TotalTaskList);
      this.loading = false;
      console.log(this.TaskList);
      this.TaskListExport = this.TaskList;
    });

    //  this.exportColumns = this.cols.map((col: { header: any; field: any; }) => ({
    //   title: col.header,
    //   dataKey: col.field
    // }));


    this.cols = [
      { field: 'work_ITEM_NAME', header: 'work Item Name' },
      { field: 'task_Status', header: 'Status' },
      { field: 'history', header: 'History' },
      { field: 'due_DATE', header: 'Due Date' },
      { field: 'end_DATE', header: 'End Date' },
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


  onChangesearch= (_f:any) => {
    // alert(_f);
    //data.filter(x => x.title.toLowerCase().includes(term.toLowerCase()))
    //e.work_ITEM_NAME.toLocaleLowerCase()== _f.toLocaleLowerCase() 
    console.log(_f);
        let newArr= this.TaskList.filter((e: {  work_ITEM_NAME: any;  assign_DATE:any
          task_Status: any; version_NO: any; assigned_USER:any ; process_NAME:any , due_DATE:any , end_DATE:any }) =>
          e.work_ITEM_NAME.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )||
          e.task_Status.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) || 
          e.assign_DATE.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) || 
          e.version_NO.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )|| 
          e.assigned_USER.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )|| 
          ( e.due_DATE !== null  && e.due_DATE.includes( _f) )|| 
          ( e.end_DATE !== null  && e.end_DATE.includes( _f) )|| 
          e.process_NAME.toLocaleLowerCase().includes( _f.toLocaleLowerCase()) 
          );
          console.log(newArr);
          this.TaskListExport = newArr;

      if(_f == ''){
        this.TaskListExport = this.TaskList;
      }
      
     }


  getsearchtasklist($event: any) {
    // this.loading = true;
    console.log($event);
    if($event == "loagingTable"){
      // alert("jj");
      this.loading = true;
    }else{

  
    this.searchtasklist = $event;
    this.TaskList = this.searchtasklist;
    console.log("searchtasklist");
    console.log(this.searchtasklist);
    this.TotalTaskList = this.TaskList.length;
    console.log(this.TotalTaskList);
 
    this.TaskListExport = this.searchtasklist;
    this.getResponse.emit(this.TotalTaskList);
    this.loading = false;
  }

  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      this.dataProcesses = document.getElementById('dtmytasklist');
      //console.log(document.getElementById('dtmytasklist'));
    //  const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
     const worksheet = xlsx.utils.json_to_sheet(this.TaskListExport);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "UserTaskList");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    //npm install filesaver
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + formatDate(new Date(), "dd-MMM-YYYY hh:mm", 'en-US') + EXCEL_EXTENSION);
  }



  onClickSend(myTask:any){
     this.usertaskdetails.viewVersionDetails(myTask);
   }

   onClickSendhistory(myTask:any){
    this.historytask.viewVersionDetails(myTask);
  }
   
   

}
