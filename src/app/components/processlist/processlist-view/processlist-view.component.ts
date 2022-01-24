import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProcesslistService } from 'src/app/services/processlist.service';
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
  constructor(private processList : ProcesslistService , private messageService: MessageService , @Inject(DOCUMENT) private document: Document) { }
  // showSuccess() {
  //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Message Content'});
  // }

  ngOnInit(): void {
    this.processList.getAllProcesses(this.PageNo , this.Size).subscribe((Response: any) => {
      this.AllProcesses = Response.body;
       console.log(this.AllProcesses);
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
}
