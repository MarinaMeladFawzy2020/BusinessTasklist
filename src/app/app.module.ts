import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrimengModule } from './primeng.module';


import { TesttableComponent } from './components/testtable/testtable.component';
import { TreeComponent } from './components/tree/tree.component';
import { TesttablegroupComponent } from './components/testtablegroup/testtablegroup.component';

import { ProcesslistViewComponent } from './components/processlist/processlist-view/processlist-view.component';
import { VersionlistComponent } from './components/processlist/versionlist/versionlist.component';
import { CreateinstanceComponent } from './components/processlist/createinstance/createinstance.component';
import { MytasklistComponent } from './components/alltasklist/mytasklist/mytasklist.component';
import { StafftasklistComponent } from './components/alltasklist/stafftasklist/stafftasklist.component';
import { AlltasklisttabsComponent } from './components/alltasklist/alltasklisttabs/alltasklisttabs.component';
import { InstanceslistComponent } from './components/instances/instanceslist/instanceslist.component';
import { InstancesactionComponent } from './components/instances/instancesaction/instancesaction.component';
import { SearchtasklistComponent } from './components/alltasklist/searchtasklist/searchtasklist.component';
import { StaffsuspendComponent } from './components/alltasklist/staffsuspend/staffsuspend.component';
import { StaffactivityassigneduserComponent } from './components/alltasklist/staffactivityassigneduser/staffactivityassigneduser.component';
import { StaffassignandreassignComponent } from './components/alltasklist/staffassignandreassign/staffassignandreassign.component';
import { StaffresumetaskComponent } from './components/alltasklist/staffresumetask/staffresumetask.component';
import { InstancesviewdetailsComponent } from './components/instances/instancesviewdetails/instancesviewdetails.component';
import { InstancelistactivitiesComponent } from './components/instances/instancelistactivities/instancelistactivities.component';
import { InstanceviewhierarchyComponent } from './components/instances/instanceviewhierarchy/instanceviewhierarchy.component';
import { MessageService } from 'primeng/api';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,

    TesttableComponent,
    TesttablegroupComponent,
    TreeComponent ,

    ProcesslistViewComponent,
    VersionlistComponent,
    CreateinstanceComponent,

    AlltasklisttabsComponent,
    SearchtasklistComponent,
    MytasklistComponent,
    StafftasklistComponent,
    StaffsuspendComponent,
    StaffactivityassigneduserComponent,
    StaffassignandreassignComponent,
    StaffresumetaskComponent,


    InstanceslistComponent,
    InstancesactionComponent,
    InstancesviewdetailsComponent,
    InstancelistactivitiesComponent,
    InstanceviewhierarchyComponent





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, 

    PrimengModule   

    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS , useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en-GB'},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MessageService}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
