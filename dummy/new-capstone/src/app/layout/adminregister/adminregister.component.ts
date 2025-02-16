import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DbserviceService } from '../../services/dbservice.service';

@Component({
  selector: 'app-adminregister',
  imports: [FormsModule],
  templateUrl: './adminregister.component.html',
  styleUrl: './adminregister.component.css'
})
export class AdminregisterComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private dbService: DbserviceService) {}

  login() {
    this.dbService.getRecord('admins').subscribe((admins: any) => {
      const admin = admins.find((a: any) => a.username === this.username && a.password === this.password);

      if (admin) {
        console.log("admin",admin.id);
        localStorage.setItem('userid', admin.id);
        alert('Login Successful');
        window.location.href="admindash";
        // this.router.navigate(['/admindash']);
      } else {
        alert('Invalid Credentials. Please try again.');
      }
    });
  }
  
}
