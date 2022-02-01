import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as FileSaver from 'file-saver';
import { TasklistService } from 'src/app/services/tasklist.service';




@Component({
  selector: 'app-mytasklist',
  templateUrl: './mytasklist.component.html',
  styleUrls: ['./mytasklist.component.css']
})
export class MytasklistComponent implements OnInit {
  [x: string]: any;
  loading: boolean = true;
  @Output() getResponse = new EventEmitter;


  constructor(private myTaskList: TasklistService) { }

  ngOnInit(): void {
    this.myTaskList.getMyTaskList().subscribe((Response: any) => {
      this.TaskList = Response.body;
      this.TotalTaskList = this.TaskList.length;
      this.getResponse.emit(this.TotalTaskList);
      this.loading = false;
      console.log(this.TaskList);
    });

    //  this.exportColumns = this.cols.map((col: { header: any; field: any; }) => ({
    //   title: col.header,
    //   dataKey: col.field
    // }));


    this.cols = [
      { field: 'work_ITEM_NAME', header: 'work_ITEM_NAME' },
      { field: 'task_Status', header: 'task_Status' },
      { field: 'history', header: 'history' },
      { field: 'due_DATE', header: 'due_DATE' },
      { field: 'end_DATE', header: 'end_DATE' },
      { field: 'process_NAME', header: 'process_NAME' },
      
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


  getsearchtasklist($event: any) {
    this.searchtasklist = $event;
    this.TaskList = this.searchtasklist;
    console.log("searchtasklist");
    console.log(this.searchtasklist);

  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      const worksheet = xlsx.utils.json_to_sheet(this.TaskList);
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




}
