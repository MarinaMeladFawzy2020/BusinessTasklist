import { Component, OnInit, ViewChild } from '@angular/core';
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

}
