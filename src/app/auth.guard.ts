import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth:AuthService
  ) { }

  canActivate(): boolean {
    const isAuthenticated = this.checkIfAuthenticated(); 

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  private checkIfAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
    // return true;
  }
}
