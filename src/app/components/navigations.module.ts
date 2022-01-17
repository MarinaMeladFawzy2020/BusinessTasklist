import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavRoutingModule } from './navigations-routing.module';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [


  
  
   
  ],

  entryComponents:[ ],
  imports: [
    CommonModule,
    NavRoutingModule,
  

  ],
  providers: [
    HttpClient
  ],
})
export class NavModule { }
