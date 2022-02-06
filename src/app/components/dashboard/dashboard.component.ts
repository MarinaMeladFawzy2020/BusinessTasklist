import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Testdata } from 'src/app/interfaces/testdata';
import {Observable, Subscription} from 'rxjs';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
declare var $ :any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x:string]:any;
    //breadcrumb
    items = [
      {label: 'Home Page' , routerLink: '/dashboard'}
     ];
    home = {icon: 'pi pi-home', routerLink: '/dashboard'};

   
  count1:number = 0;
  countstop1:any = setInterval(()=>{
    this.count1++;
    if(this.count1 == 500)
    {
      clearInterval(this.countstop1);
    }
  },10) 

  constructor(private http: HttpClient , private primengConfig: PrimeNGConfig ) { }
 
  ngOnInit(): void {


    this.data = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [150, 250, 200 ],
              backgroundColor: ["#42A5F5", "#66BB6A","#FFA726"  ],
              hoverBackgroundColor: [ "#64B5F6", "#81C784", "#FFB74D" ]
          }
      ]
  };


  this.dataline = {
    labels: ['A','B','C'],
    datasets: [
        {
            label: 'First Dataset',
            data: [150, 250, 100 ],
            backgroundColor: ["#42A5F5", "#66BB6A","#FFA726"  ],
            hoverBackgroundColor: [ "#64B5F6", "#81C784", "#FFB74D" ]

        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40],
            backgroundColor: ["#42A5F5", "#66BB6A","#FFA726"  ],
            hoverBackgroundColor: [ "#64B5F6", "#81C784", "#FFB74D" ]

        }
    ]
}



this.stackedData = {
  labels: ['Data 1', 'Data 2', 'Data 3'],
  datasets: [{
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: '#42A5F5',
      data: [ 50, 25, 12 ]
  }, {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: '#66BB6A',
      data: [ 10, 5, 12 ]

  }, {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: '#FFA726',
      data: [ 5, 30, 20 ]

  }]
};

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


