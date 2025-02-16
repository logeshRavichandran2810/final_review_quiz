import { Component } from '@angular/core';

@Component({
  selector: 'app-studentprofile',
  imports: [],
  templateUrl: './studentprofile.component.html',
  styleUrl: './studentprofile.component.css'
})
export class StudentprofileComponent {
  student = {
    name: 'John Doe',
    email: 'student@example.com',
    phone: '+1 123 456 789',
    courses: 'Math, Science, History'
  };

  editProfile() {
    alert('Edit Profile feature coming soon!');
  }

}
