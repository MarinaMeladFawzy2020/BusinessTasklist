import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Testdata } from 'src/app/interfaces/testdata';
import { Observable, Subscription } from 'rxjs';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { DashboardService } from 'src/app/services/dashboard.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  Allprocess_NAME:any=[];
  Alltotal_PROCESS:any=[];
  Allcount_DELAY:any=[];
  Allcompleted_INSTANCE:any=[];
  Allstared_INSTANCE:any=[];

  countuser = 0;
  countstaff = 0;
  countDelay = 0;
  //breadcrumb
  items = [
    { label: 'Home Page', routerLink: '/dashboard' }
  ];
  home = { icon: 'pi pi-home', routerLink: '/dashboard' };

  // count1: number = 0;
  // countstop1: any = setInterval(() => {
  //   this.count1++;
  //   if (this.count1 == 500) {
  //     clearInterval(this.countstop1);
  //   }
  // }, 10)


  constructor(private http: HttpClient, private primengConfig: PrimeNGConfig , private Dashboard:DashboardService) { }

  ngOnInit(): void {
    // this.TotalUserTask = 0;
    this.Dashboard.getsumOfTasks().subscribe((Response: any) => {
      this.sumOfTasks = Response.body;
      this.TotalDelayTask = this.sumOfTasks.DelayTasksNum;
      this.TotalUserTask = this.sumOfTasks.TasksNum;
      this.TotalStaffTask = this.sumOfTasks.StaffTasksNum;
       console.log(this.sumOfTasks);

       if(this.TotalUserTask > 0){
       this.countstop1 = setInterval(() => {
        this.countuser++;
        if (this.countuser == this.TotalUserTask) {
          clearInterval(this.countstop1);
        }
      }, 10)
    }

      if(this.TotalStaffTask > 0){
      this.countstop2= setInterval(() => {
        this.countstaff++;
        if (this.countstaff == this.TotalStaffTask) {
          clearInterval(this.countstop2);
        }
      }, 10)
    }

    if(this.TotalDelayTask > 0){
      this.countstop3= setInterval(() => {
        this.countDelay++;
        if (this.countDelay == this.TotalDelayTask) {
          clearInterval(this.countstop3);
        }
      }, 10)
    }


   

      });

  
    this.Dashboard.getprocessesCount().subscribe((Response: any) => {
      this.processesCount = Response.body;
      console.log(this.processesCount);
      console.log(this.processesCount.length);

      for (let i = 0; i < this.processesCount.length; i++) {
        //  console.log(this.obj[i]);
           this.Allprocess_NAME.push(this.processesCount[i].process_NAME);
           this.Alltotal_PROCESS.push(this.processesCount[i].total_PROCESS);
           this.Allcount_DELAY.push(this.processesCount[i].count_DELAY);
           this.Allstared_INSTANCE.push(this.processesCount[i].stared_INSTANCE);
           this.Allcompleted_INSTANCE.push(this.processesCount[i].completed_INSTANCE);
         }
       //  console.log(this.Allprocess_NAME);

         //bar Chart
          this.DataLine = {
            labels: this.Allprocess_NAME,
            datasets: [{
              label: 'All Process', 
              backgroundColor: ['#42A5F5'], 
              hoverBackgroundColor: ["#42A5F5"],
              data: this.Alltotal_PROCESS

            }, {
              label: 'Delay Process',
              backgroundColor: '#c34b47', //42A5F5
              hoverBackgroundColor: ["#c34b47"],
              data: this.Allcount_DELAY
            }]
          };


          this.DataLine2 = {
            labels: this.Allprocess_NAME,
            datasets: [{
              label: 'Stared Instance', 
              backgroundColor: ['#FFA726'], 
              hoverBackgroundColor: ["#FFA726"],
              data: this.Allstared_INSTANCE

            }, {
              label: 'Completed Instance',
              backgroundColor: '#66BB6A', //42A5F5
              hoverBackgroundColor: ["#66BB6A"],
              data: this.Allcompleted_INSTANCE
            }]
          };

    });

  //  this.obj = [{ label: "Data 1", val1: "20", val2: "30" }, { label: "Data 2", val1: "10", val2: "50" }, { label: "Data 3", val1: "20", val2: "30" } , { label: "Data 3", val1: "20", val2: "30" } , { label: "Data 3", val1: "20", val2: "30" }, { label: "Data 3", val1: "20", val2: "30" }, { label: "Data 3", val1: "20", val2: "30" }]
  
  


     //Pie Chart
     this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [150, 250, 200],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"]
        }
      ]
    };



   //line Chart
    this.dataline = {
      labels: ['1', '2', '3'],
      datasets: [
        {
          label: ' Dataset1',
          data: [150, 250, 10],
          backgroundColor: ["#FFA726"],
          hoverBackgroundColor: ["#FFB74D"]
        },
        {
          label: ' Dataset2',
          data: [28, 48, 10],
          backgroundColor: ["#66BB6A"],  //EC407A
          hoverBackgroundColor: ["#81C784"]


        }
      ]
    }


    this.stackedOptions = {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      responsive: true,
      scales: {
        xAxes: [{
          stacked: true,
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };






  }

  update(event: Event) {
    //  this.data = //create new data
  }



  

 


}




// backgroundColor: ["#42A5F5", "#66BB6A","#FFA726"  ],  //EC407A
// hoverBackgroundColor: [ "#64B5F6", "#81C784", "#FFB74D" ]

// this.DataLine = {
//   labels: ['Data 1', 'Data 2', 'Data3'],
//   datasets: [{
//     label: 'Dataset 1',
//     backgroundColor: '#42A5F5',
//     data: [10, 20, 30]

//   }, {
//     label: 'Dataset 2',
//     backgroundColor: '#66BB6A',
//     data: [50, 25, 12]
//   }]
// };
