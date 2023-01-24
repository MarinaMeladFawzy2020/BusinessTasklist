import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var bootbox:any;

@Component({
  selector: 'app-createinstance',
  templateUrl: './createinstance.component.html',
  styleUrls: ['./createinstance.component.css']
})
export class CreateinstanceComponent implements OnInit {
  [x:string]:any;
  checkURLiFrame:boolean = false;
  @Input() proVersion!: any;

  constructor(private sanitizer: DomSanitizer) { 

  }

 

  ngOnInit(): void {
  //  this.checkURLiFrame = false;
  this.nameusercreateinstance = sessionStorage.getItem("username");

    if(sessionStorage.getItem("username") == "root"){
      this.nameuser = "INTI_ALL";
    }else{
      this.nameuser = sessionStorage.getItem("username");
    }
  }


  // myLoadEvent(){

  //   let myContainer = <HTMLElement> document.querySelector("#myDiv");
  //   myContainer.innerHTML = '<a href="http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=1811&INST_VersionNo=Version%201&USER=INTI_ALL" target="iframe1">link</a>';
  // }

  viewVersionDetails(Process:any){
      
  //   bootbox.alert({
  //     title: "<span style='font-weight: 400; font-size: 16px;'>"+"  Success"+"</span>  </i>",
  //     message: "<span style='font-weight: 400; font-size: 16px;'>"+ "<a onload='loadImage()' href='http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=1811&INST_VersionNo=Version%201&USER=INTI_ALL'>"+ "URL"+" </a>"  +"</span>  </i>",
  //     callback:  () => {
  //     }

  // });

  // window.open('http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=2667&INST_VersionNo=Version%201&USER=INTI_ALL',"_self");

  // window.open('http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=1811&INST_VersionNo=Version%201&USER=INTI_ALL','popup','width=1000,height=1000,left=150,top=150');
 
  this.checkURLiFrame = true;
    this.dataP = Process;
    console.log(Process);

   // http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=1125&INST_VersionNo=Version%201&USER=
    //http://192.168.0.32:8003/BPM_INTEGRATION_API/processworkflow
    // http://192.168.0.89:8080/EUBusiness/processworkflow?INST_ProcessId=1125&INST_VersionNo=Version%201&USER=INTI_ALL
    this.URLInstance = "/EUBusiness/processworkflow?INST_ProcessId="+this.dataP.ProcessId+"&INST_VersionNo="+this.dataP.VersionNo+"&USER="+this.nameusercreateinstance;
    this.urLNoSpace = this.URLInstance.replace(' ', '%20') ;
    console.log(this.urLNoSpace);
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urLNoSpace);
    console.log(this.trustedUrl);
    // window.open(this.urLNoSpace,'popup','width=1000,height=1000,left=150,top=150');

    // window.open(this.URLInstance  ,"_target");

    //  this.URLInstance = "http://192.168.0.32:8003/BPM_INTEGRATION_API/processworkflow?INST_ProcessId=1124&INST_VersionNo=Version%201&USER=INTI_ALL";
   //  console.log(this.URLInstance);
  }



  close(){
    this.checkURLiFrame = false;
   }



  
}
