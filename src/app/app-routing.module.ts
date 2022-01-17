import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path:'', component: LoginComponent } ,
  {
    path:'',
    loadChildren: () => import("src/app/components/navigations.module").then(m => m.NavModule)
  },
  { path:'**',  redirectTo:'' , pathMatch:'full' } ,

  
  

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


