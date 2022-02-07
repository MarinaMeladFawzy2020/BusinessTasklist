import { DOCUMENT, formatDate } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MessageService } from 'primeng/api';
import { ProcesslistService } from 'src/app/services/processlist.service';
import { TestService } from 'src/app/services/test.service';
import { VersionlistComponent } from '../versionlist/versionlist.component';

@Component({
  selector: 'app-processlist-view',
  templateUrl: './processlist-view.component.html',
  styleUrls: ['./processlist-view.component.css'],
})
export class ProcesslistViewComponent implements OnInit {

  @ViewChild('myDetails') myDetails!: VersionlistComponent;

  
[x:string]:any;
   //breadcrumb
   items = [
    {label: 'Processes List' , routerLink: '/processlist'}
   ];
  home = {icon: 'pi pi-home', routerLink: '/processlist'};

  PageNo:any = 1;
  Size:any = 50;
  hidenReadmore = false;
  constructor(private processList : ProcesslistService , private messageService: MessageService ,
     @Inject(DOCUMENT) private document: Document ,private productService: TestService) { }
  // showSuccess() {
  //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  // }



  ngOnInit(): void {
    this.processList.getAllProcesses(this.PageNo , this.Size).subscribe((Response: any) => {
      this.AllProcesses = Response.body;
       console.log(this.AllProcesses);
       this.TotalProcess = this.AllProcesses.length

   }); 

  }


  readmore(PageNoP: any , Size: any){
    this.PageNo = this.PageNo + 1 ; 
  //  alert(PageNoP);
    this.processList.getAllProcesses(PageNoP , Size).subscribe((Response: any) => {
      this.addprocess = Response.body;
       console.log(this.addprocess);

       if(this.addprocess.length > 0){
        for(let i = 0 ; i< this.addprocess.length ; i ++){
       //   console.log(this.addprocess[i]);
          this.AllProcesses.push(this.addprocess[i]);
          this.TotalProcess = this.AllProcesses.length

          if(this.addprocess.length < this.Size){
              this.hidenReadmore = true ;
          }
        }
        console.log(this.AllProcesses);
      } 
       else{
         this.hidenReadmore = true ;
       }

   }); 
  }

  viewVersion(ProcessId:any){
    this.document.documentElement.scrollTop = 0
    this.myDetails.sendProcessId(ProcessId);
  }


  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      //this.AllProcesses
      this.dataProcesses = document.getElementById('dt1');
      //console.log( document.getElementById('dt1'));
      // const worksheet = xlsx.utils.json_to_sheet(this.AllProcesses);
       const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ProcessesList");
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
