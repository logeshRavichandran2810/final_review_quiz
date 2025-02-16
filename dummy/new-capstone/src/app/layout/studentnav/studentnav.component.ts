import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-studentnav',
  imports: [RouterLink,CommonModule],
  templateUrl: './studentnav.component.html',
  styleUrl: './studentnav.component.css'
})
export class StudentnavComponent {
  constructor(private router: Router) {}

  isLoggedIn: boolean = false;

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    // this.isLoggedIn = !!localStorage.getItem('loggedInUser');
    var log = localStorage.getItem('userid');
    if(log){
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userid');
    // localStorage.removeItem('userRole'); 
    // window.location.reload();
    window.location.href="login";
    this.router.navigate(['/login']); // Redirect to login
  }

}
