import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
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
      this.home = {icon: 'pi pi-home', routerLink: '/dashboard'};

    this.myinstancelist.getActivityInstForTracking(this.process_INSTANCE_ID).subscribe((Response: any) => {
      this.listactivities = Response.body;
      this.loading= false;
      console.log(this.listactivities);

   }); 
  
   this.cols = [
    { field: 'activity_NAME', header: 'Activity Name' },
    { field: 'instance_STATUS', header: 'Status' },
    { field: 'view', header: 'View Work Items' },
    { field: 'due_DATE', header: 'Due Date' },
    { field: 'finish_DATE', header: 'Finish Date' },
    { field: 'finished_BY', header: 'Finished BY' },
    
  ];
  this._selectedColumns =  this.cols ;
}


@Input() get selectedColumns(): any[] {
  return this._selectedColumns;
}

set selectedColumns(val: any[]) {
  //restore original order
  this._selectedColumns = this.cols.filter((col: any) => val.includes(col));
}

    
  
  viewhierarchydataRow(_f:any){
    this.viewhierarchy.getDataRow(_f);

  }


  onChangesearchActi= (_f:any) => {
    console.log(_f);
        let newArr= this.listactivities.filter((e: { activity_INSTANCE_ID: any;  activity_NAME:any
          instance_STATUS: any; due_DATE: any; finish_DATE:any ; finished_BY:any}) =>

          e.activity_INSTANCE_ID.toString().includes( _f )|| 
          e.activity_NAME.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )||
          e.instance_STATUS.toLocaleLowerCase().includes( _f.toLocaleLowerCase() ) || 
          ( e.due_DATE !== null  && e.due_DATE.includes( _f) )|| 
         
          e.finish_DATE.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )|| 
          e.finished_BY.toLocaleLowerCase().includes( _f.toLocaleLowerCase() )
          );
          console.log(newArr);
          this.listactivitiesExport = newArr;
      if(_f == ''){
        this.listactivitiesExport = this.listactivities;
      }
   
     }

  
  exportExcel() {
    //npm install xlsx
    import('xlsx').then((xlsx): void => {
      this.dataProcesses = document.getElementById('dtlistactivities');
     // const worksheet = xlsx.utils.table_to_sheet(this.dataProcesses);
      const worksheet = xlsx.utils.json_to_sheet(this.listactivitiesExport);
      //const worksheet = xlsx.utils.json_to_sheet(this.listactivities);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "InstanceListActivities");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    //npm install filesaver
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_' + formatDate(new Date(), "dd-MMM-YYYY hh:mm", 'en-US') + EXCEL_EXTENSION);
  }
  
}
