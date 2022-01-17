import { Component, OnInit, ViewChild } from '@angular/core';
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


  constructor(private processList : ProcesslistService) { }

  ngOnInit(): void {
  }

  sendProcessId(ProcessId:any){
    this.processList.getAllProcessVersions(ProcessId).subscribe((Response: any) => {
      this.AllProcessVersions = Response.body;
       console.log(this.AllProcessVersions);
   }); 

  }

  onClickSend(Process:any){
   // alert(Process);
    this.myDetailsVersion.viewVersionDetails(Process);

  }

}
