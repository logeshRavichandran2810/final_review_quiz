import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private dbService: DbserviceService, private router: Router) {}

login() {
  const loginData = {
    email: this.email,
    password: this.password
  };

  this.dbService.addRecord('login', loginData).subscribe({
    next: (response: any) => {
      console.log('Login Response:', response);

      if (response && response.user_id) {
        const userData = {
          id: response.user_id,
          username: response.username
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store user data
        localStorage.setItem('userid', userData.id);
        alert('Login successful!');
        // window.location.reload();
        this.router.navigate(['/studentdash']);
      } else {
        alert('Invalid login response!');
      }
    },
    error: (error) => {
      console.error('Login failed:', error);
      alert('Invalid credentials!');
    }
  });
}

}
