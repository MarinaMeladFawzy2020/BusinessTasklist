import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstaceslistService } from 'src/app/services/instaceslist.service';
import { InstanceviewhierarchyComponent } from '../instanceviewhierarchy/instanceviewhierarchy.component';

@Component({
  selector: 'app-instancelistactivities',
  templateUrl: './instancelistactivities.component.html',
  styleUrls: ['./instancelistactivities.component.css']
})
export class InstancelistactivitiesComponent implements OnInit {
[x:string]:any;
loading: boolean = true;
    //breadcrumb
    @ViewChild('viewhierarchy') viewhierarchy!: InstanceviewhierarchyComponent;


  constructor(private myinstancelist : InstaceslistService , private route:ActivatedRoute   , private router: Router) { 
    this.process_INSTANCE_ID = (this.route.snapshot.queryParamMap.get('process_INSTANCE_ID'));
    }

  ngOnInit(): void {

    this.items = [
      {label: 'Instance List' , routerLink: '/instancelist'},
      {label: 'Instance List Details' ,  url:['/#/instancelistDetails?process_INSTANCE_ID='+this.process_INSTANCE_ID]},
      {label: 'Instance List Activities' , url:['/#/instancelistactivities?process_INSTANCE_ID='+this.process_INSTANCE_ID] }
    ];
      this.home = {icon: 'pi pi-home', routerLink: '/instancelist'};

    this.myinstancelist.getActivityInstForTracking(this.process_INSTANCE_ID).subscribe((Response: any) => {
      this.listactivities = Response.body;
      this.loading= false;
      console.log(this.listactivities);

   }); 

    
  }

  viewhierarchydataRow(_f:any){
    this.viewhierarchy.getDataRow(_f);

  }

}
