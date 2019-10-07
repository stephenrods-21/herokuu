import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(
    private authService: AuthService) {

     }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      console.log(data);
      // this.authService.me().subscribe(r=>{
      //   console.log(r);
      // })
    });

  }

}
