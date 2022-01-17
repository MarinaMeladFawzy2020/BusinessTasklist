import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
[x:string]:any;


cities: City[] = [];
selectedCityCode!: string;
selectedCity!: City ;

  constructor( private router: Router , private authservice: AuthService) {

    this.cities = [
      {name: 'New York', code: 'NY', inactive: false},
      {name: 'Rome', code: 'RM', inactive: true},
      {name: 'London', code: 'LDN', inactive: false},
      {name: 'Istanbul', code: 'IST', inactive: true},
      {name: 'Paris', code: 'PRS', inactive: false}
  ];

   }

  ngOnInit(): void {
    this.LoginMode  = sessionStorage.getItem("LoginMode");
    if( this.LoginMode == 1){
      this.titleLoginMode = "Testing";
    }
    if( this.LoginMode == 0){
      this.titleLoginMode = "Production";
    }
    this.username = sessionStorage.getItem("username");

  //   this.items = [
  //     {
  //         label: 'File',
  //         icon: 'pi pi-pw pi-file',
  //         items: [{
  //                 label: 'New', 
  //                 icon: 'pi pi-fw pi-plus',
  //                 items: [
  //                     {label: 'User', icon: 'pi pi-fw pi-user-plus'},
  //                     {label: 'Filter', icon: 'pi pi-fw pi-filter'}
  //                 ]
  //             },
  //             {label: 'Open', icon: 'pi pi-fw pi-external-link'},
  //             {separator: true},
  //             {label: 'Quit', icon: 'pi pi-fw pi-times'}
  //         ]
  //     },
  //     {
  //         label: 'Edit',
  //         icon: 'pi pi-fw pi-pencil',
  //         items: [
  //             {label: 'Delete', icon: 'pi pi-fw pi-trash' , url : '/#'},
  //             {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
  //         ]
  //     }
      
  // ];

  }


  logout(){
    this.router.navigate(["/"]);
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('username');
    // sessionStorage.removeItem('LoginMode');
    sessionStorage.clear()

    // this.authservice.logoutUser().subscribe(
    //   Response => {
    //      console.log(Response);
    //      if(Response){
    //       this.router.navigate(["/"]);
          
    //      }
    //   },
    //   error => {
    //     console.log(error);
    //     if(error.status == 200){
    //       this.showErrorMessage = "SUCCESS";
    //       this.router.navigate(["/"]);
    //       sessionStorage.removeItem('token');
    //       sessionStorage.removeItem('username');
    //       sessionStorage.removeItem('LoginMode');

    //     }
    //     if(error.status == 500){
    //       this.showErrorMessage = "FAILED, ERROR: Username not found";

    //     }
    //   }
     // );

  }

}


interface City {
  name: string,
  code: string,
  inactive:Boolean
}