import { AuthService } from './../../services/auth.service';
import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import  { Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rname:String;
  rusername:String;
  rpassword:String;
  remail:String="";
  username:String;
  password:String;
  constructor(private authService:AuthService, private router : Router,
    private validateService: ValidateService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username : this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      localStorage.setItem('token', data.token);
      window.location.reload();
    });
  }

  onRegisterSubmit(){
    const user = {
      name: this.rname,
      email: this.remail,
      username: this.rusername,
      password: this.password
    };

    //Required fields
    if(!this.validateService.validateRegister(user)){
      //this.flashMessage.show('Please fill in all fields',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Validate email
    if(!this.validateService.validateEmail(user.email)){
      //this.flashMessage.show('Please enter valid email address',{cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //Register User
    this.authService.registerUser(user).subscribe(data=>{
      if(data.success)
      {
        //this.flashMessage.show('You are now registered, you can login now',{cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        //this.flashMessage.show('You are not registered, you can\'t login',{cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

  onLogOut(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
