import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('userid');

    if (user) {
      return true; // User is logged in, allow access
    } else {
      alert('Access denied! Please log in.');
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }
}
