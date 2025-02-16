import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnav',
  imports: [],
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.css'
})
export class AdminnavComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('userRole'); // Clear user role
    this.router.navigate(['/login']); // Redirect to login
  }
}
