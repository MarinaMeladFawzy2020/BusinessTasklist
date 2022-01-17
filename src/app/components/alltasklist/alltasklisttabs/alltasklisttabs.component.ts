import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alltasklisttabs',
  templateUrl: './alltasklisttabs.component.html',
  styleUrls: ['./alltasklisttabs.component.css']
})
export class AlltasklisttabsComponent implements OnInit {
  [x:string]:any;
  //breadcrumb
  items = [
  {label: 'Task List' , routerLink: '/tasklist'}
  ];
  home = {icon: 'pi pi-home', routerLink: '/tasklist'};
  indextabs = 0;

  gettotaltasklist($event: any) {  
    this.totaltasklist = $event;  
    console.log("Event fire Data Outcomponent ");
    console.log(this.totaltasklist);
  } 
  gettotalStaflist($event: any) {  
    this.TotalStafList = $event;  
    console.log(this.TotalStafList);
    
  } 


  constructor() {  }

  handleChange(e:any) {
    var indextabs = e.index;
    sessionStorage.setItem("indextabstasklist" , indextabs);
    this.activetabs=sessionStorage.getItem("indextabstasklist");
}

  ngOnInit(): void {
    this.activetabs=sessionStorage.getItem("indextabstasklist");

  }

}
