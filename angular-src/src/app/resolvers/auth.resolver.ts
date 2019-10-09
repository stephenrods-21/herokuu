import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class IsLoggedIn {
  constructor(
    private router: Router, 
    private authService: AuthService) {
  }

  resolve(): void {
      console.log('HITT')
    if (this.authService.isAuthenticated()) 
    {
        this.router.navigate(['/']);
    }
  }
}