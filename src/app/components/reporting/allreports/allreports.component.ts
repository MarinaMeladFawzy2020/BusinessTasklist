import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-allreports',
  templateUrl: './allreports.component.html',
  styleUrls: ['./allreports.component.css']
})
export class AllreportsComponent implements OnInit {
  [x:string]:any;
  @Output() getResponse = new EventEmitter;
  items = [
    {label: 'Reporting' , routerLink: '/reporting'}
   ];
  home = {icon: 'pi pi-home', routerLink: '/dashboard'};

  // Reports = [{id: 1 , title:"Report1"},{id: 2 , title:"Report2"},{id: 3  ,title:"Report3"}]
  constructor( private reporting:ReportingService) {
   }

  ngOnInit(): void {
    console.log("Send Module ID")
    // alert(sessionStorage.getItem("indextabsReports"));
    //this.activetabs=0;
    this.activetabs=sessionStorage.getItem("indextabsReports");
    this.Module_Id = 1 ;
    this.reporting.getAllReports(this.Module_Id).subscribe((Response: any) => {
      if(Response.code == 1){
        this.Reports = Response.body
        console.log(this.Reports);
      }
    }); 
  }


  handleChange(e:any) {
  var indextabs = e.index;
    // alert(indextabs);
  sessionStorage.setItem("indextabsReports" , indextabs);
  this.activetabs=sessionStorage.getItem("indextabsReports");

  }


}
