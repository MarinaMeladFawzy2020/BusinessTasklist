import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler, HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
declare var bootbox:any;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //debugger;
    var token = this.authService.getToken()
    if (token != null && this.authService.isTokenExpired()) {
      //debugger;
      const s = this.authService.isTokenExpired();
      this.authService.logoutUser();
      bootbox.alert({title: "<span style='color:#a33;font-weight: 500; font-size: 16px'>" + "Information message" + "</span>", message: "<span style='color:black;font-weight: 500; font-size: 16px'> Session Timed Out! Please Login </span>"});
      this.router.navigate(['/'])
      return throwError("Session Timed Out")
    } 
   
    else { 


      // this.loader.show();
      const authRquest = request.clone({
        setHeaders: {
          "Authorization": token,
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers":"*",

        }
      })
      
      return next.handle(authRquest)
        .pipe(
          tap(event => {}, error => {})
        )
    
    }

  }
}





