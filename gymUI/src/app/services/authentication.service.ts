import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private http:HttpClient) {}

  setBearerToken(bearerToken:string) {
    console.log(bearerToken);
    
    localStorage.setItem("token",bearerToken);
  }

  getBearerToken() {
    return localStorage.getItem("token");
  }

  removeToken(){
    localStorage.removeItem('token');
  }

  // Customer Service
  authenticateCustomer(data:any) {
    // console.log(data);
    localStorage.setItem('username',data.name)
    return this.http.post("http://localhost:8010/customer/login",data);

  }
  isUserAuthenticated() {
    return this.http.post('http://localhost:8010/customer/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }

  // Admin Service
  authenticateAdmin(data:any) {
    localStorage.setItem('username',data.name);
    return this.http.post('http://localhost:8010/admin/login', data);
  }
  
  isAdminAuthenticated()
  {
    return this.http.post('http://localhost:8010/admin/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }


  // Marketing Team Service !!
  authenticateMarkTeam(data:any) {
    localStorage.setItem('username',data.name);
    return this.http.post('http://localhost:8010/mark-team/login', data);
  }
  
  isMarkTeamAuthenticated()
  {
    return this.http.post('http://localhost:3001/mark-team/verify',{},{
      headers:new HttpHeaders().set('Authorization',`${this.getBearerToken()}`)
    });
  }

}
