import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { TasklistService } from 'src/app/services/tasklist.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

declare var bootbox :any ;

@Component({
  selector: 'app-viewcalender',
  templateUrl: './viewcalender.component.html',
  styleUrls: ['./viewcalender.component.css']
})
export class ViewcalenderComponent implements OnInit {


  [x:string]:any;
  TaskListEvent:any=[];
  showCal = false;
// currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
currentDate = new Date();

calendarVisible = true;
  calendarOptions: CalendarOptions = {

   
  };
  handleDateClick(arg: { dateStr: string; }) {
     //alert('date click! ' + arg.dateStr)
    //  console.log(arg)
    //  console.log(arg.dateStr)
  }

  // toggleWeekends() {
  //   this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  // }


   constructor(private myTaskList: TasklistService) { }

    ngOnInit(): void  {

      // var date = new Date();
      // console.log(date)
      // console.log( formatDate(date.setDate(date.getDate() + 1),'yyyy-MM-dd', 'en' ));
    //   var date1 = new Date("2022-03-30"); 
    //  console.log( formatDate(date1.setDate(date1.getDate() + 1),'yyyy-MM-dd', 'en' ));

      this.myTaskList.getMyTaskList().subscribe((Response: any) => {
        this.TaskList = Response.body;
        // console.log(this.TaskList);
        for(let i = 0 ; i< this.TaskList.length ; i ++){
         // const str = '23/08/2020';
         if(this.TaskList[i].assign_DATE !== null){
          const [day,month, year] = this.TaskList[i].assign_DATE.split('/');
           this.datestart = year+"-"+month+"-"+day;
         }
         if(this.TaskList[i].due_DATE !== null){
          const [day1,month1, year1] = this.TaskList[i].due_DATE.split('/');
          this.dateend = year1+"-"+month1+"-"+day1;

          var date1 = new Date(this.dateend); 
          // console.log(formatDate(date1.setDate(date1.getDate() + 1),'yyyy-MM-dd', 'en' ));
          this.dateend = formatDate(date1.setDate(date1.getDate() + 1),'yyyy-MM-dd', 'en' );

         }else{
          this.dateend = null
         }
            this.TaskListEvent.push({
            activity_INSTANCE_ID:  this.TaskList[i].activity_INSTANCE_ID  , 
            title:  this.TaskList[i].work_ITEM_NAME +"-"+ this.TaskList[i].process_NAME,
            start: this.datestart,
            end:  this.dateend 
        });
        }
        console.log(this.TaskListEvent)
        if(this.TaskList.length == this.TaskListEvent.length){
          this.drawCalender(this.TaskList);
        }

      });
    

    };


    drawCalender(_TaskList :any){
    this.showCal = true;
    this.calendarOptions = {
      // initialDate : '2019-01-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      events: this.TaskListEvent,
      dateClick: this.handleDateClick.bind(this), // bind is important!   
      

      eventClick: function(info) {
        var eventObj = info.event;
            if (eventObj.start) {
                // alert('Clicked' + eventObj.start);
                console.log(eventObj);
                console.log(eventObj.extendedProps.activity_INSTANCE_ID);
               let newArr = _TaskList.filter((e: { activity_INSTANCE_ID: any; }) => e.activity_INSTANCE_ID == eventObj.extendedProps.activity_INSTANCE_ID)
              console.log(newArr);
              Object.keys(newArr[0]).forEach(key => {
                 // console.log("key: ", key); console.log("Value: ", newArr[0][key]); 
                if(newArr[0][key] == null){
                  newArr[0][key] = " ";
                }
              });

                bootbox.alert({
                  title: "<span style='font-weight: 400; font-size: 16px;'> TaskList Details </span>",
                  message: 
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>process_INSTANCE_ID : </h5><h5>"+newArr[0].process_INSTANCE_ID +"</h5></div>  " +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>work_ITEM_NAME : </h5><h5>"+ newArr[0].work_ITEM_NAME +"</h5></div>" +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>process_NAME : </h5><h5>"+ newArr[0].process_NAME +"</h5></div>" +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>task_Status : </h5><h5>"+ newArr[0].task_Status +"</h5></div>" +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>version_NO : </h5><h5>"+ newArr[0].version_NO +"</h5></div>" +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>assign_DATE : </h5><h5>"+ newArr[0].assign_DATE +"</h5></div>" +
                  "<div style='display: flex'>"+"<h5 class='titleDetails'>due_DATE : </h5><h5>"+ newArr[0].due_DATE +"</h5></div>" +
                  "<div style='display:flex'>"+"<h5 class='titleDetails'>due_DAYS : </h5><h5>"+ newArr[0].due_DAYS +"</h5></div>" ,
          
                  callback: function(){ 
                  }
              });
  
            }
        },
  
        weekends: true ,  // initial value False
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        }
      
     
     //Change Color Task
      console.log(this.calendarOptions.events)
      this.objlen = this.calendarOptions.events;
      for(let i=0 ; i< this.objlen.length ; i++ ){
        if(this.objlen[i].end !== null){
          this.date1 =  new Date(this.objlen[i].end) ;
          // alert( new Date(new Date(this.objlen[i].end).setDate( new Date(this.objlen[i].end).getDate() - 1) ))
          if(new Date(new Date(this.objlen[i].end).setDate( new Date(this.objlen[i].end).getDate() - 1) ) <= new Date(this.currentDate) ){
            // alert(this.objlen[i].end)
            console.log(this.objlen[i].end);

            var date1 = new Date(this.objlen[i].end); 
            var date2 = new Date(this.currentDate);   
            console.log(date1)
            // console.log(date2.getTime())
            var Time = date2.getTime() - date1.getTime(); 
            var Days = Time / (1000 * 3600 * 24); //Diference in Days
            //console.log(date1);
            //console.log(Days);
            if(Days <= 5){
            this.objlen[i].backgroundColor = '#a44';
            this.objlen[i].borderColor= '#a33';
            }
          }
      }

      }
    }

    // eventClick(event: any){
    //   console.log(event);
    // }

}



   // this.TaskListEvent = [
      //   {id:"1" , title: 'task 1', start: '2022-03-28' , end: '2022-03-30' },
      //   { title: 'task 3', start: '2022-03-01 12:30:00' , end: '2022-03-03 10:30:00' },
      //   {
      //     id:"6" ,
      //     title: 'Event 1',
      //     start: '2022-03-13T10:30:00',
      //     end: '2022-03-15T14:00:00',
      //     description: 'XXXXXX',
      //     extendedProps: {
      //       inscription: 1,
      //       dayStart: '2022-03-14'
      //     },
      //     // borderColor: '#a33',
      //     // backgroundColor: '#a33',
      //     // textColor: '#fff'
      //   },
  
      // ]
      
      // setTimeout(() => {
      // }, 4000)



