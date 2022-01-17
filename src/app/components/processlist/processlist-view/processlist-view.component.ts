import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesslistService } from 'src/app/services/processlist.service';
import { VersionlistComponent } from '../versionlist/versionlist.component';

@Component({
  selector: 'app-processlist-view',
  templateUrl: './processlist-view.component.html',
  styleUrls: ['./processlist-view.component.css']
})
export class ProcesslistViewComponent implements OnInit {

  @ViewChild('myDetails') myDetails!: VersionlistComponent;

  
[x:string]:any;
   //breadcrumb
   items = [
    {label: 'Processes List' , routerLink: '/processlist'}
   ];
  home = {icon: 'pi pi-home', routerLink: '/processlist'};

  
  constructor(private processList : ProcesslistService) { }

  ngOnInit(): void {

    this.processList.getAllProcesses().subscribe((Response: any) => {
      this.AllProcesses = Response.body;
       console.log(this.AllProcesses);
   }); 

  }

  viewVersion(ProcessId:any){
    this.myDetails.sendProcessId(ProcessId);
  }
}
