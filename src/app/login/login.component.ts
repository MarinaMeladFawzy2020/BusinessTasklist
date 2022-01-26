import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
declare var bootbox:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
[x:string]:any;
LoginMode = "0";



  constructor( private router: Router , private authservice: AuthService ) { }
  
  ngOnInit(): void {
  }

  login(_f:any){
    console.log(_f);
    // root - root1234
    var datalogin = {
      "username": _f.name,
      "password": _f.password
    };
    //"LoginMode":_f.LoginMode
  //  console.log(datalogin);
    this.authservice.checklogin(datalogin , _f.LoginMode).subscribe(
      Response => {
         console.log(Response);
         if(Response){
          this.router.navigate(["/dashboard"]);
         }else{
          this.showErrorMessage = "Invalid username or password";

        }
      },
      error => {
        if(error.status == 403){
        this.showErrorMessage = "Invalid username or password";
        // bootbox.alert("<span style='color:#a33;font-weight: 800;'>Invalid username or password</span>  </i>");

        }
          console.log(error);
      }
   
      );

  }
}
