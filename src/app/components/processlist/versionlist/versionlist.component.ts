import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { AuthService } from 'src/app/services/auth.service';
import { ProcesslistService } from 'src/app/services/processlist.service';
import { CreateinstanceComponent } from '../createinstance/createinstance.component';

@Component({
  selector: 'app-versionlist',
  templateUrl: './versionlist.component.html',
  styleUrls: ['./versionlist.component.css']
})
export class VersionlistComponent implements OnInit {
[x:string]:any;

@ViewChild('myDetailsVersion') myDetailsVersion!: CreateinstanceComponent;

  constructor(private processList : ProcesslistService , private checkpremission:AuthService) { }

  ngOnInit(): void {
    // alert(this.checkpremission.checkAuth("AllProcesses.create"));
   this.AllProcessescreate = this.checkpremission.checkAuth("AllProcesses.create");

  }

  sendProcessId(ProcessId:any){
    this.loading = true;
    this.processList.getAllProcessVersions(ProcessId).subscribe((Response: any) => {
      this.AllProcessVersions = Response.body;
      this.loading = false;
       console.log(this.AllProcessVersions);
   }); 

  }

  onClickSend(Process:any){
   // alert(Process);
    this.myDetailsVersion.viewVersionDetails(Process);

  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      const worksheet = xlsx.utils.json_to_sheet(this.AllProcessVersions);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ProcessVersionList");
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
