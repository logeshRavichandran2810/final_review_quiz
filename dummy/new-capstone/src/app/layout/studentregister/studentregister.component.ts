import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';  // Import DbService
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentregister',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './studentregister.component.html',
  styleUrls: ['./studentregister.component.css']  // Fix `styleUrl` to `styleUrls`
})
export class StudentregisterComponent {
  name = '';
  email = '';
  password = '';
  
  constructor(private router: Router, private dbService: DbserviceService) {}

  isValidName(name: string): boolean {
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return !emailPattern.test(name);
  }

  register(form: NgForm) {
    if (form.invalid || !this.isValidName(this.name)) {
      alert('Please fill in all required fields correctly and ensure the name is not an email.');
      return;
    }

    const signupData = {
      username: this.name,
      email: this.email,
      password: this.password
    };

    this.dbService.addRecord('signup', signupData).subscribe({
      next: (response) => {
        console.log('Registration Successful:', response);
        alert('Registered successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration Failed:', error);
        alert('Signup failed [Invalid Credential]. Please try again.');
      }
    });
  }
}
