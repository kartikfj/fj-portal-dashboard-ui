import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servic/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uid: string = '';
  passwd: string = '';
  currYear: number = new Date().getFullYear();
  helpDeskDetails = [
    { ename: 'Help Desk 1', emailid: 'help1@example.com', extension: '101' },
    { ename: 'Help Desk 2', emailid: 'help2@example.com', extension: '102' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    // Handle login logic here
    this.authService.login(this.uid, this.passwd).subscribe(
      (response) => {
        console.log('Login successful');
        this.router.navigate(['/dashboard']); // Redirect to a protected route
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  showEmergencyNumbers() {
    // Show modal or alert with emergency numbers
    alert('Emergency Numbers Modal');
  }
}
