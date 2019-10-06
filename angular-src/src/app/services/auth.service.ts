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
    return this.http.post('users/register',user, {headers: headers})
    .map(res=>res.json());
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('users/authenticate',user, {headers: headers})
    .map(res=>res.json());
  }

  me(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    headers.append('x-access-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzAzOTU3OTUsImV4cCI6MTU3MDQ4MjE5NX0.5utZm7giIWwOZPtS3KSnvqxsjFS_5Xxdrf-v_dnmkY4');
  
    return this.http.get('users/profile', {headers: headers})
    .map(res=>res.json());
  }


}
