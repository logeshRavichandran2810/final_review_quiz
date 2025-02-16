import { Component } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  standalone: true,
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminProfileComponent {
  admin = {
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1 234 567 890'
  };

  editProfile() {
    alert('Edit Profile feature coming soon!');
  }
}