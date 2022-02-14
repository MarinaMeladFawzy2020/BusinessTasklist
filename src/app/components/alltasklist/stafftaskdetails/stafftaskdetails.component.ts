import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-stafftaskdetails',
  templateUrl: './stafftaskdetails.component.html',
  styleUrls: ['./stafftaskdetails.component.css']
})
export class StafftaskdetailsComponent implements OnInit {

  [x:string]:any;
  checkURLiFrame: boolean = false;
  lang = "en";
  constructor(private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
  }

  viewVersionDetails(myTask:any){
    this.checkURLiFrame = true;
     this.dataP = myTask;
     console.log(myTask);
     //http://192.168.0.89:8080/EUBusiness/taskcontent?INSTANCE_ID=1725399&lang=en&CurrentUser=root
     this.URLInstance = "/EUBusiness/taskcontent?INSTANCE_ID="+this.dataP.process_INSTANCE_ID+"&lang="+this.lang+"&CurrentUser="+sessionStorage.getItem("username");
     this.urLNoSpace = this.URLInstance.replace(' ', '%20') ;
     console.log(this.urLNoSpace);
     this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urLNoSpace);
   }
   

   close(){
    this.checkURLiFrame = false;
   }

}
