import { Component, OnInit } from '@angular/core';
import { TasklistService } from 'src/app/services/tasklist.service';
declare var bootbox:any;

@Component({
  selector: 'app-staffresumetask',
  templateUrl: './staffresumetask.component.html',
  styleUrls: ['./staffresumetask.component.css']
})
export class StaffresumetaskComponent implements OnInit {
  [x:string]:any;
  FilterList: any[] = [
      {name: 'Manual Resume ', value: '0'}, 
      {name: ' Automatic Resume', value: '1'},
    ];
  
    minDate = new Date();
    
    // onChangeFilter(p:any){
    //   alert( p.value);
    // }
  
  
     // Get Data From List View
     getDataRow(_dataRow :any){
      this.datasuspend = _dataRow;
      console.log(this.datasuspend);
      this.process_INSTANCE_ID = this.datasuspend.process_INSTANCE_ID ;
  
  
    }
  
  
    constructor(private myTaskList: TasklistService ) { }
  
    ngOnInit(): void {
      this.selectedFilterList = this.FilterList[0];
  
    }
  
    resumetask(_f:any){
      this.myTaskList.ResumeTask(_f).subscribe((Response: any) => {
        console.log(Response);
        if(Response.code == 1 ){
          bootbox.alert({
            title: "<span style='font-weight: 400; font-size: 16px;'>"+"  Success"+"</span>  </i>",
            message: "<span style='font-weight: 400; font-size: 16px;'>"+"  Success "+"</span>  </i>",
            callback: function(){ 
              window.location.reload();
            }
        });
        }
      }); 
  
    }
  
  
    reset(_f:any){
      _f.resetForm({
        "Filter": this.FilterList[0]
      });
  
     }
}
