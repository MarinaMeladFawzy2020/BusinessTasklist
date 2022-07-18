import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 [x:string]:any;
 //URL : string = "https://192.168.0.9:8083/";  
 // URL : string = "https://192.168.0.9:8443/"; 
 // URL : string = "https://173.249.22.91:8083/"; //Cloud

 constructor(private http: HttpClient , private urlAdd: EnvironmentUrlService) {
  this.URL = this.urlAdd.urlAddress ;
 }
  // root - root1234
  checklogin(_f:any , LoginMode:any) { 
    console.log(_f);
    console.log(LoginMode);
    sessionStorage.setItem("LoginMode", LoginMode);
     return this.http.post<any>(this.URL+"login" , _f )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.setItem("token", response["Authorization"]);
      sessionStorage.setItem("username", _f.username);

      const decodedToken: any = jwt_decode(response["Authorization"]?.split(" ")[1] || '');
      console.log(decodedToken);
    //  console.log(decodedToken["roles"]);
      if(decodedToken["ORGUNITID"] == ''){
        sessionStorage.setItem("BusinessUnit", "");
      }else{
        sessionStorage.setItem("BusinessUnit", decodedToken["ORGUNITID"]);
      }

      sessionStorage.setItem("Allpermission", JSON.stringify(decodedToken["roles"]));
      return response;
  }));
}


logoutUser() {
  sessionStorage.clear();
  var usernamep = sessionStorage.getItem("username");
  return this.http.post<any>(this.URL+"user/logout?username="+usernamep , {} )
    .pipe(map(response=> {
      console.log("response");
      console.log(response);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      return response;
  }));
}

getToken(): string {
return sessionStorage.getItem('token') || '';
}

getTokenExpirationDate(token: string): any {
  token = this.getToken()
  const decoded: any = jwt_decode(token);
  if (decoded.exp === undefined) return null;

  const date = new Date(0);
  date.setUTCSeconds(decoded.exp);
  return date;
}

isTokenExpired(token?: string): boolean {
 //debugger;
  if (!token) token = this.getToken();
 // console.log(token);
  if (!token || token == "undefined") return false;

  const date = this.getTokenExpirationDate(token);
  if (date === undefined) return false;
  const d = date.valueOf();
  const nd = new Date().valueOf();
  const r = !(date.valueOf() > new Date().valueOf());
  return !(date.valueOf() > new Date().valueOf());
}


getAuthStatus(): boolean {
  if(sessionStorage.getItem('token')){
    console.log("token");
    return true ;
  }else{
    return false;
  }
}

//Check Permisson
public checkAuth(actionPermission: string){
 // debugger;
 // const token = sessionStorage.getItem("token");
  //const decodedToken: any = jwt_decode(token?.split(" ")[1] || '');
  //  console.log(decodedToken);
 // console.log(decodedToken.ORGUNITID);

 let Allpermissions = sessionStorage.getItem("Allpermission");
 let perms = JSON.parse(Allpermissions? Allpermissions : "");
 console.log("perms");
 console.log(perms);
  return perms.includes(actionPermission) ?  true : false;

}



getUserScopes(){
  const token = this.getToken();
  const decodedToken:any = jwt_decode(token?.split(" ")[1] || '');
  return decodedToken.scopes.split(";");
}

}








