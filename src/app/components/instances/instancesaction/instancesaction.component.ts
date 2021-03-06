import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InstaceslistService } from 'src/app/services/instaceslist.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
declare var $: any
declare var bootbox: any

@Component({
  selector: 'app-instancesaction',
  templateUrl: './instancesaction.component.html',
  styleUrls: ['./instancesaction.component.css'],
})
export class InstancesactionComponent implements OnInit {
  [x:string]:any;
  checkDetails = false;
  hidenReadmore = false;
  checkstatus = false;
  checkResult= false;
  checksearchbtn = false;
    @ViewChild("myDiv") myDiv!: ElementRef;

  constructor(private myinstancelist : InstaceslistService , private router: Router , private messageService: MessageService) { }


  ngOnInit(): void {
    // document.body.innerHTML = "<pre>" + (JSON.stringify(this.treeall, null, " "))

}



ProcessInstance(processID:any , PageNo:any , Size:any ){
//alert(_f);
this.hidenReadmore = false ;
this.PageNoP = PageNo;
this.SizeP = Size ;
this.processIDP = processID;
this.checksearchbtn = false;

this.myinstancelist.getProcessInstance(processID , PageNo , Size).subscribe((Response: any) => {
  this.AllProcessInstance = Response.body;
  this.checkDetails = true;
   console.log(this.AllProcessInstance);
   if(this.AllProcessInstance.length == 0){
     this.hidenReadmore = true ;
     this.message = "NO Data Found" ;
   }else{
    this.message = null ;
    if(this.AllProcessInstance.length < this.SizeP){
      this.hidenReadmore = true ;
    }
   }

});

}



readMore(processIDP :any , PageNoP:any , SizeP:any) {
  console.log(processIDP);
  console.log(PageNoP);
  this.myinstancelist.getProcessInstance(processIDP , PageNoP , SizeP).subscribe((Response: any) => {
   this.PageNoP = PageNoP;
   this.add = Response.body;
   console.log(this.add);

   console.log(this.add.length);
  //  if(this.add.length == 1 || this.add.length == 2){
  //   this.hidenReadmore = true ;
  //  // alert(this.add.length);
  //  }

   if(this.add.length > 0){
    for(let i = 0 ; i< this.add.length ; i ++){
   //   console.log(this.add[i]);
      this.AllProcessInstance.push(this.add[i]);
    }
     console.log(this.AllProcessInstance);

     if(this.add.length < this.SizeP){
      this.hidenReadmore = true ;
     }

   } 
   else{
     this.hidenReadmore = true ;
   }
 
 });
 
 }
// search 
searchtinstance(fsearch:any)
{
  console.log(fsearch);
this.hidenReadmore = false ;
this.PageNoP = 1;
this.SizeP = 4 ;
this.datasearch =  fsearch;
this.checksearchbtn = true
this.myinstancelist.searchProcessInstance(fsearch , 1 , this.SizeP).subscribe((Response: any) => {
  this.AllProcessInstance = Response.body;
  this.checkDetails = true;
   console.log(this.AllProcessInstance);
   if(this.AllProcessInstance.length == 0){
     this.hidenReadmore = true ;
     this.message = "NO Data Found" ;
   }else{
    this.message = null ;
    if(this.AllProcessInstance.length < this.SizeP){
      this.hidenReadmore = true ;
    }

   }

});
}
searchreadMore( PageNoP:any , SizeP:any) {
 console.log(this.datasearch)
  this.myinstancelist.searchProcessInstance(this.datasearch , PageNoP , SizeP).subscribe((Response: any) => {
   this.PageNoP = PageNoP;
   this.add = Response.body;
   console.log(this.add);

   console.log(this.add.length);
 
   if(this.add.length > 0){
    for(let i = 0 ; i< this.add.length ; i ++){
   //   console.log(this.add[i]);
      this.AllProcessInstance.push(this.add[i]);
    }
     console.log(this.AllProcessInstance);

     if(this.add.length < this.SizeP){
      this.hidenReadmore = true ;
     }

   } 
   else{
     this.hidenReadmore = true ;
   }
 
 });
 
 }


 reset(f:any){
  //   f.form.reset({
  //     Process_Instance_Id: null, 
  //     Process_Instance_Name: "",
  // });
  this.Process_Instance_Id= null, 
  this.Process_Instance_Name= "", 
  console.log(f.value);
  console.log(this.processIDP);
  this.ProcessInstance(this.processIDP , 1 , 4 );
 }

viewDetails(process_INSTANCE_ID:any ){
  this.router.navigate(["/instancelistDetails"] ,  { queryParams: {process_INSTANCE_ID: process_INSTANCE_ID }});
}



Terminated(_f:any , i:any){
this.process_INSTANCE_ID = _f;
this.index = i;



var dialog = bootbox.dialog({
  title: '<h6>Confirm Message</h6>',
  message: "<p> Are you Sure ?</p>",
  size: 'medium',
  closeButton: false,
  buttons: {
      ok: {
          label: '<i class="fa fa-check"></i> Ok',
          icon:'fa fa-home',
          className: 'btn-success',
          callback: () => {
            this.Done(this.process_INSTANCE_ID  , this.index);
          }
      },
      cancel: {
        label: '<i class="fa fa-times"></i> Cancel',
        icon : "icon-remove",
        className: 'btn-danger',
        callback: () => {
           // console.log('cancel clicked');
            $('#Terminated').modal('hide');
        }
    }
  }
});

}

Done(_f:any , i:any){
  // alert(_f);
      this.myinstancelist.TerminateTask(_f).subscribe((Response: any) => {
      console.log(Response);
      if(Response.code == 1){
        this.checkstatus = true;
        this.AllProcessInstance[i].instance_STATUS = "Terminated";
        $('#Terminated').modal('hide');
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Done successfully'});

      }
  });
  
  }


}


    //   bootbox.confirm({
    //     message: "Are Your Sure ?",
    //     buttons: {
    //         confirm: {
    //             label: 'Yes',
    //             className: 'btn-success'
    //         },
    //         cancel: {
    //             label: 'No',
    //             className: 'btn-danger'
    //         }
    //     }
    // } ,  (result: boolean) => {alert(result); } );
