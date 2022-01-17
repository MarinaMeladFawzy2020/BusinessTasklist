import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-createinstance',
  templateUrl: './createinstance.component.html',
  styleUrls: ['./createinstance.component.css']
})
export class CreateinstanceComponent implements OnInit {
  [x:string]:any;
  checkURLiFrame:boolean = false;
  @Input() proVersion!: any;

  constructor(private sanitizer: DomSanitizer) { }

 

  ngOnInit(): void {
  //  this.checkURLiFrame = false;
    if(sessionStorage.getItem("username") == "root"){
      this.nameuser = "INTI_ALL";
    }else{
      this.nameuser = sessionStorage.getItem("username");
    }
  }

  viewVersionDetails(Process:any){
   this.checkURLiFrame = true;
    this.dataP = Process;
    console.log(Process);

    this.URLInstance = "http://192.168.0.32:8003/BPM_INTEGRATION_API/processworkflow?INST_ProcessId="+this.dataP.ProcessId+"&INST_VersionNo="+this.dataP.VersionNo+"&USER="+this.nameuser;
    this.urLNoSpace = this.URLInstance.replace(' ', '%20') ;
    console.log(this.urLNoSpace);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urLNoSpace);
   

    //  this.URLInstance = "http://192.168.0.32:8003/BPM_INTEGRATION_API/processworkflow?INST_ProcessId=1124&INST_VersionNo=Version%201&USER=INTI_ALL";
   //  console.log(this.URLInstance);
  }
}
