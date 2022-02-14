import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../interceptor/auth.guard';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlltasklisttabsComponent } from './alltasklist/alltasklisttabs/alltasklisttabs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstancelistactivitiesComponent } from './instances/instancelistactivities/instancelistactivities.component';
import { InstanceslistComponent } from './instances/instanceslist/instanceslist.component';
import { InstancesviewdetailsComponent } from './instances/instancesviewdetails/instancesviewdetails.component';
import { CreateinstanceComponent } from './processlist/createinstance/createinstance.component';
import { ProcesslistViewComponent } from './processlist/processlist-view/processlist-view.component';

const routes: Routes = [
  { path:'' , component: NavbarComponent ,  //NavsComponent
    children:[
      { path:'dashboard', component: DashboardComponent ,  canActivate:[AuthGuard]  } ,
      { path:'processlist', component: ProcesslistViewComponent ,  canActivate:[AuthGuard]  } ,
      { path:'tasklist', component: AlltasklisttabsComponent ,  canActivate:[AuthGuard]  } ,
      { path:'instancelist', component: InstanceslistComponent ,  canActivate:[AuthGuard]  } ,
      { path:'instancelistDetails', component: InstancesviewdetailsComponent ,  canActivate:[AuthGuard]  } ,
      { path:'instancelistactivities', component: InstancelistactivitiesComponent ,  canActivate:[AuthGuard]  } ,
     
      // { path:'createinstancelist', component: CreateinstanceComponent  } ,

      


  ]
},


];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
