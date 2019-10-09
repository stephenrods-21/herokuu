import { Config } from './../common/common';
import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(Config.apiBaseurl+'users/register',user, {headers: headers})
    .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(Config.apiBaseurl+'users/authenticate',user, {headers: headers})
    .map(res=>res.json());
  }

  isAuthenticated(){
   if(localStorage.getItem('token'))
    return true;
    else
    return false;
  }

  me(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('x-access-token',localStorage.getItem('token'));
  
    return this.http.get(Config.apiBaseurl+'users/profile', {headers: headers})
    .map(res=>res.json());
  }


}
