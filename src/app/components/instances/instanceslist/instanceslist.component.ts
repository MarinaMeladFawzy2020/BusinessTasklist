import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InstaceslistService } from 'src/app/services/instaceslist.service';
import { InstancesactionComponent } from '../instancesaction/instancesaction.component';
declare var $ :any ;
@Component({
  selector: 'app-instanceslist',
  templateUrl: './instanceslist.component.html',
  styleUrls: ['./instanceslist.component.css']
})
export class InstanceslistComponent implements OnInit {
  [x:string]:any;
  loading = true;
@ViewChild('DetailsInstance') DetailsInstance!: InstancesactionComponent;

  //breadcrumb
  items = [
  {label: 'Instance List' , routerLink: '/instancelist'}
  ];
  home = {icon: 'pi pi-home', routerLink: '/instancelist'};

  constructor(private myinstancelist : InstaceslistService) { }

  ngOnInit(): void {
    this.myinstancelist.getProcessTracking().subscribe((Response: any) => {
      this.instancelist = Response.body;
      this.selectedProcess = this.instancelist[0];
      this.loading = false;
       console.log(this.instancelist);

       this.getDetails(this.instancelist[0].process_ID, 0);
  });
}


getDetails(_f :any , i:any){
// alert(_f);
// $('#contentInstance'+i).css('background','#edf0f5');
this.DetailsInstance.ProcessInstance(_f , 1 , 3);
}

}
